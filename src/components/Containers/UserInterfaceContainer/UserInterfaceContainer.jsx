import { useEffect, useRef } from 'react';
import styles from './UserInterfaceContainer.module.css';

export default function UserInterfaceContainer({children}) {

    return (
        <div className={styles.container}>
            {children}
        </div>)
}