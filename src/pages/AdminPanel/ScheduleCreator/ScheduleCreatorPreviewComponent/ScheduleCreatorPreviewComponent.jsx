import Schedule from "../../../../components/Schedule/Schedule";
import { useFetchVariantQuery } from "../../../../store/apis/variantsApi";
import { useContext, useEffect, useState } from "react";
import CreatorContext from "../../../../context/creator";
import { useScheduleCreator } from "../../../../hooks/useScheduleCreator";
import DeparturesTable from "../../../../components/ScheduleCreatorPreview/DeparturesTable/DeparturesTable";
import ScheduleInfo from "../../../../components/ScheduleCreatorPreview/ScheduleInfo/ScheduleInfo"
import RouteStopsOnSchedule from "../../../../components/ScheduleCreatorPreview/RouteStopsOnSchedule/RouteStopsOnSchedule";
import ScheduleAdditionalInfoLabel from "../../../../components/ScheduleCreatorPreview/ScheduleAdditionalInfoLabel/ScheduleAdditionalInfoLabel";
import MarkingsList from "../../../../components/Lists/MarkingsList/MarkingsList";
import AdminPanelButton from "../../../../components/Buttons/AdminPanelButton/AdminPanelButton";

import styles from './ScheduleCreatorPreviewComponent.module.css';
import { useDispatch } from "react-redux";

export default function ScheduleCreatorPreviewComponent() {
    const {selectedLine, selectedVariant, onVariantSelect} = useContext(CreatorContext);
    const {fetchVariantDataHandle} = useScheduleCreator();
    const dispatch = useDispatch();

    const {data: singleVariantData, error: singleVariantError, isLoading: singleVariantIsLoading, currentData} = useFetchVariantQuery({
        id: selectedVariant !== '' ? selectedVariant : '',
        lineName: selectedLine
    }, {skip: !selectedVariant }) || [];

    useEffect(() => {
        if (!singleVariantIsLoading && singleVariantData && currentData) {
            
            fetchVariantDataHandle(singleVariantData.variant);
        }
    },[singleVariantData, singleVariantIsLoading, currentData]);



    if (singleVariantIsLoading) {
        return <div>Loading...</div>
    } else if (!singleVariantIsLoading && singleVariantData) {
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
                <MarkingsList />
                <ScheduleAdditionalInfoLabel property='operator'/>
                <ScheduleAdditionalInfoLabel property='organizer'/>
            </div>
        </div>
    )
}
}