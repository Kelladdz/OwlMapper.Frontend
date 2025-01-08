import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNameInput } from '../../../hooks/useNameInput';

import isNameInputDisabled from '../../../conditions/isNameInputDisabled';

import { ACTIONS } from '../../../constants/actions';

import styles from './NameInput.module.css';

export default function NameInput({action, property}) {
    const {handleChangeName, lineName, variantName, maxLength, label} = useNameInput(property);

    return (
        <div className={styles.container}>
            <label className={styles[`label`]} for='line-name'>{label}</label>
            <input className={styles['input']} type='text' id='line-name' maxLength={maxLength} value={property === 'line-name' ? lineName : variantName} onChange={handleChangeName} disabled={property !== 'bus-stop-name' ? isNameInputDisabled(property, action) : false}/>   
        </div>
    )
}