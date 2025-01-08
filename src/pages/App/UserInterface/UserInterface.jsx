

import styles from './UserInterface.module.css'
import React, { useContext, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSearchConnections } from '../../../hooks/useSearchConnections';
import UserMarkingsList from '../../../components/Lists/UserMarkingsList/UserMarkingsList';
import UserInterfaceContext from '../../../context/userInterface';
export default function UserInterface() {
    

    return (
        <div className={styles.container}>
            <Outlet />
            
        </div>)
}