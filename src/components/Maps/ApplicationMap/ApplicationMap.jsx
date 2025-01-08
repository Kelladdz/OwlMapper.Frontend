import { useState, useContext } from "react"
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet"
import { useContextMenu, Menu, Item, Separator } from 'react-contexify';

import MapSettings from "../../MapComponents/MapSettings"
import FitBoundsToMarkers from "../../MapComponents/FitBoundsToMarkers"
import StartMarker from "../../MapComponents/StartMarker"
import DestinationMarker from "../../MapComponents/DestinationMarker"
import ZoomControl from "../../MapComponents/ZoomControl"
import NewBusStopMenuHandler from "../../MapComponents/NewBusStopMenuHandler"

import MapBehaviorContext from "../../../context/mapBehavior"

import { useApplicationMap } from "../../../hooks/useApplicationMap";

import "leaflet/dist/leaflet.css";
import RouteLinePointsContext from "../../../context/routeLines";
import RouteStopsMarkers from "../../MapComponents/RouteStopsMarkers";
import UserRoutingMachine from "../../UserRoutingMachine";

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

export default function ApplicationMap() {
    const { MENU_ID,  handleItemClick} = useApplicationMap();
    const { shouldAddMarkerOnMapClick } = useContext(MapBehaviorContext);   
    const {routeLinePoints} = useContext(RouteLinePointsContext);
    const [showLines, setShowLines] = useState(true); 

    const onShowLines = () => { 
        setShowLines(true); 
    }

    const onHideLines = () => { 
        setShowLines(false); 
    }

    return (
        <>
            <MapContainer center={[50.68333, 16.6061]} zoom={11} minZoom={11} style={{zIndex: '0', height: `calc(100vh - 6rem)`, width: `calc(100vw - 30rem)`}} zoomAnimation={true}
            fadeAnimation={true}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              
                <FitBoundsToMarkers/>
                <ZoomControl position="bottomright" />
                <StartMarker />
                <DestinationMarker />
                <IsMapLoaded onShowLines={onShowLines} onHideLines={onHideLines}/>
                {shouldAddMarkerOnMapClick && <NewBusStopMenuHandler />}
                {routeLinePoints && <UserRoutingMachine routeLine={routeLinePoints} showLines={showLines}/>}
                {/* <BusStopsMarkers busStops={busStops}/> */}
                <RouteStopsMarkers/>
                {/*routeLinePoints ? routeLinePoints.filter(point => !point.isManuallyAdded).sort((a,b) => a.order - b.order).map(point => <RoutingMachine routeLine={routeLinePoints} />) : null}  */}
                {/* {currentVariant 
                && 
                <>
                    {currentVariant.routeStops.map(stop => <Marker icon={defaultIcon} position={L.latLng(stop.busStop.coordinate.lat, stop.busStop.coordinate.lng)}></Marker>)}
                    {currentVariant.routeLinePoints.sort((a, b) => a.order - b.order).map(point => <RoutingMachine routeLine={currentVariant.routeLinePoints}/>)}
                </>}
                //{destinationMarker ? <Marker icon={destinationIcon} position={destinationMarker} /> : null}
                {currentStop && <Marker icon={customIcon} position={currentStop}/>}
                {(markers.length !== 0 || (startMarker && destinationMarker)) && routeLine.length !== 0 ? <RoutingMachine key={currentStop} currentStop={currentStop} markers={markers} routeLine={routeLine}/> : null}
                {markers.length !== 0 ? 
                (currentStop ? markers.filter(marker => marker.lat !== currentStop.lat && marker.lng !== currentStop.lng).map(marker => <Marker icon={defaultIcon} position={marker}></Marker>) 
                : (routeLine.length === 0 ? markers.map(marker => <Marker icon={commonIcon('D')} position={marker}></Marker>) : markers.map(marker => <Marker icon={defaultIcon} position={marker}></Marker>)))
                : null}
                <SaveMapState currentStop={currentStop}/>
                {addMarkers ? <NewMarkerMenuHandler markerMenu={handleMenuClick} /> : null}
                {busStopCreateMode 
                ? 
                <>
                <NewBusStopHandler addBusStopMarker={addBusStopMarker}/>
                {busStopMarker ? <Marker icon={startIcon} position={busStopMarker} /> : null}
                </> : null}
                {newRouteStopsMarkers ? newRouteStopsMarkers.map(marker => <Marker icon={commonIcon(marker.order)} position={marker.coords}></Marker>) : null}
                {lineEditMode
                ?
                <>
                <NewRouteLineHandler addRouteLineMarker={addRouteLineMarker}/>
                {routeLine.length !== 0
                ? 
                <>
                    {routeLine.map(point => <Marker icon={startIcon} position={point.coordinate}></Marker>)}
                    {routeLine.length > 1 ? <RoutingMachine routeLine={routeLine}/> : null}
                </>
                : null}
                </> : null}
                {manuallyAddedPoints.length !== 0
                ? 

                
                <>
                    <Polyline positions={[routeLine.filter(point => !point.isManuallyAdded).reduce((prev, current) => (prev.order > current.order) ? prev : current).coordinate, manuallyAddedPoints[0].coordinate]} color="#6FA1EC" weight='4'/>
                    <Polyline positions={manuallyAddedPoints.map(point => point.coordinate)} color="#6FA1EC" weight='4'/> 
                </>
                :
                null}
                

                
                <StaticInit setInitialRender={setInitialRender}/> 
                <GetPositionHandler getPosition={getPosition} /> */}
                
            </MapContainer>
                <Menu id={MENU_ID}>
                    <Item id="start" onClick={handleItemClick}>Ustaw tu punkt początkowy</Item>
                    <Separator />
                    <Item id="destination" onClick={handleItemClick}>Ustaw tu punkt końcowy</Item>
                </Menu>
        </>)
        

}