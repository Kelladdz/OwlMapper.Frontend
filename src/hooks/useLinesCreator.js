import { useState, useEffect, useContext } from 'react';
import {  useAddLineMutation, useCreateVariantMutation, useFetchVariantsQuery, useUpdateVariantMutation } from "../store";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { isEqual } from 'lodash';

import CreatorContext from '../context/creator';
import RouteLinePointsContext from '../context/routeLines';
import MarkersContext from '../context/markers';

import { changeLineName, changeRoute, fillForm, resetAllForm } from '../store/slices/lineCreatorFormSlice';

import { ADMIN_SECTION_TITLES } from "../constants/adminSectionTitles";
import { ACTIONS } from "../constants/actions";
import { PATHS } from '../constants/paths';
import { SUBMIT_BUTTON_LABELS } from '../constants/submitButtonLabels.js';
import { useAdminVariantsList } from './useAdminVariantsList';



export function useLinesCreator(action, params, isLoaded) {
    const form = useSelector(state => state.lineCreatorForm);
    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [submitButtonLabel, setSubmitButtonLabel] = useState('');
    const [variant, setVariant] = useState();
    const [variantId, setVariantId] = useState();
    
    
    const {toggleAction, onLineSelect, toggleSkip, skip} = useContext(CreatorContext);
    const {removeAllRouteLinePoints} = useContext(RouteLinePointsContext);
    const {removeAllRouteStopMarkers} = useContext(MarkersContext);

    const [addLine, {isLoading: addLineLoading}] = useAddLineMutation();
    const [updateVariant, {isLoading: updateVariantLoading}] = useUpdateVariantMutation();
    const [createVariant, {isLoading: addVariantLoading}] = useCreateVariantMutation();

    

    const aloneComponentClassName = action === ACTIONS.createLine ? 'alone-' : '';

    const handleSubmit = async (event) => {
        event.preventDefault();
        const weekDaysDepartures = form.weekDaysDepartureTimes.map(time => ({scheduleDay: 0, time: `${time.time}:00`, isOnlyInSchoolDays: time.isOnlyInSchoolDays, isOnlyInDaysWithoutSchool: time.isOnlyInDaysWithoutSchool}));
        const saturdaysDepartures = form.saturdaysDepartureTimes.map(time => ({scheduleDay: 1, time: `${time.time}:00`, isOnlyInSchoolDays: time.isOnlyInSchoolDays, isOnlyInDaysWithoutSchool: time.isOnlyInDaysWithoutSchool}));
        const sundaysAndHolidaysDepartures = form.sundaysAndHolidaysDepartureTimes.map(time => ({scheduleDay: 2, time: `${time.time}:00`, isOnlyInSchoolDays: time.isOnlyInSchoolDays, isOnlyInDaysWithoutSchool: time.isOnlyInDaysWithoutSchool}));
        const routeStops = form.routeStops.map(stop => ({busStopId: stop.busStopId, name: stop.name.split(' (')[0], timeToTravelInMinutes: stop.timeToTravelInMinutes, order: stop.order}));
        const lineName = action === ACTIONS.createLine ? form.lineName : params.lineName;
        const route = form.route;
        
        
        let request = {
            lineName: lineName,
            validFrom: form.validFrom,
            id: params.variantId,
            route: route,
            routeStops: routeStops,
            departures: [...weekDaysDepartures, ...saturdaysDepartures, ...sundaysAndHolidaysDepartures],
            routeLinePoints: form.routeLinePoints,
            
        }

        switch (action) {
            case ACTIONS.createLine:
                try {
                    await addLine(request).unwrap();
                    dispatch(resetAllForm());
                    navigate(PATHS.createLineSuccess);
                } catch (error) {
                    console.log(error);
                }              
                break;
            case ACTIONS.createVariant:
                try {
                    await createVariant(request).unwrap();
                    dispatch(resetAllForm());
                    onLineSelect(null);
                    navigate(PATHS.createVariantSuccess);
                } catch (error) {
                    console.log(error);
                }
                break;
            case ACTIONS.editVariant:
                try {
                    await updateVariant(request).unwrap();
                    navigate(PATHS.editVariantSuccess);
                    dispatch(resetAllForm());
                    onLineSelect(null);
                } catch (error) {
                    console.log(error);
                }
                break;
            default:
                break;
        }
    }



    useEffect(() => {
        if (variant) {
            setVariantId(variant.variant.id);
            if (variant.variant.routeStops && variant.variant.routeStops.length > 0) {
                dispatch(fillForm({
                    lineName: params.lineName,
                    validFrom: variant.variant.validFrom,
                    route: variant.variant.route,                    
                    routeStops: variant.variant.routeStops.map(stop => {
                        
                        let label = `${stop.busStop.city} ${stop.busStop.name}`;
                        label.split(' ')[0] === label.split(' ')[1] ? label = `${label.split(' ')[1]}` : label = label;
                        label.split(' ')[0] === label.split(' ')[2] && label.split(' ')[1] === label.split(' ')[3] ? label = `${label.split(' ')[0]} ${label.split(' ')[1]}` : label = label;
                        label.split(' ')[0] === label.split(' ')[3] && label.split(' ')[1] === label.split(' ')[4] && label.split(' ')[2] === label.split(' ')[5] ? label = `${label.split(' ')[0]} ${label.split(' ')[1]} ${label.split(' ')[2]}` : label = label;
                        label.split(' ')[0] === label.split(' ')[1] ? label = `${label.split(' ')[1]} (${stop.busStop.id})` : label = label;
                        return ({busStopId: stop.busStop.id, name: label, timeToTravelInMinutes: stop.timeToTravelInMinutes, order: stop.order, coordinate: stop.busStop.coordinate})
                    }),
                    timeToTravelInMinutes: variant.variant.routeStops[variant.variant.routeStops.length - 1].timeToTravelInMinutes,
                    weekDaysDepartureTimes: variant.variant.departures.filter(departure => departure.scheduleDay === 0).map(departure => {return {time: `${departure.time.substring(0,5)}`, scheduleDay: departure.scheduleDay, isOnlyInSchoolDays: departure.isOnlyInSchoolDays, isOnlyInDaysWithoutSchool: departure.isOnlyInDaysWithoutSchool}}),
                    saturdaysDepartureTimes: variant.variant.departures.filter(departure => departure.scheduleDay === 1).map(departure => {return {time: `${departure.time.substring(0,5)}`, scheduleDay: departure.scheduleDay, isOnlyInSchoolDays: departure.isOnlyInSchoolDays, isOnlyInDaysWithoutSchool: departure.isOnlyInDaysWithoutSchool}}),
                    sundaysAndHolidaysDepartureTimes: variant.variant.departures.filter(departure => departure.scheduleDay === 2).map(departure => {return {time: `${departure.time.substring(0,5)}`, scheduleDay: departure.scheduleDay, isOnlyInSchoolDays: departure.isOnlyInSchoolDays, isOnlyInDaysWithoutSchool: departure.isOnlyInDaysWithoutSchool}}),
                    canHandDraw: false,
                    routeLinePoints: variant.variant.routeLinePoints.map(point => ({coordinate: point.coordinate, isManuallyAdded: point.isManuallyAdded, order: point.order}))
                }));
            } else {
                dispatch(fillForm({
                    lineName: variant.variant.line.name,
                    validFrom: variant.variant.validFrom,
                    route: variant.variant.route,                    
                    routeStops: [],
                    timeToTravelInMinutes: 0,
                    weekDaysDepartureTimes: variant.variant.departures.filter(departure => departure.scheduleDay === 0).map(departure => {return {time: `${departure.time.substring(0,5)}`, scheduleDay: departure.scheduleDay, isOnlyInSchoolDays: departure.isOnlyInSchoolDays, isOnlyInDaysWithoutSchool: departure.isOnlyInDaysWithoutSchool}}),
                    saturdaysDepartureTimes: variant.variant.departures.filter(departure => departure.scheduleDay === 1).map(departure => {return {time: `${departure.time.substring(0,5)}`, scheduleDay: departure.scheduleDay, isOnlyInSchoolDays: departure.isOnlyInSchoolDays, isOnlyInDaysWithoutSchool: departure.isOnlyInDaysWithoutSchool}}),
                    sundaysAndHolidaysDepartureTimes: variant.variant.departures.filter(departure => departure.scheduleDay === 2).map(departure => {return {time: `${departure.time.substring(0,5)}`, scheduleDay: departure.scheduleDay, isOnlyInSchoolDays: departure.isOnlyInSchoolDays, isOnlyInDaysWithoutSchool: departure.isOnlyInDaysWithoutSchool}}),
                    canHandDraw: false,
                    routeLinePoints: variant.variant.routeLinePoints.map(point => ({coordinate: point.coordinate, isManuallyAdded: point.isManuallyAdded, order: point.order}))
                }));
            }
           
        }
    },[variant])

    useEffect(() => {
            if (location.pathname === PATHS.createLine || location.pathname === PATHS.createLineSuccess) {
                toggleAction(ACTIONS.createLine);
            } else if (location.pathname === PATHS.createVariant || location.pathname === PATHS.createVariantSuccess) {
                toggleAction(ACTIONS.createVariant);
            } else if (location.pathname === PATHS.editVariant || location.pathname === PATHS.editVariantSuccess) {
                toggleAction(ACTIONS.editVariant);
            } else if (location.pathname === PATHS.deleteLineSuccess) {
                toggleAction(ACTIONS.deleteLine);
            } else if (location.pathname === PATHS.deleteVariantSuccess) {
                toggleAction(ACTIONS.deleteVariant);
            }
    },[location])

    useEffect(() => {
        if (form.routeStops && form.routeStops.length === 0 && form.routeLinePoints.length === 0) {
            removeAllRouteLinePoints();
        }
    },[form]) 

    useEffect(() => {
        switch (action) {
            case ACTIONS.createLine:
                setTitle(ADMIN_SECTION_TITLES.createLine);
                setSubmitButtonLabel(SUBMIT_BUTTON_LABELS.createLine);
                dispatch(resetAllForm());
                removeAllRouteStopMarkers();
                toggleSkip(true);
                break;
            case ACTIONS.createVariant:
                setTitle(ADMIN_SECTION_TITLES.createVariant);
                setSubmitButtonLabel(SUBMIT_BUTTON_LABELS.createVariant);
                dispatch(resetAllForm());
                dispatch(changeRoute(''));
                dispatch(changeLineName(params.lineName));
                toggleSkip(true);
                break;
            case ACTIONS.editVariant:
                setTitle(ADMIN_SECTION_TITLES.editVariant);
                setSubmitButtonLabel(SUBMIT_BUTTON_LABELS.editVariant);
                dispatch(changeLineName(params.lineName));
                
                toggleSkip(false);
                break;
            default:
                break;
        }
    },[action, params])

    const getVariant = (data) => {
        if (data) {
            setVariant(data);
        }
    }

    useEffect(() => {
        return () => {
            dispatch(resetAllForm());
            removeAllRouteStopMarkers();
        }
    },[])

    return {title, submitButtonLabel, variant, aloneComponentClassName, getVariant, handleSubmit}
}