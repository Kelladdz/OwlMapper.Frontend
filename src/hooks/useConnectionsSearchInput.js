import { useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { useSearchBusStopsQuery } from '../store/apis/busStopsApi';
import { useSearchAddressesQuery } from '../store/apis/addressesApi';
import { changeSearchTerm } from '../store/slices/searchInputsSlice';
import UserInterfaceContext from '../context/userInterface';
import CurrentDataContext from '../context/currentData';
import MarkersContext from '../context/markers';


export function useConnectionsSearchInput() {
    const searchTerm = useSelector((state) => {return state.searchInputs.searchTerm});
    const dispatch = useDispatch();

    const {startOrDestination, onListMount, onListUnmount, isListMounted} = useContext(UserInterfaceContext);
    const {addStartMarker} = useContext(MarkersContext);
    const {selectedPoint} = useContext(CurrentDataContext);
    

    
    
    
    
    


    const handleChangeTerm = (event) => {
        event.preventDefault();
        dispatch(changeSearchTerm(event.target.value));
        console.log(`You're typing: `, event.target.value);
    }


    // useEffect(() => {
    //     const onSuccess = async (position) => {
    //         const coords = position.coords
    //         const response = await axios.get(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${coords.longitude}&latitude=${coords.latitude}&access_token=pk.eyJ1Ijoia2VsbGFkZHoiLCJhIjoiY2x4bzNpM253MDllODJycXIxb21oczh5cSJ9.YYYTdxFLA39oDTsFgRdmsg`)

    //         const data = response.data.features[0];
    //         console.log('Your localization data has been fetched: ', data);

    //         const startPointName = data.properties.context.address ? `${data.properties.context.place.name}, ${data.properties.context.address.name}` : "Twoja lokalizacja"

    //         dispatch(changeStartPointSearchTerm(startPointName));
    //         typeStartPoint({name: startPointName, coordinate: L.latLng([coords.latitude, coords.longitude])});
    //         addStartMarker([coords.latitude, coords.longitude]);
    //     }
    //     const onError = (error) => console.log('Error: ', error);
        
    //     navigator.geolocation.getCurrentPosition(onSuccess, onError);
    // },[])

    

    // useEffect(() => {
    //     if (matchedBusStops && !busStopsIsLoading && matchedAddresses && !addressesIsLoading && startOrDestination === type && !isListMounted) {
    //         onListMount();
    //     }
    // },[matchedBusStops, matchedAddresses, busStopsIsLoading, addressesIsLoading])

    const prevSelectedPoint = useRef(selectedPoint);

    useEffect(() => {
        if (selectedPoint !== prevSelectedPoint.current && isListMounted) {
            console.log('Points have changed: ', startPoint, prevStartPoint.current, destinationPoint);
            onListUnmount();
            prevSelectedPoint.current = selectedPoint;
        }
        
    }, [selectedPoint]);

    return {searchTerm, handleChangeTerm };
    // return {searchTerm, matchedBusStops, matchedAddresses, startOrDestination, placeholder, searchedInputClass, startPoint, destinationPoint, isListMounted, handleChangeTerm, focusOnInput};
}



    // const startPointName = startPoint ? startPoint.address : '';
    // const destinationPointName = destinationPoint ? destinationPoint.address : '';

    // const startSearchInputValue = startOrDestination === 'start' ? startPointSearchTerm : startPointName;
    // const destinationSearchInputValue = startOrDestination === 'destination' ? destinationPointSearchTerm : destinationPointName;