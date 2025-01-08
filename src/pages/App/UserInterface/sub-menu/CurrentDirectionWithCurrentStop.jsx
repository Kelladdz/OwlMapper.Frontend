import React, { useEffect, useState } from "react";
import { useParams, useLoaderData, Link } from "react-router-dom"

export default function CurrentDirectionWithCurrentStop({schedules, currentStop, onMarkersWithCurrentStop}) {
    const params = useParams();
    const routeStops = useLoaderData();
    console.log(schedules);
    console.log(routeStops);
    console.log(params);

    const decodedTime = atob(params.encodedTime);
    console.log(decodedTime);

    const departures = schedules.departures;
    console.log(departures);
    const departuresFromFirstStop = schedules.departuresFromFirstStop;
    console.log(departuresFromFirstStop);
    const lastBusStopName = schedules.lastBusStopName;
    console.log(lastBusStopName);
    const routeName = schedules.routeName;
    console.log(routeName);

    const indexOfCurrentDepartureTime = departures.findIndex(departure => departure === decodedTime);
    console.log(indexOfCurrentDepartureTime);

    const currentDepartureTimeFromFirstStop = departuresFromFirstStop[indexOfCurrentDepartureTime];
    console.log(currentDepartureTimeFromFirstStop);

    const [hours, minutes] = decodedTime.split(':').map(Number);
    const decodedTimeToDate = new Date();
    decodedTimeToDate.setHours(hours, minutes);


    return (
        <div>
            <h1>{params.routeName}</h1>
            <ul>
                {routeStops.routeStops.map(routeStop => { 
                    const [hours, minutes] = currentDepartureTimeFromFirstStop.split(':').map(Number);
                    const targetDate = new Date();
                    targetDate.setHours(hours);
                    targetDate.setMinutes(minutes);
                    targetDate.setMinutes(targetDate.getMinutes() + routeStop.travelTimeInMinutes)
                    
                    console.log(targetDate);    
                    const arrivalTimeString = `${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`;
                    const arrvalTimeString = `${targetDate.getHours()}:${targetDate.getMinutes()}`;
                        return (<li key={routeStop.busStop.name}>
                        <div>
                            {decodedTime === arrivalTimeString 
                            ? 
                            <Link to={`/user/bus-stop/${routeStop.busStop.name}/route/${routeName}/${params.encodedTime}`}><strong>{routeStop.busStop.name} {arrivalTimeString}</strong></Link>
                            :
                            <Link to={`/user/bus-stop/${routeStop.busStop.name}/route/${routeName}/${params.encodedTime}`}><p>{routeStop.busStop.name} {arrivalTimeString}</p></Link>}
                        </div>
                    </li> );
                    })}


            </ul>
        </div>
    )
}