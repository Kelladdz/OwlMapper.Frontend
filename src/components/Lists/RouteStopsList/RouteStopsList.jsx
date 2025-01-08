import { useEffect, useRef } from 'react';

import { useRouteStopsList } from '../../../hooks/useRouteStopsList';

import MinusSign from '../../../assets/minusSign.svg';

import styles from './RouteStopsList.module.css';

export default function RouteStopsList() {
    const {onRemoveRouteStop, items} = useRouteStopsList();
    const listRef = useRef(null)

    const scrollToBottom = () => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [items]);

    return (
        <div ref={listRef} className={styles.container}>
            <label className={styles.label}>Przystanki na trasie:</label>
            {items && items.map((item, index) => {
                return (
                    <div key={index} className={styles['route-stop']}>
                        <div className={styles.time}>{item.timeToTravelDisplay}</div>
                        <div className={styles.order}>{item.order}.</div>
                        <div className={styles.name}>{item.name}</div>
                        <div onClick={() => {onRemoveRouteStop(item)}} className={styles['delete-btn']}>
                            <img className={styles['minus-sign']} src={MinusSign} alt='minus-sign'/>
                        </div>
                        
                    </div>
                )
            })}    
        </div>
    )
}