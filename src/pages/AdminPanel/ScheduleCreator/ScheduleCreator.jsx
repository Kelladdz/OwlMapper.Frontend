import { useContext, useRef } from "react"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { useScheduleCreator } from "../../../hooks/useScheduleCreator.js"
import CreatorContext from "../../../context/creator.jsx"
import { useFetchVariantQuery } from "../../../store/apis/variantsApi.js"

import FlexContainer from "../../../components/Containers/FlexContainer/FlexContainer.jsx"
import AdminSectionTitle from "../../../components/AdminSectionTitle/AdminSectionTitle.jsx"
import AdminLinesGrid from "../../../components/Grids/AdminLinesGrid/AdminLinesGrid.jsx"
import ScheduleCreatorInput from "../../../components/Inputs/ScheduleCreatorInput/ScheduleCreatorInput.jsx"
import VariantsForScheduleDropdown from "../../../components/Dropdowns/VariantsForScheduleDropdown/VariantsForScheduleDropdown.jsx"
import VariantsAddedToScheduleList from "../../../components/Lists/VariantsAddedToScheduleList/VariantsAddedToScheduleList.jsx"
import AdminPanelButton from "../../../components/Buttons/AdminPanelButton/AdminPanelButton.jsx"

import { ADMIN_SECTION_TITLES } from "../../../constants/adminSectionTitles.js"
import ScheduleCreatorPreviewComponent from "./ScheduleCreatorPreviewComponent/ScheduleCreatorPreviewComponent.jsx"
import RouteStopsFromScheduleDropdown from "../../../components/Dropdowns/RouteStopsFromScheduleDropdown/RouteStopsFromScheduleDropdown.jsx"

export default function ScheduleCreator() {
    const {selectedLine, variantsOnSchedule, weekDaysDepartures} = useContext(CreatorContext);

    const printRef = useRef();

    const generatePdf = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element, { scale: 2.5 }); // Zwiększ skalę dla ostrzejszego obrazu
        const data = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST'); // Użyj 'FAST' dla lepszej jakości
        pdf.save('schedule.pdf');
    };
    
    return (
        <FlexContainer>
            <div>
                <AdminSectionTitle title={ADMIN_SECTION_TITLES.createSchedule}/>
                <AdminLinesGrid />
            </div>
            {selectedLine !== '' && 
            <>
                <div >
                    <AdminSectionTitle title={ADMIN_SECTION_TITLES.addVariantToSchedule}/>
                    <VariantsForScheduleDropdown/>
                    <div style={{borderRight: '1px solid #d4d4d4', height: '100%'}}>
                        {variantsOnSchedule && variantsOnSchedule.length > 0 &&
                        <>
                            <VariantsAddedToScheduleList/>
                            <RouteStopsFromScheduleDropdown/>
                            <ScheduleCreatorInput property='operator'/>
                            <ScheduleCreatorInput property='organizer'/>
                            <AdminPanelButton style={{marginLeft: 'calc(50% - 4rem)', marginTop: '1rem'}} label='Generuj PDF' onClick={generatePdf}/>
                        </>}
                    </div>
                    
                </div>
                {variantsOnSchedule && variantsOnSchedule.length > 0 && 
                <div ref={printRef}>
                    <ScheduleCreatorPreviewComponent />
                </div>}
                
            </>}
           
        </FlexContainer>
    )
}