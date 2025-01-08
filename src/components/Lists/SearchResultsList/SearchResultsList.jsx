import { useContext, useEffect, useRef, useState } from 'react';

import { useConnectionsSearchInput } from '../../../hooks/useConnectionsSearchInput';

import BusStopSearchIcon from '../../../assets/busStopSearchIcon.svg';

import styles from './SearchResultsList.module.css';
import UserInterfaceContext from '../../../context/userInterface';
import { useSearchResultsList } from '../../../hooks/useSearchResultsList';

export default function SearchResultsList() {
    
    const {matchedBusStops, matchedAddresses, startPoint, destinationPoint, onStopPick} = useSearchResultsList();

    return (
        <div className={styles.container}>
            <div className={styles.list}>
            {matchedBusStops && matchedBusStops.length > 0 && 
            matchedBusStops.map(stop => {
                const uniqueLineNames = stop.busStop.routeStops 
                    ? [...new Set(stop.busStop.routeStops.map(rs => rs.variant.line.name))] : null;
                const busStopNameDisplay = stop.busStop.name.includes(stop.busStop.city) ? stop.busStop.name : `${stop.busStop.city} ${stop.busStop.name}`;
                      
                      return <div className={styles.item} key={stop.busStop.id} onClick={() => {
                        onStopPick(stop);
                    }}>
                        <img className={styles.icon} src={BusStopSearchIcon} alt='Bus Stop Search Icon'/>
                        <div className={styles.info}>
                            <span className={styles['primary-info']}>{busStopNameDisplay}</span>
                            <span className={styles['secondary-info']}>Przystanek, Linie: {uniqueLineNames.join(', ').slice(0, -1)}</span>
                        </div>
                    </div>
                    })
                }
            </div>
        </div>
    )
}