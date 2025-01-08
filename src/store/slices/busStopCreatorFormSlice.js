import { createSlice } from "@reduxjs/toolkit";

const busStopCreatorFormSlice = createSlice({
    name: 'busStopCreatorForm',
    initialState: {
        lat: 50.68333,
        lng: 16.6061,
        busStopName: '',
        city: '',
        isRequest: false
    },
    reducers: {
        changeBusStopName: (state, action) => {
            state.busStopName = action.payload;
        },
        changeCityName: (state, action) => {
            state.city = action.payload;
        },
        changeLatitude: (state, action) => {
            state.lat = action.payload;
        },
        changeLongitude: (state, action) => {
            state.lng = action.payload;
        },
        changeIsRequest: (state, action) => {
            state.isRequest = !state.isRequest;
        },
        fillBusStopForm: (state, action) => {
            state.lat = action.payload.busStop.coordinate.lat;
            state.lng = action.payload.busStop.coordinate.lng;
            state.busStopName = action.payload.busStop.name;
            state.city = action.payload.busStop.city;
            state.isRequest = action.payload.busStop.isRequest;
        },
        resetAllBusStopForm: (state) => {
            state.lat = 50.68333;
            state.lng = 16.6061;
            state.busStopName = '';
            state.city = '';
            state.isRequest = false;
        },
    }
});

export const { 
    changeBusStopName, 
    changeLatitude,
    changeLongitude,
    changeCityName, changeIsRequest, fillBusStopForm,
    resetAllBusStopForm } = busStopCreatorFormSlice.actions;
export const busStopCreatorFormReducer = busStopCreatorFormSlice.reducer;
