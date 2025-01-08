import { useContext } from 'react';
import { useScheduleInfoPreview } from '../../../hooks/useScheduleInfoPreview.js';

import styles from './ScheduleInfo.module.css';
import CreatorContext from '../../../context/creator';

export default function ScheduleInfo() {
    const {lineName, validFrom} = useScheduleInfoPreview();
    const {destination, currentStop} = useContext(CreatorContext);
    
    return (
        <div className={styles.container}>
            <div className={styles['line-name-box']}>
                <span className={styles['line-name']}>{lineName}</span>
            </div>
            <div className={styles['route-info-box']}>
                <span className={styles['valid-from-text']}>Rozkład ważny od {validFrom}</span>
                <span className={styles['destination-title-text']}>KIERUNEK:</span>
                {destination && <span className={styles['destination-text']}>{destination.busStop.name}</span>}
                <span className={styles['current-stop-title-text']}>PRZYSTANEK:</span>
                {currentStop && <span className={styles['current-stop-text']}>{currentStop.busStop.name}</span>}
            </div>
            {currentStop && <span className={styles['bus-stop-id']}>{currentStop.busStopId}</span>}
        </div>)
}