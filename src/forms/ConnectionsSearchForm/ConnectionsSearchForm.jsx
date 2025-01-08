import React, { useState, useCallback, useEffect, useContext } from 'react';
import { add, debounce } from 'lodash';
import { useSearchBusStopsQuery } from '../../store/apis/busStopsApi';
import { useSearchAddressesQuery } from '../../store/apis/addressesApi';
import { useDispatch, useSelector } from 'react-redux';
import { changeStartPointSearchTerm, changeDestinationPointSearchTerm } from '../../store/slices/searchInputsSlice';
import CurrentDataContext from '../../context/currentData';
import  MarkersContext  from '../../context/markers';
import axios from 'axios';
import L from 'leaflet';
import styles from './ConnectionsSearchForm.module.css';
import Glass from '../../assets/glass.svg';
import ConnectionsSearchInput from '../../components/Inputs/ConnectionsSearchInput/ConnectionsSearchInput';
import UserInterfaceButton from '../../components/Buttons/UserInterfaceButton/UserInterfaceButton';
import { useConnectionsSearchForm } from '../../hooks/useConnectionsSearchForm';
import SearchResultsList from '../../components/Lists/SearchResultsList/SearchResultsList';
import SearchButton from '../../assets/searchButton.svg';

export default function ConnectionsSearchForm() {
    
    const {showSearchButton} = useConnectionsSearchForm();

    // const searchConnection = useCallback(async (startAddress, destinationAddress) => {
            
    //           const startToBusStopsAndDistances = await startToBusStopsDistances();
              
    //           console.log(startToBusStopsAndDistances);
    //           //if (nearestBusStop) {
    //           if (startToBusStopsAndDistances) {
    //             startToBusStopsAndDistances.forEach(async(bs) => {
    //               const myRoute = await busStopToAnotherBusStopDistances(bs.busStop);
    //               myRoute.forEach(async(bs) => {
    //                 await transfer(bs);  
                    
    //               })
    //               await axios.get(`https://api.mapbox.com/directions/v5/mapbox/walking/${startAddress.coordinates.lng}%2C${startAddress.coordinates.lat}%3B${bs.busStop.coordinate.longitude}%2C${bs.busStop.coordinate.latitude}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1Ijoia2VsbGFkZHoiLCJhIjoiY2x4bzNpM253MDllODJycXIxb21oczh5cSJ9.YYYTdxFLA39oDTsFgRdmsg`)
    //                 .then(res => {
    //                 console.log(res);
    //                 let newRoutePoints = [];
    //                 res.data.routes[0].geometry.coordinates.forEach((coords) => newRoutePoints.push({coordinate: L.latLng(coords[1], coords[0])}));
    //                 setRouteLine(newRoutePoints)
    //               })
    //             })
                
        
    //           }
              
    //         }
    //       },[startAddress, destinationAddress]);

    return (
        <>
            <form /*onSubmit={handleSearchFormSubmit}*/ className={styles.form}>
                <ConnectionsSearchInput/>
                {showSearchButton && <button type='submit' className={styles['search-btn']} >
                    <img src={SearchButton} alt='Search Icon' className={styles.icon}/>
                </button>}
            </form>
            </>//{matchedBusStops && matchedBusStops.length > 0 && 
        //     <div>
        //         <ul>
        //             {matchedBusStops.map(stop => {

        //                 const uniqueLineNames = stop.busStop.routeStops 
        //                 ? [...new Set(stop.busStop.routeStops.map(rs => rs.variant.line.name))]
        //                 : null;
                      
        //               return <li key={stop.busStop.id} onClick={() => {
        //                 onStopPick(stop.busStop);
        //             }}>
        //                 <p><strong>{stop.busStop.name} ({stop.busStop.id})</strong></p>
        //                 {uniqueLineNames}
        //             </li>
        //             }
        //             )}
        //         </ul>
        //     </div>}
        //     {matchedAddresses && matchedAddresses.length > 0 &&
        //     <div>
        //         <ul>
        //             {matchedAddresses.map(address => 
        //             <li key={address.address.id} onClick={() => {
        //                 // onAddressPick(address.address.addressString)
        //               }
                        
        //             }>
        //                 <p><strong>{address.address.addressString}</strong></p>
        //                 <p>{address.address.city}</p>
        //             </li>)}
        //         </ul>
        //     </div>}
        //     {/* {startPoint && destinationPoint ? <button onClick={() => {
        //         // searchConnection(startAddress, destinationAddress);
        //         console.log("feature not implemented yet");
        //     }}>Search</button> : null} */}
        // </>
    )
}

