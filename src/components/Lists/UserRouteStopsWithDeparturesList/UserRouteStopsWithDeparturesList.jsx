import {useContext, useEffect, useRef} from 'react';

import { useSearchConnections } from '../../../hooks/useSearchConnections';
import {useUserRouteStopsWithDeparturesList} from '../../../hooks/useUserRouteStopsWithDeparturesList';
import UserInterfaceContext from '../../../context/userInterface';
import styles from './UserRouteStopsWithDeparturesList.module.css';

export default function UserRouteStopsWithDeparturesList() {
    const {selectedDeparture, selectedRouteStop} = useContext(UserInterfaceContext);
    const {variant, isLoading, handleRouteStopClick, departureFromFirstStop} = useUserRouteStopsWithDeparturesList();
    const {handleBackButtonClick} = useSearchConnections();

    const listRef = useRef(null);

    const {hide} = useContext(UserInterfaceContext);

    useEffect(() => {
        if(hide && listRef.current) {
            console.log('hide', hide)
            const list = listRef.current;
            list.classList.add(styles.collapsed);
        }
    },[hide])



    return (
        <div ref={listRef} className={styles.container}>
            <div className={styles.label}>Trasa</div>
            <div className={styles.list}>
                <div>
                    {variant && !isLoading && departureFromFirstStop && variant.variant.routeStops.map((routeStop, index) => {
                        const selectedRouteStopClass = selectedRouteStop.busStopId == routeStop.busStopId ? 'selected-' : ''
                        const [hours, minutes] = departureFromFirstStop.split(':').map(Number);
                        console.log('Hours:', hours, 'Minutes:', minutes);
                        const targetDate = new Date();
                        targetDate.setHours(hours);
                        targetDate.setMinutes(minutes);
                        targetDate.setMinutes(targetDate.getMinutes() + routeStop.timeToTravelInMinutes)
                        
                         
                        const arrivalTimeString = `${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`;
                        console.log(arrivalTimeString);   
                        return (
                        <div key={routeStop.id} className={styles[`route-stop-box`]}>
                            <div className={styles['line-box']}>
                            {index < variant.variant.routeStops.length - 1 && <div className={styles.time}>{variant.variant.routeStops[index + 1].timeToTravelInMinutes} min</div>}
                                <div className={styles.line}></div>
                                <div className={styles.dot}></div>
                            </div>
                            <div onClick={() => handleRouteStopClick(routeStop)}  className={styles[`${selectedRouteStopClass}route-stop`]}>
                                {routeStop.busStop.name}
                            </div>
                            <div className={styles['departure-time']}>{arrivalTimeString}</div>
                        </div>
                    )
                    })}
                </div>
            </div>
            <div onClick={() => handleBackButtonClick(4)} className={styles.btn}>Wróć</div>
        </div>
    )
}