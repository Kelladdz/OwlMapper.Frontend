import React, { createContext, useContext, useEffect, useState } from 'react';

const CurrentDataContext = createContext();

function CurrentDataProvider({children}) {
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [params, setParams] = useState({lineName: '', variantName: ''});

        const getSelectedPoint = (point) => {
            setSelectedPoint(point);
        }

        const getParams = (parameters) => {
            setParams(parameters)
        }

        useEffect(() => {
            if (selectedPoint) {
                console.log('Selected point has changed: ', selectedPoint);
            }
        }, [selectedPoint])  

        return <CurrentDataContext.Provider value={{
            selectedPoint, getSelectedPoint,
            params, getParams}}>
			{children}
			</CurrentDataContext.Provider>;

} 

export { CurrentDataProvider };
export default CurrentDataContext;