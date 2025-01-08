import { useRef, useEffect } from 'react';
import styles from './UserInterfaceTab.module.css';

export default function UserInterfaceTab({selectedTab, id, onClick, label}) {
    const tabRef = useRef(null);

    useEffect(() => {
        if(selectedTab === id && tabRef.current) {
            const tab = tabRef.current;
            tab.classList.add(styles.expand);
        } else if (tabRef.current && selectedTab !== id) {
            const tab = tabRef.current;
            tab.classList.remove(styles.expand);
        }

    },[selectedTab])
    
    return (
        <div ref={tabRef} className={styles.tab} onClick={onClick}><span className={styles.label}>{label}</span></div>
    )
}