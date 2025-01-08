import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {store} from './store'
import { configDotenv } from 'dotenv'

import { UserInterfaceProvider } from './context/userInterface.jsx'
import {MarkersProvider} from './context/markers'
import { MapBehaviorProvider } from './context/mapBehavior'
import { CurrentDataProvider } from './context/currentData'
import { RouteLinePointsProvider } from './context/routeLines'
import  { LinesProvider } from './context/lines'
import { ModalsProvider } from './context/modals'
import { AStartSearchProvider } from './context/aStartSearch.jsx'

import App from './pages/App/App'
import SearchConnections from './pages/App/UserInterface/SearchConnections/SearchConnections.jsx'
import AdminPanel from './pages/AdminPanel/AdminPanel'
import LinesCreator from './pages/AdminPanel/LineCreator/LineCreator.jsx'
import ActionComplete from './pages/AdminPanel/ActionComplete'
import AdminAllLines from './pages/AdminPanel/AdminAllLines'
import BusStopsCreator from './pages/AdminPanel/BusStopsCreator/BusStopsCreator.jsx'
import ScheduleCreator from './pages/AdminPanel/ScheduleCreator/ScheduleCreator.jsx'
import AuthPage from './pages/Auth/AuthPage.jsx'
import WelcomePage from './pages/AdminPanel/WelcomePage/WelcomePage.jsx'

import { ACTIONS } from './constants/actions.js'
import { PATHS } from './constants/paths.js'

import './index.css'
import 'leaflet/dist/leaflet.css'
import LoginPage from './pages/Auth/LoginPage.jsx'





const router = createBrowserRouter([
        {
                path: '/',
                element: <App/>,
                children: [
                        {index: true, element: <SearchConnections/>}
                ]

        },
        {
                path: `/admin`,
                element: <AdminPanel/>,
                children: [
                        {index: true, element: <WelcomePage/>},
                        {path: PATHS.createLine, element: <LinesCreator action={ACTIONS.createLine}/> },
                        {path: PATHS.createLineSuccess, element: <ActionComplete action={ACTIONS.createLine}/>},
                        {path: PATHS.createVariant, element: <LinesCreator action={ACTIONS.createVariant}/>}, 
                        {path: PATHS.createVariantSuccess, element: <ActionComplete action={ACTIONS.createVariant}/>},
                        {path: PATHS.editVariant, element: <LinesCreator action={ACTIONS.editVariant}/>}, 
                        {path: PATHS.editVariantSuccess, element: <ActionComplete action={ACTIONS.editVariant}/>},
                        {path: PATHS.deleteLineSuccess, element: <ActionComplete action={ACTIONS.deleteLine}/>},
                        {path: PATHS.deleteVariantSuccess, element: <ActionComplete action={ACTIONS.deleteVariant} />},
                        {path: PATHS.allLines, element: <AdminAllLines/>},
                        {path: PATHS.createBusStops, element: <BusStopsCreator action={ACTIONS.createBusStop}/> },
                        {path: PATHS.busStops, element: <BusStopsCreator action={ACTIONS.editBusStop}/>},
                        {path: PATHS.createSchedule, element: <ScheduleCreator/>}

                        
                ]
        },
        {
                path: `/signin`,
                element: <AuthPage />,
                children: [
                       {index: true, element: <LoginPage/>}
                ]
        }
]);



ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
        <MapBehaviorProvider>
                <RouteLinePointsProvider>
                        <MarkersProvider>
                                <CurrentDataProvider>
                                        <LinesProvider>
                                                <ModalsProvider>
                                                        <UserInterfaceProvider>
                                                                <AStartSearchProvider>
                                                                        <RouterProvider router={router}/>
                                                                </AStartSearchProvider>
                                                        </UserInterfaceProvider>
                                                </ModalsProvider>
                                        </LinesProvider>
                                </CurrentDataProvider>
                        </MarkersProvider>
                </RouteLinePointsProvider>
        </MapBehaviorProvider>                      
</Provider>)
