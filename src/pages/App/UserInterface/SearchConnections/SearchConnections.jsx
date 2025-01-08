import { useSearchConnections } from '../../../../hooks/useSearchConnections.js';

import ConnectionsSearchInput from '../../../../components/Inputs/ConnectionsSearchInput/ConnectionsSearchInput.jsx';
import UserLinesGrid from '../../../../components/Grids/UserLinesGrid/UserLinesGrid.jsx';
import UserInterfaceButton from '../../../../components/Buttons/UserInterfaceButton/UserInterfaceButton.jsx';
import UserInterfaceContainer from '../../../../components/Containers/UserInterfaceContainer/UserInterfaceContainer.jsx';

import styles from './SearchConnections.module.css';
import { useState, useContext } from 'react';
import CurrentDataContext from '../../../../context/currentData.jsx';
import UserInterfaceTab from '../../../../components/Tabs/UserInterfaceTab/UserInterfaceTab.jsx';
import UserInterfaceContext from '../../../../context/userInterface.jsx';
import UserVariantsList from '../../../../components/Lists/UserVariantsList/UserVariantsList.jsx';
import UserRouteStopsList from '../../../../components/Lists/UserRouteStopsList/UserRouteStopsList.jsx';
import DeparturesList from '../../../../components/Lists/DeparturesList/DeparturesList.jsx';
import UserRouteStopsWithDeparturesList from '../../../../components/Lists/UserRouteStopsWithDeparturesList/UserRouteStopsWithDeparturesList.jsx';
import AllDeparturesTable from '../../../../components/Tables/AllDeparturesTable/AllDeparturesTable.jsx';

export default function SearchConnections() {
    const {handleTabClick, selectedTab} = useSearchConnections();
    const {selectedPoint} = useContext(CurrentDataContext);
    const {type} = useContext(UserInterfaceContext);

    

    return (
        <>
            <UserInterfaceContainer>
                <div className={styles.btns}>
                    <UserInterfaceTab selectedTab={selectedTab} id={0} label='Przystanki' onClick={() => handleTabClick(0)}/>
                    <UserInterfaceTab selectedTab={selectedTab} id={1} label='Linie' onClick={() => handleTabClick(1)}/>
                </div>
                {selectedPoint && <DeparturesList />}
                {type === 'bus-stops' && <ConnectionsSearchInput/>}
                {type === 'lines' && <UserLinesGrid/>}
                {type === 'variants' && <UserVariantsList/>}
                {type === 'route-stops' && <UserRouteStopsList />}
                {type === 'departures' && <DeparturesList/>}
                {type === 'route-stops-with-departures' && <UserRouteStopsWithDeparturesList/>}
                {type === 'all-departures' && <AllDeparturesTable/>}
            </UserInterfaceContainer>
            
        </>
    )
}