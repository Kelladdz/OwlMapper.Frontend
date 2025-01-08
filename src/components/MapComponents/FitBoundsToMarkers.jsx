import { useContext, useEffect } from "react";
import { useMap } from "react-leaflet";

import MarkersContext from "../../context/markers";
import UserInterfaceContext from "../../context/userInterface";

export default function FitBoundsToMarkers()  {
    const { routeStopsMarkers, startMarker, destinationMarker} = useContext(MarkersContext);
    const {hoveredRouteStop, selectedRouteStop} = useContext(UserInterfaceContext);

    const map = useMap();

    useEffect(() => {
        if (routeStopsMarkers && routeStopsMarkers.length === 1) {
            const center = [routeStopsMarkers[0].coordinate.lat, routeStopsMarkers[0].coordinate.lng];
            map.flyTo(center, 18, {duration: 0.5});
        } else if (routeStopsMarkers && routeStopsMarkers.length > 1) {
            console.log(routeStopsMarkers)
            const bounds = L.latLngBounds(routeStopsMarkers.map(marker => marker.coordinate));
            map.flyToBounds(bounds, {padding: [50, 50]}, {duration: 0.5});
        } else {
            const center = [50.68333, 16.6061];
            map.flyTo(center, 11, {duration: 0.5});
        }
    },[routeStopsMarkers])

    useEffect(() => {
        if (startMarker && !destinationMarker) {
            const center = [startMarker[0], startMarker[1]];
            map.flyTo(center, 18, {duration: 0.5});
        } else if (!startMarker && destinationMarker) {
            const center = [destinationMarker[0], destinationMarker[1]];
            map.flyTo(center, 18, {duration: 0.5});
        } else if (startMarker && destinationMarker) {
            const bounds = L.latLngBounds([startMarker, destinationMarker]);
            map.flyToBounds(bounds, {padding: [50, 50]}, {duration: 0.5});
        } else return;
    },[startMarker, destinationMarker]) 

    useEffect(() => {
        if (hoveredRouteStop) {
            const center = [hoveredRouteStop.lat, hoveredRouteStop.lng];
            map.flyTo(center, 18, {duration: 0.5});
        } else if (routeStopsMarkers && routeStopsMarkers.length > 0) {
            const bounds = L.latLngBounds(routeStopsMarkers.map(marker => marker.coordinate));
            map.flyToBounds(bounds, {padding: [50, 50]}, {duration: 0.5});
        }
    },[hoveredRouteStop])
    
    return null;
}