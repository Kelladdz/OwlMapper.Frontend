import { useScheduleCreatorInput } from '../../../hooks/useScheduleCreatorInput';

import styles from './ScheduleCreatorInput.module.css';

export default function ScheduleCreatorInput({property}) {
    const {label, value, handleInputChange} = useScheduleCreatorInput(property);
    return (
            <div className={styles['input-box']}>
                <label className={styles.label} htmlFor='value'>{label}</label>
                <input className={styles.input} type='text' id='value' value={value} onChange={handleInputChange} />
            </div>
    )
}