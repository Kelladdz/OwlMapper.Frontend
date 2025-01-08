import { useMapEvent } from "react-leaflet";

export default function RemoveCreateBusStopMarker({removeCreateBusStopMarker}) {
    useMapEvent({
        click: () => removeCreateBusStopMarker()
        
    })
    return null;
}