import { createSlice } from "@reduxjs/toolkit";

const linesSlice = createSlice({
    name: 'lines',
    initialState: {
        lines: []
    },
    reducers: {
        addLine: (state, action) => {
            action.payload.forEach(line => state.lines.push(line));
            console.log('Lines: ', state.lines)
        }
    },
        removeLine: (state, action) => {
            state.lines = state.lines.filter(line => line === action.payload)
        }
});

export const { addLine, removeLine } = linesSlice.actions;
export const linesReducer = linesSlice.reducer;