import { isNetworkConnected } from '../utils/checkNetwork'
import { getUser } from '../utils/datas'

const baseUrl = 'https://app-vera.herokuapp.com/filter';
// const baseUrl = 'http://localhost:3000/filter';

export function getFilter(filter, image, callback) {
    isNetworkConnected().done((isConnected) => {
        if (isConnected) {
            const user = getUser();
            const userID = user && user.id;

            console.log(baseUrl, JSON.stringify({
                user:userID, 
                filter: filter,
                url: image
            }))

            return fetch(baseUrl, {
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