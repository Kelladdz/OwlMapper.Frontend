import {  useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLineNameForSchedule, addRouteStopsForSchedule, 
    changeValidFromDateForSchedule, addDepartureTimesForSchedule } from "../store/slices/scheduleCreatorSlice";

import { useFetchVariantsQuery, useFetchVariantQuery, useFetchFilteredByRouteStopVariantsQuery } from "../store/apis/variantsApi";
import CreatorContext from "../context/creator";
import { set } from "lodash";


export function useScheduleCreator() {
    const departures = useSelector(state => state.scheduleCreator.departures);
    const {selectedLine, selectedVariant, variantsOnSchedule, onWeekDaysDepartureTimesChange, onSaturdaysDepartureTimesChange, onSundaysAndHolidaysDepartureTimesChange, onVariantDataSelect, selectedVariantData} = useContext(CreatorContext);
    const dispatch = useDispatch();

    const fetchVariantDataHandle = (variant) => {
        onVariantDataSelect(variant);
        console.log('Fetched Variant Data: ', variant)
        if (variantsOnSchedule.length === 1) {
            const departuresToSchedule = variant.departures.map(departure => {return {variantId: variant.id, time: `${departure.time.substring(0,5)}`, scheduleDay: departure.scheduleDay, isOnlyInSchoolDays: departure.isOnlyInSchoolDays, isOnlyInDaysWithoutSchool: departure.isOnlyInDaysWithoutSchool}});
            console.log('Departures to schedule: ', departuresToSchedule)
            dispatch(changeLineNameForSchedule(selectedLine));
            dispatch(addRouteStopsForSchedule(variant.routeStops));
            dispatch(changeValidFromDateForSchedule(variant.validFrom))
            dispatch(addDepartureTimesForSchedule(departuresToSchedule))
        
        } else if (variantsOnSchedule.length > 1) {
            let newDepartures = [];
            variant.departures.forEach(departure => {
                const now = new Date();
                const routeStop = variant.routeStops.find(routeStop => routeStop.busStopId === variant.routeStops[0].busStopId);
                const [hours, minutes] = [parseInt(departure.time.substring(0,5).split(':')[0], 10), parseInt(departure.time.substring(0,5).split(':')[1], 10)];
                const targetDate = new Date();
                targetDate.setHours(hours);
                targetDate.setMinutes(minutes);
                targetDate.setMinutes(targetDate.getMinutes() + parseInt(routeStop.timeToTravelInMinutes, 10)); // Dodanie czasu podróży do odjazdu
                const differenceInMs = targetDate - now;
                const timeString = `${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`;
                        
                const departureToDisplay = {
                    variantId: variant.id,
                    time: timeString, 
                    scheduleDay: departure.scheduleDay, 
                    isOnlyInSchoolDays: departure.isOnlyInSchoolDays, 
                    isOnlyInDaysWithoutSchool: 
                    departure.isOnlyInDaysWithoutSchool
                            }
                newDepartures.push(departureToDisplay);
            });
            dispatch(addDepartureTimesForSchedule(newDepartures))
        }
    } 

    useEffect(() => {
        if (departures.length > 0) {
            console.log('Departures: ', departures)
            console.log('Departures with schedule day 0: ', departures.filter(departure => departure.scheduleDay === 0))
            onWeekDaysDepartureTimesChange(departures.filter(departure => departure.scheduleDay === 0))
            onSaturdaysDepartureTimesChange(departures.filter(departure => departure.scheduleDay === 1))
            onSundaysAndHolidaysDepartureTimesChange(departures.filter(departure => departure.scheduleDay === 2))
        }
    },[departures])



    // const lineName = useSelector(state => {return state.scheduleCreator.lineName});
    // const validFrom = useSelector(state => {return state.scheduleCreator.validFrom});
    // const routeStops = useSelector(state => {return state.scheduleCreator.routeStops});
    // const weekDaysDepartureTimes = useSelector(state => {return state.scheduleCreator.weekDaysDepartureTimes});
    // const saturdaysDepartureTimes = useSelector(state => {return state.scheduleCreator.saturdaysDepartureTimes});
    // const sundaysAndHolidaysDepartureTimes = useSelector(state => {return state.scheduleCreator.sundaysAndHolidaysDepartureTimes});
    // const operator = useSelector(state => {return state.scheduleCreator.operator});
    // const organizer = useSelector(state => {return state.scheduleCreator.organizer});
    // const variantsWithSymbols = useSelector(state => {return state.scheduleCreator.variantsWithLetters});

    // const {selectedLine, selectedVariant, addVariantDataToContext, selectedVariants, selectedVariantsData, onVariantAdd, removeVariant} = useContext(CreatorContext)
    // const dispatch = useDispatch();
    
    // const [options, setOptions] = useState();

    // const [nextVariantSymbol, setNextVariantSymbol] = useState('A');
    // const [mainVariant, setMainVariant] = useState(null);
    // const [destination, setDestination] = useState('');
    // const [currentStop, setCurrentStop] = useState('');
    // const [validFromDisplay, setValidFromDisplay] = useState('');
    // const [busStopIdDisplay, setBusStopIdDisplay] = useState(null);
    // const [appropriateDepartureTimes , setAppropriateDepartureTimes] = useState();
    // const [chunckedAppropriateDepartureTimes, setChunckedAppropriateDepartureTimes] = useState([]);



    // const onRemoveVariant = (variantId) => {
    //     dispatch(removeWeekDayDepartureTimesForSchedule(variantId));
    //     dispatch(removeSaturdaysDepartureTimesForSchedule(variantId));
    //     dispatch(removeSundaysAndHolidaysDepartureTimesForSchedule(variantId));
    //     removeVariant(variantId);
    // }

    // const chunkAppropriateDepartureTimes = (departureTimes) => {
    //     const timesDisplay = departureTimes.map(time => `${time.time}${time.isOnlyInSchoolDays ? 'S' : ''}${time.isOnlyInDaysWithoutSchool ? 'W' : ''}`);
    //     const result = [];
    //     for (let i = 0; i < timesDisplay.length; i += 9) {
    //         result.push(timesDisplay.slice(i, i + 9));
    //     }
    //     return result;
    // };

    // const sortTimes = (times) => {
    //     if (Array.isArray(times[0])) {
    //         times = times.flat();
    //     }
    //     const sortedTimes = times.sort((a, b) => {
    //         const [aHours, aMinutes] = [parseInt(a.time.split(':')[0], 10), parseInt(a.time.split(':')[1], 10)];
    //         const [bHours, bMinutes] = [parseInt(b.time.split(':')[0], 10), parseInt(b.time.split(':')[1], 10)];
    //         return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
    //     });
    //     return sortedTimes;
    // };

    // const getVariantData = (data) => {
    //     const variant = data.variant;
    //     addVariantDataToContext(variant);
    //     // displayVariantDataOnSchedule(variant);
    // }

    // // const toFilterOptions = (data) => {
    // //     const variantsOptionsValues = data.map(item => {
    // //         return ({value: item.variant, label: item.variant.route})
    // //     })
    // //     setOptions(variantsOptionsValues);
    // // }

    // // useEffect(() => {
    // //     if(!isLoading && data) {
    // //         toFilterOptions(data);
    // //     }
    // // },[isLoading, data])

    // useEffect(() => {
    //     if (!singleVariantIsLoading && singleVariantData) {
    //         console.log('Fetched Variant Data: ', singleVariantData)
    //         console.log('Variants on Schedule: ', selectedVariants)
    //         const variant = singleVariantData.variant;
    //         if (addVariantForSchedule.length === 0) {
    //             setMainVariant(variant.id);
    //             dispatch(addRouteStopsForSchedule({variantId: variant.id, routeStops: variant.routeStops}))
    //             dispatch(changeValidFromDateForSchedule(variant.validFrom))
    //             dispatch(addWeekDayDepartureTimesForSchedule({variantId: variant.id, departure: variant.departures.filter(departure => departure.scheduleDay === 0).map(departure => {return {time: `${departure.time.substring(0,5)}`, scheduleDay: departure.scheduleDay, isOnlyInSchoolDays: departure.isOnlyInSchoolDays, isOnlyInDaysWithoutSchool: departure.isOnlyInDaysWithoutSchool}})}))
    //             dispatch(addSaturdaysDepartureTimesForSchedule({variantId: variant.id, departure: variant.departures.filter(departure => departure.scheduleDay === 1).map(departure => {return {time: `${departure.time.substring(0,5)}`, scheduleDay: departure.scheduleDay, isOnlyInSchoolDays: departure.isOnlyInSchoolDays, isOnlyInDaysWithoutSchool: departure.isOnlyInDaysWithoutSchool}})}))
    //             dispatch(addSundaysAndHolidaysDepartureTimesForSchedule({variantId: variant.id, departure: variant.departures.filter(departure => departure.scheduleDay === 2).map(departure => {return {time: `${departure.time.substring(0,5)}`, scheduleDay: departure.scheduleDay, isOnlyInSchoolDays: departure.isOnlyInSchoolDays, isOnlyInDaysWithoutSchool: departure.isOnlyInDaysWithoutSchool}})}))
    //             dispatch(addVariantForSchedule({variantId: variant.id, symbol: 'primary'}))
    //         } else if (addVariantForSchedule.length > 0) {
    //             let weekDaysDepartures = [];
    //             let saturdaysDepartures = [];
    //             let sundaysAndHolidaysDepartures = [];
    //             variant.departures.forEach(departure => {
    //                 const now = new Date();
    //                 const routeStop = variant.routeStops.find(routeStop => routeStop.busStopId === routeStops[0].busStopId);
    //                 const [hours, minutes] = [parseInt(departure.time.substring(0,5).split(':')[0], 10), parseInt(departure.time.substring(0,5).split(':')[1], 10)];
    //                 const targetDate = new Date();
    //                 targetDate.setHours(hours);
    //                 targetDate.setMinutes(minutes);
    //                 targetDate.setMinutes(targetDate.getMinutes() + parseInt(routeStop.timeToTravelInMinutes, 10)); // Dodanie czasu podróży do odjazdu
    //                 const differenceInMs = targetDate - now;
    //                 const timeString = `${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`;
                
    //                 const departureToDisplay = {
    //                     variantId: variant.id, 
    //                     time: timeString, 
    //                     scheduleDay: departure.scheduleDay, 
    //                     isOnlyInSchoolDays: departure.isOnlyInSchoolDays, 
    //                     isOnlyInDaysWithoutSchool: 
    //                     departure.isOnlyInDaysWithoutSchool
    //                 }
    //                 switch (departure.scheduleDay) {
    //                     case 0:
    //                         weekDaysDepartures.push(departureToDisplay);
    //                         break;
    //                     case 1:
    //                         saturdaysDepartures.push(departureToDisplay);
    //                         break;
    //                     case 2:
    //                         sundaysAndHolidaysDepartures.push(departureToDisplay);
    //                         break;
    //                     default:
    //                         break;
    //                 }
    //             });
    //             dispatch(addWeekDayDepartureTimesForSchedule(weekDaysDepartures))
    //             dispatch(addSaturdaysDepartureTimesForSchedule(saturdaysDepartures))
    //             dispatch(addSundaysAndHolidaysDepartureTimesForSchedule(sundaysAndHolidaysDepartures))
    //             dispatch(addVariantForSchedule({variantId: variant.id, symbol: nextVariantSymbol}))
    //         }
    //         dispatch(changeLineNameForSchedule(selectedLine.name));
    //         onVariantAdd(variant.id);
    //     }
    // },[singleVariantIsLoading, singleVariantData])

    // useEffect(() => {
    //     validFrom.includes('-') 
    //     ? setValidFromDisplay(`${validFrom.replace(/-/g, '.').split('.')[2]}.${validFrom.replace(/-/g, '.').split('.')[1]}.${validFrom.replace(/-/g, '.').split('.')[0]}`) 
    //     : setValidFromDisplay('');
    // },[validFrom]);

    // useEffect(() => {
    //     if (routeStops && routeStops.length > 1) {
    //         setDestination(routeStops[routeStops.length - 1].busStop.name.split('(')[0]);
    //         setCurrentStop(routeStops[0].busStop.name.split('(')[0]);
    //         setBusStopIdDisplay(routeStops[0].busStopId)
    //     }
    // },[routeStops]);

    // useEffect(() => {
    //     if ((weekDaysDepartureTimes.length > 0 || saturdaysDepartureTimes.length > 0 || sundaysAndHolidaysDepartureTimes.length > 0) && scheduleDay) {
    //         console.log('Schedule Day: ', scheduleDay)
    //         console.log('Change in departure times detected: ', weekDaysDepartureTimes, saturdaysDepartureTimes, sundaysAndHolidaysDepartureTimes)
    //         switch(scheduleDay) {
    //             case 0:
    //                 if (weekDaysDepartureTimes.length > 0) {
    //                     setAppropriateDepartureTimes(weekDaysDepartureTimes);
    //                 }
    //                 break;
    //             case 1:
    //                 if (saturdaysDepartureTimes.length > 0) {
    //                     setAppropriateDepartureTimes(saturdaysDepartureTimes);
    //                 }
    //                     break;
    //                 case 2:
                        
    //                 if (sundaysAndHolidaysDepartureTimes.length > 0) {
    //                     setAppropriateDepartureTimes(sundaysAndHolidaysDepartureTimes);
    //                 }
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }       
    // }, [weekDaysDepartureTimes, saturdaysDepartureTimes, sundaysAndHolidaysDepartureTimes]);
    
    // useEffect(() => {
    //     if(appropriateDepartureTimes) {
    //         const timesOnly = appropriateDepartureTimes.map(departure => departure.departure.time);
    //         console.log('Departure Times extracted from appropriate departures: ', timesOnly)
    //         const sortedDepartureTimes = sortTimes(timesOnly);
    //         setChunckedAppropriateDepartureTimes(chunkAppropriateDepartureTimes(sortedDepartureTimes));
    //     }
    // }, [appropriateDepartureTimes]);


    // useEffect(() => {
    //     if (variantsWithSymbols.length > 0) {
    //         setNextVariantSymbol(String.fromCharCode(nextVariantSymbol.charCodeAt(0) + 1));
    //     }
        
    // },[variantsWithSymbols])

    // useEffect(() => {
    //     if (filteredVariantsData) {
    //         toFilterOptions(filteredVariantsData);
    //     }
    // },[filteredVariantsData])

    return {fetchVariantDataHandle}
}