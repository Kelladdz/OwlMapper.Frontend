import { createSlice } from "@reduxjs/toolkit";

const busStopsSlice = createSlice({
    "name": 'busStops',
    initialState: {
        searchTerm: '',
        busStops: []
    },
    reducers: {
        changeBusStopsSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    }
});

export const { changeSearchTerm } = busStopsSlice.actions;
export const busStopsReducer = busStopsSlice.reducer;