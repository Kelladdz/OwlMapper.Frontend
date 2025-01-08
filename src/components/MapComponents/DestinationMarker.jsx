import {useContext} from 'react';
import { Marker, Popup } from 'react-leaflet';

import MarkersContext from '../../context/markers';

import destinationIconFile from '../markers/destinationMarkerThree.svg';

export default function DestinationMarker() {
  const {destinationMarker} = useContext(MarkersContext);
    const destinationMarkerIcon = new L.icon({
        iconUrl: destinationIconFile,
        iconSize: [50, 50],
        iconAnchor: [25, 50]
      })
  return (
    <>
          {destinationMarker && 
          <Marker icon={destinationMarkerIcon} position={destinationMarker}></Marker>}
    </>
  );
}