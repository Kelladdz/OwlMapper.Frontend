import { useContext, useRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import UserInterfaceContext from "../../../context/userInterface";
import { useAllDeparturesTable } from "../../../hooks/useAllDeparturesTable";
import UserMarkingsList from "../../Lists/UserMarkingsList/UserMarkingsList";

import styles from './AllDeparturesTable.module.css';
import { useSearchConnections } from "../../../hooks/useSearchConnections";
import CurrentDataContext from "../../../context/currentData";
import {useFetchFilteredByBusStopIdQuery, useFetchDeparturesByBusStopIdQuery} from '../../../store'
export default function AllDeparturesTable() {
    const {currentDate, getDepartureTimes, handleCurrentDateChange, chunkedDeps} = useAllDeparturesTable();
    const {handleBackButtonClick} = useSearchConnections();
    const {hide, selectedRouteStop, selectedLine} = useContext(UserInterfaceContext);
    const {selectedPoint} = useContext(CurrentDataContext)
    const [activeLine, setActiveLine] = useState();
    const {data: lines, error: linesError, isLoading: isLinesLoading} = useFetchFilteredByBusStopIdQuery(selectedPoint.id, {skip: !selectedPoint?.id}) || [];
    const {data: departures, error: depsError, isLoading: isDepsLoading} = useFetchDeparturesByBusStopIdQuery({busStopId: selectedPoint.id || selectedRouteStop.busStopId, lineName: activeLine, date: currentDate}, {skip: !selectedPoint?.id && !activeLine}) || [];
    const handleLineClick = (line) => {
        setActiveLine(line)
    }

    const listRef = useRef(null);




    useEffect(() => {
        if(hide && listRef.current) {
            console.log('hide', hide)
            const list = listRef.current;
            list.classList.add(styles.collapsed);
        }
    },[hide])

    useEffect(() => {
        if (departures && !isDepsLoading) {
            getDepartureTimes(departures)
        }
    },[departures, isDepsLoading])

    useEffect(() => {
        if (lines && !isLinesLoading) {
            console.log(lines)
            setActiveLine([lines[0].line.name])
        }
    },[lines, isLinesLoading])
    return (
    <div ref={listRef} className={styles.container}>
        <div className={styles.label}>{selectedRouteStop && selectedRouteStop.busStop.name || selectedPoint.name}</div>
        <span className={styles['lines-label']}>Linie:</span>
        <div className={styles['lines-btns']}>
            {activeLine && lines && lines.length > 0 && lines.map(line => {
                console.log('Active Line and current line: ', activeLine, line.line.name);
                const activeLineClass = activeLine && activeLine == line.line.name ? 'active-' : '';
                console.log(activeLineClass);
                return <div key={line.line.name} onClick={() => handleLineClick(line.line.name)} className={styles[`${activeLineClass}line-btn`]}>{line.line.name}</div>
            })}
        </div>
        <div className={styles['calendar-box']}>
            <div className={styles['calendar-label']}>Wybierz datę</div>
            <DatePicker
                todayButton="Dzisiaj"
                disabledKeyboardNavigation
                locale='pl'
                dateFormat={'dd.MM.yyyy'}
                calendarClassName={styles.calendar}
                customInput={<input className={styles.input}/>}
                selected={currentDate}
                onChange={handleCurrentDateChange}
                ></DatePicker>
        </div>
        <div className={styles['grid-box']}>
            <div className={styles.grid}>
                {chunkedDeps && chunkedDeps.length === 0 
            ? 
                (<div className={styles.row}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <span className={styles.time} key={index}></span>
                        ))}
                </div>) 
            : 
                (chunkedDeps && chunkedDeps.map((chunk, rowIndex) => (
                <div className={styles.row} key={rowIndex}>
                {chunk.map((departureTime, index) => {
                    return <span className={styles.time} key={index}>{departureTime}</span>
                    })
                }

                </div>)
            ))}
            </div>
        </div>
        <div onClick={() => {
            handleBackButtonClick(4)
        }} className={styles.btn}>Wróć</div>
    </div>)
}