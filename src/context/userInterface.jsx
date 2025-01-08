import React, { createContext, useContext, useEffect, useState } from 'react';

const UserInterfaceContext = createContext();

function UserInterfaceProvider({children}) {
    const [startOrDestination, setStartOrDestination] = useState('');
    const [isListMounted, setIsListMounted] = useState(false);
    const [hide, setHide] = useState(false);
    const [selectedLine, setSelectedLine] = useState('');
    const [selectedVariant, setSelectedVariant] = useState('');
    const [hoveredRouteStop, setHoveredRouteStop] = useState();
    const [selectedRouteStop, setSelectedRouteStop] = useState();
    const [selectedDeparture, setSelectedDeparture] = useState();
    const [fetchedLines, setFetchedLines] = useState();
    const [variantsWithSymbols, setVariantsWithSymbols] = useState();
    const [markings, setMarkings] = useState([]);
    const [showMarkings, setShowMarkings] = useState(false);
    const [activeLine, setActiveLine] = useState('');
    const [deps, setDeps] = useState([]);
    const [type, setType] = useState('bus-stops');

    const onFocusedSearchBar = (type) => {
        setStartOrDestination(type);
    }

    const onListMount = () => {
        console.log('Search list mount...');
        setIsListMounted(true);
    }

    const onListUnmount = () => {
        console.log('Search list unmount...');
        setIsListMounted(false);
    }   

    const onHide = (flag) => {
        setHide(flag);
    }   

    const onLineSelect = (lineName) => {
        setSelectedLine(lineName);
    }

    const onVariantSelect = (id) => {
        setSelectedVariant(id);
    }

    const onType = (type) => {
        setType(type);
    }

    const onHoverRouteStop = (coords) => {
        setHoveredRouteStop(coords);
    }

    const onRouteStopSelect = (routeStop) => {
        setSelectedRouteStop(routeStop);
    }

    const onLinesDeparturesFetched = (lines) => {
        const sortedLines = lines.sort((a, b) => {
            // Konwersja elementów na stringi, aby uniknąć problemów
            const strA = String(a);
            const strB = String(b);
          
            // Sprawdź, czy oba elementy są liczbami
            const isANumber = !isNaN(strA);
            const isBNumber = !isNaN(strB);
          
            if (isANumber && isBNumber) {
              // Jeśli oba są liczbami, porównaj je jako liczby
              return Number(strA) - Number(strB);
            } else if (isANumber) {
              // Jeśli tylko 'a' jest liczbą, 'a' powinno być przed 'b'
              return -1;
            } else if (isBNumber) {
              // Jeśli tylko 'b' jest liczbą, 'b' powinno być przed 'a'
              return 1;
            } else {
              // Jeśli oba są znakami alfabetycznymi, porównaj je alfabetycznie
              return strA.localeCompare(strB);
            }
          });
        setFetchedLines(sortedLines);
    }

    const onDepartureSelect = (departure) => {
        setSelectedDeparture(departure);
    }

    const onVariantsAndSymbols = (deps) => {
        const variants = deps.map(time => {return {route: time.variant.route, isDefault: time.variant.isDefault}});
        const uniqueVariants = variants.reduce((acc, current) => {
            if (!acc.some(item => item.route === current.route)) {
              acc.push(current);
            }
            return acc;
          }, []);
        console.log('Unique variants: ', uniqueVariants);
        setVariantsWithSymbols(uniqueVariants.map((variant, index) => {
            const firstSymbol = 'A'
            if (variant.isDefault) {
                return {variant: variant.route, symbol: '1'};
            } else {
                return {variant: variant.route, symbol: String.fromCharCode(firstSymbol.charCodeAt(0) + index)};
            };
        }));
    }

    const onChangeMarkingsHandle = (markings) => {
        setMarkings(markings);
    }

    const onMarkingsShow = () => {
        setShowMarkings(true);
    }

    const onMarkingsHide = () => {
        setShowMarkings(false)
    }

    const onActiveLineSelect = (line) => {
        setActiveLine(line);
    }

    const onDeparturesChange = (departures) => {
        console.log('context deps: ', departures)
        setDeps(prev => [...prev, ...departures].filter(departure => departure.timeToArrive > 0).sort((a, b) => a.timeToArrive - b.timeToArrive).slice(0, 20))
    }
    const onAllDeparturesChange = (departures) => {
        console.log('context deps: ', departures)
        setDeps(departures.filter(departure => departure.timeToArrive > 0).sort((a, b) => a.timeToArrive - b.timeToArrive))
    }

    const onDeparturesRemove = (lineName) => {
        setDeps(prev => prev.filter(dep => dep.variant.line.name !== lineName))
    }
    
    useEffect(() => {
        if (startOrDestination !== '') {
            console.log('Focused bar has changed: ', startOrDestination);
        }
    }, [startOrDestination])

    useEffect(() => {
        isListMounted ? console.log('Search list is mounted') : console.log('Search list isn`t mounted');
    }, [isListMounted])

    useEffect(() => {
        console.log('To hide: ', hide);
    },[hide])

    useEffect(() => {
        console.log('Selected line: ', selectedLine);
    }, [selectedLine])
    
    useEffect(() => {
        console.log('Hovered route stop: ', hoveredRouteStop);
    }, [hoveredRouteStop])

    useEffect(() => {
        console.log('Selected route stop: ', selectedRouteStop)
    },[selectedRouteStop])

    useEffect(() => {
        console.log('Fetched lines: ', fetchedLines);
    }, [fetchedLines])

    useEffect(() => {
        console.log('Selected departure: ', selectedDeparture);
    }, [selectedDeparture])

    useEffect(() => {
        console.log('Variants and symbols: ', variantsWithSymbols);
    }, [variantsWithSymbols])

    useEffect(() => {
        console.log('Markings: ', markings);
    }, [markings])

    useEffect(() => {
        console.log('Departures: ', deps)
    },[deps])

    return <UserInterfaceContext.Provider value={{
            startOrDestination, onFocusedSearchBar,
            isListMounted, onListMount, onListUnmount,
            onHide, hide, onLineSelect, selectedLine, 
            type, onType, onVariantSelect, selectedVariant, 
            onHoverRouteStop, hoveredRouteStop, onRouteStopSelect, 
            selectedRouteStop, onLinesDeparturesFetched, fetchedLines,
            onDepartureSelect, selectedDeparture, onVariantsAndSymbols, variantsWithSymbols,
            markings, onChangeMarkingsHandle, onMarkingsShow, onMarkingsHide, showMarkings,
            onActiveLineSelect, activeLine, onDeparturesChange, onAllDeparturesChange, onDeparturesRemove, deps
            }}>
			{children}
			</UserInterfaceContext.Provider>;
} 

export { UserInterfaceProvider };
export default UserInterfaceContext;