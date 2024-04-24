import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
    name: 'token',
    initialState: null,
    reducers: {
        storeToken: (state, action) => {
            return action.payload;
        },
    },
});

export const { storeToken } = tokenSlice.actions;
export default tokenSlice.reducer;