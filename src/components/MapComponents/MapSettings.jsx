import { useMap } from "react-leaflet";

export default function MapSettings() {
    const map = useMap();

    map.setMaxBounds(map.getBounds());
}