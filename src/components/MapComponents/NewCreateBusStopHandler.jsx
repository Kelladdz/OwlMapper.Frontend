import { useMapEvent } from "react-leaflet";

export default function NewCreateBusStopHandler({addBusStopMarker, getPosition}) {
    useMapEvent({
        click: (event) => {
            const { lat, lng } = event.latlng;
            getPosition({ lat, lng });
            addBusStopMarker({ lat, lng });
        }
    })
    return null;
}
