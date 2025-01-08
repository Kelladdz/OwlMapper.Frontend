import React, { createContext, useContext, useEffect, useState } from 'react';

const MapBehaviorContext = createContext();

function MapBehaviorProvider({children}) {
    const [shouldAddMarkerOnMapClick, setShouldAddMarkerOnMapClick] = useState(true);
    const [markerContextMenuPosition, setMarkerContextMenuPosition] = useState(null);
    const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
    const [markedPlace, setMarkedPlace] = useState(null);
    const [routeStops, setRouteStops] = useState([]);
    

        const toggleMarkerAddingOnMapClick = (flag) => {
            setShouldAddMarkerOnMapClick(flag);
        }

        const showMarkerContextMenu = (position) => {
            setMarkerContextMenuPosition(position);
        }

        const changeContextMenuVisibility = (flag) => {
            setIsContextMenuVisible(flag);
        }

        const getMarkedPlace = (geoData) => {
            setMarkedPlace(geoData);
        }

        const getRouteStops = (routeStops) => {
            setRouteStops(routeStops);
        }

        return <MapBehaviorContext.Provider value={{
            shouldAddMarkerOnMapClick,
            markerContextMenuPosition,
            markedPlace,
            routeStops,
            isContextMenuVisible, changeContextMenuVisibility,
            toggleMarkerAddingOnMapClick,
            showMarkerContextMenu,
            getMarkedPlace,
            getRouteStops}}>
			{children}
			</MapBehaviorContext.Provider>;

}

export { MapBehaviorProvider };
export default MapBehaviorContext;