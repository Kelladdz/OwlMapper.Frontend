import RouteLinePointsContext from "../../context/routeLines";
import { useContext } from "react";
import { Marker } from "react-leaflet";
import L from 'leaflet';
import '../../App.css';
import { useSelector } from "react-redux";

export default function RouteLinePoints() {
    const routeLinePoints = useSelector(state => state.lineCreatorForm.routeLinePoints);
    
    const routeLinePointIcon = new L.divIcon({
      html: `<div></div>`,
      className: 'route-line-point-icon'
  })
  
    return (
    <>
        {routeLinePoints.map(point => {
            return <Marker icon={routeLinePointIcon} position={point.coordinate}></Marker>
        })}
    </>
    
    );
}


