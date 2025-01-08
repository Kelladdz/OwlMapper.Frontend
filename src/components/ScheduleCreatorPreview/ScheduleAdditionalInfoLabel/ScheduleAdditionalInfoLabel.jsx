import useScheduleAdditionalInfoLabel from '../../../hooks/useScheduleAdditionalInfoLabel';

import styles from './ScheduleAdditionalInfoLabel.module.css';

export default function ScheduleAdditionalInfoLabel({property}) {
    const {label, value} = useScheduleAdditionalInfoLabel(property);

    
    return (
        <div className={styles.container}>
            <span className={styles.label}>{label} {value}</span>
        </div>
    )
}