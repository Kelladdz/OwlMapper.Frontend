import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import CreatorContext from "../context/creator";

import { ACTIONS } from '../constants/actions';
import CurrentDataContext from "../context/currentData";
import { PATHS } from "../constants/paths";

export function useSchedule(scheduleDay) {

    const routeStops = useSelector(state => { return state.lineCreatorForm.routeStops});
    const lineName = useSelector(state => { return state.lineCreatorForm.lineName});
    const validFrom = useSelector(state => { return state.lineCreatorForm.validFrom});
    const weekDaysDepartureTimes = useSelector(state => { return state.lineCreatorForm.weekDaysDepartureTimes});
    const saturdaysDepartureTimes = useSelector(state => { return state.lineCreatorForm.saturdaysDepartureTimes});
    const sundaysAndHolidaysDepartureTimes = useSelector(state => { return state.lineCreatorForm.sundaysAndHolidaysDepartureTimes});
    const operator = useSelector(state => { return state.lineCreatorForm.operator});
    const organizer = useSelector(state => { return state.lineCreatorForm.organizer});
    
    const location = useLocation();
    const pathName = location.pathname;

    const {action} = useContext(CreatorContext);
    const {params} = useContext(CurrentDataContext);
    
    const [destination, setDestination] = useState('');
    const [currentStop, setCurrentStop] = useState('');
    const [lineNameDisplay, setLineNameDisplay] = useState(lineName);
    const [validFromDisplay, setValidFromDisplay] = useState('');
    const [busStopIdDisplay, setBusStopIdDisplay] = useState();
    const [appropriateDepartureTimes , setAppropriateDepartureTimes] = useState([]);
    const [chunckedAppropriateDepartureTimes, setChunckedAppropriateDepartureTimes] = useState([]);

    const chunkAppropriateDepartureTimes = (departureTimes) => {
        const timesDisplay = departureTimes.map(time => `${time.time}${time.isOnlyInSchoolDays ? 'S' : ''}${time.isOnlyInDaysWithoutSchool ? 'W' : ''}`);
        const result = [];
        for (let i = 0; i < timesDisplay.length; i += 9) {
            result.push(timesDisplay.slice(i, i + 9));
        }
        return result;
    };

    const sortTimes = (times) => {
        return [...times].sort((a, b) => {
            const [aHours, aMinutes] = [parseInt(a.time.split(':')[0], 10), parseInt(a.time.split(':')[1], 10)];
            const [bHours, bMinutes] = [parseInt(b.time.split(':')[0], 10), parseInt(b.time.split(':')[1], 10)];
            return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
        });
    };

    useEffect(() => {
        validFrom.includes('-') 
        ? setValidFromDisplay(`${validFrom.replace(/-/g, '.').split('.')[2]}.${validFrom.replace(/-/g, '.').split('.')[1]}.${validFrom.replace(/-/g, '.').split('.')[0]}`) 
        : setValidFromDisplay('');
    },[validFrom]);

    useEffect(() => {
        if (routeStops && routeStops.length > 1) {
            setDestination(routeStops[routeStops.length - 1].name.split('(')[0]);
            setCurrentStop(routeStops[0].name.split('(')[0]);
            setBusStopIdDisplay(routeStops[0].busStopId)
        }
    },[routeStops]);

    useEffect(() => {
        switch(scheduleDay) {
            case 0:
                setAppropriateDepartureTimes(weekDaysDepartureTimes);
                break;
            case 1:
                setAppropriateDepartureTimes(saturdaysDepartureTimes);
                break;
            case 2:
                setAppropriateDepartureTimes(sundaysAndHolidaysDepartureTimes);
                break;
            default:
                break;
        }
    }, [weekDaysDepartureTimes, saturdaysDepartureTimes, sundaysAndHolidaysDepartureTimes]);
    
    useEffect(() => {
        if(appropriateDepartureTimes.length > 0) {
            const sortedDepartureTimes = sortTimes(appropriateDepartureTimes);
            setChunckedAppropriateDepartureTimes(chunkAppropriateDepartureTimes(sortedDepartureTimes));
        } else {
            setChunckedAppropriateDepartureTimes([]);
        }
    }, [appropriateDepartureTimes]);

    useEffect(() => {
        if (pathName.endsWith('variants/create') && params) {
            setLineNameDisplay(params.lineName);
        } else {
            setLineNameDisplay(lineName);
        }
    }, [location, params, lineName]);

    return {routeStops, lineNameDisplay, validFrom, validFromDisplay, destination, currentStop, busStopIdDisplay, chunckedAppropriateDepartureTimes, organizer, operator};
}
