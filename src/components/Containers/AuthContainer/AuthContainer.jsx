import styles from './AuthContainer.module.css'

export default function AuthContainer({children}) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}