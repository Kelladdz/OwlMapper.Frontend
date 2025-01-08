import { useContext } from 'react';
import { useMarkingsList } from '../../../hooks/useMarkingsList';

import styles from './MarkingsList.module.css';
import CreatorContext from '../../../context/creator';

export default function MarkingsList() {
    const {markings} = useMarkingsList();
    return (
        <div className={styles.container}>
            {markings.map((marking, index) => {
                return (
                    <div key={index} className={styles['marking-box']}>
                        <span className={styles['marking']}>{marking}</span>
                    </div>
                )}
            )}
        </div>
    )
}