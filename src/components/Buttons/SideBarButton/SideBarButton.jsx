import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetAllForm } from "../../../store";
import styles from './SideBarButton.module.css'
import MarkersContext from '../../../context/markers';
import RouteLinePointsContext from '../../../context/routeLines';


export default function SideBarButton({isFocus, label, id, link, onClick}) {
    const toggleFocusClass = isFocus ? '-focus' : '';

    return (
        <button id={id} isfocus={isFocus.toString()} onClick={onClick} className={styles[`btn${toggleFocusClass}`]}>
            <Link to={link} className={styles.link}>
                <span className={styles[`label${toggleFocusClass}`]}>{label}</span>
            </Link>
        </button>
    )
}