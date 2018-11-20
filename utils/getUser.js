import { getData } from '../utils/datas.js'

var current_user = null;

getData('@Vera:user', [], (user) => {
    current_user = user;
});

export default function getUser() {
    return current_user;
}
