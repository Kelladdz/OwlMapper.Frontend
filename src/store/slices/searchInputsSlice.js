import { createSlice } from "@reduxjs/toolkit";
import { add } from "lodash";

const searchInputsSlice = createSlice({
    "name": 'searchInputs',
    initialState: {
        searchTerm: '',
        startPointSearchTerm: '',
        destinationPointSearchTerm: '',
        searchResults: []
    },
    reducers: {
        changeSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        changeStartPointSearchTerm: (state, action) => {
            state.startPointSearchTerm = action.payload;
        },
        changeDestinationPointSearchTerm: (state, action) => {
            state.destinationPointSearchTerm = action.payload;
        },
        addSearchResult: (state, action) => {
            state.searchResults.push(action.payload);
        },
        clearSearchResults: (state) => {
            state.searchResults = [];
        }
    }
});

export const { changeStartPointSearchTerm, changeDestinationPointSearchTerm, changeSearchTerm, addSearchResult, clearSearchResults } = searchInputsSlice.actions;
export const searchInputsReducer = searchInputsSlice.reducer;
