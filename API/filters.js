import { isNetworkConnected } from '../utils/checkNetwork'
import { getUser } from '../utils/datas'

export function getFilter(filter, image, callback) {
    isNetworkConnected().done((isConnected) => {
        if (isConnected) {
            const user = getUser();
            const userID = user && user.id;

            return fetch('https://app-vera.herokuapp.com/filter', {
            // return fetch('http://localhost:3000/filter', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    user:userID, 
                    filter: filter,
                    url: image
                })
            })
            .then((response) => response.json())
            .then((json) => callback(json))
            .catch((error) => console.error(error))
        } else {
            callback(null);
        }
    });
}