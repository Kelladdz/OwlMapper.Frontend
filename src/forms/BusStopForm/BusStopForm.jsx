import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { changeBusStopName, changeCityName, fillBusStopForm, resetAllBusStopForm, changeLatitude, changeLongitude } from "../../store/slices/busStopCreatorFormSlice";

import AdminIconButton from "../../components/Buttons/AdminIconButton/AdminIconButton";
import AdminPanelButton from "../../components/Buttons/AdminPanelButton/AdminPanelButton";

import {useBusStopsCreator} from "../../hooks/useBusStopsCreator";

import CancelBusStopForm from "../../assets/cancelBusStopForm.svg";

import styles from './BusStopForm.module.css';
import BusStopNameInput from "../../components/Inputs/BusStopNameInput/BusStopNameInput";
import RadioBoxInput from "../../components/Inputs/RadioBoxInput/RadioBoxInput";
import { ACTIONS } from "../../constants/actions";
import { get } from "lodash";

export default function BusStopForm({busStop, position}) {
    const {lat, lng, isRequest, action, toggleAction, getPosition, isSaved, slug, isBlocked, handleChangeIsRequest, handleSubmit, onUpdateBusStop, onDeleteBusStop ,getSlug} = useBusStopsCreator();
    const dispatch = useDispatch();

    useEffect(() => {
        if (busStop) {
            dispatch(fillBusStopForm(busStop));
            getSlug(busStop)
            toggleAction(ACTIONS.editBusStop);
        } else {
            dispatch(resetAllBusStopForm());
            toggleAction(ACTIONS.createBusStop);
        }
    },[busStop])

    useEffect(() => {
        if (position) {
            getPosition(position);
        }
    },[position])

    useEffect(() => {
        return () => {
            dispatch(changeCityName(''));
            dispatch(changeBusStopName(''));
        }
    },[])

    if (!busStop){
        return (
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.upside}>
                    <BusStopNameInput />
                    <AdminPanelButton style={{margin: 0}} type='submit' label='Dodaj przystanek' />
                </div>
                <div className={styles.downside}>
                    <RadioBoxInput style={{left: '-0.5rem'}} checked={isRequest} onChange={handleChangeIsRequest} label='Przystanek na żądanie'/>
                    <div className={styles.coordinate}><span>Dł. geogr: <strong>{lng}</strong>, Szer. geogr: <strong>{lat}</strong></span></div>
                </div> 
            </form>
        )
    } else {
        return (
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.upside}>
                    <BusStopNameInput />
                    <AdminPanelButton style={{margin: 0}} type='submit' label={action === ACTIONS.createBusStop ? 'Stwórz' : 'Zapisz'} />
                    <AdminPanelButton style={{margin: 0, color: 'red'}} type='button' label='Usuń' onClick={() => onDeleteBusStop(slug)} />
                </div>
                <div className={styles.downside}>
                    <RadioBoxInput style={{left: '-0.5rem'}} checked={isRequest} onChange={handleChangeIsRequest} label='Przystanek na żądanie'/>
                    {isSaved && <span>Zapisano</span>}
                    <div className={styles.coordinate}><span>Dł. geogr: <strong>{lng}</strong>, Szer. geogr: <strong>{lat}</strong></span></div>
                </div> 
            </form>
        )
    }
}