import styles from './ConnectionsFromBusStopList.module.css';

export default function ConnectionsFromBusStopList() {
    return (
        <div className={styles.list}>
            <div className={styles.item}>
                <div className={styles['connection-info']}>
                    <div className={styles['line']}>1</div>
                    <span className={styles['label']}></span>
                </div>
                <div className={styles['departure-info']}>
                    <span className={styles['label']}>Odjazd za:</span>
                    <span className={styles.time}>10 min</span>
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.info}>
                    <span className={styles['primary-info']}>Linia 2</span>
                    <span className={styles['secondary-info']}>Przystanek: Przykładowy Przystanek</span>
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.info}>
                    <span className={styles['primary-info']}>Linia 3</span>
                    <span className={styles['secondary-info']}>Przystanek: Przykładowy Przystanek</span>
                </div>
            </div>
        </div>
    )
}