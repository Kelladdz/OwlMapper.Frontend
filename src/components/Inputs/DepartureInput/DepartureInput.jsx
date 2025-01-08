import React, { useState, useRef, useContext, useEffect } from "react"
import styles from './DepartureInput.module.css'
import { useDispatch, useSelector } from "react-redux"

import { useDepartureInput } from "../../../hooks/useDepartureInput"

import ValidationErrorLabel from "../../ValidationErrorLabel/ValidationErrorLabel"
import DepartureTimesList from "../../Lists/DepartureTimesList/DepartureTimesList"

export default function DepartureInput({scheduleDay, label}) {
    const departureTimeInputRef = useRef();
    const {appropriateRemoveAction, handleKeyDown, sortedTimes, changeActiveInput, departureTimeError, inputValue, handleInputValueChange} = useDepartureInput(scheduleDay, departureTimeInputRef);

    return (
        <div className={styles.container}>
            <label className={styles.label} for='departures'>{label}</label>
                            <DepartureTimesList sortedTimes={sortedTimes} onAppropriateRemoveAction={appropriateRemoveAction}/>
                            <div className={styles['input-box']}>
                                <input onClick={() => changeActiveInput(scheduleDay)} value={inputValue} onChange={handleInputValueChange} ref={departureTimeInputRef} onKeyDown={handleKeyDown} className={styles.input} type='text' id='departures'/>
                            </div>
                            <div className={styles['validation-error-box']}>{departureTimeError && departureTimeError.scheduleDay === scheduleDay ? <ValidationErrorLabel message={departureTimeError.message}/> : null}</div>
                            
                        </div>
    )
} 