import styles from './VariantSymbolInput.module.css';

export default function VariantSymbolInput({}) {
    return (
        <div className={styles.container}>
            <label className={styles[`label`]} for='symbol'>Symbol: </label>
            <input className={styles['input']} type='text' id='symbol' maxLength={1} />   
        </div>
    )
}