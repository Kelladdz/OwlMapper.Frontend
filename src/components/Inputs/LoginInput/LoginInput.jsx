import { useLoginInput } from '../../../hooks/useLoginInput'
import styles from './LoginInput.module.css'


export default function LoginInput({property}) {
    const {type, value, handleInputChange} = useLoginInput(property)
    return (
        <div className={styles.container}>
            <label className={styles.label} for={property}>{property}:</label>
            <input 
            id={property}
            type={type} 
            className={styles.input}
            value={value}
            onChange={handleInputChange} />
        </div>
    )
}