import { useContext, useEffect, useState } from "react"
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useFetchFilteredByRouteStopVariantsQuery } from "../store/apis/variantsApi"
import UserInterfaceContext from "../context/userInterface"
import { useDispatch, useSelector } from "react-redux";
import { useFetchDeparturesByBusStopIdQuery } from "../store/apis/departuresApi";
import { addLine, removeLine } from "../store/slices/linesSlice";
import { addDepartures } from "../store/slices/departuresSlice";
import axios from "axios";
import CurrentDataContext from "../context/currentData";

export function useDeparturesList() {
    const departures = useSelector(state => state.departures.departures);
    const dispatch = useDispatch();
    const {selectedRouteStop, onLinesSelected, onLinesDeparturesFetched, fetchedLines, selectedLine, onDeparturesChange, onDeparturesRemove} = useContext(UserInterfaceContext);
    const {selectedPoint} = useContext(CurrentDataContext)

    const [activeLines, setActiveLines] = useState([selectedLine]);
    const [nameDisplay, setNameDisplay] = useState('')
    const [lineToSearch, setLineToSearch] = useState('');
    const [lines, setLines] = useState();
    const [deps, setDeps] = useState([]);
    const busStopId = selectedRouteStop ? selectedRouteStop.busStopId : null;
    const lineName = lineToSearch;

    const handleLineClick = (lineName) => {
        if (!activeLines.includes(lineName)) {
            fetchDepartures(lineName);
            setActiveLines(prev => [...prev, lineName]);
        } else if (activeLines.length > 1){
            setActiveLines(prev => prev.filter(line => line !== lineName));
            onDeparturesRemove(lineName);
        }
    }


    const fetchLines = async () => {
        const linesResponse = await axios.get(`https://localhost:7033/api/lines/filter?busStopId=${selectedRouteStop ? selectedRouteStop.busStopId : selectedPoint.id}`)
        .then(response => {
            console.log('Lines:', response.data);
            onLinesDeparturesFetched(response.data);
        })
            
        }
    
    const fetchDepartures = async (line) => {
        let newDeps = [...deps];
    try {
        const response = await axios.get(`https://localhost:7033/api/departures/filter?busStopId=${selectedRouteStop ? selectedRouteStop.busStopId : selectedPoint.id}&lineName=${line}&date=${new Date().toISOString().substring(0, 10)}&page=1&pageSize=20`)
                .then(response => {
                    console.log('Response:', response.data);
                    response.data.forEach(dep => {
                        const now = new Date();
                        const [hours, minutes] = [parseInt(dep.departure.time.split(':')[0], 10), parseInt(dep.departure.time.split(':')[1], 10)];
                        const targetDate = new Date();
                        targetDate.setHours(hours);
                        targetDate.setMinutes(minutes); 
                        const differenceInMs = targetDate - now;
                        const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
                        const timeString = `${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`;

                        newDeps.push({
                        id: dep.departure.id, 
                        isOnlyInDaysWithoutSchool: dep.departure.isOnlyInDaysWithoutSchool, 
                        isOnlyInSchoolDays: dep.departure.isOnlyInSchoolDays,
                        scheduleDay: dep.departure.scheduleDay,
                        time: dep.departure.time.substring(0,5),
                        variantId: dep.departure.variantId,
                        variant: dep.departure.variant,
                        timeToArrive: differenceInMinutes})
                    });
                })
        console.log('All deps: ', newDeps)
        onDeparturesChange(newDeps);
    } catch (error) {
        console.error('Error fetching departures:', error);
    }
};
    

    useEffect(() => {
        if (selectedRouteStop) {
            let name = `${selectedRouteStop.busStop.city} ${selectedRouteStop.busStop.name}`;
            name.split(' ')[0] === name.split(' ')[1] ? name = `${selectedRouteStop.busStop.name} ` : name = name;
            name.split(' ')[0] === name.split(' ')[2] && name.split(' ')[1] === name.split(' ')[3] ? name = `${name.split(' ')[0]} ${name.split(' ')[1]}` : name = name;
            name.split(' ')[0] === name.split(' ')[3] && name.split(' ')[1] === name.split(' ')[4] && name.split(' ')[2] === name.split(' ')[5] ? name = `${name.split(' ')[0]} ${name.split(' ')[1]} ${name.split(' ')[2]}` : name = name;
            setNameDisplay(name);
        }
    },[selectedRouteStop])




    useEffect(() => {
        if (activeLines) {
            console.log('Active Lines:', activeLines)
        }
    },[activeLines])

    useEffect(() => {
        if (selectedLine && selectedRouteStop) {
            fetchLines();
            fetchDepartures(selectedLine);
        }
        if (selectedPoint) {
            fetchLines();
        }
    },[])

    useEffect(() => {
        if(fetchedLines) {
            setActiveLines([fetchedLines[0].line.name])
            fetchDepartures(fetchedLines[0].line.name);
        }
        
        
    },[fetchedLines])

    return {nameDisplay, departures, handleLineClick, lines, deps, activeLines}
}