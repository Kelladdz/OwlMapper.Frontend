import { useEffect, useContext } from 'react';
import Select, { components }  from 'react-select';


import { useFetchBusStopsQuery } from "../../store";
import {useAddRouteStopComponent} from '../../hooks/useAddRouteStopComponent';
import CreatorContext from '../../context/creator';

import TimeInput from '../Inputs/TimeInput/TimeInput';
import AddRouteStopButton from '../Buttons/AddRouteStopButton/AddRouteStopButton';

import SelectExpandButton from '../../assets/selectExpandButton.svg';


import styles from './AddRouteStopComponent.module.css';



export default function AddRouteStopComponent() {
    const {handleChangeSelectedBusStop, onAddRouteStop, options} = useAddRouteStopComponent();
    
    const {data, error, isLoading} = useFetchBusStopsQuery() || [];

    const {getBusStops} = useContext(CreatorContext);
    
    useEffect(() => {
        if (!isLoading && data) {
            getBusStops(data);
        }
    },[isLoading, data])



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
        width: '16rem',
        cursor: state.isFocused ? 'text' : 'pointer'
      }),
      singleValue: (baseStyles, state) => ({
        ...baseStyles,
        fontSize: '.75rem',
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
        <div  className={styles.container}>
            <Select escapeClearsValue={true}  onChange={handleChangeSelectedBusStop} components={{IndicatorSeparator: () => null, DropdownIndicator}}  options={options} styles={busStopsDropdownStyles} placeholder='Wybierz przystanek:'/>           
            <TimeInput/>
            <AddRouteStopButton onClick={onAddRouteStop}/>
        </div>    
    )
}