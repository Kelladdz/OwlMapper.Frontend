import { createSlice } from "@reduxjs/toolkit";

const variantsSlice = createSlice({
    name: 'variants',
    initialState: {
        variants: []
    },
    reducers: {
        addVariants: (state, action) => {
            state.variants.push(action.payload);
    }}
    }
);
export const { addVariants } = variantsSlice.actions;
export const variantsReducer = variantsSlice.reducer;