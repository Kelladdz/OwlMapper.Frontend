import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import routeStopsMarkerIconFile from '../markers/routeStopsMarker.svg';

export default function CreatorRouteStopsMarkers({markers}) {
    const busStopsMarkerIcon = new L.icon({
        iconUrl: routeStopsMarkerIconFile
      })
  return (
    <>
      {routeStops && routeStops.map((routeStop) => {
        let busStopFullName = `${routeStop.busStop.city} ${routeStop.busStop.name} (${routeStop.busStop.id})`;
        busStopFullName.split(' ')[0] === busStopFullName.split(' ')[1] ? busStopFullName = `${routeStop.busStop.name} (${routeStop.busStop.id})` : busStopFullName = busStopFullName;

        return (
          <Marker key={routeStop.busStop.id} icon={busStopsMarkerIcon} position={routeStop.busStop.coordinate}>
            <Popup>{routeStop.busStop.city} {routeStop.busStop.name} ({routeStop.busStop.id})</Popup>
          </Marker>
        );
      })}
    </>
  );
}