import React, { createContext, useState, useContext, useEffect } from 'react';
import L from 'leaflet';


const MarkersContext = createContext();


function MarkersProvider({ children }) {
    const [startMarker, setStartMarker] = useState(null);
	const [destinationMarker, setDestinationMarker] = useState(null);
	const [routeStopsMarkers, setRouteStopsMarkers] = useState([]);
	const [createBusStopMarker, setCreateBusStopMarker] = useState(null);


			const addStartMarker = (coordinate) => {
				setStartMarker(coordinate);
			}
	
			const addDestinationMarker = (coordinate) => {
				setDestinationMarker(coordinate);
			}

			const addRouteStopMarker = (routeStop) => {
				setRouteStopsMarkers(prevRouteStops => [...prevRouteStops, routeStop]);
			}

			const removeRouteStopMarker = (order) => {
				const currentMarkers  = routeStopsMarkers;
				const updated = currentMarkers.filter((stop) => 
					stop.order !== order)
				if (updated.length > 1) {
					const sortedAndUpdated = updated.sort((a, b) => a.order - b.order);
					sortedAndUpdated.forEach((stop, index) => {
						stop.order = index + 1;
					});
					setRouteStopsMarkers(sortedAndUpdated);
				} else if (updated.length === 1) {
					const firstStop = updated[0];
					firstStop.order = 1;
					setRouteStopsMarkers([firstStop]);
				} else {
					setRouteStopsMarkers([]);
				}
			}

			const removeAllRouteStopMarkers = () => {
				setRouteStopsMarkers([]);
			}

			const addCreateBusStopMarker = (busStop) => {
				setCreateBusStopMarker(busStop);
			}

			const removeCreateBusStopMarker = () => {
				setCreateBusStopMarker(null);
			}

			const addRouteStopsMarkers = (routeStops) => {
				setRouteStopsMarkers(routeStops);
			}

			useEffect(() => {
				if (startMarker) {
					console.log('Start marker was created: ', startMarker);
				}
			}, [startMarker])

			useEffect(() => {
				if (destinationMarker) {
					console.log('Destination marker was created: ', destinationMarker);
				}
			}, [destinationMarker])

			useEffect(() => {
				if (routeStopsMarkers) {
					console.log('Route stops markers: ', routeStopsMarkers);
				}
			},[routeStopsMarkers])

			// useEffect(() => {
			// 	if (routeStopsMarkers.length > 1) {
			// 		const sortedAndUpdated = routeStopsMarkers.sort((a, b) => a.order - b.order);
					
			// 		sortedAndUpdated.forEach((stop, index) => {
			// 			stop.order = index + 1;
			// 		});
			// 		setRouteStopsMarkers(sortedAndUpdated);
			// 	} else if (routeStopsMarkers.length === 1) {
			// 		const firstStop = routeStopsMarkers[0];
			// 		firstStop.order = 1;
			// 		setRouteStopsMarkers([firstStop]);
			// 	}
			// }, [routeStopsMarkers])


		return <MarkersContext.Provider value={{
			startMarker, addStartMarker,
			destinationMarker, addDestinationMarker,
			routeStopsMarkers, addRouteStopMarker, removeRouteStopMarker,
			removeAllRouteStopMarkers, addCreateBusStopMarker, removeCreateBusStopMarker, createBusStopMarker,
			addRouteStopsMarkers }}>
			{children}
			</MarkersContext.Provider>;


}



export { MarkersProvider };
export default MarkersContext;