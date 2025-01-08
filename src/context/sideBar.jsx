import React, { createContext, useContext, useEffect, useState } from 'react';

const SideBarContext = createContext();

function SideBarProvider({children}) {
    const [activeButton, setActiveButton] = useState(null);

    const changeActiveButton = (id) => {
        setActiveButton(id);
    }


        return <SideBarContext.Provider value={{
            activeButton, changeActiveButton}}>
			{children}
			</SideBarContext.Provider>;

} 

export { SideBarProvider };
export default SideBarContext;