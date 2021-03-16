import {configureStore,combineReducers} from "@reduxjs/toolkit";

import {authSlice} from "../Slice/authSlice";
import {tasksSlice} from "../Slice/tasksSlice";

const reducer = combineReducers({
    auth: authSlice.reducer,
    tasks: tasksSlice.reducer
});

const store = configureStore({
    reducer
});

export default store;
