// Store/configureStore.js

import { createStore, combineReducers } from 'redux';
import setUser from './Reducers/userReducer'
import setClothes from './Reducers/clothesReducer'
import setLooks from './Reducers/looksReducer'

export default createStore(combineReducers({setUser, setClothes, setLooks}))