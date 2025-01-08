import { useMapEvent } from "react-leaflet";
import { useDispatch, useSelector } from 'react-redux';

import { addRouteLinePoint } from '../../store/slices/lineCreatorFormSlice';

export default function NewRouteLinePointHandler() {
    const dispatch = useDispatch();
    const routeLinePoints = useSelector(state => state.lineCreatorForm.routeLinePoints);
    const canHandDraw = useSelector(state => state.lineCreatorForm.canHandDraw);
    useMapEvent({
        click: (event) => {
            const { lat, lng } = event.latlng;
            const isManuallyAdded = canHandDraw;   
            dispatch(addRouteLinePoint({coordinate: { lat, lng }, isManuallyAdded: isManuallyAdded, order: routeLinePoints.length + 1}));
    }
  })
  return null;
}