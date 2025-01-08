import { useContext, useCallback, useEffect } from "react";
import { useFetchVariantQuery } from "../store";
import UserInterfaceContext from "../context/userInterface";
import { useApplicationMap } from "./useApplicationMap";
import { debounce } from "lodash";
import MarkersContext from "../context/markers";
import RouteLinePointsContext from "../context/routeLines";

export function useUserRouteStopsList() {
    const {selectedLine, selectedVariant, onHoverRouteStop} = useContext(UserInterfaceContext);
    const {addRouteStopsMarkers} = useContext(MarkersContext);
    const {routeLinePoints, getRouteLinePoints} = useContext(RouteLinePointsContext);
    const {data: variant, error, isLoading} = useFetchVariantQuery({lineName: selectedLine, id: selectedVariant}, {skip: selectedLine === '' || selectedVariant === ''}) || [];

    const handleMouseEnterOnRouteStop = useCallback(
        debounce(coords => {
            onHoverRouteStop(coords)
        }, 500),[onHoverRouteStop]);

    useEffect(() => {
        if (variant && !isLoading) {
            console.log('Fetched variant: ', variant);
            addRouteStopsMarkers(variant.variant.routeStops.map(routeStop => {return {coordinate: routeStop.busStop.coordinate, order: routeStop.order}}))
            if (routeLinePoints.length === 0) {
                getRouteLinePoints(variant.variant.routeLinePoints);
            }
        }
    },[variant, isLoading])

    return {variant, error, isLoading, handleMouseEnterOnRouteStop};
}