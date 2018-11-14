// Store/configureStore.js

import { createStore, combineReducers } from 'redux';
import toggleFavorite from './Reducers/favoriteReducer'
import setUser from './Reducers/userReducer'
import setGenre from './Reducers/genreReducer'
import setClothes from './Reducers/clothesReducer'

export default createStore(combineReducers({setUser, toggleFavorite, setGenre, setClothes}))