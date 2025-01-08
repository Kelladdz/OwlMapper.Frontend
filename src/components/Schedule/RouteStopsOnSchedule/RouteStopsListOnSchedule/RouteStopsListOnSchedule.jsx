import { createRef, useEffect, useRef, useState } from "react"

import { useSchedule } from "../../../../hooks/useSchedule"

import styles from './RouteStopsListOnSchedule.module.css'

export default function RouteStopsListOnSchedule({onLineHeightChange}){
    const refs = useRef([]);
    const nameRefs = useRef([]);
    const [prevRouteStops, setPrevRouteStops] = useState([]);

    const {routeStops} = useSchedule();

    useEffect(() => {
        if (routeStops && prevRouteStops.length > routeStops.length) {
            const newRefs = refs.current.filter((_, index) => routeStops[index]);
            const newNameRefs = nameRefs.current.filter((_, index) => routeStops[index]);
            refs.current = newRefs;
            nameRefs.current = newNameRefs;
        }
        if (refs.current.length > 0) {
            onLineHeightChange(refs.current[refs.current.length - 1].offsetTop);
        }
        setPrevRouteStops(routeStops);
    },[routeStops]);



    useEffect(() => {
        if (routeStops && routeStops.length > 0) {
            onLineHeightChange(refs.current[refs.current.length - 1].offsetTop);
        }
    });
    

    return (
    <div className={styles['route-stops-list']}>
        {routeStops && routeStops.map((routeStop, index) => {
            if (!refs.current[index]) {
                refs.current[index] = React.createRef(); 
            }
            if (!nameRefs.current[index]) {
                nameRefs.current[index] = React.createRef(); 
            }
            return (
                <div style={{height: `${nameRefs.current[index].offsetHeight}px`}} className={styles['route-stop']} ref={el => refs.current[index] = el}>
                    <span className={styles['travel-time']}>{routeStop.order === 1 ? 'Czas maks.' : (routeStop.timeToTravelInMinutes < 10 ? `0${routeStop.timeToTravelInMinutes}` : routeStop.timeToTravelInMinutes)}</span>
                    <div className={styles.dot}></div>
                    <span className={styles['stop-order']}>{routeStop.order - 1}</span>
                    <span ref={nameSpan => nameRefs.current[index] = nameSpan} className={styles['route-stop-name']}>{routeStop.name.split('(')[0]}</span>
                </div>
            );
        })}
        </div>)
};