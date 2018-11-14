import { AsyncStorage } from 'react-native'

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
        console.warn('Custom : Error while trying to get datas');
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
