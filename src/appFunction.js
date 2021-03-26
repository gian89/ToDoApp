import {apiCaller} from './AppApi.js'
import {getData, storeData} from './AsyncStorageFunction'

import {reduxLogin, reduxLogout} from "../Redux/Slice/authSlice"
import {setTasks, flushStore} from "../Redux/Slice/tasksSlice"

import store from "./../Redux/Store/store";

import {alertMessage} from "./utilities";

//Funzioni per la gestione degli utenti
export const appLogin = async (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let url = `/login`;
            body = JSON.stringify(body)
            let response = await apiCaller(url, "POST", body);
            await storeData("accessToken", response.access_token)
            await storeData("refreshToken", response.refresh_token)
            await storeData("user", response.user)
            console.log("response: " + JSON.stringify(response));
            await onStartUp();
            resolve();
        } catch (err) {
            reject(err);
        }
    })

};

export const appSignup = async (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let url = `/registerUser`;
            let stringBody = JSON.stringify(body)
            await apiCaller(url, "POST", stringBody);
            await appLogin(body);
            resolve();
        } catch (err) {
            reject(err)
        }
    })

};

export const appLogout = async () => {
    await storeData("accessToken", "")
    await storeData("refreshToken", "")
    await store.dispatch(reduxLogout())
    await store.dispatch(flushStore())
};

//Funzione chiamata quando l'applicazione di avvia.
// Controlla se ci sono i token dell'utente salvate nell'asyncStorage, ne verifica la validita e nel caso fosse scaduto l'accessToken
// lo rinnova tramite il refreshToken
export const onStartUp = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await verifyUserApp();
            let user = await getData("user")
            await store.dispatch(reduxLogin(user))
            await retrieveTasksByUsernameApp();
            resolve()
        } catch (err) {
            // console.log("errore:  " + err)
            reject(err);
        }
    })
}

export const verifyUserApp = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let accessToken = await getData("accessToken");
            if (accessToken === null || accessToken === "") {
                await storeData("accessToken", "")
                await storeData("refreshToken", "")
                reject("No User")
                return;
            }
            let url = `/testAccessToken`;
            await apiTokenCaller(url);
            resolve();
        } catch (err) {
            console.log("errore verifyUserApp: " + JSON.stringify(err));
            await storeData("accessToken", "")
            await storeData("refreshToken", "")
            await store.dispatch(reduxLogout())
            let error = {
                status: "Sessione scaduta",
                message: {
                    status: "Sessione scaduta",
                    message: "Effettuare il login nuovamente"
                }
            }
            alertMessage(error.status, error.message.message);
            reject(error)
        }
    })
}

//Funzione che si occupa di richiedere un nuovo accessToken partendo dal refreshToken
export const refreshAccessTokenApp = () => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Refreshing access token");
            let url = `/newAccessToken`;
            let response = await
                apiCaller(url)
            await storeData("accessToken", response.accessToken);
            resolve();
        } catch (e) {
            await storeData("accessToken", "")
            await storeData("refreshToken", "")
            await store.dispatch(reduxLogout())
            let error = {
                status: "Sessione scaduta",
                message: {
                    status: "Sessione scaduta",
                    message: "Effettuare il login nuovamente"
                }
            }
            alertMessage(error.status, error.message.message);
            reject(error)
        }
    })
}

//Funzioni per la gestione dei Task
export const retrieveTasksByUsernameApp = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await store.getState().auth
            let url = `/getTaskByUsername?username=${user.user.username}`;
            let tasks = await apiTokenCaller(url);
            await store.dispatch(setTasks(tasks))
            resolve()
        } catch (e) {
            reject(e);
        }
    })
};

export const addTaskApp = (body) => {
    return new Promise(async (resolve, reject) => {
        body.username = await store.getState().auth.user.username;
        try {
            let url = `/addTask`;
            body = JSON.stringify(body)
            await apiTokenCaller(url, "POST", body);
            await retrieveTasksByUsernameApp();
            resolve()
        } catch (e) {
            reject(e);
        }
    })
}

export const updateTaskApp = (body) => {
    return new Promise(async (resolve, reject) => {
        body.username = await store.getState().auth.user.username;
        try {
            let url = `/updateTask`;
            body = JSON.stringify(body)
            await apiTokenCaller(url, "PUT", body);
            await retrieveTasksByUsernameApp();
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

//Questa funzione si occupa di creare un un middleware per le chiamate verso il server.
//La funzione effettua la chiamata e nel caso dal server si riceverà un errore di accessToken scaduto, in modo mascherato all'utente
//provvederà a chiedere un nuovo accessToken tramite il refreshToken e effettuare la chiamata iniziale.
export const apiTokenCaller = (url, ...params) => {
    return new Promise(async (resolve, reject) => {
        apiCaller(url, ...params)
            .then((response) => {
                resolve(response);
            })
            .catch((async (err) => {
                if (err.status === 400) {
                    console.log("erore 400")
                    try {
                        await refreshAccessTokenApp()
                        let newResponse = await apiCaller(url, ...params)
                        resolve(newResponse)
                    } catch (e) {
                        reject(e);
                    }
                }
                reject(err);
            }));
    })
}
