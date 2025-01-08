import { useContext, useRef, useEffect, useState } from "react";
import { useDeparturesList } from "../../../hooks/useDeparturesList";
import UserInterfaceContext from "../../../context/userInterface";
import BusStopSearchIcon from "../../../assets/busStopSearchIcon.svg";
import Arrow from "../../../assets/arrowRight.svg";
import styles from './DeparturesList.module.css';
import { useSearchConnections } from "../../../hooks/useSearchConnections";
import { useTransition, animated } from "react-spring";
import CurrentDataContext from "../../../context/currentData";
export default function DeparturesList() {
    const {departures, lines, activeLines, handleLineClick} = useDeparturesList();
    const {handleDepartureClick, handleAllDeparturesButtonClick, handleBackButtonClick} = useSearchConnections();


    const {hide, selectedRouteStop, deps, fetchedLines} = useContext(UserInterfaceContext);
    const {selectedPoint} = useContext(CurrentDataContext)

    const listRef = useRef(null);

    const transition = useTransition(deps, {
        from: {height: '0rem', opacity: 0},
        enter: {height: '3rem', opacity: 1},
        leave: {height: '0rem', opacity: 0},
        config: {duration: 200}
    });


    useEffect(() => {
        if(hide && listRef.current) {
            console.log('hide', hide)
            const list = listRef.current;
            list.classList.add(styles.collapsed);
        }
    },[hide])

    return (
        <div ref={listRef} className={styles.container}>
            <div className={styles.label}>{selectedRouteStop && selectedRouteStop.busStop.name || selectedPoint && selectedPoint.name}</div>
            <span className={styles['lines-label']}>Linie</span>
            <div className={styles['lines-btns']}>
                {fetchedLines && fetchedLines.length > 0 ? fetchedLines.map(line => {
                    if (activeLines && activeLines.length > 0) {
                        console.log('Active Lines and current line: ', activeLines, line.line.name);
                    }
                    const activeLineClass = activeLines && activeLines.length > 0 && activeLines.includes(line.line.name) ? 'active-' : '';
                    console.log(activeLineClass);
                    return <div key={line.line.name} onClick={() => handleLineClick(line.line.name)} className={styles[`${activeLineClass}line-btn`]}>{line.line.name}</div>
                }) : <div>...Loading</div>}
            </div>
            <div className={styles.list}>
                <div>
                {deps.length > 0 && deps && transition((style, departure) => (
                        <animated.div style={style} onClick={() => handleDepartureClick(departure)} key={departure.id} className={styles['departure-box']}>
                            <div className={styles['l-side']}>
                                <img src={BusStopSearchIcon} className={styles.icon}/>
                                <div className={styles.line}>{departure.variant.line.name}</div>
                                <img src={Arrow} className={styles.arrow}/>
                                <div className={styles.destination}>{departure.variant.routeStops[0].busStop.name}</div>
                            </div>
                            <div className={styles['r-side']}>
                                <div className={styles.remaining}>{departure.timeToArrive} min</div>
                                <div className={styles.time}>{departure.time}</div>
                            </div>
                        </animated.div>
                    ))}
                </div>
            </div>
            <div className={styles.btns}>
                <div onClick={() => handleAllDeparturesButtonClick()} className={styles.btn}>Pokaż pełny rozkład</div>
                <div onClick={() => {
                    if (selectedPoint) {
                        handleBackButtonClick(0)
                    } else handleBackButtonClick(3)
                }} className={styles.btn}>Wróć</div>
            </div>
            
        </div>
    )
}