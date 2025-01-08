import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useBusStopNameInput } from '../../../hooks/useBusStopNameInput';

import { ACTIONS } from '../../../constants/actions';

import styles from './BusStopNameInput.module.css';

export default function BusStopNameInput() {
    const {busStopName, city, handleChangeName, handleChangeCity} = useBusStopNameInput();
    return (
        <div className={styles.container}>
            
            <div className={styles['input-box']}>
                <label className={styles[`label`]} for='line-name'>Miasto:</label>
                <input className={styles['input']} type='text' id='line-name' maxLength={100} value={city} onChange={handleChangeCity}/>   
            </div>
            <div className={styles['input-box']}>
                <label className={styles[`label`]} for='line-name'>Nazwa przystanku:</label>
                <input className={styles['input']} type='text' id='line-name' maxLength={100} value={busStopName} onChange={handleChangeName}/>   
            </div>
            
        </div>
    )
}