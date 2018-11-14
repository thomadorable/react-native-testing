import { NetInfo, Platform } from 'react-native'
import { getData, setData } from '../utils/datas.js'

var baseUrl = 'http://thomasderoua.fr/vera';
// baseUrl = 'http://localhost/vera-api';

function isNetworkConnected() {
    if (Platform.OS === 'ios') {
      return new Promise(resolve => {
        const handleFirstConnectivityChangeIOS = isConnected => {
          NetInfo.isConnected.removeEventListener('connectionChange', handleFirstConnectivityChangeIOS);
          resolve(isConnected);
        };
        NetInfo.isConnected.addEventListener('connectionChange', handleFirstConnectivityChangeIOS);
      });
    }
  
    return NetInfo.isConnected.fetch();
  }
  

export async function getRegister(callback) {
    // TODO : tester url before fetch
    isNetworkConnected().done((isConnected) => {
        if (isConnected) {
            return fetch(baseUrl + '/register.php')
                .then((response) => response.json())
                .then((json) => callback(json))
                .catch((error) => console.error(error))
        } else {
            alert('pas de connexion !')
            getData('@Vera:user', null, (user) => {
                callback(user);
            });
            
        }
    });
}

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

export function setJSON(file, data, callback) {
    isNetworkConnected().done((isConnected) => {
        if (isConnected) {
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
            return fetch(baseUrl + '/' + file + '.php', {
                method: 'post',
                body: data,
            })
            .then((response) => response.json())
            .then((json) => callback(json))
            .catch((error) => console.error(error))
        } else {
            alert('pas de connexion')
            getData('@Vera:' + file, [], (favorites) => {
                callback(favorites);
            });
        }
    });
}