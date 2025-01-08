import { useSchedule } from '../../../hooks/useSchedule';

import styles from './ScheduleInfo.module.css';

export default function ScheduleInfo() {
    const {lineNameDisplay, validFromDisplay, destination, currentStop, busStopIdDisplay} = useSchedule();
    return (
        <div className={styles.container}>
            <div className={styles['line-name-box']}>
                <span className={styles['line-name']}>{lineNameDisplay}</span>
            </div>
            <div className={styles['route-info-box']}>
                <span className={styles['valid-from-text']}>Rozkład ważny od {validFromDisplay}</span>
                <span className={styles['destination-title-text']}>KIERUNEK:</span>
                <span className={styles['destination-text']}>{destination}</span>
                <span className={styles['current-stop-title-text']}>PRZYSTANEK:</span>
                <span className={styles['current-stop-text']}>{currentStop}</span>
            </div>
            <span className={styles['bus-stop-id']}>{busStopIdDisplay}</span>
        </div>)
}