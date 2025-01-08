import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {changeValidFromDate} from '../store/slices/lineCreatorFormSlice';

import CreatorContext from '../context/creator';

import { ACTIONS } from '../constants/actions';

export function useValidFromInput() {
    const validFrom = useSelector((state) => state.lineCreatorForm.validFrom);
    const {action} = useContext(CreatorContext);
    const dispatch = useDispatch();

    const handleKeyDown = (event) => {
        event.preventDefault();
        if (event.key === 'Enter') {
            handleValidFromDateChange(validFrom)
        }
    }

    const handleValidFromDateChange = (date) => {   
        const dateString = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
		.toISOString().substring(0, 10);
        dispatch(changeValidFromDate(dateString));
    }

    useEffect(() => {
        if (action === ACTIONS.createLine || action === ACTIONS.createVariant) {
            dispatch(changeValidFromDate(''));
            
        }
    },[action])
    
    return {validFrom, handleValidFromDateChange, handleKeyDown}
}