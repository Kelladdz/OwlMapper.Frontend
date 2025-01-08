import { ACTIONS } from "../constants/actions";

export default function isLineCreateFormComplete(form, action) {
    
    return form.lineName !== '' && (((action === ACTIONS.createVariant || action === ACTIONS.editVariant) && form.variantName !== '' ) || action === ACTIONS.createLine) && form.routeStops.length > 1 && (form.weekDaysDepartureTimes.length > 0 
    || form.saturdaysDepartureTimes.length > 0 || form.sundaysAndHolidaysDepartureTimes.length > 0) && form.routeLinePoints.length > 1
        ? true : false;
}