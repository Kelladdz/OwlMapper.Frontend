import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserInterfaceContext from '../context/userInterface';
import { useFetchLinesQuery } from '../store/apis/linesApi';
import { useSearchConnections } from './useSearchConnections.js';


export default function useUserLinesGrid() {
    const {onHide, onLineSelect} = useContext(UserInterfaceContext);
    const {handleTypeChange} = useSearchConnections();
    const {navigate} = useNavigate();

    const {data: lines, error, isLoading} = useFetchLinesQuery() || [];

    
    return {lines, error, isLoading};
}