// Store/Reducers/lookReducer.js
import { getData, setData } from '../../utils/datas.js'
import { setJSON, getJSON } from '../../API/registerApi'

const initialState = { looks: {} }

function setLooks (state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_LOOK':
            nextState = {
                ...state,
                looks: [...state.looks, action.value]
            }

            var checkState = nextState || state;
            var looks = checkState.looks;
            
            const data = new FormData();
            data.append('looks', JSON.stringify(looks));
            
            setJSON('looks', data, (result) => {
                console.log('set looks !!', result);
                setData('@Vera:looks', looks);
            });

            return nextState || state;


        case 'INIT_LOOKS':
            getJSON('looks', new FormData(), (looks) => {
                if (looks) {
                    looks = JSON.parse(looks);
                } else {
                    looks = [];
                }
                initialState.looks = looks;
                console.log('init looks =>', looks)
            });

            return nextState || state;
        default:
            return state
    }
}

export default setLooks