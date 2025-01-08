import { createSlice } from "@reduxjs/toolkit";

const departuresSlice = createSlice({
    name: 'departures',
    initialState: {
        departures: []
    },
    reducers: {
        addDepartures: (state, action) => {
            console.log('Departures to add:', action.payload);
            state.departures = action.payload;
            console.log('Departures:', state.departures);
    },
        removeDepartures: (state, action) => {
            state.departures = state.departures.filter(dep => dep.variant.line.name === action.payload)
        }
    }
});

export const { addDepartures, removeDepartures } = departuresSlice.actions;
export const departuresReducer = departuresSlice.reducer;