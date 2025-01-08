import React, { useContext, useEffect } from "react";
import Select, { components }  from 'react-select';

import CreatorContext from '../../../context/creator'
import { useVariantsForScheduleDropdown } from "../../../hooks/useVariantsForScheduleDropdown";

import AdminIconButton from '../../Buttons/AdminIconButton/AdminIconButton';

import PlusSign from '../../../assets/plusSignBlack.svg';
import SelectExpandButton from '../../../assets/selectExpandButton.svg';


import styles from './VariantsForScheduleDropdown.module.css';
import { useScheduleCreator } from "../../../hooks/useScheduleCreator";
import { useSchedule } from "../../../hooks/useSchedule";
import { useFetchVariantsQuery } from "../../../store/apis/variantsApi";



export default function VariantsForScheduleDropdown() {
    const {selectedLine, options} = useContext(CreatorContext);
    const {label, optionSelectHandle, onFetchedAllVariantsHandle} = useVariantsForScheduleDropdown();

    const {data: variants, error, isLoading} = useFetchVariantsQuery(selectedLine, {skip: selectedLine === ''}) || [];

    useEffect(() => {
        if (!isLoading && variants) {
            onFetchedAllVariantsHandle(variants);
        }
    }, [variants, isLoading])


    const DropdownIndicator = (props) => {
        return (
        components.DropdownIndicator && (<components.DropdownIndicator {...props }>
            <img src={SelectExpandButton} alt='select-expand-button'/>
        </components.DropdownIndicator>))
    }

const busStopsDropdownStyles = {
    control: (baseStyles, state) => ({
    ...baseStyles,
    maxHeight: '2rem',
    minHeight: '2rem',
    marginInline: '1rem',
    marginTop: '1rem',
    cursor: state.isFocused ? 'text' : 'pointer'
  }),
  singleValue: (baseStyles, state) => ({
    ...baseStyles,
    fontWeight: '500',
    color: '#1e1e1e',
    display: 'flex',    
    alignItems: 'center',
    lineHeight: '1rem',
    height: '1rem',
  }),
  placeholder: (baseStyles, state) => ({
    ...baseStyles,
    marginLeft: '0',
    paddingLeft: '0', 
    alignItems: 'center',
    lineHeight: '1rem',
    color: '#afafaf',
    display: state.isFocused ? 'none' : 'flex'
  }),
  menuList : (baseStyles, state) => ({
    ...baseStyles,
    boxShadow: '0 .5rem .5rem 0 rgba(0, 0, 0, 0.2)',
    ...({
        '::-webkit-scrollbar': {
        width: '.5rem'
    },
    '::-webkit-scrollbar-track': {
        backgroundColor: 'white',
        width: '.4rem',
        borderRadius: '50px'
    },
    '::-webkit-scrollbar-thumb': {
        color: '#1e1e1e',
        backgroundColor: '#cccccc',
        borderRadius: '50px',
        width: '.4rem'
    } 
    })
  })
}

    return (
        <div className={styles.container}>
            <span className={styles.label}>{label}</span>
            <Select escapeClearsValue={true}  onChange={optionSelectHandle} components={{IndicatorSeparator: () => null, DropdownIndicator}}  options={options} styles={busStopsDropdownStyles} placeholder='Wybierz połączenie:'/>
        </div>
    );
}