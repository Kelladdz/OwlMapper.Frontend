import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MarkersContext from '../context/markers';
import CreatorContext from '../context/creator';

import {changeSelectedBusStop, addRouteStop, changeTimeToTravel} from '../store/slices/lineCreatorFormSlice';

export function useAddRouteStopComponent() {
    const routeStops = useSelector((state) => state.lineCreatorForm.routeStops);
    const timeToTravelInMinutes = useSelector(state => { return state.lineCreatorForm.timeToTravelInMinutes});
    const selectedBusStop = useSelector(state => { return state.lineCreatorForm.selectedBusStop});
    
    const [options, setOptions] = useState(); 
    
    const dispatch = useDispatch();

    const {addRouteStopMarker} = useContext(MarkersContext);
    const {busStops} = useContext(CreatorContext);



    const onAddRouteStop = () => {
        if (timeToTravelInMinutes < 100) {
            if (routeStops.length === 0 || !routeStops) {
                dispatch(addRouteStop({busStopId: selectedBusStop.busStopId, name: selectedBusStop.name, timeToTravelInMinutes: 0, order: 1}));
                addRouteStopMarker({coordinate: selectedBusStop.coordinate, order: 1});
            } else {
                const lastRouteStop = routeStops[routeStops.length - 1];
                if (lastRouteStop.timeToTravelInMinutes <= timeToTravelInMinutes){

                    
                    dispatch(addRouteStop({busStopId: selectedBusStop.busStopId, name: selectedBusStop.name, timeToTravelInMinutes: timeToTravelInMinutes, order: routeStops.length + 1}))
                    addRouteStopMarker({coordinate: selectedBusStop.coordinate, order: routeStops.length + 1});
                }
                }  
            }
        }

    const handleChangeSelectedBusStop = (selectedOption) => {
        dispatch(changeSelectedBusStop(selectedOption.value));
    }

    useEffect(() => {
    },[selectedBusStop])

    useEffect(() => {
        if (busStops){
            const busStopsOptionsValues = busStops.map(item => {
                
                let name = `${item.busStop.city} ${item.busStop.name}`;
                name.split(' ')[0] === name.split(' ')[1] ? name = `${item.busStop.name} ` : name = name;
                name.split(' ')[0] === name.split(' ')[2] && name.split(' ')[1] === name.split(' ')[3] ? name = `${name.split(' ')[0]} ${name.split(' ')[1]}` : name = name;
                name.split(' ')[0] === name.split(' ')[3] && name.split(' ')[1] === name.split(' ')[4] && name.split(' ')[2] === name.split(' ')[5] ? name = `${name.split(' ')[0]} ${name.split(' ')[1]} ${name.split(' ')[2]}` : name = name;
                return ({value: {busStopId: item.busStop.id, name: name,  coordinate: item.busStop.coordinate}, label:`${name} (${item.busStop.id})`})     
            })
            setOptions(busStopsOptionsValues);
        }
    },[busStops])

    useEffect(() => {
        if (routeStops) {
            if (routeStops.length > 1) {
                dispatch(changeTimeToTravel(routeStops[routeStops.length - 1].timeToTravelInMinutes));
                } else if (routeStops.length === 1) {
                    dispatch(changeTimeToTravel(0));
                }
        }
        
    },[routeStops])


    return {handleChangeSelectedBusStop, onAddRouteStop, routeStops, options}
}