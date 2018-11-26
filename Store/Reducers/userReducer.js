// Store/Reducers/userReducer.js
import { setData } from '../../utils/datas.js'

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
            nextState = {
                ...state,
                user: action.value
            };

            // TODO : update back data before push in local data 
            // (maybe local data are more recent)
            console.log('logged as : ',  nextState.user);
            setData('@Vera:user', nextState.user);

            return nextState || state;
        default:
            return state
    }
}

export default setUser