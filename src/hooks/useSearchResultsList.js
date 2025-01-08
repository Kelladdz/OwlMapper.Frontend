import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeSearchTerm } from "../store/slices/searchInputsSlice";
import { useSearchBusStopsQuery } from "../store/apis/busStopsApi";
import { useSearchAddressesQuery } from "../store/apis/addressesApi";
import CurrentDataContext from "../context/currentData";
import MarkersContext from "../context/markers";
import { useSearchConnections } from "./useSearchConnections";

export function useSearchResultsList() {
    const searchTerm = useSelector((state) => {return state.searchInputs.searchTerm});
    const dispatch = useDispatch();

    const {handleSearchedBusStopClick} = useSearchConnections();

    const {getSelectedPoint, selectedPoint} = useContext(CurrentDataContext);
    const {addStartMarker} = useContext(MarkersContext);


    const {data: matchedBusStops, error: busStopsError, isLoading: busStopsIsLoading} = useSearchBusStopsQuery(searchTerm, { skip: searchTerm.length <= 2}) || [];
    
    const searchedClass = matchedBusStops ? 'searched-' : '';

    const onStopPick = (stop) => {
        const busStopNameDisplay = stop.busStop.name.includes(stop.busStop.city) ? stop.busStop.name : `${stop.busStop.city} ${stop.busStop.name}`;
        getSelectedPoint({name: busStopNameDisplay, id: stop.busStop.id, coordinate: L.latLng(stop.busStop.coordinate.lat, stop.busStop.coordinate.lng)});
        dispatch(changeSearchTerm(''));
        console.log('Bus stop picked: ', stop.busStop);
        handleSearchedBusStopClick();
    }
    

    return { matchedBusStops, searchedClass, onStopPick };
}