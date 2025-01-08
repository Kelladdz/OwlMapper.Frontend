import styles from './AdminPanelButton.module.css';

export default function AdminPanelButton({type, label, style, onClick, disabled}) {
    return (
        <button style={style} type={type} onClick={onClick} className={styles.btn} disabled={disabled}>{label}</button>
    )
}