import { createSlice } from "@reduxjs/toolkit";

const addressesSlice = createSlice({
    "name": 'addresses',
    initialState: {
        searchTerm: '',
        addresses: []
    },
    reducers: {
        changeAddressSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        addAddresses: (state, action) => {
            state.addresses.push(action.payload);
    }}
});

export const { changeAddressSearchTerm, addAddresses } = addressesSlice.actions;
export const addressesReducer = addressesSlice.reducer;