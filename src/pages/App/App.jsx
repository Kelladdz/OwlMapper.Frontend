
import React, { useEffect, useState, useRef, useCallback, useMemo, useContext } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, useMapEvent, Rectangle, Polyline } from "react-leaflet";
import "leaflet-routing-machine";
import RoutingMachine from "../../components/RoutingMachine";
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import "react-contexify/dist/ReactContexify.css";
import StartMarker from "../../components/MapComponents/StartMarker";
import DestinationMarker from "../../components/MapComponents/DestinationMarker";
import MapSettings from '../../components/MapComponents/MapSettings';
import FlexContainer from "../../components/Containers/FlexContainer/FlexContainer";
import RouteStopsMarkers from '../../components/MapComponents/RouteStopsMarkers';
import ZoomControl from "../../components/MapComponents/ZoomControl";
import { Outlet } from "react-router-dom";
import './App.css';
import Logo from '../../assets/logo.svg';
import Header from "../../components/Header/Header";
import UserInterface from "./UserInterface/UserInterface";
import ApplicationMap from "../../components/Maps/ApplicationMap/ApplicationMap";
import UserInterfaceContext from "../../context/userInterface";
import UserMarkingsList from "../../components/Lists/UserMarkingsList/UserMarkingsList";
import { HEADER_MODES } from "../../constants/headerModes";
export default function App() {
    const {showMarkings, onMarkingsHide, hide} = useContext(UserInterfaceContext);

    const markingsRef = useRef();

    useEffect(() => {
        if(hide && markingsRef.current) {
            console.log('hide', hide)
            const markings = markingsRef.current;
            markings.classList.add('hide');
            setTimeout(() => {
                onMarkingsHide()
            },200);
        }
    },[hide])
    return (
        <>
            <Header mode={HEADER_MODES.user}/>
            <FlexContainer>
                <UserInterface/>
                {showMarkings && <div ref={markingsRef} className='markings'><UserMarkingsList/></div>}
                <ApplicationMap/>
                
            </FlexContainer>
                
        </>
    )
}