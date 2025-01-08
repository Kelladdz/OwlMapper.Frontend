import { useSchedule } from '../../../hooks/useSchedule';

import styles from './DeparturesTable.module.css'

export default function DeparturesTable({scheduleDay, label}) {
    const {chunckedAppropriateDepartureTimes} = useSchedule(scheduleDay);
    
    return (
        <>
            <div className={styles.label}>
                <span className={styles['schedule-days']}>{label}</span>
            </div>
            <div className={styles.grid}>
            {chunckedAppropriateDepartureTimes.length === 0 
            ? 
                (<div className={styles.row}>
                        {Array.from({ length: 9 }).map((_, index) => (
                            <span className={styles.time} key={index}></span>
                        ))}
                </div>) 
            : 
                (chunckedAppropriateDepartureTimes.map((chunk, rowIndex) => (
                <div className={styles.row} key={rowIndex}>
                {chunk.map((departureTime, index) => {
                    return <span className={styles.time} key={index}>{departureTime}</span>
                    })
                }
                {chunk.length < 9 && Array.from({ length: 9 - chunk.length }).map((_, index) => (
                    <span className={styles.time} key={`empty-${index}`}></span>
                ))}
                </div>)
            ))}
            </div>
        </>
    )
}