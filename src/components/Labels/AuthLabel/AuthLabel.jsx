import styles from './AuthLabel.module.css';

export default function AuthLabel({label}) {
    return (
        <div className={styles.container}>
            <h1 className={styles.label}>{label}</h1>
        </div>
    )
}