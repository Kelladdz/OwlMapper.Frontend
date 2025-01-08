import React, { useEffect, useState } from "react";
import { useParams, useLoaderData, Link } from "react-router-dom"

export default function CurrentDirection({currentStop, currentVariant, currentDisplayedDepartures, onMarkersWithCurrentStop, changeCurrentStop}) {
    const [routeStops, setRouteStops] = useState();
    const [departureTime, setDepartureTime] = useState();
    const params = useParams();

    console.log(currentStop);
    console.log(currentVariant);
    console.log(currentDisplayedDepartures);

    const decodedTime = atob(params.encodedTime);


    const routeStop = currentVariant.variant.routeStops.find(routeStop => currentStop.lat === routeStop.busStop.coordinate.lat && currentStop.lng === routeStop.busStop.coordinate.lng);
    const firstRouteStop = currentVariant.variant.routeStops.find(routeStop => routeStop.order === 1);

    useEffect(() => {
        console.log(routeStop);
        console.log(firstRouteStop);
        const [hours, minutes] = [parseInt(decodedTime.split(':')[0], 10), parseInt(decodedTime.split(':')[1], 10)];
        console.log(hours, minutes);
        const targetDate = new Date();
        targetDate.setHours(hours);
        targetDate.setMinutes(minutes);
        targetDate.setMinutes(targetDate.getMinutes() - routeStop.timeToTravelInMinutes);
        setDepartureTime(`${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`);
        console.log(departureTime);
    },[])

    

    useEffect(() => {
        if(routeStops){
            console.log(routeStops);
            
        }
    },[routeStops]);

    useEffect(() => {
        if(currentVariant){
            onMarkersWithCurrentStop({routeStops: currentVariant.variant.routeStops, routeStop});
            
        }
    }, [currentVariant]);

    if(!currentStop || !currentDisplayedDepartures) {
        return <div>Loading</div>
    }
    else return (
        <div>
            
            <h1 style={{marginRight: `8rem`, display: `flex`, alignItems: `center`, justifyContent: `center`}}>{params.lineName}</h1>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
            


                <h2>{currentVariant.variant.route.split('-')[1]}</h2>
            </div>
            <div>
                <ul >
                    {departureTime && currentVariant.variant.routeStops.sort((a,b) => a.order - b.order).map(routeStop => { 
                        const [hours, minutes] = departureTime.split(':').map(Number);
                        const targetDate = new Date();
                        targetDate.setHours(hours);
                        targetDate.setMinutes(minutes);
                    
                        targetDate.setMinutes(targetDate.getMinutes() + routeStop.timeToTravelInMinutes);
                        const time = `${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`;
                        return (
                        <li key={routeStop.busStop.name} >
                            {currentStop.lat === routeStop.busStop.coordinate.lat && currentStop.lng === routeStop.busStop.coordinate.lng 
                            ? 
                            <div><strong>
                                {routeStop.busStop.name} {time}
                            </strong></div> 
                            : 
                            <div onClick={() => changeCurrentStop(L.latLng(routeStop.busStop.coordinate.lat, routeStop.busStop.coordinate.lng))}>
                                {routeStop.busStop.name} {time}
                            </div>}
                        </li> )} )}
                </ul>
            </div>
            <div style={{marginTop: `2rem`}}>
                    <Link to={`/user/lines/${params.lineName}/variants/${params.slug}/route-stops/${routeStop.busStop.slug}`}>Wróć</Link>
                </div>
        </div>
        // <div>
        //     <h1>{params.routeName}</h1>
        //     <ul>
        //         {routeStops.routeStops.map(routeStop => { 
        //             const [hours, minutes] = firstCurrentBusStopDepartureString.split(':').map(Number);
        //             const targetDate = new Date();
        //             targetDate.setHours(hours);
        //             targetDate.setMinutes(minutes);
        //             targetDate.setMinutes(targetDate.getMinutes() + routeStop.travelTimeInMinutes)
                    
        //             console.log(targetDate);    
        //             const arrivalTimeString = `${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`;
        //             console.log(currentStop);
        //             console.log(L.latLng(routeStop.busStop.coordinate.latitude,routeStop.busStop.coordinate.longitude));
        //                 return (<li key={routeStop.busStop.name}>
        //                 <div>
        //                     {currentStop.lat === routeStop.busStop.coordinate.latitude && currentStop.lng === routeStop.busStop.coordinate.longitude
        //                     ? 
        //                     <div><strong>{routeStop.busStop.name} {arrivalTimeString}</strong></div>
        //                     :
        //                     <div onClick={() => changeCurrentStop(L.latLng(routeStop.busStop.coordinate.latitude,routeStop.busStop.coordinate.longitude))}><p>{routeStop.busStop.name} {arrivalTimeString}</p></div>}
        //                 </div>
        //             </li> );
        //             })}


        //     </ul>
        //     <div style={{marginTop: `2rem`}}>
        //             <Link to={`/user/route/${params.routeName}/bus-stop/${lastBusStopName.busStop.slug}`}>Wróć</Link>
        //         </div>
        // </div>
    )
}