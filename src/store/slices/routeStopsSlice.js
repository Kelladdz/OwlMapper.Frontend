import { createSlice } from "@reduxjs/toolkit";

const routeStopsSlice = createSlice({
    "name": 'routeStops',
    initialState: {
        routeStops: []
    },
    reducers: {
        addRouteStops: (state, action) => {
            state.routeStops.push(action.payload);
    }}
});

export const { addRouteStops } = routeStopsSlice.actions;
export const routeStopsReducer = routeStopsSlice.reducer;