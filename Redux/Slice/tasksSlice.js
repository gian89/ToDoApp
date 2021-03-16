import {createSlice} from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: [],
    reducers: {
        setTasks(state, action) {
            state = action.payload;
            return state;
        },
        flushStore(state) {
            state = [];
            return state;
        }
    }
});


export const {setTasks, flushStore} = tasksSlice.actions;
