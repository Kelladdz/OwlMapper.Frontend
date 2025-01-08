import styles from './UserInterfaceButton.module.css';

export default function UserInterfaceButton({type, label, style, onClick}) {
    return (
        <button type={type} style={style} onClick={onClick} className={styles.btn}>{label}</button>
    )
}