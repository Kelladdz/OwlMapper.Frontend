import styles from './RadioBoxInput.module.css'

export default function RadioBoxInput({checked, onChange, label, style}) {
    return (
        <div style={style} className={styles.container}>
            <input className={styles.input} id="manually" name="manually" type='checkbox' checked={checked} onChange={onChange}/>
            <label className={styles.label} for="manually">{label}</label>
        </div>
    )
}
    