import { useEffect, useRef } from 'react';

import MinusSign from '../../../assets/minusSign.svg';
import ManuallyAddedIcon from '../../../assets/manuallyAddedIcon.svg';

import styles from './RouteLinePointsList.module.css';

export default function RouteLinePointsList({routeLinePoints, onRemoveRouteLinePoint}) {
    const listRef = useRef(null)

    const scrollToBottom = () => {
        listRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [routeLinePoints]);
    return (
    <div ref={listRef} className={styles.container}>
        {routeLinePoints && routeLinePoints.map((point, index) => {
            return (
                <div className={styles['route-line-point']}>
                    <span className={styles.order}>{point.order}.</span>
                    <span className={styles.values}>{point.coordinate.lat.toFixed(6)}, {point.coordinate.lng.toFixed(6)}</span>
                    {point.isManuallyAdded && <img className={styles['manually-added-icon']} src={ManuallyAddedIcon} alt='manually-added-icon'/>}
                    {index === routeLinePoints.length - 1 && <div className={styles['delete-btn']} onClick={() => (onRemoveRouteLinePoint(point.order))}>
                        <img className={styles['minus-sign']} src={MinusSign} alt='minus-sign'/>
                    </div>}
                </div>)
        })}</div>  
    )
}