import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import DepartureTimesFormContext from "../context/departureTimesForm";
import CreatorContext from "../context/creator";
import CurrentDataContext from "../context/currentData";

import { addWeekDayDepartureTime,
    removeWeekDayDepartureTime,
    addSaturdaysDepartureTime,
    removeSaturdaysDepartureTime,
    addSundaysAndHolidaysDepartureTime,
    removeSundaysAndHolidaysDepartureTime
 } from "../store/slices/lineCreatorFormSlice"

 import { ACTIONS } from "../constants/actions";
import { set, times } from "lodash";


export function useDepartureInput(scheduleDay, departureTimeInputRef) {
    const weekDaysDepartureTimes = useSelector(state => state.lineCreatorForm.weekDaysDepartureTimes);
    const saturdaysDepartureTimes = useSelector(state => state.lineCreatorForm.saturdaysDepartureTimes);
    const sundaysAndHolidaysDepartureTimes = useSelector(state => state.lineCreatorForm.sundaysAndHolidaysDepartureTimes);
    const dispatch = useDispatch();
    const location = useLocation();
    const pathName = location.pathname;

    const [appropriateDepartureTimes , setAppropriateDepartureTimes] = useState([]);
    const [sortedTimes, setSortedTimes] = useState([]);
    const [departureTimeError, setDepartureTimeError] = useState();
    const [invalidTimes, setInvalidTimes] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const {activeInput, changeActiveInput} = useContext(DepartureTimesFormContext);

    const appropriateAddAction = (departureTime) => {
        switch(scheduleDay) {
            case 0:
                dispatch(addWeekDayDepartureTime(departureTime)); 
                break;
            case 1:
                dispatch(addSaturdaysDepartureTime(departureTime));
                break;
            case 2:
                dispatch(addSundaysAndHolidaysDepartureTime(departureTime));
                break;
            default:
                break;
        }
    }

    const appropriateRemoveAction = (item) => {
        switch(scheduleDay) {
            case 0:
                dispatch(removeWeekDayDepartureTime(item));
                break;
            case 1:
                dispatch(removeSaturdaysDepartureTime(item));
                break;
            case 2:
                dispatch(removeSundaysAndHolidaysDepartureTime(item));
                break;
            default:
                break;
        }
    }

    const handleInputValueChange = (event) => {
        event.preventDefault();
        setInputValue(event.target.value);
    }

    const sortTimes = (times) => {
        return [...times].sort((a, b) => {
            const [aHours, aMinutes] = [parseInt(a.time.split(':')[0], 10), parseInt(a.time.split(':')[1], 10)];
            const [bHours, bMinutes] = [parseInt(b.time.split(':')[0], 10), parseInt(b.time.split(':')[1], 10)];
            return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
        });
    };



    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {  
            event.preventDefault(); 
            if (inputValue.length > 4) {
                const pattern = /^([0-1][0-9]|2[0-3]).[0-5][0-9][SWsw]?$/;
                let timesWithLetters = inputValue.includes(' ') ? [...new Set(inputValue.split(' '))] : [inputValue];
                setInputValue('');
                let newInvalidTimes = [];
                timesWithLetters.forEach((timeWithLetter, index) => {
                    setInvalidTimes([]);                
                    if (!appropriateDepartureTimes.some(time => time.time.substring(0,5) === timeWithLetter.substring(0,5))) {
                        if (pattern.test(timeWithLetter)) {
                            if (timeWithLetter.toUpperCase().includes('S') || timeWithLetter.toUpperCase().includes('W')) {
                            const time = timeWithLetter.slice(0, -1).replace('.', ':');
                            const letter = timeWithLetter.slice(-1).toUpperCase();
                            const isOnlyInSchoolDays = letter === 'S';
                            const isOnlyInDaysWithoutSchool = letter === 'W';
                            appropriateAddAction({ time, isOnlyInSchoolDays, isOnlyInDaysWithoutSchool, order: appropriateDepartureTimes.length + 1 });
                            } else {
                                appropriateAddAction({ time: timeWithLetter.replace('.', ':'), isOnlyInSchoolDays: false, isOnlyInDaysWithoutSchool: false, order: appropriateDepartureTimes.length + 1 });
                            }

                            
                            setDepartureTimeError(null);
                            
                        } else {
                            newInvalidTimes.push(timeWithLetter);
                        }   
                    }   
                });
                setInvalidTimes(newInvalidTimes);
            } else {
                setInvalidTimes(inputValue);
            }
            
            
        };   
    }
    
    
    useEffect(() => {
        if (activeInput !== scheduleDay && departureTimeInputRef) {
            setDepartureTimeError(null);
            setInvalidTimes([]);
            setInputValue('');
        }
    }, [activeInput]);

    useEffect(() => {
        if (invalidTimes && invalidTimes.length > 0) {
            setInputValue(invalidTimes.join(', '));
            setDepartureTimeError({ scheduleDay, message: `Godzina ma nieprawidłowy format (${invalidTimes.join(', ')})` });
        }
    }, [invalidTimes]);


    useEffect(() => {
        switch(scheduleDay) {
            case 0:
                if (weekDaysDepartureTimes.length > 0) {
                    setAppropriateDepartureTimes(weekDaysDepartureTimes);
                } else setAppropriateDepartureTimes([]);
                break;
            case 1:
                if (saturdaysDepartureTimes.length > 0) {
                    setAppropriateDepartureTimes(saturdaysDepartureTimes);
                } else setAppropriateDepartureTimes([]);
                break;
            case 2:
                if (sundaysAndHolidaysDepartureTimes.length > 0) {
                    setAppropriateDepartureTimes(sundaysAndHolidaysDepartureTimes);
                } else setAppropriateDepartureTimes([]);
                break;
            default:
                break;
        }
    }, [scheduleDay, weekDaysDepartureTimes, saturdaysDepartureTimes, sundaysAndHolidaysDepartureTimes]);

    useEffect(() => {
        if (appropriateDepartureTimes.length > 0) {
            const sortedDepartureTimes = sortTimes(appropriateDepartureTimes);
            setSortedTimes(sortedDepartureTimes);
        } else {
            setSortedTimes([]);
        }
    }, [appropriateDepartureTimes]);


    return { appropriateRemoveAction, handleKeyDown, sortedTimes, activeInput, changeActiveInput, departureTimeError, inputValue, handleInputValueChange };
}