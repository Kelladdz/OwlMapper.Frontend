import styles from './AdminSectionTitle.module.css';

export default function AdminSectionTitle({title}) {
    return (
        <div className={styles.title}>
            <span className={styles.label}>{title}</span>
        </div>)
}