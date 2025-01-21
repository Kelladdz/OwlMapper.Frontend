import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { MapBehaviorProvider } from "../../context/mapBehavior";
import createAppStore from './../../store'

import { ModalsProvider } from "../../context/modals";

import App from "../../pages/App/App";
import styles from "./AppContainer.module.css";
import { RouteLinePointsProvider } from "../../context/routeLines";
import { MarkersProvider } from "../../context/markers";
import { CurrentDataProvider } from "../../context/currentData";
import { UserInterfaceProvider } from "../../context/userInterface";
import {LinesProvider} from '../../context/lines'
const ErrorComponent = ({ errorMessage }) => (
    <div className={styles.error}>{errorMessage}</div>
  );

const AppContainer = () => {
    const [store, setStore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initializeStore = async () => {
          try {
            const appStore = await createAppStore();
            setStore(appStore);
          } catch (err) {
            setError(`Error initializing the app: ${err.message}`);
          } finally {
            setLoading(false);
          }
        };
    
        initializeStore();
      }, []);

      if (loading || error) {
        return (
          <div className={styles['error-box']}>
            {loading && <ErrorComponent errorMessage={error} />}
          </div>
        );
      }  
    

    return (
<Provider store={store}>
        <MapBehaviorProvider>
                <RouteLinePointsProvider>
                        <MarkersProvider>
                                <CurrentDataProvider>
                                        <LinesProvider>
                                                <ModalsProvider>
                                                        <UserInterfaceProvider>
                                                                        <App/>
                                                        </UserInterfaceProvider>
                                                </ModalsProvider>
                                        </LinesProvider>
                                </CurrentDataProvider>
                        </MarkersProvider>
                </RouteLinePointsProvider>
        </MapBehaviorProvider>                      
</Provider>)
}

export default AppContainer