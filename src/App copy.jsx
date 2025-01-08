import "./App.css";
import React, { useEffect, useState, useRef, useCallback, useMemo, useContext } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, useMapEvent, Rectangle, Polyline } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { NavigationProvider } from './context/navigation';
import axios from 'axios';
import { Icon, divIcon, point } from "leaflet";
import UserInterface from "./components/UI/UserInterace";
import { createBrowserRouter, RouterProvider, BrowserRouter as Router, useLocation, useNavigate } from 'react-router-dom';
import Start from './components/UI/sub-menu/Start';
import UserMenu from './components/UI/sub-menu/UserMenu';
import LineMenu from './components/UI/sub-menu/LineMenu';
import BusStopMenu from './components/UI/sub-menu/BusStopMenu';
import Direction from './components/UI/sub-menu/Direction';
import CurrentDirection from './components/UI/sub-menu/CurrentDirection';
import AdminMenu from './components/AdminPanel';
import Schedule from "./components/UI/sub-menu/Schedule";
import VariantMenu from "./components/UI/sub-menu/VariantMenu";
import { currentVariantLoader } from "./pages/currentVariantLoader";
import { schedule } from "./pages/schedule";
import { fetchAllBusStops } from "./pages/fetchAllBusStops";
import { lineVariants } from "./pages/lineVariants";
import {linesLoader} from "./pages/linesLoader"
import {busStopsAndLineDataLoader} from "./pages/busStopsAndLineDataLoader"
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import RoutingMachine from "./components/RoutingMachine";
import { currentDirection } from "./pages/currentDirection";
import { routeBusStopsWithCurrentStop } from "./pages/routeBusStopsWithCurrentStop";
import CurrentDirectionWithCurrentStop from "./components/UI/sub-menu/CurrentDirectionWithCurrentStop";
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import "react-contexify/dist/ReactContexify.css";
import {useSelector, useDispatch} from 'react-redux';
import  MapBehaviorContext  from "./context/mapBehavior";
import BusStopsMarkers from "./components/map-components/BusStopsMarkers";
import MarkersContext  from "./context/markers";
import CurrentDataContext from "./context/currentData";
import StartMarker from "./components/map-components/StartMarker";
import DestinationMarker from "./components/map-components/DestinationMarker";
import {useFetchLinesQuery} from './store/apis/linesApi';
import {useFetchBusStopsQuery} from './store/apis/busStopsApi';
import {useFetchAddressesQuery} from './store/apis/addressesApi';
import MapSettings from './components/map-components/MapSettings';
import RouteStopsMarkers from './components/map-components/RouteStopsMarkers';
import RouteLinePointsContext from "./context/routeLines";
import ZoomControl from "./components/map-components/ZoomControl";

// const GetPositionHandler = ({ getPosition }) => {
//   useMapEvents({
//     click: (event) => {
//       const { lat, lng } = event.latlng;
//       getPosition({ lat, lng });
//     },
//   });
//   return null;
// };

// 

// const NewBusStopHandler = ({addBusStopMarker}) => {
//   useMapEvent({
//     click: (event) => {
//       const { lat, lng } = event.latlng;
//       addBusStopMarker({ lat, lng })
//     }
//   })
// }

// const NewRouteLineHandler = ({addRouteLineMarker}) => {
//   useMapEvent({
//     click: (event) => {
//       const { lat, lng } = event.latlng;
//       addRouteLineMarker({ lat, lng })
//     }
//   })
// }

// const StaticInit = ({ setInitialRender }) => {
//   useMapEvents({
//     load: () => {
//       setInitialRender(false);
//     }
//   });
//   return null;
// };

// const SaveMapState = () => {
//   const map = useMapEvent({
//     moveend: () => {
//       const center = map.getCenter();
//       const zoom = map.getZoom();
//       localStorage.setItem('mapCenter', JSON.stringify(center));
//       localStorage.setItem('mapZoom', zoom);
//     },
//   });
//   return null;
// };

// const FitBoundsToMarkers = ({ markers, currentStop, routeLine, startMarker, destinationMarker, routeLineCreateMode }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (routeLine.length !== 0) {
//       if(!currentStop && !routeLineCreateMode){
//         console.log(map.getCenter());
//         const bounds = L.latLngBounds(routeLine.map(marker => [marker.coordinate.lat, marker.coordinate.lng]));
//         map.fitBounds(bounds, {paddingTopLeft: [250, 50]});
//         const center = bounds.getCenter();
//         map.setView(center, 15, {animate: true});
//       } else if (routeLineCreateMode) {
//         const center = routeLine[routeLine.length - 1];
//         map.flyTo(center, {paddingTopLeft: [250, 50]}, {animate: true});
//       }  
//     } else {
//       if(markers.length !== 0){
//         console.log(map.getCenter());
//         const bounds = L.latLngBounds(markers.map(marker => [marker.lat, marker.lng]));
//         map.fitBounds(bounds, {paddingTopLeft: [50, 50]});
//         const center = bounds.getCenter();
//         map.setView(center, 13, {animate: true});
//       }
//     }
//   }, [markers, routeLine]);

//   useEffect(() => {
//     if(currentStop){
//       console.log(currentStop);
//       map.setView(L.latLng(currentStop.lat, currentStop.lng - 0.003), 17, {animate: true});
//     }
//   },[currentStop]);

//   useEffect(() => {
//     if (startMarker){
//       console.log(startMarker);
//       map.setView(L.latLng(startMarker.lat, startMarker.lng - 0.006), 15, {animate: true});
//     } else if (destinationMarker){
//       map.setView(L.latLng(destinationMarker.lat, destinationMarker.lng - 0.006), 15, {animate: true});
//     }
//   },[startMarker, destinationMarker]);
//   return null;
// };


const NewMarkerMenuHandler = ({markerContextMenu}) => {
    useMapEvents({
      click: (event) => {
        const { latlng, originalEvent } = event;
        markerContextMenu(latlng, originalEvent);
      }
    });
    return null;
  }


export default function App() {
  
//   const [markers, setMarkers] = useState([]); //1
//   const [schedules, setSchedules] = 
//   useState(JSON.parse(localStorage.getItem('schedules') ) || null); //2
//   const [routeLine, setRouteLine] = useState([]); //3
//   const [currentStop, setCurrentStop] = useState(); //4
//   const [zoom, setZoom] = useState(12); //5
//   const [center, setCenter] = useState([50.69333, 16.6061])//6
//   const [initialRender, setInitialRender] = useState(true);//7
//   const [currentPlace, setCurrentPlace] = useState({});//8
//   const [searchBounds, setSearchBounds] = useState();//9
//   const [addMarkers, setAddMarkers] = useState(true);//10
//   const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });//11
//   const [startMarker, setStartMarker] = useState();//12
//   const [destinationMarker, setDestinationMarker] = useState();//13
//   const [startAddress, setStartAddress] = useState({});//14
//   const [destinationAddress, setDestinationAddress] = useState({});//15
//   const [isStartAddressBusStop, setIsStartAddressBusStop] = useState();//16
//   const [busStops, setBusStops] = useState();//20
//   const [busStopCreateMode, setBusStopCreateMode] = useState(false)
//   const [lineCreateStep, setLineCreateStep] = useState(0)
//   const [routeLineCreateMode, setRouteLineCreateMode] = useState(false)
//   const [busStopMarker, setBusStopMarker] = useState()
//   const [newRouteStopsMarkers, setNewRouteStopsMarkers] = useState([])
//   const [currentVariant, setCurrentVariant] = useState()
//   const [currentDisplayedDepartures, setCurrentDisplayedDepartures] = useState()
//   const [lineEditMode, setLineEditMode] = useState(false)
//   const [isLineManuallyAdded, setIsLineManuallyAdded] = useState(false)

//   const manuallyAddedPoints = routeLine.filter(point => point.isManuallyAdded === true);
  
     const MENU_ID = "map_context_menu";

//   useEffect(() => {
//     const savedZoom = localStorage.getItem('mapZoom');
//     const savedCenter = localStorage.getItem('mapCenter');
//     const savedCurrentStop = localStorage.getItem('currentStop');
//     const savedVariant = localStorage.getItem('variant');
//     const savedCurrentDisplayedDepartures = localStorage.getItem('currentDisplayedDepartures');

//     if (savedCenter) {
//       setCenter(JSON.parse(savedCenter));
//     }

//     if (savedZoom) {
//       setZoom(savedZoom);
//     }

//     if (savedCurrentStop) {
//       setCenter(JSON.parse(savedCurrentStop));
//     }

//     if (savedVariant) {
//       setCurrentVariant(JSON.parse(savedVariant));
//     }

//     if (savedCurrentDisplayedDepartures) {
//       setCurrentDisplayedDepartures(JSON.parse(savedCurrentDisplayedDepartures));
//     }
//   }, []);

//   const defaultIcon = new L.divIcon({
//     html: `<svg width="27" height="41" viewBox="0 0 27 41" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5458 1C6.69896 1 1 7.06309 1 13.6418C1 16.6014 2.62917 20.3622 3.80625 22.9596L13.5 42L23.1479 22.9596C24.325 20.3622 26 16.79 26 13.6418C26 7.06309 20.3927 1 13.5458 1ZM13.5458 8.62278C16.2375 8.64089 18.4198 10.8835 18.4198 13.6407C18.4198 16.3979 16.2375 18.6086 13.5458 18.6256C10.8542 18.6075 8.67186 16.399 8.67186 13.6407C8.67186 10.8835 10.8542 8.64089 13.5458 8.62278Z" fill="url(#paint0_linear_210_10)" stroke="url(#paint1_linear_210_10)" stroke-linecap="round"/>
// <defs>
// <linearGradient id="paint0_linear_210_10" x1="13.4531" y1="40.8313" x2="13.4531" y2="0.809296" gradientUnits="userSpaceOnUse">
// <stop stop-color="#C6AB12"/>
// <stop offset="1" stop-color="#D1D14C"/>
// </linearGradient>
// <linearGradient id="paint1_linear_210_10" x1="11.3979" y1="21.1079" x2="11.3979" y2="0.809298" gradientUnits="userSpaceOnUse">
// <stop stop-color="#94972E"/>
// <stop offset="1" stop-color="#AFB738"/>
// </linearGradient>
// </defs>
// </svg>

// `
//   })

//   const commonIcon = order => new L.divIcon({
//     html: `<div><p style="font-size: 1rem; display: flex; justify-content: center; align-items: center">${order}</p></div>`,
//     classname: 'common-icon'
//   })

//   const customIcon = new L.divIcon({
//     html: `<svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5439 1.69971C6.12152 1.69971 0.775879 7.26032 0.775879 13.2938C0.775879 16.0082 2.30404 19.4573 3.40815 21.8394L12.5009 39.3019L21.5507 21.8394C22.6548 19.4573 24.2259 16.1811 24.2259 13.2938C24.2259 7.26032 18.9663 1.69971 12.5439 1.69971ZM12.5439 8.69075C15.0687 8.70736 17.1157 10.7641 17.1157 13.2928C17.1157 15.8215 15.0687 17.849 12.5439 17.8646C10.0191 17.848 7.9721 15.8225 7.9721 13.2928C7.9721 10.7641 10.0191 8.70736 12.5439 8.69075Z" fill="url(#paint0_linear_202_2)" stroke="url(#paint1_linear_202_2)" stroke-linecap="round"/>
// <defs>
// <linearGradient id="paint0_linear_202_2" x1="12.4569" y1="38.23" x2="12.4569" y2="1.52481" gradientUnits="userSpaceOnUse">
// <stop stop-color="#C61212"/>
// <stop offset="1" stop-color="#D14C4C"/>
// </linearGradient>
// <linearGradient id="paint1_linear_202_2" x1="10.5291" y1="20.1412" x2="10.5291" y2="1.52481" gradientUnits="userSpaceOnUse">
// <stop stop-color="#972E2E"/>
// <stop offset="1" stop-color="#B73838"/>
// </linearGradient>
// </defs>
// </svg>

// `,
//   });

//   const startIcon = new L.divIcon({
//     html: `<svg width="27" height="41" viewBox="0 0 27 41" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5458 1C6.69896 1 1 7.06309 1 13.6418C1 16.6014 2.62917 20.3622 3.80625 22.9596L13.5 42L23.1479 22.9596C24.325 20.3622 26 16.79 26 13.6418C26 7.06309 20.3927 1 13.5458 1ZM13.5458 8.62278C16.2375 8.64089 18.4198 10.8835 18.4198 13.6407C18.4198 16.3979 16.2375 18.6086 13.5458 18.6256C10.8542 18.6075 8.67186 16.399 8.67186 13.6407C8.67186 10.8835 10.8542 8.64089 13.5458 8.62278Z" fill="url(#paint0_linear_208_6)" stroke="url(#paint1_linear_208_6)" stroke-linecap="round"/>
// <defs>
// <linearGradient id="paint0_linear_208_6" x1="13.4531" y1="40.8313" x2="13.4531" y2="0.809296" gradientUnits="userSpaceOnUse">
// <stop stop-color="#126FC6"/>
// <stop offset="1" stop-color="#4C9CD1"/>
// </linearGradient>
// <linearGradient id="paint1_linear_208_6" x1="11.3979" y1="21.1079" x2="11.3979" y2="0.809298" gradientUnits="userSpaceOnUse">
// <stop stop-color="#2E6C97"/>
// <stop offset="1" stop-color="#3883B7"/>
// </linearGradient>
// </defs>
// </svg>

// `,
//   });

//   const destinationIcon = new L.divIcon({
//     html: `<svg width="27" height="41" viewBox="0 0 27 41" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5458 1C6.69896 1 1 7.06309 1 13.6418C1 16.6014 2.62917 20.3622 3.80625 22.9596L13.5 42L23.1479 22.9596C24.325 20.3622 26 16.79 26 13.6418C26 7.06309 20.3927 1 13.5458 1ZM13.5458 8.62278C16.2375 8.64089 18.4198 10.8835 18.4198 13.6407C18.4198 16.3979 16.2375 18.6086 13.5458 18.6256C10.8542 18.6075 8.67186 16.399 8.67186 13.6407C8.67186 10.8835 10.8542 8.64089 13.5458 8.62278Z" fill="url(#paint0_linear_210_8)" stroke="url(#paint1_linear_210_8)" stroke-linecap="round"/>
// <defs>
// <linearGradient id="paint0_linear_210_8" x1="13.4531" y1="40.8313" x2="13.4531" y2="0.809296" gradientUnits="userSpaceOnUse">
// <stop stop-color="#12C61E"/>
// <stop offset="1" stop-color="#4CD14C"/>
// </linearGradient>
// <linearGradient id="paint1_linear_210_8" x1="11.3979" y1="21.1079" x2="11.3979" y2="0.809298" gradientUnits="userSpaceOnUse">
// <stop stop-color="#2E9732"/>
// <stop offset="1" stop-color="#38B74B"/>
// </linearGradient>
// </defs>
// </svg>

// `,
//   });



//   const onCurrentVariant = (data) => {
//     setCurrentVariant(data);
//   }

//   const changeCurrentStop = (stop) => {
//     console.log(stop);
//     setCurrentStop(stop);
//   }

//   const onCurrentStop = (data) => {
//     console.log(data);
//     setCurrentStop(L.latLng(data.coordinate.lat, data.coordinate.lng));
//   }

//   const onCurrentDisplayedDepartures = (data) => {
//     setCurrentDisplayedDepartures(data);
//   }

//   const passData = (data) => {
//     localStorage.setItem('schedules', JSON.stringify(data))
//     setSchedules(data);
//     console.log(data);
//     onCurrentStop(data);
//   }

//   const onMarkersWithCurrentStop = (data) => {
//     console.log(data);
//     let newMarkers = [];
//     data.routeStops.forEach(routeStop => newMarkers.push(L.latLng(routeStop.busStop.coordinate.lat, routeStop.busStop.coordinate.lng)));
//     setMarkers(newMarkers);
//     let newRouteLine = [];
//     currentVariant.routeLinePoints.forEach(routeLinePoint => newRouteLine.push({coordinate: L.latLng(routeLinePoint.lat, routeLinePoint.lng), order: routeLinePoint.order}));
//     setRouteLine(prevLine => [...prevLine, newRouteLine]);
//     setCurrentStop(L.latLng(data.routeStop.busStop.coordinate.lat, data.routeStop.busStop.coordinate.lng));
//   }


//   const onSetBusStops = useCallback((busStops) => {
//     console.log(busStops);
//     setBusStops(busStops);
//   },[busStops]);

//   const onRouteReset = useCallback(() => {
//     setRouteLine([]);
//     setCurrentVariant();
//     localStorage.removeItem('variant');
//   },[])

//   const onCurrentStopReset = () => {
//     setCurrentStop(null);
//   }

//   const onMarkersReset = useCallback(() => {
//     setMarkers([]);
//   },[markers]);

//   const addMarker = (newMarker) => {
//     setMarkers([...markers, newMarker]);
//   };

//   const getPosition = async (coords) => {
//     const response = await axios.get(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${coords.lng}&latitude=${coords.lat}&access_token=pk.eyJ1Ijoia2VsbGFkZHoiLCJhIjoiY2x4bzNpM253MDllODJycXIxb21oczh5cSJ9.YYYTdxFLA39oDTsFgRdmsg`)
//     console.log(response);
//     const data = response.data.features[0];
//     console.log(data);
//     setCurrentPlace({
//       coordinates: {
//         longitude: data.geometry.coordinates[0],
//         latitude: data.geometry.coordinates[1],
//       },
//       city: data.properties.context.place.name,
//       address: data.properties.context.address.name
//     });
//   };

//   const handleMenuClick = (latlng, originalEvent) => {
//     setMenuPosition({ x: originalEvent.clientX, y: originalEvent.clientY });
//     show({ event: originalEvent, props: { latlng } });
//     getPosition(latlng);
//   };

//   const {show} = useContextMenu({
//     id: MENU_ID,
//   });
  
//   function handleItemClick({id}) {
//     if (id === 'start' ) {
//       setStartMarker(L.latLng(currentPlace.coordinates.latitude, currentPlace.coordinates.longitude));
//       setStartAddress({address: currentPlace.address, coordinates: L.latLng(currentPlace.coordinates.latitude, currentPlace.coordinates.longitude)});
//     } else {
//       setDestinationMarker(L.latLng(currentPlace.coordinates.latitude, currentPlace.coordinates.longitude));
//       setDestinationAddress({address: currentPlace.address, coordinates: L.latLng(currentPlace.coordinates.latitude, currentPlace.coordinates.longitude)});
//     } 
//   }

//   const onAddMarkers = useCallback((flag) => {
//     setAddMarkers(flag);
//   },[addMarkers]);

//   const onUploadData = async (addresses) => {
//     await axios.post(`https://localhost:7033/api/Addresses`, addresses)
//     .then(res => {
//       console.log(res);
//     })
//   }

  

  

//   const findNearestStops = async () => {
//   const busStops = await axios.get('https://localhost:7033/api/bus-stops')
//         .then(res => {        
//           console.log(res.data.busStops);  
//           return res.data.busStops;
//         });

//   if (!startMarker || busStops.length === 0) return null;

//   let nearestStop = null;
//   let shortestDistance = Infinity;

  

//   busStops.forEach((stop) => {
//       const stopCoordinates = L.latLng(stop.coordinate.latitude, stop.coordinate.longitude)
//       const distance = haversineDistance(startMarker, stopCoordinates);
//       if (distance < shortestDistance) {
//           shortestDistance = distance;
//           nearestStop = stop;
//       }
//   });
//   console.log(nearestStop);
//   return nearestStop;
// };

//   const haversineDistance = (coords1, coords2) => {
//     const toRad = (value) => (value * Math.PI) / 180;
    
    
//     const lat1 = coords1.lat;
//     const lon1 = coords1.lng;
//     const lat2 = coords2.lat;
//     const lon2 = coords2.lng;

//     const R = 6371; // Promień Ziemi w km
//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon2 - lon1);

//     const a = 
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
//         Math.sin(dLon / 2) * Math.sin(dLon / 2); 
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
//     const distance = R * c;
//     return distance;
// };



//   const startToBusStopsDistances = async() => {
//     const busStops = await axios.get('https://localhost:7033/api/bus-stops')
//         .then(res => {        
//           console.log(res.data.busStops);  
//           return res.data.busStops;
//         });

//     if (!startMarker || busStops.length === 0) return null;

//     let result = [];


//     busStops.forEach((stop) => {
//       const stopCoordinates = L.latLng(stop.coordinate.latitude, stop.coordinate.longitude)
//       const distance = haversineDistance(startMarker, stopCoordinates);
//       result.push({busStop: stop, distance: distance})
//     });
//     console.log(result);
//     const sortedStops = result.slice().sort((a,b) => a.distance - b.distance);
//     const fiveNearestStops = sortedStops.slice(0,5);
//     console.log(fiveNearestStops);
//     return fiveNearestStops;
//   }

//     const busStopToAnotherBusStopDistances = async(bs) => {
//       const routes = await axios.get(`https://localhost:7033/api/bus-stops/${bs.slug}/routes`)
//             .then(res => {
//               if (res.data.length > 0) {
//                 console.log(res.data);
//                 return res.data;
//               }
//             })
//       let result = [];
//       if (routes && routes.length > 0) {
//         const routeStops = routes.map(route => route.routeStops);
//         routeStops.forEach(stop => {
//         const stopCoordinates = L.latLng(stop.coordinate.latitude, stop.coordinate.longitude)
//         const distance = haversineDistance(bs.coordinate, stopCoordinates);
//         result.push({routeStop: stop, distance: distance});
//       });
//       }
      
//       console.log(result);
//       return result;
//     }

//     const findMinimumSum = (arr1, arr2, arr3) => {
//       let minSum = Infinity;
//       let bestCombination = [];
    
//       arr1.forEach(num1 => {
//         arr2.forEach(num2 => {
//           arr3.forEach(num3 => {
//             let currentSum = num1 + num2 + num3;
//             if (currentSum < minSum) {
//               minSum = currentSum;
//               bestCombination = [num1, num2, num3];
//             }
//           });
//         });
//       });
    
//       return bestCombination;
//     };
  
//     const transfer = async (bs) => {
//       let transferCount = 0;
//       const transfers = await busStopToAnotherBusStopDistances(bs.busStop);
//       const distanceToDestination = haversineDistance(bs.busStop.coordinate, destinationMarker);
//         if (transfers.any(transfer => distanceToDestination < transfer)) {
//           const startToBusStopDistances = startToBusStopsAndDistances.map(x => x.distance);
//           const myRouteDistances = myRoute.distance;
//           const shortestRoute = findMinimumSum(startToBusStopDistances, myRouteDistances, distanceToDestination)
//           const shortestRouteDistance = shortestRoute.reduce((sum, num) => sum + num, 0);
//           return {shortestRoute}
//         } else {
//           transferCount++;
//           transfers.forEach(async (t) => await transfer(t));
//         }
//     }
    
    

//   const onSearchConnection = useCallback(async (startAddress, destinationAddress) => {
//     if (isStartAddressBusStop) {
      
//     } else {
//       // const nearestBusStop = await findNearestStop();
//       // console.log(nearestBusStop);
//       const startToBusStopsAndDistances = await startToBusStopsDistances();
      
//       console.log(startToBusStopsAndDistances);
//       //if (nearestBusStop) {
//       if (startToBusStopsAndDistances) {
//         startToBusStopsAndDistances.forEach(async(bs) => {
//           const myRoute = await busStopToAnotherBusStopDistances(bs.busStop);
//           myRoute.forEach(async(bs) => {
//             await transfer(bs);  
            
//           })
//           await axios.get(`https://api.mapbox.com/directions/v5/mapbox/walking/${startAddress.coordinates.lng}%2C${startAddress.coordinates.lat}%3B${bs.busStop.coordinate.longitude}%2C${bs.busStop.coordinate.latitude}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1Ijoia2VsbGFkZHoiLCJhIjoiY2x4bzNpM253MDllODJycXIxb21oczh5cSJ9.YYYTdxFLA39oDTsFgRdmsg`)
//             .then(res => {
//             console.log(res);
//             let newRoutePoints = [];
//             res.data.routes[0].geometry.coordinates.forEach((coords) => newRoutePoints.push({coordinate: L.latLng(coords[1], coords[0])}));
//             setRouteLine(newRoutePoints)
//           })
//         })
        

//       }
      
//     }
//   },[startAddress, destinationAddress]);

//   const onUploadRoutes = async (rp) => {
//     const lines = [...new Set(rp.map(x => x.line))];

//     let newRouteStops = [];
//     rp.forEach(async x => {
//       const routeStops = await axios.get(`http://bielawa.trapeze.fi/bussit/web?command=olmap&action=getRouteStops&route=${x.id}&_=1`)
//         .then(res => {
//           console.log(res.data);
//           routeStops.forEach(rs => {
//             const busStop = routeStops.find(bs => bs.name === rs.name);
//             const busStopId = busStop.id;
//             const travelTimeInMinutes = 1;
//             const order = rs.order;
//             const modifier = x.id
//             newRouteStops.push({busStopId: busStopId, travelTimeInMinutes: travelTimeInMinutes, order: order, modifier: modifier});
//           })})
          
//           await axios.post(`https://localhost:7033/api/routes/${x.line}/route-stops`,
//             newRouteStops
//           ).then(res => console.log(res))
//           })
//         };
    
  

//   const onUploadStop = async (request) => {
//     await axios.post(`https://localhost:7033/api/bus-stops`, request)
//       .then(res => console.log(res))
//     }
  

//   const onCreateBusStop = () => {
//     setBusStopCreateMode(true)
//   }

//   const addBusStopMarker = (coords) => {
//     const lat = coords.lat.toFixed(6)
//     const lng = coords.lng.toFixed(6)
//     setBusStopMarker(L.latLng(lat, lng))
//   };

//   const onSetBusStopMarker = (lat, lng) => {
//     setBusStopMarker(L.latLng(lat, lng))
//   };
  

//   const addRouteStopsMarkers = (coords) => {
//     console.log(coords)
//     setNewRouteStopsMarkers(coords)
//   }



//   const addRouteLineMarker = (coords) => {
//     const lat = coords.lat.toFixed(6)
//     const lng = coords.lng.toFixed(6)
//     setRouteLine(prevLine => [...prevLine, {coordinate: L.latLng(lat, lng), order: prevLine.length + 1, isManuallyAdded: isLineManuallyAdded}]);
//     setCurrentStop(L.latLng(lat, lng))
//   };

//   const onCreateLine = async (name) => {
//     await axios.post(`https://localhost:7033/api/lines`, {name})
//       .then(async res => {
//         console.log(res)
//         if (res.status === 201) {
//           setLineCreateStep(2);
//         }
//       })
//   }

//   const onCreateVariant = async (lineName, name, route) => {
//     await axios.post(`https://localhost:7033/api/lines/${lineName}/variants`, {name, route})
//     .then(async res => {
//       console.log(res)
//       if (res.status === 201) {
//         setLineCreateStep(3);
//       }
//     })
//   }

//   const onCreateRouteStops = async (lineName, variantName, routeStops) => {
//     let request = [];
//     routeStops.forEach(rs => {
//       request.push({
//         id: rs.id,
//         timeToTravelInMinutes: rs.timeToTravelInMinutes,
//         order: rs.order,
//       })
//     });
//     await axios.post(`https://localhost:7033/api/lines/${lineName}/variants/${variantName}/route-stops/batch`, [...request])
//     .then(async res => {
//       console.log(res)
//       setLineCreateStep(4);
//     })
//   }

//   const onEditRouteStops = async (lineName, variantName, routeStops) => {
//     console.log(routeStops);
//     let request = [];
//     routeStops.forEach(rs => {
//       request.push({
//         busStopId: rs.id,
//         timeToTravelInMinutes: rs.timeToTravelInMinutes,
//         order: rs.order,
//       })
//     });
//     await axios.put(`https://localhost:7033/api/lines/${lineName}/variants/${variantName}/route-stops/batch`, [...request])
//     .then(async res => {
//       console.log(res)
//       setLineCreateStep(4);
//   })}

//   const onAddDepartures = async (lineName, variantName, departures) => {
//     await axios.post(`https://localhost:7033/api/lines/${lineName}/variants/${variantName}/departures/batch`, [...departures])
//     .then(async res => {
//       console.log(res)
//       setLineCreateStep(5);
//     })
//   }

//   const onUpdateDepartures = async (lineName, variantName, departures) => {
//     console.log(departures);
//     await axios.put(`https://localhost:7033/api/lines/${lineName}/variants/${variantName}/departures/batch`, [...departures])
//     .then(async res => {
//       console.log(res)
//       setLineCreateStep(5);
//     })
//   }

//   const onCreateRouteLine = async (lineName, variantName, routeLine) => {
//     await axios.post(`https://localhost:7033/api/lines/${lineName}/variants/${variantName}/route-line-points/batch`, [...routeLine])
//     .then(async res => {
//       console.log(res)

//     })
//   }

//   const onUpdateRouteLine = async (lineName, variantName, routeLine) => {
//     await axios.post(`https://localhost:7033/api/lines/${lineName}/variants/${variantName}/route-line-points/batch`, [...routeLine])
//     .then(async res => {
//       console.log(res)
//       setLineEditMode(false);

//     })
//   }

//   const onLineEdit = () => {
//     setLineEditMode(true);
//   }

//   const onNewVariant = () => {
//     setLineCreateStep(2);
//     setRouteLine([]);
//   }

//   const onShowRouteLine = (routeLinePoints) => {
//     console.log(routeLinePoints);
//     let newPoints = [];
//     routeLinePoints.sort((a,b) => a.order - b.order).forEach(point => newPoints.push({coordinate: L.latLng(point.coordinate.lat, point.coordinate.lng), order: point.order}));
//     setRouteLine(newPoints);
//     setLineEditMode(true);
//   }

//   const onDeleteRouteLinePoint = (point) => {
//     setRouteLine(prevLine => {
//       const updatedStops = prevLine.filter(p => p.order !== point.order);
//       return updatedStops.map((stop, index) => ({ ...stop, order: index + 1 }));
//   })
//   }

//   const onManuallyAdded = (flag) => {
//     setIsLineManuallyAdded(flag);
//   }
  // useEffect(() => {
  //   if(busStops){
  //     console.log(busStops);
  //     const bounds = L.latLngBounds(busStops.map(stop => [stop.busStop.coordinate.lat, stop.busStop.coordinate.lng])).pad(.05)
  //   setSearchBounds(bounds);
  //   }
  // },[busStops])

  // useEffect(() => {
  //   if(currentVariant) {
  //     localStorage.setItem('variant', JSON.stringify(currentVariant));
  //     setRouteLine(currentVariant.routeLinePoints);
  //   } else localStorage.removeItem('currentVariant');

  // },[currentVariant])

  // useEffect(() => {
  //   currentStop ? localStorage.setItem('currentStop', JSON.stringify(currentStop)) : null;
  // },[currentStop])

  // useEffect(() => {
  //   currentDisplayedDepartures ? localStorage.setItem('currentDisplayedDepartures', JSON.stringify(currentDisplayedDepartures)) : null;
  // },[currentDisplayedDepartures])




  // useEffect(() => {
  //   if (startAddress) {
  //     setStartMarker(startAddress.coordinates);
  //   }
  //   if (destinationAddress) setDestinationMarker(destinationAddress.coordinates);
  // }, [startAddress, destinationAddress])




  

  const { startMarker, destinationMarker, addStartMarker, addDestinationMarker, routeStopsMarkers } = useContext(MarkersContext);
  const { shouldAddMarkerOnMapClick, markerContextMenuPosition, toggleMarkerAddingOnMapClick, showMarkerContextMenu, getMarkedPlace, markedPlace, routeStops, getRouteStops } = useContext(MapBehaviorContext);
  const { typeStartPoint, typeDestinationPoint, startPoint, destinationPoint, isContextMenuVisible, changeContextMenuVisibility } = useContext(CurrentDataContext);
  const { routeLinePoints } = useContext(RouteLinePointsContext);

  const {show, hideAll} = useContextMenu({
    id: MENU_ID,
  });

  const markerContextMenu = (position, originalEvent) => {
        if (!isContextMenuVisible) {
          showMarkerContextMenu({ x: originalEvent.clientX, y: originalEvent.clientY });
          show({ event: originalEvent, props: { position } });
          changeContextMenuVisibility(true);
          getPosition(position);
        }
        else changeContextMenuVisibility(false);
      };

  function handleItemClick({id}) {
      if (id === 'start' ) {
              addStartMarker(L.latLng(markedPlace.coordinate.lat, markedPlace.coordinate.lng));
              typeStartPoint({address: markedPlace.address, coordinate: L.latLng(markedPlace.coordinate.lat, markedPlace.coordinate.lng)});
            } else {
              addDestinationMarker(L.latLng(markedPlace.coordinate.lat, markedPlace.coordinate.lng));
              typeDestinationPoint({address: markedPlace.address, coordinate: L.latLng(markedPlace.coordinate.lat, markedPlace.coordinate.lng)});
            } 
       changeContextMenuVisibility(false)
  }

  const getPosition = async (position) => {
        const response = await axios.get(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${position.lng}&latitude=${position.lat}&access_token=pk.eyJ1Ijoia2VsbGFkZHoiLCJhIjoiY2x4bzNpM253MDllODJycXIxb21oczh5cSJ9.YYYTdxFLA39oDTsFgRdmsg`)
        console.log(response);
        const data = response.data.features[0];
        console.log(data);
        let fetchedGeoData;
        if (data.properties.context.address ) {
          fetchedGeoData = {
            coordinate: position,
            city: data.properties.context.place.name,
            address: data.properties.context.address.name
          }
        } else {
          fetchedGeoData = {
            coordinate: position,
            city: data.properties.context.place.name,
            address: "Wybrana Lokalizacja"
            }
        }
        console.log(fetchedGeoData);
        getMarkedPlace(fetchedGeoData);
  };



  const router = createBrowserRouter([
    {
        path: '/user',
        element: <UserInterface/>,
        children: [
          {
            index: true,
            element: <UserMenu />,
          },
          {
            path: '/user/lines/:lineName',
            element: <VariantMenu />
          },
          {
            path: '/user/lines/:lineName/variants/:variantName',
            element: <Direction/>
          },
          // {
          //   path: '/user/lines/:lineName/variants/:variantName/route-stops/:slug',
          //   element: <Schedule onCurrentDisplayedDepartures={onCurrentDisplayedDepartures} passData={passData} currentVariant={currentVariant} onCurrentStop={onCurrentStop}/>,
          //   loader: schedule
          // },
          // {
          //   path: `/user/lines/:lineName/variants/:variantName/route-stops/:slug/:encodedTime`,
          //   element: <CurrentDirection currentVariant={currentVariant} currentDisplayedDepartures={currentDisplayedDepartures} currentStop={currentStop} onMarkersWithCurrentStop={onMarkersWithCurrentStop} changeCurrentStop={changeCurrentStop}/>
          // },
          {
            path: `/admin`,
            element: <AdminMenu/>,
          },
          {
            path: `/admin/line/`,
            element: <LineMenu/>,
          },
          {
            path: `/admin/line/:lineName`,
            element: <LineMenu  />,

          },
          // {
          //   path: `/admin/bus-stop`,
          //   element: <BusStopMenu onUploadStop={onUploadStop} onSetBusStopMarker={onSetBusStopMarker} onCreateBusStop={onCreateBusStop} busStopMarker={busStopMarker}/>
          // },
        ]
    }
  ]);



  
  return (
  <>
  
  <RouterProvider router={router} />
    <MapContainer center={[50.68333, 16.6061]} zoom={12} minZoom={12} style={{height: `100vh`, width: `100vw`}} zoomAnimation={true}
      fadeAnimation={true}>
        <MapSettings />
    {/* <FitBoundsToMarkers startMarker={startMarker} destinationMarker={destinationMarker} markers={markers} currentStop={currentStop} routeLine={routeLine} schedules={schedules}/> */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <BusStopsMarkers busStops={busStops}/> */}
      <ZoomControl position="bottomright" />
      {startMarker ? <StartMarker startMarker={startMarker} /> : null}
      {destinationMarker ? <DestinationMarker destinationMarker={destinationMarker} /> : null}
      {shouldAddMarkerOnMapClick ? <NewMarkerMenuHandler markerContextMenu={markerContextMenu} /> : null}
      {routeStopsMarkers ? <RouteStopsMarkers routeStops={routeStopsMarkers}/> : null}
      {routeLinePoints ? routeLinePoints.filter(point => !point.isManuallyAdded).sort((a,b) => a.order - b.order).map(point => <RoutingMachine routeLine={routeLinePoints} />) : null}
      {/* {currentVariant 
      && 
      <>
        {currentVariant.routeStops.map(stop => <Marker icon={defaultIcon} position={L.latLng(stop.busStop.coordinate.lat, stop.busStop.coordinate.lng)}></Marker>)}
        {currentVariant.routeLinePoints.sort((a, b) => a.order - b.order).map(point => <RoutingMachine routeLine={currentVariant.routeLinePoints}/>)}
      </>}
      // 
      {destinationMarker ? <Marker icon={destinationIcon} position={destinationMarker} /> : null}
        {currentStop && <Marker icon={customIcon} position={currentStop}/>}
        {(markers.length !== 0 || (startMarker && destinationMarker)) && routeLine.length !== 0 ? <RoutingMachine key={currentStop} currentStop={currentStop} markers={markers} routeLine={routeLine}/> : null}
        {markers.length !== 0 ? 
        (currentStop ? markers.filter(marker => marker.lat !== currentStop.lat && marker.lng !== currentStop.lng).map(marker => <Marker icon={defaultIcon} position={marker}></Marker>) 
        : (routeLine.length === 0 ? markers.map(marker => <Marker icon={commonIcon('D')} position={marker}></Marker>) : markers.map(marker => <Marker icon={defaultIcon} position={marker}></Marker>)))
        : null}
        <SaveMapState currentStop={currentStop}/>
        {addMarkers ? <NewMarkerMenuHandler markerMenu={handleMenuClick} /> : null}
        {busStopCreateMode 
        ? 
        <>
          <NewBusStopHandler addBusStopMarker={addBusStopMarker}/>
          {busStopMarker ? <Marker icon={startIcon} position={busStopMarker} /> : null}
        </> : null}
        {newRouteStopsMarkers ? newRouteStopsMarkers.map(marker => <Marker icon={commonIcon(marker.order)} position={marker.coords}></Marker>) : null}
        {lineEditMode
        ?
        <>
          <NewRouteLineHandler addRouteLineMarker={addRouteLineMarker}/>
          {routeLine.length !== 0
          ? 
          <>
            {routeLine.map(point => <Marker icon={startIcon} position={point.coordinate}></Marker>)}
            {routeLine.length > 1 ? <RoutingMachine routeLine={routeLine}/> : null}
          </>
          : null}
        </> : null}
        {manuallyAddedPoints.length !== 0
        ? 

           
          <>
            <Polyline positions={[routeLine.filter(point => !point.isManuallyAdded).reduce((prev, current) => (prev.order > current.order) ? prev : current).coordinate, manuallyAddedPoints[0].coordinate]} color="#6FA1EC" weight='4'/>
            <Polyline positions={manuallyAddedPoints.map(point => point.coordinate)} color="#6FA1EC" weight='4'/> 
          </>
          :
          null}
        

        
        <StaticInit setInitialRender={setInitialRender}/> 
        <GetPositionHandler getPosition={getPosition} /> */}
        
    </MapContainer>
    <Menu id={MENU_ID}>
      <Item id="start" onClick={handleItemClick}>Ustaw tu punkt początkowy</Item>
      <Separator />
      <Item id="destination" onClick={handleItemClick}>Ustaw tu punkt końcowy</Item>
    </Menu>

  </>
  )
  
}
