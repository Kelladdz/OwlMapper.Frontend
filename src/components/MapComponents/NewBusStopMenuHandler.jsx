import { useMapEvent } from "react-leaflet";
import { useApplicationMap } from "../../hooks/useApplicationMap";

export default function NewBusStopMenuHandler() {
    const {newBusStopContextMenu} = useApplicationMap();
    useMapEvent({
        contextmenu: (event) => {
          const { latlng, originalEvent } = event;
          newBusStopContextMenu(latlng, originalEvent);
        }
      });
      return null;
}