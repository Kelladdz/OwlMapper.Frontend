import {useContext, useEffect, useRef} from 'react';

import { useSearchConnections } from '../../../hooks/useSearchConnections';
import {useUserRouteStopsList} from '../../../hooks/useUserRouteStopsList';
import UserInterfaceContext from '../../../context/userInterface';
import styles from './UserRouteStopsList.module.css';

export default function UserRouteStopsList() {
    const {variant, isLoading, handleMouseEnterOnRouteStop} = useUserRouteStopsList();
    const {handleRouteStopClick, handleBackButtonClick} = useSearchConnections();

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
                    {variant && variant.variant && !isLoading ? variant.variant.routeStops.map((routeStop, index) => {
                    return (
                        <div key={routeStop.id} className={styles['variant-box']}>
                            <div className={styles['line-box']}>
                            {index < variant.variant.routeStops.length - 1 && <div className={styles.time}>{variant.variant.routeStops[index + 1].timeToTravelInMinutes} min</div>}
                                <div className={styles.line}></div>
                                <div className={styles.dot}></div>
                            </div>
                            <div onClick={() => handleRouteStopClick(routeStop)} onMouseEnter={() => handleMouseEnterOnRouteStop(routeStop.busStop.coordinate)}  className={styles.route}>
                                {routeStop.busStop.name}
                            </div>
                        </div>
                    )
                    }) : <div>...Loading</div>}
                </div>
            </div>
            <div onClick={() => handleBackButtonClick(2)} className={styles.btn}>Wróć</div>
        </div>
    )
}