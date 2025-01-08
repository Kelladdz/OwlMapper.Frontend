import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {changeTimeToTravel, removeRouteStop, addRouteStop} from '../store/slices/lineCreatorFormSlice';


import MarkersContext from '../context/markers';
import { useAddRouteStopComponent } from './useAddRouteStopComponent';
import { PATHS } from '../constants/paths';

export function useRouteStopsList() {
    const dispatch = useDispatch();
    const location = useLocation();
    const pathName = location.pathname;
    const routeStops = useSelector((state) => state.lineCreatorForm.routeStops);

    const [items, setItems] = useState([]);
    const {routeStopsMarkers, removeRouteStopMarker, addRouteStopMarker} = useContext(MarkersContext);

    const onRemoveRouteStop = (item) => {
        const order = item.order;
        try {
            dispatch(removeRouteStop(order));
            removeRouteStopMarker(order);
        } catch (error) {
            console.log(error);
        } 
    }

    useEffect(() => {
        if (routeStops) {
            let routeStopsItems = [];
        routeStops.forEach((routeStop, index) => routeStopsItems.push({
            timeToTravelDisplay: index !== 0 ? `${routeStop.timeToTravelInMinutes} min` : null,
            order: index + 1,
            name: routeStop.name
        }));
        setItems(routeStopsItems);
        if (routeStops.length > 0) {
            dispatch(changeTimeToTravel(routeStops[routeStops.length - 1].timeToTravelInMinutes));
        }
        }
        
        return () => {
            setItems([]);
        }
    }, [dispatch, routeStops])

    useEffect(() => {
        if (routeStops && pathName !== PATHS.createLine && !pathName.endsWith('/variants/create') && routeStopsMarkers.length === 0) {
            routeStops.forEach((routeStop) => addRouteStopMarker({coordinate: routeStop.coordinate, order: routeStop.order}));
            }
        
    }, [routeStops, pathName, routeStopsMarkers])

            
    return {onRemoveRouteStop, routeStops, items}
}