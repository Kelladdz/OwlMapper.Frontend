import { useEffect, useRef, useContext } from 'react';

import UserInterfaceContext from '../../../context/userInterface';
import Glass from '../../../assets/glass.svg';
import { useConnectionsSearchInput } from '../../../hooks/useConnectionsSearchInput';
import { useSearchResultsList } from '../../../hooks/useSearchResultsList';
import SearchResultsList from '../../Lists/SearchResultsList/SearchResultsList';

import styles from './ConnectionsSearchInput.module.css';
import CurrentDataContext from '../../../context/currentData';
import { useSearchConnections } from '../../../hooks/useSearchConnections';

export default function ConnectionsSearchInput() {
    const {hide} = useContext(UserInterfaceContext);
    const {searchTerm, handleChangeTerm, focusOnInput} = useConnectionsSearchInput();
    const {selectedPoint} = useContext(CurrentDataContext);
    const {matchedBusStops, busStopsIsLoading, searchedClass} = useSearchResultsList();
    
    const ref = useRef(null);

    useEffect(() => {
        const searchBar = ref.current;
        
        if ((selectedPoint)) {
            console.log('Search bar element: ', searchBar);
            searchBar.classList.add(styles.collapsed);
        }
    },[selectedPoint])

    return (
    <div ref={ref} className={styles[`${searchedClass}search-box`]}>
        <div className={styles[`search-input`]}>
            <input 
                type='text' 
                placeholder='Nazwa przystanku:'
                value={searchTerm}
                onChange={handleChangeTerm}
                onFocus={focusOnInput}
                className={styles[`input`]}/>
            <img src={Glass} alt='Search Icon' className={styles.glass}/>
        </div>
        <SearchResultsList/>
        {/* {matchedAddresses && matchedBusStops && <SearchResultsList type={type} />} */}
        
    </div>)
}