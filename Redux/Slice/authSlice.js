import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {logged:false, user: null},
    reducers: {
        reduxLogin(state, action) {
            state.logged = true;
            state.user = action.payload;
        },
        reduxLogout(state) {
            state.logged = false;
            state.user = null;
        },
    }
});


export const {reduxLogin, reduxLogout} = authSlice.actions;
