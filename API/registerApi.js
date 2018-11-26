import { getData } from '../utils/datas.js'
import { isNetworkConnected } from '../utils/checkNetwork'
import constants from '../constants/Env'
const baseUrl = constants.baseUrl;

// TODO TOFIX récupérer le front en 1er
export async function getCurrentUser(callback) {
    getData('@Vera:user', null, (localUser) => {
        if (localUser) {
            isNetworkConnected().done((isConnected) => {
                if (isConnected) {
                    return fetch(baseUrl + '/register.php')
                        .then((response) => response.json())
                        .then((json) => {
                            console.log(json.status);
                            if (json.status === '200') {
                                callback(json.user)
                            } else {
                                callback(null);
                            }
                        })
                        .catch((error) => console.error(error))
                } else {
                    callback(localUser);
                }
            });
        } else {
            callback(null);
        }
    });
}


export async function loginFbUser (data, callback) {
    // TODO TOFIX : tester url before fetch
    isNetworkConnected().done((isConnected) => {
        if (isConnected) {
            

            return fetch(baseUrl + '/login.php', {
                    method: 'post',
                    body: data,
                })
                .then((response) => response.json())
                .then((json) => callback(json))
                .catch((error) => console.error(error))
        } else {
            callback(null);
        }
    });
}

export async function loginMailUser (credentials, callback) {
    // TODO TOFIX : tester url before fetch
    isNetworkConnected().done((isConnected) => {
        if (isConnected) {
            var formData = new FormData();
            formData.append('mail', credentials.mail);
            formData.append('password', credentials.password);

            return fetch(baseUrl + '/login.php', {
                    method: 'post',
                    body: formData,
                })
                .then((response) => response.json())
                .then((json) => callback(json))
                .catch((error) => console.error(error))
        } else {
            callback(null);
        }
    });
}


// TODO TOFIX THIS IS THE SAME THING

export function setAvatar(data, callback) {
    isNetworkConnected().done((isConnected) => {
        if (isConnected) {
            return fetch(baseUrl + '/avatar.php', {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => response.json())
            .then((json) => callback(json))
            .catch((error) => console.error(error))
        } else {
            callback(null);
        }
    });
}

export function setSnap(data, callback) {
    isNetworkConnected().done((isConnected) => {
        if (isConnected) {
            return fetch(baseUrl + '/snap.php', {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => response.json())
            .then((json) => callback(json))
            .catch((error) => console.error(error))
        } else {
            callback(null);
        }
    });
}