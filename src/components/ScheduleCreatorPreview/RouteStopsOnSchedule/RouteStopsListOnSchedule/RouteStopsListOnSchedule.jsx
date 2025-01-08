import { createRef, useContext, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

import { useRouteStopsListOnSchedule } from "../../../../hooks/useRouteStopsListOnSchedule"

import styles from './RouteStopsListOnSchedule.module.css'
import CreatorContext from "../../../../context/creator";

export default function RouteStopsListOnSchedule({onLineHeightChange}){
    const {routeStops} = useRouteStopsListOnSchedule();
    const {routeStopsDisplay} = useContext(CreatorContext);
    const refs = useRef([]);
    const nameRefs = useRef([]);
    const [prevRouteStops, setPrevRouteStops] = useState([]);

    useEffect(() => {
        if (routeStopsDisplay && prevRouteStops.length > routeStopsDisplay.length) {
            console.log('Route stops on schedule list: ', routeStopsDisplay)
            const newRefs = refs.current.filter((_, index) => routeStopsDisplay[index]);
            const newNameRefs = nameRefs.current.filter((_, index) => routeStopsDisplay[index]);
            refs.current = newRefs;
            nameRefs.current = newNameRefs;
        }
        if (refs.current.length > 0 && refs.current[refs.current.length - 1]) {
            console.log('Last ref: ', refs.current);
            onLineHeightChange(refs.current[refs.current.length - 1].offsetTop);
        }
        setPrevRouteStops(routeStopsDisplay);

    },[routeStopsDisplay]);



    useEffect(() => {
        if (routeStopsDisplay && routeStopsDisplay.length > 0 && refs.current[refs.current.length - 1]) {
            onLineHeightChange(refs.current[refs.current.length - 1].offsetTop);
        }
    });

    return (
    <div className={styles['route-stops-list']}>
        {routeStopsDisplay && routeStopsDisplay.length > 0 && routeStopsDisplay.map((routeStop, index) => {
            if (!refs.current[index]) {
                refs.current[index] = React.createRef(); 
            }
            if (!nameRefs.current[index]) {
                nameRefs.current[index] = React.createRef(); 
            }
            return (
                <div style={{height: `${nameRefs.current[index]?.offsetHeight || 0}px`}} className={styles['route-stop']} ref={el => refs.current[index] = el}>
                    <span className={styles['travel-time']}>{routeStop.order === 1 ? 'Czas maks.' : (routeStop.timeToTravelInMinutes < 10 ? `0${routeStop.timeToTravelInMinutes}` : routeStop.timeToTravelInMinutes)}</span>
                    <div className={styles.dot}></div>
                    <span className={styles['stop-order']}>{routeStop.order - 1}</span>
                    <span ref={nameSpan => nameRefs.current[index] = nameSpan} className={styles['route-stop-name']}>{routeStop.busStop.name}</span>
                </div>
            );
        })}
        </div>)
};