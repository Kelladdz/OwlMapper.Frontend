import { useContext, useEffect } from "react";
import MarkersContext from "../../context/markers";
import { Marker } from "react-leaflet";

export default function CreatorRouteStopsMarkers() {
    const { routeStopsMarkers } = useContext(MarkersContext);
      const commonIcon = order => new L.divIcon({
        html: `<div><p style="font-size: 0.75rem; display: flex; justify-content: center; align-items: center">${order}</p></div>`,
        className: 'common-icon'
    })
    
  return (
    <>
        {routeStopsMarkers.length > 1 ? routeStopsMarkers.map(stop => {
            return <Marker icon={commonIcon(stop.order)} position={stop.coordinate}></Marker>
        }) : routeStopsMarkers.map(stop => {
            return <Marker icon={commonIcon(1)} position={stop.coordinate}></Marker>
        })}
    </>
    
  );
}


