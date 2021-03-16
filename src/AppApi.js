import {baseUrl} from './config.js'

//Api per la gestione degli utenti

const login = (body) => {
    let url = `/login`;
    body = JSON.stringify(body)
    return apiAppToYouCaller(url, "POST", body);
};

const signup = (body) => {
    let url = `/registerUser`;
    body = JSON.stringify(body)
    return apiAppToYouCaller(url, "POST", body);
}


//Api per la gestione dei Token

const verifyUser = async (accessToken, refreshToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await testAccessToken({"access_token": accessToken})
            resolve(response);
        }catch (e) {
            if (e.status === 400) {
                try {
                    let response = await refreshAccessToken({"refresh_token": refreshToken})
                    resolve(response);
                }catch (error) {
                    reject(error)
                }
            }
            reject(e)
        }
    })
}

const testAccessToken = (body) => {
    let url = `/testAccessToken`;
    body = JSON.stringify(body)
    return apiAppToYouCaller(url, "POST", body);
}

const refreshAccessToken = (body) => {
    let url = `/newAccessToken`;
    body = JSON.stringify(body)
    return apiAppToYouCaller(url, "POST", body);
}


//Api per la gestione dei task

const retrieveTasksByUsername = (username) => {
    let url = `/getTaskByUsername?username=${username}`;
    return apiAppToYouCaller(url);
};

const addTask = (body) => {
    let url = `/addTask`;
    body = JSON.stringify(body)
    return apiAppToYouCaller(url, "POST", body);
}

const updateTask = (body) => {
    let url = `/updateTask`;
    body = JSON.stringify(body)
    return apiAppToYouCaller(url, "PUT", body);
}



const apiAppToYouCaller = (url, method = 'GET', body = "") => {
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
            let response = await fetch(baseUrl + url,
                {
                    method: method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: body
                }
            );
            if (response.status === 500) {
                reject({
                    status: response.status,
                    message: {
                        status: response.status,
                        message: "Server connection error"
                    }
                })
            }
            if (response.status !== 200) {
                let errorJson = await response.json();
                reject({
                    status: response.status,
                    message: errorJson
                })
            }
            let responseJson = await response.json();
            resolve(responseJson);
        } catch (e) {
            reject(e);
        }
    });
};


export const AppApi = {
    login,
    testAccessToken,
    verifyUser,
    signup,
    retrieveTasksByUsername,
    addTask,
    updateTask
};
