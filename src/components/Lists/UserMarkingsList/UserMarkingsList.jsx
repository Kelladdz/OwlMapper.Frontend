import { useContext } from 'react';
import { useUserMarkingsList } from '../../../hooks/useUserMarkingsList';

import styles from './UserMarkingsList.module.css';
import CreatorContext from '../../../context/creator';

export default function UserMarkingsList() {
    const {markings} = useUserMarkingsList();
    return (
        <div className={styles.container}>
            <div className={styles.label}>Legenda</div>
            <div className={styles.list}>
            {markings.map((marking, index) => {
                return (
                    <div key={index} className={styles['marking-box']}>
                        <span className={styles['marking']}>{marking}</span>
                    </div>
                )}
            )}
            </div>
        </div>
    )
}