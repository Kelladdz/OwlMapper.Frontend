import React, { useEffect, useState, useContext } from "react";
import { useParams, useLoaderData, Link } from "react-router-dom"
import MarkersContext from "../../../context/markers";
import MapBehaviorContext from "../../../context/mapBehavior";
import { useDispatch, useSelector } from "react-redux";
import { addRouteStops } from "../../../store/slices/routeStopsSlice";
import { useFetchVariantQuery } from "../../../store/apis/variantsApi";
import { add, get } from "lodash";
import RouteLinePointsContext from "../../../context/routeLines";

export default function Direction() {
    /*const params = useParams();
    const lineName = params.lineName;
    const slug = params.slug;
    console.log(lineName, slug);
    const { addRouteStopsMarkers } = useContext(MarkersContext);
    const { addRouteLinePoints } = useContext(RouteLinePointsContext);
    const {data, error, isLoading} = useFetchVariantQuery({lineName, id: variantId});
    

    

        
    


    

    useEffect(() => {
        if (!isLoading && data) {
            console.log(data);
            const routeStops = data.variant.routeStops;
            console.log(routeStops);
            const routeLinesPoints = data.variant.routeLinePoints;
            console.log(routeLinesPoints);
            addRouteLinePoints(routeLinesPoints);
            addRouteStopsMarkers(routeStops);
        }
    }, [isLoading, data]);
    


    // if (routeStops) {
    //     console.log(routeStops);
    //     );
    // }


    if (isLoading) return <div>Loading...</div>

    else*/ return (
        <div>
            
            {/* <h1 style={{marginRight: `8rem`, display: `flex`, alignItems: `center`, justifyContent: `center`}}>{params.lineName}</h1>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
            


                <h2>{data.variant.routeStops.find(routeStop => routeStop.order === Math.max(...data.variant.routeStops.map(routeStop => routeStop.order))).busStop.name}</h2>
            </div>
            <div>
                <ul >
                    {data.variant.routeStops.sort((a,b) => a.order - b.order).map(routeStop => routeStop.busStop).map(busStop => { return <li key={busStop.id}><Link to={`/user/lines/${lineName}/variants/${variantName}/route-stops/${busStop.slug}`}>{busStop.name}</Link></li> } )}
                </ul>
            </div>
            <div style={{marginTop: `2rem`}}>
                    <Link to={`/user/lines/${params.lineName}`}>Wróć</Link>
                </div> */}
        </div>
    )
}