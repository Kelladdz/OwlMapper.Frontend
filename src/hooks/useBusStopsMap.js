import { useState, useEffect } from "react";
import { useFetchBusStopsQuery } from "../store";

export function useBusStopsMap() {
    const {data, error, isLoading} = useFetchBusStopsQuery() || [];

    const [busStops, setBusStops] = useState();

    useEffect(() => {
        if (!isLoading && data) {
            setBusStops(data);
        }
        return () =>{
            setBusStops();
        }
    },[isLoading, data])

    return {busStops};
}