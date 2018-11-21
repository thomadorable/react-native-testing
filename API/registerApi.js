import { getData } from '../utils/datas.js'
import { isNetworkConnected } from '../utils/checkNetwork'
import constants from '../constants/Env'
const baseUrl = constants.baseUrl;

export async function getRegister(callback) {
    // TODO : tester url before fetch
    isNetworkConnected().done((isConnected) => {
        if (isConnected) {
            return fetch(baseUrl + '/register.php')
                .then((response) => response.json())
                .then((json) => callback(json))
                .catch((error) => console.error(error))
        } else {
            alert('pas de connexion pour l\'user')
            getData('@Vera:user', null, (user) => {
                callback(user);
            });
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