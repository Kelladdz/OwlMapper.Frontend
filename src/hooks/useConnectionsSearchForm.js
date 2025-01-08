import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSearchBusStopsQuery } from '../store/apis/busStopsApi';
import { useSearchAddressesQuery } from '../store/apis/addressesApi';
import UserInterfaceContext from '../context/userInterface';
import CurrentDataContext from '../context/currentData';
import { useAStarSearch } from './useAStarSearch';

export function useConnectionsSearchForm() {
    const {startPoint, destinationPoint} = useContext(CurrentDataContext);
    // const {onRouteCalculate, q} = useAStarSearch();

    const [showSearchButton, setShowSearchButton] = useState(false);

    // const handleSearchFormSubmit = (event) => {
    //     event.preventDefault();
    //     onRouteCalculate();
    // }

    useEffect(() => {
        if (startPoint && destinationPoint) {
            setShowSearchButton(true);
        } else {
            setShowSearchButton(false);
        }
    }, [startPoint, destinationPoint])

    return {showSearchButton};
    // const { typeStartPoint, typeDestinationPoint, startPoint, destinationPoint } = useContext(CurrentDataContext);
    // const startPointName = startPoint ? startPoint.address : '';
    // const destinationPointName = destinationPoint ? destinationPoint.address : '';
    // const { addStartMarker, addDestinationMarker } = useContext(MarkersContext);

    

    // const onStopPick = (busStop) => {
    //     if (startOrDestination === 'start') {
    //         dispatch(changeStartPointSearchTerm(busStop.name));
    //         typeStartPoint({address: busStop.name, coordinate: L.latLng(busStop.coordinate.lat, busStop.coordinate.lng)});
    //         addStartMarker([busStop.coordinate.lat, busStop.coordinate.lng]);
    //     }
    //     else if (startOrDestination === 'destination') {
    //         dispatch(changeDestinationPointSearchTerm(busStop.name));
    //         typeDestinationPoint({address: busStop.name, coordinate: L.latLng(busStop.coordinate.lat, busStop.coordinate.lng)});
    //         addDestinationMarker([busStop.coordinate.lat, busStop.coordinate.lng]);
    //     }
    // }
        
    // const onAddressPick = async (address) => {
    //         const formattedAddress = address.replace(' ', '%20');
    //         await axios
    //         .get(`https://api.mapbox.com/search/geocode/v6/forward?q=${formattedAddress}&proximity=ip&access_token=pk.eyJ1Ijoia2VsbGFkZHoiLCJhIjoiY2x4bzNpM253MDllODJycXIxb21oczh5cSJ9.YYYTdxFLA39oDTsFgRdmsg`)
    //                 .then(res => {
    //                     if (res.status == 200) {
    //               const coordinate = res.data.features[0].geometry.coordinates;
    //               if (startOrDestination === 'start') {
    //                 typeStartPoint({address: res.data.features[0].properties.name,  coordinate: L.latLng(coordinate[0], coordinate[1])});
    //                 addStartMarker(coordinate);
    //               } else if (startOrDestination === 'destination') {
    //                 typeDestinationPoint({address: res.data.features[0].properties.name,  coordinate: L.latLng(coordinate[0], coordinate[1])});
    //                 addDestinationMarker(coordinate);
    //               }   
    //             };
    //             });
    //       };

    // const startSearchInputValue = startOrDestination === 'start' ? startPointSearchTerm : startPointName;
    // const destinationSearchInputValue = startOrDestination === 'destination' ? destinationPointSearchTerm : destinationPointName;

    
    
}