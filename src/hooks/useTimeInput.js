import { useDispatch, useSelector } from 'react-redux';

import {changeTimeToTravel} from '../store/slices/lineCreatorFormSlice';

import {ACTIONS} from '../constants/actions';
import { useEffect } from 'react';


export function useTimeInput(action) {
    const routeStops = useSelector((state) => state.lineCreatorForm.routeStops);
    let lastRouteStop;

    if (routeStops) {
        lastRouteStop = routeStops[routeStops.length - 1];
    }

    const timeToTravelInMinutes = useSelector((state) => state.lineCreatorForm.timeToTravelInMinutes);
    const isInputDisabled = routeStops && routeStops.length === 0;
    const timeInputInitialValue = action === ACTIONS.editVariant ? lastRouteStop.timeToTravelInMinutes : 0;

    const dispatch = useDispatch();

    const handleClickChangeTimeButton = (type) => {
        if (routeStops.length > 0 && timeToTravelInMinutes < 100 && type === 'increment') {
            dispatch(changeTimeToTravel(parseInt(timeToTravelInMinutes, 10) + 1))
        } else if (routeStops.length > 0 && timeToTravelInMinutes > lastRouteStop.timeToTravelInMinutes && type === 'decrement') {
            dispatch(changeTimeToTravel(parseInt(timeToTravelInMinutes, 10) - 1))
        }
    }

    


    const handleChangeTime = (event) => {
        const value = parseInt(event.target.value, 10);

        event.preventDefault();
        (value >= lastRouteStop.timeToTravelInMinutes && value < 100) && dispatch(changeTimeToTravel(event.target.value));
    }

    useEffect(() => {
        if (routeStops && routeStops.length === 1) {
            dispatch(changeTimeToTravel(0));
        }
    }, [dispatch, routeStops])

    return {routeStops, timeToTravelInMinutes, isInputDisabled, handleClickChangeTimeButton, handleChangeTime, timeInputInitialValue}
}