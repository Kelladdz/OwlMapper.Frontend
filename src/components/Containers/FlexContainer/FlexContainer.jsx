import styles from './FlexContainer.module.css';

export default function FlexContainer({children}) {
    return (
        <div className={styles.container}>
            {children}
        </div>)
}