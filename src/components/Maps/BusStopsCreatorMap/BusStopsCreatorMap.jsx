import {useContext, useEffect, useRef} from 'react';
import { MapContainer, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useContextMenu, Menu, Item } from 'react-contexify';

import MarkersContext from '../../../context/markers';
import {useBusStopsCreator} from '../../../hooks/useBusStopsCreator';

import { changeCityName } from '../../../store';

import ZoomControl from "../../MapComponents/ZoomControl";
import BusStopsMarkers from '../../MapComponents/BusStopsMarkers';
import FitBoundsToMarkers from '../../MapComponents/FitBoundsToMarkers';

import NewBusStopMenuHandler from '../../MapComponents/NewBusStopMenuHandler';
import CreateBusStopMarker from '../../MapComponents/CreateBusStopMarker/CreateBusStopMarker';
import NewCreateBusStopHandler from '../../MapComponents/NewCreateBusStopHandler';
import RemoveMarkerWithPopupClose from '../../MapComponents/RemoveMarkerWithPopupClose';
import RemoveCreateBusStopMarker from '../../MapComponents/RemoveCreateBusStopMarker';

import "leaflet/dist/leaflet.css";
import 'react-contexify/dist/ReactContexify.css';
import { ACTIONS } from '../../../constants/actions';
import MapBehaviorContext from '../../../context/mapBehavior';
import CurrentDataContext from '../../../context/currentData';


export default function BusStopsCreatorMap({action}) {
    const { addBusStopMarker, isOpen, busStops, toggleAction, isMapBlocked, getPosition, createBusStopMarker, removeCreateBusStopMarker, isLoading } = useBusStopsCreator();
    const {isContextMenuVisible, changeContextMenuVisibility} = useContext(CurrentDataContext);
    const {showMarkerContextMenu} = useContext(MapBehaviorContext);
    const mapRef = useRef()
    const MENU_ID = "map_context_menu";
    const {show, hideAll} = useContextMenu({
        id: MENU_ID,
      });

    const newBusStopContextMenu = (position, originalEvent) => {
        if (!isContextMenuVisible) {
          showMarkerContextMenu({ x: originalEvent.clientX, y: originalEvent.clientY });
          show({ event: originalEvent, props: { position } });
          changeContextMenuVisibility(true);
          getPosition(position);
        }
        else changeContextMenuVisibility(false);
      };

    function handleItemClick({id, props}) {
        if (id === 'create' ) {
            addBusStopMarker(props.position);
            hideAll();
        }
    }
;
    useEffect(() => {
        toggleAction(action);
    },[action])



    
        if (isLoading) {
            return <div>loading...</div>
        } else return (
            <>
                <MapContainer whenCreated={(mapInstance) => { mapRef.current = mapInstance; }} center={[50.68333, 16.6061]} zoom={11} minZoom={11} style={{cursor: 'default', height: `calc(100vh - 6rem)`, width: `calc(100vw - 18rem)`}} zoomAnimation={true}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <BusStopsMarkers busStops={busStops}/>
                    {createBusStopMarker && <CreateBusStopMarker position={createBusStopMarker}/>}
                    <ZoomControl position="bottomright" />
                    
                    <FitBoundsToMarkers />
                    <NewBusStopMenuHandler newBusStopContextMenu={newBusStopContextMenu} />
                </MapContainer>
                <Menu id={MENU_ID}>
                    <Item id="create" onClick={handleItemClick}>Nowy przystanek</Item>
                </Menu>
            </>
            
        )
    } 
