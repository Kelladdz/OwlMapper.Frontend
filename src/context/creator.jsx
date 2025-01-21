import { set } from 'lodash';
import React, { createContext, useContext, useEffect, useState } from 'react';

const CreatorContext = createContext();

function CreatorProvider({children}) {
    const [action, setAction] = useState('');
    const [chunkedLines, setChunkedLines] = useState([]);
    const [selectedLine, setSelectedLine] = useState('');
    const [allOptions, setAllOptions] = useState([]);
    const [allRouteStopOptions, setAllRouteStopOptions] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedVariantData, setSelectedVariantData] = useState();
    const [selectedVariant, setSelectedVariant] = useState('');
    const [variantSymbol, setVariantSymbol] = useState('A');
    const [currentStop, setCurrentStop] = useState();
    const [routeStopsDisplay, setRouteStopsDisplay] = useState([]);
    const [weekDaysDepartures, setWeekDaysDepartures] = useState([]);
    const [saturdaysDepartures, setSaturdaysDepartures] = useState([]);
    const [sundaysAndHolidaysDepartures, setSundaysAndHolidaysDepartures] = useState([]);
    const [chunckedWeekDaysDepartureTimes, setChunckedWeekdaysDepartureTimes] = useState([]);
    const [chunckedSaturdaysDepartureTimes, setChunckedSaturdaysDepartureTimes] = useState([]);
    const [chunckedSundaysAndHolidaysDepartureTimes, setChunckedSundaysAndHolidaysDepartureTimes] = useState([]);
    const [destination, setDestination] = useState();
    const [markings, setMarkings] = useState([]);
    const [baseTimeToTravel, setBaseTimeToTravel] = useState(0);
    const [busStops, setBusStops] = useState(null);
    const [skip, setSkip] = useState(true);
    const [variantsOnSchedule, setVariantsOnSchedule] = useState([]);
    const [currentStopId, setCurrentStopId] = useState();

    const toggleAction = (value) => {
        setAction(value);
    }

    const onChunkedLines = (lines) => {
        setChunkedLines(lines);
    }

    const onLineSelect = (line) => {
        if (line === selectedLine) {
            return;
        }
        setSelectedLine(line);
    }

    const onAllOptionsHandle = (options) => {
        setOptions(options);
        setAllOptions(options);
    }

    const onAllRouteStopsOptionsHandle = (options) => {
        setAllRouteStopOptions(options);
    }

    const onOptionsHandle = (options) => {
        setOptions(options);
    }

    const onVariantSelect = (variant) => {
        console.log('Selected variant: ', variant);
        setSelectedVariant(variant);
    }

    const onVariantAdd = (variant) => {
        console.log('Variant to add: ', variant);
        setVariantsOnSchedule(prev => [...prev, variant]);
    }

    const nextVariantSymbol = () => {
        setVariantSymbol(String.fromCharCode(variantSymbol.charCodeAt(0) + 1));
    }

    const onRouteSet = (currentStop, destination) => {
        setCurrentStop(currentStop);
        setDestination(destination);
    }

    const onChangeMarkingsHandle = (markings) => {
        setMarkings(markings);
    }

    const onRemoveVariant = (variant) => {
        console.log('Variant to remove: ', variant);
        if (variant.symbol === '1') {
            setVariantsOnSchedule([]);
        } else {
            setVariantsOnSchedule(prev => prev.filter(v => v !== variant.variantId));
        } 
        setSelectedVariant('');
    }

    const onCurrentStopChange = (routeStop) => {
        setCurrentStop(routeStop);
    }

    const onRouteStopsListDisplay = (routeStops) => {
        setRouteStopsDisplay(routeStops);
    }

    const onWeekDaysDepartureTimesChange = (times) => {
        console.log('Weekdays departure times: ', times);
        setWeekDaysDepartures(times);
    }

    const onSaturdaysDepartureTimesChange = (times) => {
        setSaturdaysDepartures(times);
    }

    const onSundaysAndHolidaysDepartureTimesChange = (times) => {
        setSundaysAndHolidaysDepartures(times);
    }

    const onChunckedWeekDaysDepartureTimesChange = (times) => {
        setChunckedWeekdaysDepartureTimes(times);
    }

    const onChunckedSaturdaysDepartureTimesChange = (times) => {
        setChunckedSaturdaysDepartureTimes(times);
    }

    const onChunckedSundaysAndHolidaysDepartureTimesChange = (times) => {
        setChunckedSundaysAndHolidaysDepartureTimes(times);
    }

    const onVariantDataSelect = (variant) => {
        setSelectedVariantData(variant);
    }

    const getBusStops = (busStops) => {
        setBusStops(busStops);
    }

    const toggleSkip = (flag) => {
        setSkip(flag);
    }

    useEffect(() => {
        if (selectedLine !== '') {
            console.log('Selected Line: ', selectedLine);
        }
    },[selectedLine])

    useEffect(() => {
        if (options.length > 0) {
            console.log('Line route options: ', options.map(option => option.label), options.map(option => option.value));
        }
    },[options])

    useEffect(() => {
        if (selectedVariant !== '') {
            console.log('Selected variant: ', selectedVariant);
            onVariantAdd(selectedVariant);
        }
    },[selectedVariant])

    useEffect(() => {
        if (variantsOnSchedule.length > 0) {
            console.log('Variants on schedule: ', variantsOnSchedule);
            setVariantSymbol(String.fromCharCode('A'.charCodeAt(0) + variantsOnSchedule.length - 1));
        }
    },[variantsOnSchedule])

    useEffect(() => {
        if (currentStop) {
            console.log('Current stop: ', currentStop);
            setCurrentStopId(currentStop.busStopId);
            setBaseTimeToTravel(currentStop.timeToTravelInMinutes);
        }
    },[currentStop])

    useEffect(() => {
        console.log('Base time to travel: ', baseTimeToTravel);
    },[baseTimeToTravel])

    useEffect(() => {
        if (selectedVariantData) {
        console.log('Selected variant data on context: ', selectedVariantData);
        }
    },[selectedVariantData])

        return <CreatorContext.Provider value={{
            action, toggleAction,
            chunkedLines, onChunkedLines,
            selectedLine, onLineSelect,
            options, onOptionsHandle, 
            allOptions, onAllOptionsHandle, 
            allRouteStopOptions, onAllRouteStopsOptionsHandle, 
            selectedVariant, onVariantSelect,
            selectedVariantData, onVariantDataSelect,
            variantsOnSchedule, onVariantAdd,
            variantSymbol, nextVariantSymbol,
            currentStop, destination, 
            routeStopsDisplay, onRouteStopsListDisplay,
            weekDaysDepartures, saturdaysDepartures, sundaysAndHolidaysDepartures,
            onWeekDaysDepartureTimesChange, onSaturdaysDepartureTimesChange, onSundaysAndHolidaysDepartureTimesChange,
            chunckedWeekDaysDepartureTimes, chunckedSaturdaysDepartureTimes, chunckedSundaysAndHolidaysDepartureTimes,
            onChunckedWeekDaysDepartureTimesChange, onChunckedSaturdaysDepartureTimesChange, onChunckedSundaysAndHolidaysDepartureTimesChange,
            onRouteSet, onCurrentStopChange,
            baseTimeToTravel,
            markings, onChangeMarkingsHandle,
            busStops, getBusStops,
            skip, toggleSkip,
            onRemoveVariant}}>
			{children}
			</CreatorContext.Provider>;

} 

export { CreatorProvider };
export default CreatorContext;