import { useContext, useRef, useEffect } from 'react';
import  {useUserVariantsList} from '../../../hooks/useUserVariantsList.JS';

import styles from './UserVariantsList.module.css';
import UserInterfaceContext from '../../../context/userInterface';
import RouteLinePointsContext from '../../../context/routeLines';
import { useSearchConnections } from '../../../hooks/useSearchConnections';

export default function UserVariantsList() {
    const {handleVariantClick, handleBackButtonClick} = useSearchConnections();
    const {variants, handleMouseEnterOnVariant} = useUserVariantsList();

    const listRef = useRef(null);

    const {hide, selectedLine} = useContext(UserInterfaceContext);

    useEffect(() => {
        if(hide && listRef.current) {
            console.log('hide', hide)
            const list = listRef.current;
            list.classList.add(styles.collapsed);
        }
    },[hide])

    return (
        <div ref={listRef} className={styles.container}>
            <div className={styles.label}>Linia {selectedLine}</div>
            <div className={styles.list}>
            {variants && variants.map(variant => {
                return (
                    <div onClick={() => handleVariantClick(variant.variant.id)} onMouseEnter={() => handleMouseEnterOnVariant(variant.variant.routeLinePoints)} className={styles['variant-box']}>
                        <span className={styles.route}>{variant.variant.route}</span>
                    </div>
                )
            })}
            </div>
            <div onClick={() => handleBackButtonClick(1)} className={styles.btn}>Wróć</div>
        </div>
    )
}