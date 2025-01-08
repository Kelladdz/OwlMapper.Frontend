import { useSelector, useDispatch } from "react-redux";

import {changeOperatorForSchedule, changeOrganizerForSchedule} from "../store/slices/scheduleCreatorSlice";


export function useScheduleCreatorInput(property) {
    const operator = useSelector(state => {return state.scheduleCreator.operator});
    const organizer = useSelector(state => {return state.scheduleCreator.organizer});
    const dispatch = useDispatch();

    const label = property === 'operator' ? 'Operator: ' : 'Organizator: ';
    const value = property === 'operator' ? operator : organizer;

    const handleInputChange = (event) => {
        event.preventDefault();
        if (property === 'operator') {
            dispatch(changeOperatorForSchedule(event.target.value));
        } else {
            dispatch(changeOrganizerForSchedule(event.target.value));
        }
    }


    return {label, value, handleInputChange}
}