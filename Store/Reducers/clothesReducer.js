// Store/Reducers/clothesReducer.js
import { getData, setData } from '../../utils/datas.js'
import { setJSON, getJSON } from '../../API/registerApi'

const initialState = { clothes: [] }
var user_id = null;

function setClothes(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_CLOTHES':

            nextState = {
                ...state,
                clothes: [...state.clothes, action.value]
            }

            var checkState = nextState || state;
            var clothe = checkState.clothes;
            
            const data = new FormData();
            data.append('clothe', JSON.stringify(clothe));
            data.append('user_id', user_id);
            
            setJSON('clothes', data, (result) => {
                console.log('set clothe !!', result);
                setData('@Vera:clothes', clothe);
            });

            return nextState || state;


        case 'INIT_CLOTHES':
            getData('@Vera:user', [], (user) => {
                user_id = user.id;
                const data = new FormData();
                data.append('user_id', user_id);
            
                getJSON('clothes', data, (clothes) => {
                    if (clothes) {
                        clothes = JSON.parse(clothes);
                    } else {
                        clothes = [];
                    }
                    initialState.clothes = clothes;
                    console.log('init clothes =>', clothes)
                });
            });
            return nextState || state;
        default:
            return state
    }
}

export default setClothes