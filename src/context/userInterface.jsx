import { createContext, useState } from 'react';

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
        setIsListMounted(true);
    }

    const onListUnmount = () => {
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
            const strA = String(a);
            const strB = String(b);
          
            const isANumber = !isNaN(strA);
            const isBNumber = !isNaN(strB);
          
            if (isANumber && isBNumber) {
              return Number(strA) - Number(strB);
            } else if (isANumber) {
              return -1;
            } else if (isBNumber) {
              return 1;
            } else {
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
        setVariantsWithSymbols(uniqueVariants.map((variant, index) => {
            const firstSymbol = 'A'
            if (variant.isDefault) {
                return {variant: variant.route, symbol: '1'};
            } else {
                return {variant: variant.route, symbol: String.fromCharCode(firstSymbol.charCodeAt(0) + index)};
            }
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
        console.log('on departure change: ', departures)
        setDeps(prev => [...prev, ...departures].filter(departure => departure.timeToArrive > 0).sort((a, b) => a.timeToArrive - b.timeToArrive).slice(0, 20))
    }
    const onAllDeparturesChange = (departures) => {
        setDeps(departures.filter(departure => departure.timeToArrive > 0).sort((a, b) => a.timeToArrive - b.timeToArrive))
    }

    const onDeparturesRemove = (lineName) => {
        setDeps(prev => prev.filter(dep => dep.variant.line.name !== lineName))
    }

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