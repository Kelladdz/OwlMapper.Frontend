import { useSelector, useDispatch } from "react-redux";

import {changeRoute} from "../store/slices/lineCreatorFormSlice";


export function useAdditionalInfoInputs() {
    const route = useSelector(state => {return state.lineCreatorForm.route});
    const dispatch = useDispatch();

    const handleRouteChange = (event) => {
        event.preventDefault();
        dispatch(changeRoute(event.target.value));
    }


    return { route, handleRouteChange}
}