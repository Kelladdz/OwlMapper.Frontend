import { useContext, useEffect, useRef, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

import busStopMarkerIconFile from '../../markers/busStopMarker.svg';
import BusStopForm from '../../../forms/BusStopForm/BusStopForm';


import 'leaflet/dist/leaflet.css';
import styles from './CreateBusStopMarker.module.css';
import { useBusStopsCreator } from '../../../hooks/useBusStopsCreator';
import RemoveCreateBusStopMarker from '../RemoveCreateBusStopMarker';
import MarkersContext from '../../../context/markers';

export default function CreateBusStopMarker({ position }) {
  const {isOpen, showForm} = useBusStopsCreator();
  const {removeCreateBusStopMarker} = useContext(MarkersContext);
    const markerRef = useRef(null);

    
    const busStopMarkerIcon = new L.icon({
        iconUrl: busStopMarkerIconFile
      })


    useEffect(() => {
        if(markerRef.current){
            markerRef.current.openPopup();
        }
    },[markerRef.current])

  return (
    <>
          <Marker eventHandlers={{
            popupclose: () => removeCreateBusStopMarker()
          }} className={styles.marker} ref={markerRef} icon={busStopMarkerIcon} position={position}>
            <Popup closeOnClick={false} closeButton={true} className={styles.popup}>
            <div>
            <BusStopForm position={position}/>
            </div>
            </Popup>
          </Marker>
    </>
  );
}