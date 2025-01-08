import styles from './RouteLinePointsWindow.module.css';
import RouteLinePointsList from '../Lists/RouteLinePointsList/RouteLinePointsList';
import { useRouteLinePointsWindow } from '../../hooks/useRouteLinePointsWindow';
import RadioBoxInput from '../Inputs/RadioBoxInput/RadioBoxInput';

export default function RouteLinePointsWindow() {
    const {onRemoveRouteLinePoint, onChangeCanHandDraw, canHandDraw, routeLinePoints} = useRouteLinePointsWindow();

    return (
        <div className={styles.window}>
            <div className={styles.container}>
                <span className={styles.label}>Punkty trasy:</span>
                <RouteLinePointsList routeLinePoints={routeLinePoints} onRemoveRouteLinePoint={onRemoveRouteLinePoint}/>
            </div>
            {/* <RadioBoxInput checked={canHandDraw} onChange={onChangeCanHandDraw} label='Rysuj ręcznie'/> */}
        </div>
    )
}