import { useAdditionalInfoInputs } from '../../../hooks/useAdditionalInfoInputs';

import styles from './AdditionalInfoInputs.module.css';

export default function AdditionalInfoInputs() {
    const {route, handleRouteChange} = useAdditionalInfoInputs();
    return (
        <div className={styles['inputs-box']}>
            <div className={styles['input-box']}>
                <label className={styles.label} for='operator'>Relacja: </label>
                <input className={styles.input} type='text' id='operator' value={route} onChange={handleRouteChange} />
            </div>
        </div>
    )
}