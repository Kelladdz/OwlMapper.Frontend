import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import MarkersContext from '../context/markers';
import SideBarContext from "../context/sideBar";

import { useFetchBusStopsQuery, useAddBusStopMutation, useUpdateBusStopMutation, useDeleteBusStopMutation } from "../store/apis/busStopsApi";
import { changeCityName, resetAllBusStopForm, changeIsRequest, changeLatitude, changeLongitude } from "../store/slices/busStopCreatorFormSlice";

import { PATHS } from "../constants/paths";
import { ACTIONS } from "../constants/actions";


export function useBusStopsCreator() {
    const lat = useSelector(state => state.busStopCreatorForm.lat);
    const lng = useSelector(state => state.busStopCreatorForm.lng);
    const isRequest = useSelector(state => state.busStopCreatorForm.isRequest);
    const form = useSelector(state => state.busStopCreatorForm);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [busStops, setBusStops] = useState();
    const [isMapBlocked, setIsMapBlocked] = useState(false);
    const [action, setAction] = useState();
    const [slug, setSlug] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const {createBusStopMarker, addCreateBusStopMarker, removeCreateBusStopMarker} = useContext(MarkersContext);
    const {changeActiveButton} = useContext(SideBarContext)
    const {data, error, isLoading} = useFetchBusStopsQuery() || [];
    const [addBusStop, {isLoading: addBusStopLoading}] = useAddBusStopMutation();
    const [updateBusStop, {isLoading: updateBusStopLoading}] = useUpdateBusStopMutation();
    const [deleteBusStop, {isLoading: deleteBusStopLoading}] = useDeleteBusStopMutation();

   const handleSubmit = async (event) => {
        event.preventDefault();

        const request = {
            slug, slug,
            name: form.busStopName,
            city: form.city,
            coordinate: {lat: form.lat, lng: form.lng},
            isRequest: form.isRequest
        }

        switch (action) {
            case ACTIONS.createBusStop:
                try {
                    await addBusStop(request).unwrap();
                    removeCreateBusStopMarker();
                } catch (error) {
                    console.log(error);
                }     
                break;
            case ACTIONS.editBusStop:
                try {
                    await updateBusStop(request).unwrap();
                    removeCreateBusStopMarker();
                } catch (error) {
                    console.log(error);
                }
                break;
            default:
                break;
        }
    }


    const onDeleteBusStop = async (slug) => {
        try {
            await deleteBusStop(slug).unwrap();
            removeCreateBusStopMarker();
            dispatch(resetAllBusStopForm());
        } catch (error) {
            console.log(error);
        } finally {
            
        }
    }


    const handleChangeCityName = (event) => {
        event.preventDefault();
        if (event.target.value.length > 0 && event.target.value.length < 100) {
            dispatch(changeCityName(event.target.value));
        }
    }

    const handleChangeIsRequest = () => {
        dispatch(changeIsRequest());
    }

    const onBack = () => {
        dispatch(resetAllBusStopForm());
        removeCreateBusStopMarker();
        navigate(PATHS.admin);
    }

    const onCancel = () => {
        dispatch(resetAllBusStopForm());
        removeCreateBusStopMarker();
    }

    const isBlocked = (flag) => {
        setIsMapBlocked(flag);
    }

    const showForm = (flag) => {
        setIsOpen(flag);
    }

    const addBusStopMarker = (position) => {
        addCreateBusStopMarker(position);
    }
    

    const getPosition = (position) => {
        dispatch(changeLatitude(position.lat.toFixed(6)));
        dispatch(changeLongitude(position.lng.toFixed(6)));
    } 


    const toggleAction = (newAction) => {
        setAction(newAction);
    }

    const getSlug = (busStop) => {
        setSlug(busStop.busStop.slug);
    }

    useEffect(() => {
        if (!isLoading && data) {
            setBusStops(data);
        }
        return () =>{
            setBusStops();
        }
    },[isLoading, data])


    
    return {busStops, isMapBlocked, createBusStopMarker, action, slug, isSaved, isRequest, removeCreateBusStopMarker, isLoading, isOpen, showForm, getSlug, onDeleteBusStop, toggleAction, handleChangeIsRequest, getPosition, addBusStopMarker, isBlocked, onCancel, onBack, handleSubmit, handleChangeCityName, handleChangeIsRequest, createBusStopMarker, addCreateBusStopMarker, lat, lng};
}

