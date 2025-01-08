import React, { createContext, useContext, useEffect, useState } from 'react';

const AStartSearchContext = createContext();

function AStartSearchProvider({children}) {
    const [busStopsNodes, setBusStopsNodes] = useState([]);
    const [startPointNode, setStartPointNode] = useState();
    const [destinationPointNode, setDestinationPointNode] = useState();

    const getBusStopsNodes = (nodes) => {
        setBusStopsNodes(nodes);
    }

    const getStartPointNode = (node) => {
        setStartPointNode(node);
    }

    const getDestinationPointNode = (node) => {
        setDestinationPointNode(node);
    }

    useEffect(() => {
        console.log('Bus stops nodes has been updated :', busStopsNodes);
    },[busStopsNodes]);

        return <AStartSearchContext.Provider value={{
            busStopsNodes, getBusStopsNodes,
            startPointNode, getStartPointNode,
            destinationPointNode, getDestinationPointNode}}>
			{children}
			</AStartSearchContext.Provider>;
} 

export { AStartSearchProvider };
export default AStartSearchContext;