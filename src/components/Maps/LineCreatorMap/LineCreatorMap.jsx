import { MapContainer, TileLayer, Polyline, useMap, useMapEvents, Pane } from 'react-leaflet';
import ZoomControl from "../../MapComponents/ZoomControl";
import MarkersContext from '../../../context/markers';
import { useContext, useState, useEffect } from 'react';
import CreatorRouteStopsMarkers from '../../markers/CreatorRouteStopMarkers';
import RouteLinePointMarkers from '../../markers/RouteLinePointsMarkers';
import RoutingMachine from '../../RoutingMachine';
import { useSelector } from 'react-redux';

import FitBoundsToMarkers from '../../MapComponents/FitBoundsToMarkers';
import NewRouteLinePointHandler from '../../MapComponents/NewRouteLinePointHandler';
import "leaflet/dist/leaflet.css";

import styles from './LineCreatorMap.module.css';

const IsMapLoaded = ({ onShowLines, onHideLines }) => {
    useMapEvents({
        zoomend: () => {
            onShowLines();
        },
        zoomstart: () => {
            onHideLines();
        }
    });
    return null;
};

export default function LineCreatorMap() { 
    const { routeStopsMarkers } = useContext(MarkersContext); 
    const routeLinePoints = useSelector(state => state.lineCreatorForm.routeLinePoints); 
    const [showLines, setShowLines] = useState(false); 

    

    const onShowLines = () => { 
        setShowLines(true); 
    }

    const onHideLines = () => { 
        setShowLines(false); 
    }





    return (
        <>
            <MapContainer center={[50.68333, 16.6061]} zoom={11} minZoom={11} style={{cursor: 'default', height: `calc(100vh - 6rem)`, width: `calc(100vw - 68.5rem)`}} zoomAnimation={true}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {routeStopsMarkers.length !== 0 && <CreatorRouteStopsMarkers />}
                    {routeLinePoints.length > 0 && 
                    <Pane style={{ zIndex: 1000 }}>
                        <RoutingMachine showLines={showLines} routeLine={routeLinePoints} />
                    </Pane>}
                <ZoomControl position="bottomright" />
                <FitBoundsToMarkers />
                <NewRouteLinePointHandler />
                <IsMapLoaded onShowLines={onShowLines} onHideLines={onHideLines}/>
            </MapContainer>
        </>
        
    )
}