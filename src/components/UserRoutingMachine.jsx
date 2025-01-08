
import React, { useEffect, useState } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import styles from './UserRoutingMachine.module.css'; // Zakładam, że styl masz już gotowy
import { useRouteLinePointsWindow } from "../hooks/useRouteLinePointsWindow";

function createRoutineMachineLayer({ routeLine }) {
  
  // Konwersja punktów na obiekty L.latLng
  const latLngApiRouteLine = routeLine
    .map(point => L.latLng(point.coordinate))
    .sort((a, b) => a.order - b.order);


  
    const plan = L.Routing.plan(latLngApiRouteLine,
      {createMarker: function(i, wp) {}})
    
  const instance = L.Routing.control({
    plan: plan,
    lineOptions: {
      styles: [{ color: '#0056D8', weight: 5 }],
    },
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: true,
    fitSelectedRoutes: false,
    showAlternatives: false,
    router: L.Routing.mapbox('pk.eyJ1Ijoia2VsbGFkZHoiLCJhIjoiY2x4bzNpM253MDllODJycXIxb21oczh5cSJ9.YYYTdxFLA39oDTsFgRdmsg'),
    
       // Domyślny styl linii
    });






  return instance;
}


const UserRoutingMachine = ({ routeLine, showLines }) => { 
  const [routingLayer, setRoutingLayer] = useState(null); 
  const map = useMap();

  useEffect(() => { 

    if (routingLayer) { 
      map.removeControl(routingLayer); 
    }
    if (routeLine.length > 0 && showLines) {
      const newRoutingLayer = createRoutineMachineLayer({ routeLine });
      setRoutingLayer(newRoutingLayer);
      map.addControl(newRoutingLayer);
    } else {
      setRoutingLayer(null);
    }
    
    return () => {
      if (routingLayer) {
        map.removeControl(routingLayer);
      }
    };
  }, [routeLine, map, showLines]);

  return null; }
  ;

export default UserRoutingMachine;

// const createPolylineLayerFromRouting = (routingLayer) => {
//   const route = routingLayer.getRouter().route;
//   const coordinates = route[0].coordinates.map(coord => L.latLng(coord.lat, coord.lng));
//   return L.polyline(coordinates, { color: 'blue', weight: 5 });
// };

// const RoutingMachine = ({ routeLine }) => { 
//   const {canHandDraw} = useRouteLinePointsWindow();
//   console.log(routeLine) 
//   const [routingLayer, setRoutingLayer] = useState(null); 
//   const [points, setPoints] = useState([routeLine]);
//   const map = useMap();
//   const layers = new L.LayerGroup([]);

//   useEffect(() => { 
//     if (routingLayer) { 
//       map.removeControl(routingLayer); 
//     }
    
  
//     if (routeLine.length > 1) {
//       if (!canHandDraw) {
//       const newRoutingLayer = createRoutineMachineLayer({ routeLine });
//       setRoutingLayer(newRoutingLayer);
//       layers.addLayer(newRoutingLayer);
//       map.addControl(newRoutingLayer);
      
//     } else {
//       setRoutingLayer(null);
//     }
    
//     return () => {
//       if (routingLayer) {
//         map.removeControl(routingLayer);
//       }
//     };

//   }, [routeLine, canHandDraw, map]);

//   useEffect(() => {
//     if (!canHandDraw && routingLayer) {
//       map.addControl(routingLayer);
//       setPoints([])
//     } else if (canHandDraw && routingLayer) {
//       map.addControl(routingLayer);
//       setPoints([])
//     }
//   },[points])

//   useEffect(() => {
//     if (routingLayer) {
//       map.removeControl(routingLayer);
//       setPoints([])

//     }
//   },[canHandDraw])

//   return null; };
  
//   export default RoutingMachine;

// const RoutingMachine = ({ route }) => {
//   const [routingLayer, setRoutingLayer] = useState();
//   const map = useMap();

//   useEffect(() => {


//     if (!route || !route.routeLine) {
//       console.error('Invalid route data:', route);
//       return;
//     }

//     const routeLine = route.routeLine.filter(point => point.coordinate);

//     if (routeLine.length > 0) {
//       const newRoutingLayer = createRoutineMachineLayer(routeLine);
//       map.addControl(newRoutingLayer);
//       console.log(newRoutingLayer);
//       setRoutingLayer(newRoutingLayer);
//     } else {
//       console.warn('No valid route points found');
//     }

//     return () => {
//       if (routingLayer) {
//         console.log('Cleaning up routing layer');
//         console.log(routingLayer);
//         map.removeControl(routingLayer);
//       }
//     };
//   }, [route, map]);

//   return null;
// };

  
// export default RoutingMachine;

