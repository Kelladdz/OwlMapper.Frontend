import React, { useContext, useEffect } from 'react';

import CreatorContext from '../../../context/creator';
import { useAdminLinesGrid } from '../../../hooks/useAdminLinesGrid';
import { useFetchLinesQuery } from '../../../store/apis/linesApi';

import styles from './AdminLinesGrid.module.css';

export default function AdminLinesGrid() {
    const {chunkLines} = useAdminLinesGrid();
    const {onLineSelect, chunkedLines} = useContext(CreatorContext);
    const {data: lines, error, isLoading} = useFetchLinesQuery() || [];

    useEffect(() => {
        onLineSelect('')
    },[])
    
    useEffect(() => {
        if (!isLoading && lines) {
            chunkLines(lines)
        }
    },[lines, isLoading])

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
            {chunkedLines.map((chunk, rowIndex) => (
                <div className={styles.row} key={rowIndex}>
                    {chunk.map((line, index) => {
                        return <div onClick={() => onLineSelect(line.line.name)} className={styles.line} key={index}>{line.line.name}</div>
                        })
                    }
            </div>
            ))}
        </div>
    </div>)
        
}