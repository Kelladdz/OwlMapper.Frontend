import styles from './AdminIconButton.module.css';

export default function AdminIconButton({icon, onClick, alt, style}) {
    return (
        <div className={styles.btn} style={style} onClick={onClick}>
            <img src={icon} alt={alt}/>
        </div>)
}