import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import L from 'leaflet';

import {useFetchFilteredByBusStopIdQuery} from '../store/apis/linesApi';
import {useFetchBusStopsQuery} from '../store/apis/busStopsApi';
import CurrentDataContext from '../context/currentData';

import { EXTERNAL_APIS_URL_PARAMETERS, ROUTING_PROFILES } from '../constants/externalApis';
import AStartSearchContext from '../context/aStartSearch';

export function useAStarSearch() {
//     const {startPoint, destinationPoint} = useContext(CurrentDataContext);
//     const {busStopsNodes, getBusStopsNodes, getStartPointNode, getDestinationPointNode, startPointNode, destinationPointNode} = useContext(AStartSearchContext);

//     const [onSearch, setOnSearch] = useState(false);
//     const [q, setQ] = useState();
//     const [openList, setOpenList] = useState([startPointNode]);
//     const [closedList, setClosedList] = useState([]);

//     const {data: busStops, isLoading: busStopsLoading} = useFetchBusStopsQuery(undefined, {skip: !onSearch});
//     const {data: lines, isLoading: linesLoading} = useFetchFilteredByBusStopIdQuery(q.id ? q.id : '', {skip: !q.id});

    

    

//     const onRouteCalculate = () => {
//         console.log('Route calculating...');
//         const startPointDistanceToDestinationPoint = calculateDistance(startPoint.coordinate, destinationPoint.coordinate);
//         getStartPointNode({name: startPoint.address, coordinate: startPoint.coordinate, id: startPoint.id || null, score: startPointDistanceToDestinationPoint});
//         getDestinationPointNode({name: destinationPoint.address, coordinate: destinationPoint.coordinate, id: destinationPoint.id || null, score: Infinity});
//         setOnSearch(true);
//     }
    


//     const pathFinder = async (q) => {
//         if (q === startPointNode && !q.id) {
//             const nodes = await Promise.all(busStops.map(async busStop => {
//                 const startPointCoords = startPointNode.coordinate;
//                 console.log('Start point coords: ', startPointCoords);
//                 const busStopCoords = L.latLng(busStop.busStop.coordinate.lat, busStop.busStop.coordinate.lng);
//                 console.log('Bus stop coords: ', busStopCoords);
//                 const mapBoxApiKey = import.meta.env.VITE_MAPBOX_API_KEY;
//                 const mapBoxResponse = await axios.get(`${EXTERNAL_APIS_URL_PARAMETERS.mapBoxDirectionsRequest}${ROUTING_PROFILES.walking}${startPointCoords.lng}%2C${startPointCoords.lat}%3B${busStopCoords.lng}%2C${busStopCoords.lat}${EXTERNAL_APIS_URL_PARAMETERS.mapBoxAlternativesQueryString}=true${EXTERNAL_APIS_URL_PARAMETERS.mapBoxContinueStraightQueryString}=true${EXTERNAL_APIS_URL_PARAMETERS.mapBoxGeometriesQueryString}=geojson${EXTERNAL_APIS_URL_PARAMETERS.mapBoxLanguageQueryString}=en${EXTERNAL_APIS_URL_PARAMETERS.mapBoxOverviewQueryString}=false${EXTERNAL_APIS_URL_PARAMETERS.mapBoxStepsQueryString}=false${EXTERNAL_APIS_URL_PARAMETERS.mapBoxAccessTokenQueryString}=${mapBoxApiKey}`);
//                 const duration = mapBoxResponse.data.routes[0].duration;
//                 const distanceToDestinationPoint = calculateDistance(busStopCoords, destinationPoint.coordinate);
//                 return {name: busStop.busStop.name, id: busStop.busStop.id, score: duration + distanceToDestinationPoint};
//             }));
//             getBusStopsNodes(nodes);
//             setOpenList(nodes.sort((a,b) => a.score - b.score).slice(0,10));

//         } else if (q.id) {
//             const nodes = lines.map(line => {
//                 line.variants.map(variant => {
//                     variant.routeStops.map(routeStop => {
//                         if (closedList.includes(item => item.id === routeStop.id)) {
//                             return null;
//                         }
//                         if (routeStop.busStopId !== q.id) {
//                             const distanceToDestinationPoint = calculateDistance(routeStop.busStop.coordinate, destinationPoint.coordinate);
//                             return {name: routeStop.busStopName, id: routeStop.busStopId, coordinate: routeStop.busStop.coordinate, score: q.score + routeStop.timeToTravelInMinutes + distanceToDestinationPoint};
//                         }
//                     })
//                 })
//             }) 
//             setOpenList()
//         } else if (q === destinationPointNode) {
//             console.log('Destination point reached');
//         }
//     };

//     // const pathFinderStep = () => {

//     const getChildNodes = (q) => {
//         if (startPoint.id && q.id === startPoint.id) {
//             console.log('Start point is bus stop');
//         } else if (!startPoint.id && q.name === startPoint.name) {
//             console.log('Start point is address');

//         }
//     }

//     const calculateDistance = (coord1, coord2) => {
//         const dx = coord1.lng - coord2.lng;
//         const dy = coord1.lat - coord2.lat;
//         return Math.sqrt(dx * dx + dy * dy);
//     };

//     useEffect(() => {
//         if (busStops && !busStopsLoading && busStops.length > 0) {
//             console.log('Bus stops has been fetched');
//             console.log(busStops);
//             console.log('Looking for best scoring bus stop...');
//             setOpenList(prev => [...prev, startPointNode]);
//         }
//     }, [busStops, busStopsLoading]);

//     useEffect(() => {
//         setQ(openList.sort((a,b) => a.score - b.score)[0]);
//     },[openList]);  

//     useEffect(() => {
//         console.log('Best scoring bus stop is: ', q.name);
//         pathFinder(q);
//     },[q]);

//     // useEffect(() => {
//     //     if (busStopsNodes.length > 0) {
//     //         console.log('Open set has been updated: ', openSet);
//     //         setQ(busStopsNodes.sort((a,b) => a.score - b.score)[0]);
//     //     }
//     // },[busStopsNodes]);

//     // useEffect(() => {
//     //     if (q) {
//     //         console.log('Best scoring bus stop is ', q.name);
//     //     } 
//     // }, [q]);

//     // useEffect(() => {
//     //     if (lines && !linesLoading) {
//     //         console.log(`Lines for ${q.name} has been fetched: `, {lines});

//     //     }
//     // },[lines, linesLoading]);

//     return {q, onRouteCalculate};
}