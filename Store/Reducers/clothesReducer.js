// Store/Reducers/clothesReducer.js
import { getData, setData } from '../../utils/datas.js'
import { setJSON, getJSON } from '../../API/registerApi'

const initialState = { clothes: [] }

function setClothes(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_CLOTHES':

            nextState = {
                ...state,
                clothes: [...state.clothes, action.value]
            }

            var checkState = nextState || state;
            var clothes = checkState.clothes;
            
            const data = new FormData();
            data.append('clothe', JSON.stringify(clothes));
            
            setJSON('clothes', data, (result) => {
                console.log('set clothe !!', result);
                setData('@Vera:clothes', clothes);
            });

            return nextState || state;


        case 'INIT_CLOTHES':
            getJSON('clothes', new FormData(), (clothes) => {
                if (clothes) {
                    clothes = JSON.parse(clothes);
                } else {
                    clothes = [];
                }
                initialState.clothes = clothes;
                console.log('init clothes =>', clothes)
            });
            return nextState || state;
        default:
            return state
    }
}

export default setClothes