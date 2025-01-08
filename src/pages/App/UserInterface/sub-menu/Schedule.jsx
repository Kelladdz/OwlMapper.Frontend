import React, { useEffect, useState } from "react";
import { useParams, useLoaderData, Link } from "react-router-dom"
import './schedule.css'
import { set } from "lodash";

export default function Schedule({passData, currentVariant, onCurrentStop, onCurrentDisplayedDepartures}) {
    
    const params = useParams();
    const [currentRoutes, setCurrentRoutes] = useState([params.lineName]);
    const schedules = useLoaderData();
    

    const busStop = schedules.busStop;
    const routeStops = busStop.routeStops.filter(routeStop => currentRoutes.includes(routeStop.variant.line.name));
    const departures = routeStops.map(routeStop => routeStop.variant.departures);
    console.log(departures);
    let departuresToDisplay = [];
    routeStops.forEach(routeStop => {
        routeStop.variant.departures.forEach(departure => {
            const now = new Date();
            console.log(routeStop)
                  
        
            const [hours, minutes] = [parseInt(departure.time.split(':')[0], 10), parseInt(departure.time.split(':')[1], 10)];
            console.log(hours, minutes);
            const targetDate = new Date();
            targetDate.setHours(hours);
            targetDate.setMinutes(minutes);
            targetDate.setMinutes(targetDate.getMinutes() + routeStop.timeToTravelInMinutes); // Dodanie czasu podróży do odjazdu
            console.log(targetDate);
            const differenceInMs = targetDate - now;
            
            const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
            const timeString = `${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`;
            
            departuresToDisplay.push({
                lineName: routeStop.variant.line.name,
                destination: routeStop.variant.route.split(' - ')[1],
                time: timeString,
                timeToArrive: differenceInMinutes
            });
        });
    });



    console.log(departuresToDisplay);
    console.log(busStop);
    console.log(routeStops);

    const onRouteClick = (name) => {
        console.log(currentRoutes, name);
        if (currentRoutes.length === 1) {
            return;
        }
        !currentRoutes.some(route => route === name) ? setCurrentRoutes(prevRoutes => [...prevRoutes, name]) : setCurrentRoutes(prevRoutes => prevRoutes.filter(route => route !== name));
        }
    
    useEffect(() => {
        onCurrentDisplayedDepartures(departuresToDisplay);
        onCurrentStop(busStop);
    }, []);


    return (
        <>
            <h1>{busStop.name}</h1>
            <div>
                <ul>
                    {departuresToDisplay.filter(dep => dep.timeToArrive > 0).sort((a, b) => a.timeToArrive - b.timeToArrive).map((departure, index) => {
                        return (
                            <li key={index} className='schedule-item'>
                                <Link to={`/user/lines/${params.lineName}/variants/${params.slug}/route-stops/${params.slug}/${btoa(departure.time)}`}>
                                    <p>{departure.lineName} {departure.destination} {departure.time} {departure.timeToArrive} min</p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div style={{marginTop: `2rem`}}>
                    <Link to={`/user/lines/${params.lineName}/variants/${params.slug}`}>Wróć</Link>
                </div>
        </>
    )
}