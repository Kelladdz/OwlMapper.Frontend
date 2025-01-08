import { useContext, useEffect, useState } from "react";
import UserInterfaceContext from "../context/userInterface";
import axios from 'axios';
import CurrentDataContext from "../context/currentData";

export function useAllDeparturesTable() {
    const {selectedLine, selectedRouteStop, onVariantsAndSymbols, variantsWithSymbols, onMarkingsShow, onActiveLineSelect, activeLine, onAllDeparturesChange, deps, fetchedLines} = useContext(UserInterfaceContext);
    const {selectedPoint} = useContext(CurrentDataContext)
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().substring(0, 10));
    
    
    const [chunkedDeps, setChunkedDeps] = useState();

    const handleLineClick = (lineName) => {
        if (activeLine !== lineName) {
            console.log('New active line: ', lineName);
            onActiveLineSelect(lineName);
        } 
    }

    const handleCurrentDateChange = (date) => {
        const dateString = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
		.toISOString().substring(0, 10);
        setCurrentDate(dateString);
    }

    const fetchDepartures = async () => {
        let newDeps = [];
    try {
        const response = await axios.get(`https://localhost:7033/api/departures/filter?busStopId=${selectedRouteStop ? selectedRouteStop.busStopId : selectedPoint.id}&lineName=${activeLine}&date=${currentDate}&page=1&pageSize=0`)
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
        onAllDeparturesChange(newDeps);
        onVariantsAndSymbols(newDeps);
    } catch (error) {
        console.error('Error fetching departures:', error);
    }
};

const chunkDepartureTimes = () => {
    console.log('Departure Times to chunk: ', deps)
    
    const timesDisplay = deps.map(time => {
        console.log(variantsWithSymbols)
        if (!deps.some(departure => departure.variant.isDefault)) {
            return time.time
        }
        if (variantsWithSymbols.some(variant => variant.variant === time.variant.route)) {
            let symbol = variantsWithSymbols.find(variant => variant.variant === time.variant.route).symbol;
            symbol === '1' ? symbol = '' : symbol = symbol;
            return `${time.time} ${symbol}`;
        } else {
            return `${time.time}`
        }
    });
    const result = [];
    for (let i = 0; i < timesDisplay.length; i += 6) {
        result.push(timesDisplay.slice(i, i + 6));
    }
    return result;
};


    useEffect(() => {
        if (currentDate && activeLine) {
            console.log('Current date:', currentDate);
            console.log('Active line:', activeLine);
            fetchDepartures()
        }
    },[currentDate, activeLine])

    useEffect(() => {
        if (deps && variantsWithSymbols) {
            onMarkingsShow();
            setChunkedDeps(chunkDepartureTimes());
        }
    },[deps, variantsWithSymbols])


    useEffect(() => {
        if (activeLine === '' && selectedLine) {
            onActiveLineSelect(selectedLine);
        } else if (activeLine === '' && fetchedLines){
            onActiveLineSelect(fetchedLines[0].line.name)
        }
    },[])

    return {handleCurrentDateChange, handleLineClick, currentDate, chunkedDeps};
}