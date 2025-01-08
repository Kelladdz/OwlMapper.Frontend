import {useTimeInput} from '../../../hooks/useTimeInput';

import IncrementButton from '../../../assets/incrementButton.svg';

import styles from './TimeInput.module.css';

export default function TimeInput() {
    const {timeToTravelInMinutes, handleChangeTime, handleClickChangeTimeButton, isInputDisabled} = useTimeInput();
    return (
        <div className={styles.container}>
            <input className={styles.input} type='number' min={0} max={100} disabled={isInputDisabled} value={timeToTravelInMinutes} onChange={handleChangeTime}/>
            <div className={styles['amount-change-box']}>
                <img onClick={() => handleClickChangeTimeButton('increment')} className={styles.increment} src={IncrementButton} alt='increment-button'/>
                <img onClick={() => handleClickChangeTimeButton('decrement')} className={styles.decrement} src={IncrementButton} alt='increment-button'/>
            </div> 
        </div>
    )
}