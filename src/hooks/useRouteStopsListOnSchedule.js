import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import CreatorContext from "../context/creator";

export function useRouteStopsListOnSchedule() {
    const routeStops = useSelector(state => state.scheduleCreator.routeStops);
    const {onRouteSet, onRouteStopsListDisplay} = useContext(CreatorContext);

    useEffect(() => {
        if (routeStops.length > 0) {
            onRouteStopsListDisplay(routeStops);
            const currentStop = routeStops[0];
            const destination = routeStops[routeStops.length - 1];
            onRouteSet(currentStop, destination);
        }
    },[routeStops]);
    return {routeStops};
}