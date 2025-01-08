import { useContext, useEffect } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { DepartureTimesFormProvider } from "../../context/departureTimesForm";
import CurrentDataContext from '../../context/currentData';

import { useLinesCreator } from "../../hooks/useLinesCreator";

import AdminSectionTitle from "../../components/AdminSectionTitle/AdminSectionTitle";
import Schedule from "../../components/Schedule/Schedule";
import NameInput from "../../components/Inputs/NameInput/NameInput";    
import AddRouteStopComponent from "../../components/AddRouteStopComponent/AddRouteStopComponent";
import RouteStopsList from "../../components/Lists/RouteStopsList/RouteStopsList";
import RouteLinePointsWindow from "../../components/RouteLinePointsWindow/RouteLinePointsWindow";
import ValidFromInput from "../../components/Inputs/ValidFromInput/ValidFromInput";
import DepartureInput from "../../components/Inputs/DepartureInput/DepartureInput";
import AdminPanelButton from "../../components/Buttons/AdminPanelButton/AdminPanelButton";
import AdditionalInfoInputs from "../../components/Inputs/AdditionalInfoInputs/AdditionalInfoInputs";

import isLineCreateFormComplete from "../../conditions/isLineCreateFormComplete";

import { ACTIONS } from '../../constants/actions';
import { DEPARTURE_INPUTS_LABELS } from '../../constants/departureInputlabels';

import styles from './LineForm.module.css';
import schedule from '../../components/Schedule/Schedule.module.css';

export default function LineForm({isLoaded, action}) {
    const form = useSelector(state => state.lineCreatorForm);
    const {params} = useContext(CurrentDataContext)
    const {title, submitButtonLabel, aloneComponentClassName, handleSubmit } = useLinesCreator(action, params, isLoaded);
    const navigate = useNavigate();
    return (
    <div className={styles.container}>
        <DepartureTimesFormProvider>
        <AdminSectionTitle title={title} />
        {<><form onSubmit={handleSubmit} className={styles.form}>
                {isLoaded || action === ACTIONS.createLine ? <div className={styles['form-box']}>
                    <div className={styles['l-side']}>
                        <div className={styles[`alone-name-inputs-box`]}>
                        <NameInput action={action} property='line-name'/>
                        </div>
                        <AdditionalInfoInputs />
                        <AddRouteStopComponent/>
                        <RouteStopsList /> 
                        <ValidFromInput />
                        
                    </div>
                    <div className={styles['r-side']}>
                        <div className={styles['all-departures-box']}>
                            <DepartureInput scheduleDay={0} label={DEPARTURE_INPUTS_LABELS[0]}/>
                            <DepartureInput scheduleDay={1} label={DEPARTURE_INPUTS_LABELS[1]}/>
                            <DepartureInput scheduleDay={2} label={DEPARTURE_INPUTS_LABELS[2]}/> 
                        </div>
                        <div className={styles['btns']}>
                            <AdminPanelButton type='button' label='Wróć' onClick={() => navigate('/admin')}/>
                            <AdminPanelButton type='submit' label={submitButtonLabel} /*disabled={!isLineCreateFormComplete(form, action)}*//>
                        </div> 
                    </div>
                    <RouteLinePointsWindow/>
                </div> : <div className={styles.loading}>Loading..</div>}
                
         </form> 
        <div className={styles['schedule-box']}>
        {isLoaded || action === ACTIONS.createLine ? <Schedule/> : <div className={schedule.schedule}></div>}
        </div></>}
        </DepartureTimesFormProvider>
    </div>)
}