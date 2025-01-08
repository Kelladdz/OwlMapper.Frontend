import React, {useRef, useState, useEffect} from 'react';
import { Marker, Pane, Popup, useMapEvent } from 'react-leaflet';
import busStopMarkerIconFile from '../markers/busStopMarker.svg';
import { useLocation } from 'react-router-dom';
import BusStopForm from '../../forms/BusStopForm/BusStopForm';

import { ACTIONS } from '../../constants/actions';

import styles from './CreateBusStopMarker/CreateBusStopMarker.module.css';
import { useBusStopsCreator } from '../../hooks/useBusStopsCreator';
import { useDispatch } from 'react-redux';
import { changeBusStopName, changeCityName} from '../../store/slices/busStopCreatorFormSlice'


export default function BusStopsMarkers({busStops}) {
    const dispatch = useDispatch

    const busStopMarkerIcon = new L.icon({
        iconUrl: busStopMarkerIconFile
      })



  return (
    <>
      {busStops && busStops.map((busStop) => {
        let busStopFullName = `${busStop.busStop.city} ${busStop.busStop.name} (${busStop.busStop.id})`;
        busStopFullName.split(' ')[0] === busStopFullName.split(' ')[1] ? busStopFullName = `${busStop.busStop.name} (${busStop.busStop.id})` : busStopFullName = busStopFullName;

        return (
          <Marker key={busStop.busStop.id} icon={busStopMarkerIcon} position={busStop.busStop.coordinate}>
            <Popup eventHandlers={{
              popupclose: () => {
                dispatch(changeCityName(''));
              dispatch(changeBusStopName(''));
              }
            }} closeOnClick={false} closeButton={true} className={styles.popup}>
              <div>

                <BusStopForm busStop={busStop}/>

              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}