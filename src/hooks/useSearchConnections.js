import { useState, useContext, useEffect } from "react";
import { useFetchLinesQuery } from "../store/apis/linesApi";
import  MapBehaviorContext  from "../context/mapBehavior";
import UserInterfaceContext from "../context/userInterface";
import MarkersContext from "../context/markers";
import RouteLinePointsContext from "../context/routeLines";
import { addRouteStop } from "../store";
import CurrentDataContext from "../context/currentData";
export function useSearchConnections() {
    const [selectedTab, setSelectedTab] = useState(0);
    const { toggleMarkerAddingOnMapClick } = useContext(MapBehaviorContext);
    const {onHide, onLineSelect, onVariantSelect, onRouteStopSelect, onDepartureSelect, onType, selectedRouteStop} = useContext(UserInterfaceContext);
    const {selectedPoint, getSelectedPoint} = useContext(CurrentDataContext)
    const {removeAllRouteStopMarkers, addRouteStopsMarkers, addRouteStopMarker} = useContext(MarkersContext);
    const {removeAllRouteLinePoints, getRouteLinePoints} = useContext(RouteLinePointsContext);

    const handleTabClick = (number) => {
        console.log('Tab clicked');
        if(selectedTab === number) {
            return;
        }
        setSelectedTab(number);
        onHide(true);
        setTimeout(() => {
            handleTypeChange(number);
        },200);
    }

    const handleLineClick = (lineName) => {
        onLineSelect(lineName);
        onHide(true);
        setTimeout(() => {
            handleTypeChange(2);
        },200);
    }

    const handleVariantClick = (variantId) => {
        onVariantSelect(variantId);
        onHide(true);
        setTimeout(() => {
            handleTypeChange(3);
        },200);
    }

    const handleBackButtonClick = (number) => {
        switch (number) {
            case 0:
                console.log('Selected 0')
                getSelectedPoint(null);
                onHide(true);
                setTimeout(() => {
                    handleTypeChange(number);
                },200);
                break;
            case 1:
                onLineSelect('');
                onHide(true);
                setTimeout(() => {
                    handleTypeChange(number);
                },200);
                break;
            case 2:
                onVariantSelect('');
                removeAllRouteStopMarkers();
                removeAllRouteLinePoints();
                onHide(true);
                setTimeout(() => {
                    handleTypeChange(number);
                },200);
                break;
            case 3:
                onRouteStopSelect('');              
                onHide(true);
                setTimeout(() => {
                    handleTypeChange(number);
                },200);
                break;
            case 4:
                removeAllRouteLinePoints();
                removeAllRouteStopMarkers();
                addRouteStopMarker({coordinate: selectedRouteStop ? selectedRouteStop.busStop.coordinate : selectedPoint.coordinate, order: selectedRouteStop ? selectedRouteStop.order : 1});
                onHide(true);
                setTimeout(() => {
                    handleTypeChange(number);
                },200);
                break;
        }
    }

    const handleRouteStopClick = (routeStop) => {
        onRouteStopSelect(routeStop);
        removeAllRouteLinePoints();
        removeAllRouteStopMarkers();
        addRouteStopMarker({coordinate: routeStop.busStop.coordinate, order: routeStop.order});
        onHide(true);
        setTimeout(() => {
            handleTypeChange(4);
        },200);
    }

    const handleSearchedBusStopClick = () => {
        removeAllRouteLinePoints();
        removeAllRouteStopMarkers();
        onHide(true);
        setTimeout(() => {
            handleTypeChange(4);
        },200);
    }

    const handleDepartureClick = (departure) => {
        onDepartureSelect(departure);
        getRouteLinePoints(departure.variant.routeLinePoints)
        onHide(true);
        setTimeout(() => {
            handleTypeChange(5);
        },200)
    }

    const handleAllDeparturesButtonClick = () => {
        onHide(true);
        setTimeout(() => {
            handleTypeChange(6);
        },200);
    }

    

    const handleTypeChange = (number) => {
        onHide(false);
        if (number === 0) {
            toggleMarkerAddingOnMapClick(true);
            onType('bus-stops')
        } else if (number === 1) {
            toggleMarkerAddingOnMapClick(false);
            onType('lines')
        } else if (number === 2) {
            toggleMarkerAddingOnMapClick(false);
            onType('variants')
        } else if (number === 3) {
            toggleMarkerAddingOnMapClick(false);
            onType('route-stops')
        } else if (number === 4) {
            toggleMarkerAddingOnMapClick(false);
            onType('departures')
        } else if (number === 5) {
            toggleMarkerAddingOnMapClick(false);
            onType('route-stops-with-departures')
        } else if (number === 6) {
            toggleMarkerAddingOnMapClick(false);
            onType('all-departures')
        }
    }

   
    return {selectedTab, handleTypeChange, toggleMarkerAddingOnMapClick, handleSearchedBusStopClick, handleBackButtonClick, handleTabClick, handleLineClick, handleVariantClick, handleRouteStopClick, handleDepartureClick, handleAllDeparturesButtonClick};
}