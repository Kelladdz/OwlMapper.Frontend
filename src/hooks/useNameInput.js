import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreatorContext from '../context/creator';
import CurrentDataContext from '../context/currentData';

import {changeLineName, changeRoute, resetAllForm} from '../store/slices/lineCreatorFormSlice';

import {ACTIONS} from '../constants/actions';
import { NAME_INPUT_LABELS } from '../constants/nameInputLabels';

export function useNameInput(property) {
    const lineName = useSelector((state) => state.lineCreatorForm.lineName);
    const route = useSelector((state) => state.lineCreatorForm.route);

    const dispatch = useDispatch();

    const {action} = useContext(CreatorContext);
    const {params} = useContext(CurrentDataContext);

    const [label, setLabel] = useState('');
    const [maxLength, setMaxLength] = useState(0);

    const handleChangeName = (event) => {
        if (property === 'route-name') {
            handleChangeRoute(event);
        } else {
            handleChangeLineName(event);
        } 
    }

    const handleChangeLineName = (event) => {
        event.preventDefault();
        dispatch(changeLineName(event.target.value.toUpperCase()));
    }

    const handleChangeRoute = (event) => {
        event.preventDefault();
        const value = firstCapitalLetter(event.target.value);
        dispatch(changeRoute(value));
    }

    const firstCapitalLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        if (action === ACTIONS.createLine) {
            dispatch(resetAllForm());
        } else if (action === ACTIONS.createVariant && params) {
            dispatch(changeLineName(params.lineName));
            dispatch(changeRoute(route));
        } else if (action === ACTIONS.editVariant && params.lineName !== '' && params.variantId !== '') {
            dispatch(changeLineName(lineName));
            dispatch(changeRoute(route));
        }
    },[action, params]);

    useEffect(() => {
        setLabel(NAME_INPUT_LABELS[property]);
        switch (property) {
            case 'line-name':
                setMaxLength(3);
                break;
            case 'route-name':
                setMaxLength(20);
                break;
            default:
                break
        }
    },[property])


    return {
        handleChangeName,
        maxLength,
        lineName, route,
        label
    }
}