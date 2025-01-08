import { useMapEvent } from "react-leaflet"

export default function GetPosition({getPosition}) {
    useMapEvent({
        click: (event) => { 
          const { lat, lng } = event.latlng;
          getPosition({ lat, lng });
        }
    })
}