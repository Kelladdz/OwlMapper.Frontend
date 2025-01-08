import { useMap } from 'react-leaflet'


export default function ZoomControl({ position }) {
    const map = useMap();
    map.zoomControl.setPosition(position);
    return null;
}