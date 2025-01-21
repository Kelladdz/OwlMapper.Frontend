import { useContext, useEffect, useState } from "react"
import UserInterfaceContext from "../context/userInterface"
import { useDispatch, useSelector } from "react-redux";
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

    

    const getDepartureTimes = (departures) => {
        console.log('get departure times: ', departures)
        const newDeps = departures.map(dep => {
            const now = new Date();
            const [hours, minutes] = [parseInt(dep.departure.time.split(':')[0], 10), parseInt(dep.departure.time.split(':')[1], 10)];
            const targetDate = new Date();
            targetDate.setHours(hours);
            targetDate.setMinutes(minutes); 
            const differenceInMs = targetDate - now;
            const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
            const timeString = `${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`;

            return {
            id: dep.departure.id, 
            isOnlyInDaysWithoutSchool: dep.departure.isOnlyInDaysWithoutSchool, 
            isOnlyInSchoolDays: dep.departure.isOnlyInSchoolDays,
            scheduleDay: dep.departure.scheduleDay,
            time: dep.departure.time.substring(0,5),
            variantId: dep.departure.variantId,
            variant: dep.departure.variant,
            timeToArrive: differenceInMinutes}
        });
        onDeparturesChange(newDeps);
    } 



    

    

    

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
        if(fetchedLines) {
            setActiveLines([fetchedLines[0].line.name])
        }
        
        
    },[fetchedLines])

    return {nameDisplay, departures, getDepartureTimes, lines, deps, activeLines}
}