import { useContext, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import UserInterfaceContext from "../../../context/userInterface";
import { useAllDeparturesTable } from "../../../hooks/useAllDeparturesTable";
import UserMarkingsList from "../../Lists/UserMarkingsList/UserMarkingsList";

import styles from './AllDeparturesTable.module.css';
import { useSearchConnections } from "../../../hooks/useSearchConnections";
import CurrentDataContext from "../../../context/currentData";
export default function AllDeparturesTable() {
    const {currentDate, handleCurrentDateChange, handleLineClick, chunkedDeps} = useAllDeparturesTable();
    const {handleBackButtonClick} = useSearchConnections();
    const {activeLine} = useContext(UserInterfaceContext);

    const lineClick = (lineName) => {
        console.log('Clicked on ', lineName)
    }

    const listRef = useRef(null);

    const {hide,  fetchedLines, selectedRouteStop} = useContext(UserInterfaceContext);
    const {selectedPoint} = useContext(CurrentDataContext)


    useEffect(() => {
        if(hide && listRef.current) {
            console.log('hide', hide)
            const list = listRef.current;
            list.classList.add(styles.collapsed);
        }
    },[hide])
    return (
    <div ref={listRef} className={styles.container}>
        <div className={styles.label}>{selectedRouteStop && selectedRouteStop.busStop.name || selectedPoint.name}</div>
        <span className={styles['lines-label']}>Linie:</span>
        <div className={styles['lines-btns']}>
            {activeLine && fetchedLines && fetchedLines.length > 0 && fetchedLines.map(line => {
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