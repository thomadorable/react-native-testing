// Store/Reducers/lookReducer.js
import { setData, getStockedData, setJSON } from '../../utils/datas.js'

const initialState = { looks: [] }

function setLooks (state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_LOOK':
            const lookIndex = state.looks.findIndex(item => item.id === action.value.id);

            if (lookIndex === -1) {
                nextState = {
                    ...state,
                    looks: [action.value, ...state.looks]
                }
    
                var checkState = nextState || state;
                var looks = checkState.looks;
                
                const data = new FormData();
                data.append('looks', JSON.stringify(looks));
                
                setJSON('looks', data, (result) => {
                    console.log('set looks !!', result);
                    setData('@Vera:looks', looks);
                });
            }

            return nextState || state;

        case 'REMOVE_LOOK': {
            // TODO TOFIX check this
            const lookIndex = state.looks.findIndex(item => item.id === action.value.id)

            console.log('lookIndex', lookIndex);

            if (lookIndex !== -1) {
                nextState = {
                    ...state,
                    looks: state.looks.filter((item, index) => index !== lookIndex)
                }

                var checkState = nextState || state;
                var looks = checkState.looks;

                const data = new FormData();
                data.append('looks', JSON.stringify(looks));
                
                setJSON('looks', data, (result) => {
                    console.log('set looks !!', result);
                    setData('@Vera:looks', looks);
                });
            }

            return nextState || state;
        }


        case 'INIT_LOOKS':
            getStockedData('looks', (looks) => {
                initialState.looks = looks;
            });

            return nextState || state;
        default:
            return state
    }
}

export default setLooks