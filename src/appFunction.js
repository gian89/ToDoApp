import {AppApi} from './AppApi.js'
import {getData, storeData} from './AsyncStorageFunction'

import {reduxLogin, reduxLogout} from "../Redux/Slice/authSlice"
import {setTasks} from "../Redux/Slice/tasksSlice"

import store from "./../Redux/Store/store";

export const appLogin = async (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await AppApi.login(body);
            await storeData("accessToken", response.access_token)
            await storeData("refreshToken", response.refresh_token)
            await storeData("user", response.user)
            await onStartUp();
            resolve();

        } catch (err) {
            console.log(JSON.stringify(err));
            reject(err);
        }
    })

};

export const appSignup = async (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            await AppApi.signup(body);
            await appLogin(body);
            resolve();
        } catch (err) {
            reject(err)
        }
    })

};

export const appLogout = async() => {
    await storeData("accessToken", "")
    await storeData("refreshToken", "")
    await store.dispatch(reduxLogout())
};

const verifyUserApp = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let accessToken = await getData("accessToken");
            let refreshToken = await getData("refreshToken");
            if(accessToken === null || accessToken === ""){
                reject("No User")
            }
            let response = await AppApi.verifyUser(accessToken, refreshToken)
            if (response.accessToken !== "valid") {
                await storeData("accessToken", response.accessToken);
            }
            resolve()
        } catch (err) {
            await storeData("accessToken", "")
            await storeData("refreshToken", "")
            await store.dispatch(reduxLogout())
            reject("Sessione Scaduta")
        }
    })
}


export const retrieveTasksByUsernameApp = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await verifyUserApp();
            let user = await store.getState().auth
            let tasks = await AppApi.retrieveTasksByUsername(user.user.username)
            await store.dispatch(setTasks(tasks))
            resolve()
        }catch (e) {
            reject(e);
        }
    })
};

export const addTaskApp = (body) =>{
    return new Promise(async (resolve, reject) => {
        body.username = await store.getState().auth.user.username;
        try {
            await verifyUserApp();
            await AppApi.addTask(body)
            await retrieveTasksByUsernameApp();
            resolve()
        }catch (e) {
            reject(e);
        }
    })
}

export const updateTaskApp = (body) =>{
    return new Promise(async (resolve, reject) => {
        body.username = await store.getState().auth.user.username;
        try {
            await verifyUserApp();
            await AppApi.updateTask(body)
            await retrieveTasksByUsernameApp();
        }catch (e) {
            reject(e);
        }
    })
}

export const onStartUp = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await verifyUserApp();
            let user = await getData("user")
            await store.dispatch(reduxLogin(user))
            await retrieveTasksByUsernameApp();
            resolve()
        } catch (err) {
            console.log("errore:  " + err)
            reject(err);
        }
    })
}
