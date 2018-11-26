import { AsyncStorage } from 'react-native'
import { isNetworkConnected } from './checkNetwork'
import constants from '../constants/Env'
const baseUrl = constants.baseUrl;

var current_user = null;

export function updateUser() {
    getData('@Vera:user', [], (user) => {
        current_user = user;
    });
}

updateUser();

export async function getData (key, defaultValue, callback) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            callback(JSON.parse(value));
        } else {
            callback(defaultValue);
        }
    } catch (error) {
        // Error retrieving data
        console.warn('Custom : Error while trying to get datas', key);
    }
}

export async function setData (key, value, callback) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        // Error saving data
        console.warn('Custom : Error while trying to set datas');
    }
}

// SET DATA FUNCTION
export function setJSON(file, data, callback) {
    isNetworkConnected().done((isConnected) => {
        if (isConnected) {
            data.append('user_id', current_user.id);

            return fetch(baseUrl + '/' + file + '.php', {
                method: 'post',
                body: data,
            })
            .then((response) => response.text())
            .then((json) => callback(json))
            .catch((error) => console.error(error))
        } else {
            callback(null);
        }
    });
}

export function getJSON(file, data, callback) {
    isNetworkConnected().done((isConnected) => {
        if (isConnected) {
            if (data && current_user) {
                data.append('user_id', current_user.id);
            }

            return fetch(baseUrl + '/' + file + '.php', {
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

export function getStockedData(key, callback) {
    getJSON(key, new FormData(), (array) => {
        if (array) {
            callback(array)
            setData('@Vera:' + key, array);
        } else {
            getData('@Vera:' + key, [], callback);
        }
    });
}