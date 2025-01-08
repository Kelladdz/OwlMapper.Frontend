import { useContext, useState } from "react";
import { useContextMenu } from "react-contexify";
import MapBehaviorContext from "../context/mapBehavior";
import MarkersContext from "../context/markers";
import CurrentDataContext from "../context/currentData";
import axios from "axios";

export function useApplicationMap() {
    const {addStartMarker, addDestinationMarker} = useContext(MarkersContext);
    const {showMarkerContextMenu, changeContextMenuVisibility, isContextMenuVisible} = useContext(MapBehaviorContext);
    const {typeStartPoint, typeDestinationPoint} = useContext(CurrentDataContext);

    const [selectedPlace, setSelectedPlace] = useState(null);

    const MENU_ID = "map_context_menu";

    const {show, hideAll} = useContextMenu({
        id: MENU_ID,
      });

    const newBusStopContextMenu = (position, originalEvent) => {
        if (!isContextMenuVisible) {
          showMarkerContextMenu({ x: originalEvent.clientX, y: originalEvent.clientY });
          show({ event: originalEvent, props: { position } });
          getPosition(position);
          changeContextMenuVisibility(true);
        }
        else changeContextMenuVisibility(false);
      };

    const getPosition = async (coords) => {
        const response = await axios.get(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${coords.lng}&latitude=${coords.lat}&access_token=pk.eyJ1Ijoia2VsbGFkZHoiLCJhIjoiY2x4bzNpM253MDllODJycXIxb21oczh5cSJ9.YYYTdxFLA39oDTsFgRdmsg`)
        console.log(response);
        const data = response.data.features[0];
        console.log(data);
        const selectedPointName = data.properties.context.address ? `${data.properties.context.place.name}, ${data.properties.context.address.name}` : "Zaznaczone miejsce";
        setSelectedPlace({
            name: selectedPointName,
            coordinate: L.latLng([coords.lat, coords.lng])
        });    
    };

    const handleItemClick = ({id}) => {
        if (id === 'start' ) {
                addStartMarker(L.latLng(markedPlace.coordinate.lat, markedPlace.coordinate.lng));
                typeStartPoint(selectedPlace);
              } else {
                addDestinationMarker(L.latLng(markedPlace.coordinate.lat, markedPlace.coordinate.lng));
                typeDestinationPoint(selectedPlace);
              } 
        changeContextMenuVisibility(false)
    }

    const flyToRouteStop = (routeStop) => {
        console.log('Route stop: ', routeStop);
    }

    return { MENU_ID, show, hideAll, newBusStopContextMenu, handleItemClick, flyToRouteStop};
}