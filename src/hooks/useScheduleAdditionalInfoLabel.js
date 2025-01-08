import { useSelector } from "react-redux";

export default function useScheduleAdditionalInfoLabel(property) {
    const operator = useSelector(state => state.scheduleCreator.operator);
    const organizer = useSelector(state => state.scheduleCreator.organizer);

    const {label, value} = property === 'operator' ? {label: 'Operator:', value: operator} : {label: 'Organizator:', value: organizer};

    return {label, value};
}