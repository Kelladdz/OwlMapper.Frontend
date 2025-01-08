import { useSelector, useDispatch } from "react-redux";
import { removeRouteStopsForSchedule, addRouteStopsForSchedule } from "../store/slices/scheduleCreatorSlice";
import { useContext, useState, useEffect } from "react";
import CreatorContext from "../context/creator";
export function useRouteStopsFromScheduleDropdown() {
    const routeStops = useSelector(state => state.scheduleCreator.routeStops);
    const weekDaysDepartureTimes = useSelector(state => {return state.scheduleCreator.weekDaysDepartureTimes});
    const saturdaysDepartureTimes = useSelector(state => {return state.scheduleCreator.saturdaysDepartureTimes});
    const sundaysAndHolidaysDepartureTimes = useSelector(state => {return state.scheduleCreator.sundaysAndHolidaysDepartureTimes});
    const dispatch = useDispatch();

    const {onCurrentStopChange, baseTimeToTravel, onRouteStopsListDisplay, onWeekDaysDepartureTimesChange, onSaturdaysDepartureTimesChange, onSundaysAndHolidaysDepartureTimesChange, weekDaysDepartures, saturdaysDepartures, sundaysAndHolidaysDepartures} = useContext(CreatorContext);

    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (routeStops.length > 0 && options.length === 0) {
            const initialOptions = routeStops.map((stop, index) => {
                return {
                    value: index,
                    label: `${stop.busStop.city} ${stop.busStop.name}`
                };
            });
            setOptions(initialOptions);
        }
    }, [routeStops, options.length]);

    const currentStopChangeHandle = (option) => {
        const newRouteStops = routeStops.slice(option.value, routeStops.length).map((stop, index) => {
            return {
                ...stop,
                order: index + 1
            };
        });
        const timeToTravelForNewFirstRouteStop = newRouteStops[0].timeToTravelInMinutes;
        newRouteStops.forEach((stop, index) => {
            stop.order = index + 1;
            if (baseTimeToTravel === 0) {
                stop.timeToTravelInMinutes -= timeToTravelForNewFirstRouteStop
            } else if (baseTimeToTravel < timeToTravelForNewFirstRouteStop) {
                stop.timeToTravelInMinutes -= timeToTravelForNewFirstRouteStop - baseTimeToTravel
            } else if (baseTimeToTravel > timeToTravelForNewFirstRouteStop) {
                stop.timeToTravelInMinutes -= baseTimeToTravel + timeToTravelForNewFirstRouteStop
            }
        });
        
        let newWeekDaysDepartures = [];
        let newSaturdaysDepartures = [];
        let newSundaysAndHolidaysDepartures = [];

        
        console.log('Week days departure times before remove: ', weekDaysDepartures);
        console.log('Saturdays departure times before remove: ', saturdaysDepartures);
        console.log('Sundays and holidays departure times before remove: ', sundaysAndHolidaysDepartures);
        if (weekDaysDepartures.length > 0 || saturdaysDepartures.length > 0 || sundaysAndHolidaysDepartures.length > 0) {
            weekDaysDepartures.forEach((departure, index) => {
                console.log('Week days Departure: ', departure);
                const variantId = departure.variantId;
                const now = new Date();
                const [hours, minutes] = [parseInt(departure.time.substring(0,5).split(':')[0], 10), parseInt(departure.time.substring(0,5).split(':')[1], 10)];
                const targetDate = new Date();
                targetDate.setHours(hours);
                targetDate.setMinutes(minutes);
                if (baseTimeToTravel === 0) {
                    targetDate.setMinutes(targetDate.getMinutes() + parseInt(routeStops[option.value].timeToTravelInMinutes, 10)); // Dodanie czasu podróży do odjazdu
                } else if (baseTimeToTravel < routeStops[option.value].timeToTravelInMinutes) {
                    const difference = routeStops[option.value].timeToTravelInMinutes - baseTimeToTravel;
                    targetDate.setMinutes(targetDate.getMinutes() + difference);
                } else if (baseTimeToTravel > routeStops[option.value].timeToTravelInMinutes) {
                    const difference = baseTimeToTravel - routeStops[option.value].timeToTravelInMinutes;
                    targetDate.setMinutes(targetDate.getMinutes() - difference);
                } 
                const timeString = `${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`;   
                const departureToDisplay = {
                    variantId:  variantId,
                    time: timeString, 
                    scheduleDay: departure.scheduleDay, 
                    isOnlyInSchoolDays: departure.isOnlyInSchoolDays, 
                    isOnlyInDaysWithoutSchool: departure.isOnlyInDaysWithoutSchool
                }
                newWeekDaysDepartures.push(departureToDisplay);
            });
            console.log('Week days departures to add: ', newWeekDaysDepartures);

            onWeekDaysDepartureTimesChange(newWeekDaysDepartures);

            saturdaysDepartures.forEach((departure, index) => {
                console.log('Saturday Departure: ', departure);
                const variantId = departure.variantId;
                const now = new Date();
                const [hours, minutes] = [parseInt(departure.time.substring(0,5).split(':')[0], 10), parseInt(departure.time.substring(0,5).split(':')[1], 10)];
                const targetDate = new Date();
                targetDate.setHours(hours);
                targetDate.setMinutes(minutes);
                if (baseTimeToTravel === 0) {
                    targetDate.setMinutes(targetDate.getMinutes() + parseInt(routeStops[option.value].timeToTravelInMinutes, 10)); // Dodanie czasu podróży do odjazdu
                } else if (baseTimeToTravel < routeStops[option.value].timeToTravelInMinutes) {
                    const difference = routeStops[option.value].timeToTravelInMinutes - baseTimeToTravel;
                    targetDate.setMinutes(targetDate.getMinutes() + difference);
                } else if (baseTimeToTravel > routeStops[option.value].timeToTravelInMinutes) {
                    const difference = routeStops[option.value].timeToTravelInMinutes - baseTimeToTravel;
                    targetDate.setMinutes(targetDate.getMinutes() - difference);
                } 
                const timeString = `${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`;   
                const departureToDisplay = {
                    variantId:  variantId,
                    time: timeString, 
                    scheduleDay: departure.scheduleDay, 
                    isOnlyInSchoolDays: departure.isOnlyInSchoolDays, 
                    isOnlyInDaysWithoutSchool: departure.isOnlyInDaysWithoutSchool
                }
                newSaturdaysDepartures.push(departureToDisplay);
            });
            console.log('Saturdays departures to add: ', newSaturdaysDepartures);
            onSaturdaysDepartureTimesChange(newSaturdaysDepartures);

            sundaysAndHolidaysDepartures.forEach((departure, index) => {
                console.log('Sundays and holidays Departure: ', departure);
                const variantId = departure.variantId;
                const now = new Date();
                const [hours, minutes] = [parseInt(departure.time.substring(0,5).split(':')[0], 10), parseInt(departure.time.substring(0,5).split(':')[1], 10)];
                const targetDate = new Date();
                targetDate.setHours(hours);
                targetDate.setMinutes(minutes);
                if (baseTimeToTravel === 0) {
                    targetDate.setMinutes(targetDate.getMinutes() + parseInt(routeStops[option.value].timeToTravelInMinutes, 10)); // Dodanie czasu podróży do odjazdu
                } else if (baseTimeToTravel < routeStops[option.value].timeToTravelInMinutes) {
                    const difference = routeStops[option.value].timeToTravelInMinutes - baseTimeToTravel;
                    targetDate.setMinutes(targetDate.getMinutes() + difference);
                } else if (baseTimeToTravel > routeStops[option.value].timeToTravelInMinutes) {
                    const difference = routeStops[option.value].timeToTravelInMinutes - baseTimeToTravel;
                    targetDate.setMinutes(targetDate.getMinutes() - difference);
                } 
                const timeString = `${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`;   
                const departureToDisplay = {
                    variantId:  variantId,
                    time: timeString, 
                    scheduleDay: departure.scheduleDay, 
                    isOnlyInSchoolDays: departure.isOnlyInSchoolDays, 
                    isOnlyInDaysWithoutSchool: departure.isOnlyInDaysWithoutSchool
                }
                newSundaysAndHolidaysDepartures.push(departureToDisplay);
            });
            console.log('Sundays and holidays departures to add: ', newSundaysAndHolidaysDepartures);
            onSundaysAndHolidaysDepartureTimesChange(newSundaysAndHolidaysDepartures);
            console.log('Current stop index: ', option.value);
        
        console.log('New route stops: ', newRouteStops);
        onRouteStopsListDisplay(newRouteStops);
        onCurrentStopChange(routeStops[option.value]);
            
            
            
            
            

        } 
        
    }

    return {routeStops, options, currentStopChangeHandle};
}