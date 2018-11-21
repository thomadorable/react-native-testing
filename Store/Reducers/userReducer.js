// Store/Reducers/userReducer.js
import { setData } from '../../utils/datas.js'
import getUser from '../../utils/getUser.js'

const initialState = { user: {} }

function setUser(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'SET_AVATAR':
            nextState = {
                ...state,
                user: {
                    ...state.user,
                    avatar: action.value
                }
            };

            setData('@Vera:user', nextState.user);

            return nextState || state;


        case 'INIT_USER':
            // TODO tej this & remove file
            const user = getUser();

            nextState = {
                ...state,
                user: user
            };

            // TODO : update back data before push in local data 
            // (maybe local data are more recent)
            // setData('@Vera:user', nextState.user);

            return nextState || state;
        default:
            return state
    }
}

export default setUser