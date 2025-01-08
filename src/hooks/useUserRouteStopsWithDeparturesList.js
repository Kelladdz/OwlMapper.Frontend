import { useContext, useCallback, useEffect, useState } from "react";
import { addRouteStop, useFetchVariantQuery } from "../store";
import UserInterfaceContext from "../context/userInterface";
import { useApplicationMap } from "./useApplicationMap";
import { debounce } from "lodash";
import MarkersContext from "../context/markers";
import CurrentDataContext from "../context/currentData";

export function useUserRouteStopsWithDeparturesList() {
    const {onHoverRouteStop, onRouteStopSelect, selectedDeparture, selectedRouteStop} = useContext(UserInterfaceContext);
    const {selectedPoint} = useContext(CurrentDataContext);
    const {addRouteStopsMarkers} = useContext(MarkersContext);
    
    const {data: variant, error, isLoading} = useFetchVariantQuery({ lineName: selectedDeparture.variant.line.name, id: selectedDeparture.variantId}, {skip: !selectedDeparture}) || [];
    const [departureFromFirstStop, setDepartureFromFirstStop] = useState();

    const handleRouteStopClick = (routeStop) => {
        onRouteStopSelect(routeStop);
        onHoverRouteStop(routeStop.busStop.coordinate);
    };

    useEffect(() => {
        if (!selectedRouteStop && selectedDeparture && variant && !isLoading) {
            addRouteStopsMarkers(variant.variant.routeStops.map(routeStop => {return {coordinate: routeStop.busStop.coordinate, order: routeStop.order}}));
            const [hours, minutes] = selectedDeparture.time.split(':').map(Number);
            const targetDate = new Date();
            targetDate.setHours(hours);
            targetDate.setMinutes(minutes);
            targetDate.setMinutes(targetDate.getMinutes() - variant.variant.routeStops.find(routeStop => routeStop.busStopId === selectedPoint.id).timeToTravelInMinutes);
            console.log('Departure time from first route stop: ', `${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`);
            setDepartureFromFirstStop(`${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`)
        }
    },[variant, isLoading, selectedRouteStop, selectedDeparture])

    useEffect(() => {
        if (selectedRouteStop && selectedDeparture) {
            const [hours, minutes] = selectedDeparture.time.split(':').map(Number);
            const targetDate = new Date();
            targetDate.setHours(hours);
            targetDate.setMinutes(minutes);
            targetDate.setMinutes(targetDate.getMinutes() - selectedRouteStop.timeToTravelInMinutes);
            console.log('Departure time from first route stop: ', `${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`);
            setDepartureFromFirstStop(`${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`)
        }
        if (!selectedRouteStop && selectedDeparture && variant) {
            const [hours, minutes] = selectedDeparture.time.split(':').map(Number);
            const targetDate = new Date();
            targetDate.setHours(hours);
            targetDate.setMinutes(minutes);
            targetDate.setMinutes(targetDate.getMinutes() - variant.variant.routeStops.find(routeStop => routeStop.busStopId === selectedPoint.id).timeToTravelInMinutes);
            console.log('Departure time from first route stop: ', `${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`);
            setDepartureFromFirstStop(`${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`)
        }
    },[])

    return {variant, isLoading, departureFromFirstStop, handleRouteStopClick};
}