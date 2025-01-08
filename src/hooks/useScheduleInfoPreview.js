import { useSelector } from "react-redux";

export function useScheduleInfoPreview() {
    const lineName = useSelector(state => state.scheduleCreator.lineName);
    const validFrom = useSelector(state => state.scheduleCreator.validFrom);

    return {lineName, validFrom};
}