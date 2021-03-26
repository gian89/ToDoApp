import {baseUrl} from './config.js'
import {getData} from "./AsyncStorageFunction";


//Funzione che si occupa di gestire tutte le chiamate verso il server
export const apiCaller = (url, method = 'GET', body = "") => {
    console.log("Inizio apiCaller: " + url);
    console.log("Inizio apiCaller: " + body);
    return new Promise(async (resolve, reject) => {
        try {
            setTimeout(() => {
                reject({
                    status: 408,
                    message: {
                        "status": 408,
                        "message": "Request Timeout"
                    }
                })
            }, 4000)
            let accessToken;
            if (url === "/newAccessToken") {
                accessToken = await getData("refreshToken");
            } else {
                console.log("Sono in else");
                accessToken = await getData("accessToken");
            }
            let response = await fetch(baseUrl + url,
                {
                    method: method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    },
                    body: body
                }
            );
            if (response.status === 500) {
                throw ({
                    status: response.status,
                    message: {
                        status: response.status,
                        message: "Server connection error"
                    }
                })
            }
            if (response.status !== 200) {
                let errorJson = await response.json();
                throw ({
                    status: response.status,
                    message: errorJson
                })
            }
            let responseJson = await response.json();
            console.log("Chiamata a buon fine: " + JSON.stringify(responseJson));
            resolve(responseJson);
        } catch (e) {
            console.log("Errore Chiamata: " + JSON.stringify(e));
            reject(e);
        }
    });
};


/*
export const AppApi = {
    apiCaller
};
*/
