import { createSlice } from "@reduxjs/toolkit";

const scheduleCreatorSlice = createSlice({
    name: 'scheduleCreator',
    initialState: {
        lineName: '',
        validFrom: '',
        routeStops: [],
        departures: [],
        variantsWithLetters: [],
        operator: 'Kłosok Sp z o.o. S.k Tel. 570 323 199',
        organizer: 'ZPGSA, ul. Piastowska 19a, Tel: 74 832 87 78',
    },
    
    reducers: {
        changeLineNameForSchedule: (state, action) => {
            console.log('New line name for schedule: ', action.payload);
            state.lineName = action.payload;
        },
        changeValidFromDateForSchedule: (state, action) => {
            console.log('New valid date for schedule: ', action.payload);
            state.validFrom = action.payload.replace(/-/g, '.').split('.').reverse().join('.');
        },
        addRouteStopsForSchedule: (state, action) => {
            console.log('New Route stops for schedule: ', action.payload);
            state.routeStops = action.payload;
        },
        removeRouteStopsForSchedule: (state, action) => {
            state.routeStops = [];  
            console.log('All route stops removed');
        },
        addDepartureTimesForSchedule: (state, action) => {
            action.payload.forEach((departure) => {
                state.departures.push(departure);
            })
        },
        removeDepartureTimesForSchedule: (state, action) => {
            state.departures = state.departures.filter((time) => time.variantId !== action.payload.variantId);
            console.log('Departure times after remove: ', state.departures);
        },
        removeAllDeparturesTimesForSchedule: (state, action) => {
            state.departures = [];
        },
        changeOperatorForSchedule: (state, action) => {
            state.operator = action.payload;
        },
        changeOrganizerForSchedule: (state, action) => {
            state.organizer = action.payload;
        },
        addVariantForSchedule: (state, action) => {
            state.variantsWithLetters.push(action.payload);
            console.log('New variant and symbol: ', action.payload);
            console.log('Variants with symbols: ', state.variantsWithLetters);
        },
        removeVariantForSchedule: (state, action) => {
            console.log('Variant to remove: ', action.payload.variantId);
            const newVariantsWithLetters = state.variantsWithLetters.filter((variant) => variant.variantId !== action.payload.variantId);
            newVariantsWithLetters.forEach((variant, index) => {
                variant.symbol !== '1' ? variant.symbol = String.fromCharCode('A'.charCodeAt(0) + (index - 1)) : variant.symbol = '1';
            });         
            state.variantsWithLetters = newVariantsWithLetters;
            console.log('Variants with symbols after remove: ', state.variantsWithLetters);
        },
    }
});

export const { 
    changeLineNameForSchedule, 
    changeValidFromDateForSchedule,
    addRouteStopsForSchedule, 
    removeRouteStopsForSchedule,
    addDepartureTimesForSchedule,
    removeDepartureTimesForSchedule,
    removeAllDeparturesTimesForSchedule,
    changeOperatorForSchedule, changeOrganizerForSchedule,
    addVariantForSchedule, removeVariantForSchedule } = scheduleCreatorSlice.actions;
export const scheduleCreatorReducer = scheduleCreatorSlice.reducer;
