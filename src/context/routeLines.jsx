import React, { createContext, useState, useContext, useEffect } from 'react';

const RouteLinePointsContext = createContext();


function RouteLinePointsProvider({ children }) {
    const [routeLinePoints, setRouteLinesPoints] = useState([]);


			const addRouteLinePointToMap = (point, isManuallyAdded) => {
				setRouteLinesPoints(prevPoints => [...prevPoints, {coordinate: point, order: prevPoints.length + 1, isManuallyAdded: isManuallyAdded}]);
			}

			const removeRouteLinePoint = (routeLinePoint) => {
				setRouteLinesPoints(prevPoints => prevPoints.filter(point => point !== routeLinePoint));
			}

			const removeAllRouteLinePoints = () => {
				setRouteLinesPoints([]);
			}

			const getRouteLinePoints = (routeLinePoints) => {
				setRouteLinesPoints(routeLinePoints);
			}

			useEffect(() => {
				console.log('Route line points: ', routeLinePoints);
			}, [routeLinePoints]);

		return <RouteLinePointsContext.Provider value={{
            routeLinePoints, addRouteLinePointToMap, removeRouteLinePoint, removeAllRouteLinePoints, getRouteLinePoints}}>
			{children}
			</RouteLinePointsContext.Provider>;


}

export { RouteLinePointsProvider };
export default RouteLinePointsContext;
