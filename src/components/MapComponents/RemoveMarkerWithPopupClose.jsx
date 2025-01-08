import { useMapEvent } from "react-leaflet";
import { useBusStopsCreator } from "../../hooks/useBusStopsCreator";
import { useContext } from "react";
import MarkersContext from "../../context/markers";

export default function RemoveMarkerWithPopupClose() {
    const {removeCreateBusStopMarker} = useContext(MarkersContext);
    useMapEvent({
        popupclose: () => removeCreateBusStopMarker()
    });
    return null;
}