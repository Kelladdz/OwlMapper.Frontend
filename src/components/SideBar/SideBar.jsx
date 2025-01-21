import React, { useContext, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';

import SideBarContext from "../../context/sideBar";

import { resetAllForm } from '../../store/slices/lineCreatorFormSlice';

import SideBarButton from "../../components/Buttons/SideBarButton/SideBarButton";
import { logout } from "../../store/slices/authSlice";
import { SIDE_BAR_BUTTONS } from "../../constants/sideBarButtons";

import styles from './SideBar.module.css';
import Cookies from "js-cookie";
import axios from "axios";
import UserInterfaceContext from "../../context/userInterface";

export default function SideBar() {
    const { activeButton, changeActiveButton } = useContext(SideBarContext);
    const location = useLocation();
    const dispatch = useDispatch();

    if (location.pathname === '/admin') {
        changeActiveButton(null);
    } else if (location.pathname === '/admin/lines/create') {
        changeActiveButton(1);
    } else if (location.pathname.endsWith('edit') || location.pathname.endsWith('variants/create')) {
        changeActiveButton(2);
    } else if (location.pathname.endsWith('bus-stops')) {
        changeActiveButton(3);
    } else if (location.pathname.endsWith('schedules/create')) {
        changeActiveButton(4);
    }

    const handleClick = useCallback((id) => {
        changeActiveButton(id)
        dispatch(resetAllForm());    
    },[activeButton, dispatch]);

    const handleLogoutClick = useCallback(async () => {
        await axios.post('https://localhost:7033/api/auth/logout', {
            withCredentials: true
        }, {headers: { 'Authorization': localStorage.getItem('accessToken') }})
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    dispatch(logout());
                }
            })  
    },[]);

    return (
    <div className={styles.sidebar}>
        <nav className={styles.sidenav}>
            {SIDE_BAR_BUTTONS.map(button => 
                <SideBarButton 
                key={button.id} 
                label={button.label} 
                id={button.id} 
                link={button.link}
                isFocus={button.id === activeButton}
                onClick={() => handleClick(button.id)}/>)
            } 
        </nav>
        <SideBarButton label='Wyloguj' isFocus={false} onClick={() => {
            handleLogoutClick()
        }}/>
    </div>
    )
}