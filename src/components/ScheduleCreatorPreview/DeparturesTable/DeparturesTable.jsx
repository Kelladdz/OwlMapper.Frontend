import { useDepartureTable } from '../../../hooks/useDepartureTable';
import styles from './DeparturesTable.module.css'

export default function DeparturesTable({scheduleDay, label}) {
    const {chunckedWeekDaysDepartureTimes, chunckedSaturdaysDepartureTimes, chunckedSundaysAndHolidaysDepartureTimes} = useDepartureTable(scheduleDay);
    let chunckedAppropriateDepartureTimes; 

    switch(scheduleDay) {
        case 0:
            chunckedAppropriateDepartureTimes = chunckedWeekDaysDepartureTimes;
            break;
        case 1:
            chunckedAppropriateDepartureTimes = chunckedSaturdaysDepartureTimes;
            break;
        case 2:
            chunckedAppropriateDepartureTimes = chunckedSundaysAndHolidaysDepartureTimes;
            break;
        default:
            break;
    }
    return (
        <div className={styles.container}>
            <div className={styles.label}>
                <span className={styles['schedule-days']}>{label}</span>
            </div>
            <div className={styles.grid}>
            {chunckedAppropriateDepartureTimes && chunckedAppropriateDepartureTimes.length === 0 
            ? 
                (<div className={styles.row}>
                        {Array.from({ length: 9 }).map((_, index) => (
                            <span className={styles.time} key={index}></span>
                        ))}
                </div>) 
            : 
                (chunckedAppropriateDepartureTimes && chunckedAppropriateDepartureTimes.map((chunk, rowIndex) => (
                <div className={styles.row} key={rowIndex}>
                {chunk.map((departureTime, index) => {
                    return <span className={styles.time} key={index}>{departureTime}</span>
                    })
                }
                {chunk.length < 9 && Array.from({ length: 9 - chunk.length }).map((_, index) => (
                    <span className={styles.empty} key={index}></span>
                ))}
                </div>)
            ))}
            </div>
        </div>
    )
}