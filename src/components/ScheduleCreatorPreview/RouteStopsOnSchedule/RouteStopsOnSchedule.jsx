import { useRef, useEffect, useState } from 'react';

import { useSchedule } from '../../../hooks/useSchedule';

import RouteStopsListOnSchedule from './RouteStopsListOnSchedule/RouteStopsListOnSchedule'

import styles from './RouteStopsOnSchedule.module.css';


export default function RouteStopsOnSchedule() {


    const [lineHeight, setLineHeight] = useState(0);



    const getLineHeight = (height) => {
        setLineHeight(height);
    }

    useEffect(() => {
        return () => {
            setLineHeight(0);
        }
    },[lineHeight]);
    return (
    <div className={styles['route-stops-box']}>
        <span className={styles['route-stops-label']}>Przystanki</span>
        <RouteStopsListOnSchedule onLineHeightChange={getLineHeight}/>
        <div style={{height: `calc(${lineHeight}px - 2.525rem)`}} className={styles['time-line']}></div>
    </div>)
}