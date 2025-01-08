import styles from './ValidationErrorLabel.module.css';

export default function ValidationErrorLabel({message}) {
    return (
        <span className={styles.message}>{message}</span>
    )
}