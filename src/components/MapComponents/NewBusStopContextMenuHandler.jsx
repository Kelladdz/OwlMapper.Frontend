import { useMapEvent } from "react-leaflet";

export default function NewBusStopContextMenuHandler({busStopContextMenu}) {
    useMapEvent({
        click: (event) => {
          const { latlng, originalEvent } = event;
          busStopContextMenu(latlng, originalEvent);
        }
  })
  return null;
}
