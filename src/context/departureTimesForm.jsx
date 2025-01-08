import React, { createContext, useContext, useEffect, useState } from 'react';

const DepartureTimesFormContext = createContext();

function DepartureTimesFormProvider({children}) {
    const [activeInput, setActiveInput] = useState(null);

    const changeActiveInput = (scheduleDay) => {
        setActiveInput(scheduleDay);
    }


        return <DepartureTimesFormContext.Provider value={{
            activeInput, changeActiveInput}}>
			{children}
			</DepartureTimesFormContext.Provider>;

} 

export { DepartureTimesFormProvider };
export default DepartureTimesFormContext;