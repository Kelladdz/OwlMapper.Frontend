import { useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';

import useUserLinesGrid from '../../../hooks/useUserLinesGrid.js';

import styles from './UserLinesGrid.module.css';
import UserInterfaceContext from '../../../context/userInterface.jsx';
import { useSearchConnections } from '../../../hooks/useSearchConnections.js';
import CurrentDataContext from '../../../context/currentData.jsx';
export default function UserLinesGrid() {
    const listRef = useRef(null);
    
    
    const {lines} = useUserLinesGrid();
    const {handleLineClick} = useSearchConnections();
    const {hide} = useContext(UserInterfaceContext);
    const {selectedPoint, getSelectedPoint} = useContext(CurrentDataContext);

    useEffect(() => {
        if(hide && listRef.current) {
            console.log('hide', hide)
            const list = listRef.current;
            list.classList.add(styles.collapsed);
        }
    },[hide])

    useEffect(() => {
        if (selectedPoint) {
            getSelectedPoint(null)
        }
    },[])

    return (
        <>
            <div ref={listRef} className={styles.container}>
                <div className={styles.label}>Linie autobusowe</div>
                <div className={styles.grid}>
                {lines && lines.map(line => {
                    return (
                        <div key={line.line.id} className={styles['bus-line-box']} onClick={() => handleLineClick(line.line.name)}>
                            <span to={`user/lines/${line.line.name}`} className={styles['hole-button']}>{line.line.name}</span>
                        </div>
                    )
                })}
                </div>
            </div>
        </>
    )
}
