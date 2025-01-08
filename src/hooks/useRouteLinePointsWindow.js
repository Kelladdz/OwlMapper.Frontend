import { useSelector, useDispatch } from 'react-redux';

import { changeCanHandDraw, removeRouteLinePoint } from '../store/slices/lineCreatorFormSlice';

export function useRouteLinePointsWindow() {
    const canHandDraw = useSelector((state) => state.lineCreatorForm.canHandDraw);
    const routeLinePoints = useSelector((state) => state.lineCreatorForm.routeLinePoints);

    const dispatch = useDispatch();

    const onChangeCanHandDraw = () => {
        dispatch(changeCanHandDraw());
    }

    const onRemoveRouteLinePoint = (point) => {
        dispatch(removeRouteLinePoint(point));
    }

    return {onRemoveRouteLinePoint, onChangeCanHandDraw, canHandDraw, routeLinePoints}
}