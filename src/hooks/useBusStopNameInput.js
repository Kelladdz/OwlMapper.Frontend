import {useDispatch, useSelector} from 'react-redux';

import {changeBusStopName, changeCityName} from '../store/slices/busStopCreatorFormSlice';

export function useBusStopNameInput() {
    const dispatch = useDispatch();
    const busStopName = useSelector(state => state.busStopCreatorForm.busStopName);
    const city = useSelector(state => state.busStopCreatorForm.city);
    
    const handleChangeName = (event) => {
        event.preventDefault();
        dispatch(changeBusStopName(event.target.value));
    }

    const handleChangeCity = (event) => {
        event.preventDefault();
        dispatch(changeCityName(event.target.value));
    }
    return {busStopName, city, handleChangeName, handleChangeCity};
}