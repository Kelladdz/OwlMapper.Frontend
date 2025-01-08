import React, { createContext, useState, useContext, useEffect } from 'react';

const LinesContext = createContext();


function LinesProvider({ children }) {
    const [lines, setLines] = useState(null);


			const addLines = (line) => {
				setLines(line);
			}


		return <LinesContext.Provider value={{
            lines, addLines}}>
			{children}
			</LinesContext.Provider>;


}

export { LinesProvider };
export default LinesContext;
