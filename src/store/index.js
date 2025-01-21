import {configureStore} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { busStopsReducer } from './slices/busStopsSlice';
import { linesReducer, addLine, removeLine } from './slices/linesSlice';
import { addressesReducer } from './slices/addressesSlice';
import { variantsReducer } from './slices/variantsSlice';
import { searchInputsReducer, changeStartPointSearchTerm, changeDestinationPointSearchTerm, changeSearchTerm } from './slices/searchInputsSlice';
import { lineCreatorFormReducer, changeLineName, changeValidFromDate,
    changeRoute, changeTimeToTravel,
    addRouteStop, changeSelectedBusStop,
    removeRouteStop, addWeekDayDepartureTime, 
    removeWeekDayDepartureTime, addSaturdaysDepartureTime, 
    removeSaturdaysDepartureTime, addSundaysAndHolidaysDepartureTime, 
    removeSundaysAndHolidaysDepartureTime, changeCanHandDraw, 
    addRouteLinePoint, removeRouteLinePoint, changeOperator, changeOrganizer,
    resetAllForm, fillForm } from './slices/lineCreatorFormSlice';
import { scheduleCreatorReducer,     changeLineNameForSchedule, 
    changeValidFromDateForSchedule,
    addRouteStopsForSchedule, 
    removeRouteStopsForSchedule,
    addDepartureTimesForSchedule,
    removeDepartureTimesForSchedule,
    removeAllDeparturesTimesForSchedule,
    changeOperatorForSchedule, changeOrganizerForSchedule,
    addVariantForSchedule, removeVariantForSchedule  } from './slices/scheduleCreatorSlice';
import { busStopCreatorFormReducer, changeBusStopName, changeLatitude, changeLongitude, changeCityName, changeIsRequest, fillBusStopForm, resetAllBusStopForm } from './slices/busStopCreatorFormSlice';
import { authReducer } from './slices/authSlice';
import { loginFormReducer } from './slices/loginFormSlice';
import { busStopsApi } from './apis/busStopsApi';
import { linesApi } from './apis/linesApi';
import { addressesApi } from './apis/addressesApi';
import {variantsApi} from './apis/variantsApi';
import { departuresApi } from './apis/departuresApi';
import { authApi } from './apis/authApi';
import { thunk } from "redux-thunk"

const createAppStore = async () => {
    try {
        const store = configureStore({
            reducer: {
                addresses: addressesReducer,
                [addressesApi.reducerPath]: addressesApi.reducer,
                busStops: busStopsReducer,
                [busStopsApi.reducerPath]: busStopsApi.reducer,
                lines: linesReducer,
                [linesApi.reducerPath]: linesApi.reducer,
                variants: variantsReducer,
                [variantsApi.reducerPath]: variantsApi.reducer,
                [departuresApi.reducerPath]: departuresApi.reducer,
                searchInputs: searchInputsReducer,
                lineCreatorForm: lineCreatorFormReducer,
                busStopCreatorForm: busStopCreatorFormReducer,
                scheduleCreator: scheduleCreatorReducer,
                [authApi.reducerPath]: authApi.reducer,
                auth: authReducer,
                loginForm: loginFormReducer
            },
            middleware: (getDefaultMiddleware) => { return getDefaultMiddleware({
                serializableCheck: false
            })
            .concat(busStopsApi.middleware)
            .concat(linesApi.middleware)
            .concat(addressesApi.middleware)
            .concat(variantsApi.middleware)
            .concat(departuresApi.middleware)
            .concat(authApi.middleware)
            .concat(thunk)}
        });
        setupListeners(store.dispatch);

        return store;
    } catch (err) {
        throw new Error(err.message);
    }
}

export default createAppStore;


export {useFetchAddressQuery, useFetchAddressesQuery, useSearchAddressesQuery, useAddAddressesMutation, useUpdateAddressMutation, useDeleteAddressMutation, useDeleteAllAddressesMutation } from './apis/addressesApi';
export {useFetchBusStopsQuery, useSearchBusStopsQuery, useAddBusStopMutation, useUpdateBusStopMutation, useDeleteBusStopMutation} from './apis/busStopsApi';
export {useFetchLinesQuery, useFetchLineQuery, useFetchFilteredByBusStopIdQuery, useAddLineMutation, useDeleteLineMutation} from './apis/linesApi';
export {useFetchVariantQuery, useFetchVariantsQuery, useFetchFilteredByRouteStopVariantsQuery, useUpdateVariantMutation, useDeleteVariantMutation, useCreateVariantMutation} from './apis/variantsApi';
export {useFetchDeparturesByBusStopIdQuery} from './apis/departuresApi';
export {useGetUserDetailsQuery} from './apis/authApi';
export {changeStartPointSearchTerm, changeDestinationPointSearchTerm, changeSearchTerm} from './slices/searchInputsSlice';
export {changeLineName, changeValidFromDate, changeRoute, 
    changeSelectedBusStop, changeTimeToTravel, addRouteStop, 
    removeRouteStop, addWeekDayDepartureTime, 
    removeWeekDayDepartureTime, addSaturdaysDepartureTime, 
    removeSaturdaysDepartureTime, addSundaysAndHolidaysDepartureTime, 
    removeSundaysAndHolidaysDepartureTime, changeCanHandDraw,
    addRouteLinePoint, removeRouteLinePoint, changeOperator, changeOrganizer,
    resetAllForm, fillForm} from './slices/lineCreatorFormSlice';
export {changeBusStopName, changeLatitude, changeLongitude, changeCityName, changeIsRequest, fillBusStopForm, resetAllBusStopForm} from './slices/busStopCreatorFormSlice';
export {    changeLineNameForSchedule, 
    changeValidFromDateForSchedule,
    addRouteStopsForSchedule, 
    removeRouteStopsForSchedule,
    addDepartureTimesForSchedule,
    removeDepartureTimesForSchedule,
    removeAllDeparturesTimesForSchedule,
    changeOperatorForSchedule, changeOrganizerForSchedule,
    addVariantForSchedule, removeVariantForSchedule } from './slices/scheduleCreatorSlice';
export {addLine, removeLine} from './slices/linesSlice';
export {handleChangeUserName, handleChangePassword} from './slices/loginFormSlice';
export {setAccessToken, setRefreshToken, setUserData, loginSuccess, loginFail, signUpSuccess, signUpFail, sendResetPasswordLinkSuccess, sendResetPasswordLinkFailed, logout, setCredentials, login, getExternalTokens, refreshTokenSuccess, refreshTokenFail } from './slices/authSlice';