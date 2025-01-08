import {useContext} from 'react';
import { Marker, Popup } from 'react-leaflet';

import MarkersContext from '../../context/markers';

import startMarkerIconFile from '../markers/startMarker.svg';
import busStopMarkerIconFile from '../markers/busStopMarker.svg';

export default function StartMarker() {
  const {startMarker} = useContext(MarkersContext);

    const startMarkerIcon = new L.icon({
        iconUrl: startMarkerIconFile,
        iconSize: [50, 50]
      })

  return (
    <>
          {startMarker && 
          <Marker icon={startMarkerIcon} position={[startMarker[0] + 0.000100, startMarker[1]]}></Marker>}
    </>
  );
}