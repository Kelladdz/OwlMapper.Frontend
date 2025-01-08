import styles from './ScheduleAdditionalInfoLabel.module.css';

export default function ScheduleAdditionalInfoLabel({label, value}) {
    return (
        <div className={styles.container}>
            <span className={styles.label}>{label} {value}</span>
        </div>
    )
}