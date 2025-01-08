import { useBusStopsCreator } from "../../../hooks/useBusStopsCreator";

import BusStopsCreatorMap from "../../../components/Maps/BusStopsCreatorMap/BusStopsCreatorMap"
import FlexContainer from "../../../components/Containers/FlexContainer/FlexContainer"
import AdminPanelButton from "../../../components/Buttons/AdminPanelButton/AdminPanelButton"


export default function BusStopsCreator({action}) {
    const {onBack} = useBusStopsCreator();
    return (
        <FlexContainer>            
            <BusStopsCreatorMap action={action}/> 
            <AdminPanelButton type='button' label='Wróć' style={{position: 'absolute', bottom: '1rem', left: '1rem', zIndex: '1000', backgroundColor: 'white'}} onClick={onBack} />       
        </FlexContainer>
    )
}