import './admin-all-lines.css';
import { useContext } from 'react';
import CreatorContext from '../../context/creator';
import LineDetails from '../../components/LineDetails/LineDetails';
import FlexContainer from '../../components/Containers/FlexContainer/FlexContainer';
import AdminSectionTitle from '../../components/AdminSectionTitle/AdminSectionTitle';
import { ADMIN_SECTION_TITLES } from '../../constants/adminSectionTitles';
import AdminLinesGrid from '../../components/Grids/AdminLinesGrid/AdminLinesGrid';


export default function AdminAllLines() {
    const {selectedLine} = useContext(CreatorContext);

    return (
        <FlexContainer>
            <div>
                <AdminSectionTitle title={ADMIN_SECTION_TITLES.allLines}/>
                <AdminLinesGrid />
            </div>
            {selectedLine && <LineDetails />}
        </FlexContainer>
    )
}