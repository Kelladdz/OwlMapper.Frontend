import RouteStopsOnSchedule from "./RouteStopsOnSchedule/RouteStopsOnSchedule";
import ScheduleInfo from "./ScheduleInfo/ScheduleInfo";
import DeparturesTable from "./DeparturesTable/DeparturesTable";
import ScheduleAdditionalInfoLabel from "./ScheduleAdditionalInfoLabel/ScheduleAdditionalInfoLabel";

import { useSchedule } from "../../hooks/useSchedule";

import styles from './Schedule.module.css'

export default function Schedule() {
    const {operator, organizer} = useSchedule();

    return (
        <div className={styles.schedule}>
            <RouteStopsOnSchedule/>
            <div className={styles['r-side']}>
                <div className={styles['departures-tables']}>
                    <ScheduleInfo />
                    <DeparturesTable scheduleDay={0} label='Dni robocze'/>
                    <DeparturesTable scheduleDay={1} label='Soboty'/>
                    <DeparturesTable scheduleDay={2} label='Niedziele i święta'/>
                </div>
                <ScheduleAdditionalInfoLabel label='Operator: ' value={operator}/>
                <ScheduleAdditionalInfoLabel label='Organizator: ' value={organizer}/>
            </div>
            
        </div>
    )
}