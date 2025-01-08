import React, { useContext } from 'react';
import { Marker, Popup } from 'react-leaflet';
import routeStopsMarkerIconFile from '../markers/routeStopsMarker.svg';
import MarkersContext from '../../context/markers';

export default function RouteStopsMarkers() {
  const {routeStopsMarkers} = useContext(MarkersContext);
  
  const routeStopMarkerIcon = new L.icon({
      iconUrl: routeStopsMarkerIconFile
    })
    
  return (
    <>
      {routeStopsMarkers && routeStopsMarkers.length > 0 && routeStopsMarkers.map((marker, index) => {
        return (
          <Marker key={index} icon={routeStopMarkerIcon} position={marker.coordinate}>
          </Marker>
        );
      })}
    </>
  );
}