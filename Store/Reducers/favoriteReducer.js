// Store/Reducers/favoriteReducer.js

import { getData, setData } from '../../utils/datas.js'
import { setJSON, getJSON } from '../../API/registerApi'

var initialState = {
    favoritesFilm: []
}

var user_id = null;

function toggleFavorite(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)

            if (favoriteFilmIndex !== -1) {
                // Le film est déjà dans les favoris, on le supprime de la liste
                nextState = {
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter((item, index) => index !== favoriteFilmIndex)
                }
            } else {
                // Le film n'est pas dans les films favoris, on l'ajoute à la liste
                nextState = {
                    ...state,
                    favoritesFilm: [...state.favoritesFilm, action.value]
                }
            }

            var checkState = nextState || state;

            var movies = checkState.favoritesFilm;
            
            const data = new FormData();
            data.append('movies', JSON.stringify(movies));
            data.append('user_id', user_id);
            
            setJSON('movies', data, (result) => {
                setData('@Vera:movies', movies);
            });

            return checkState



        case 'INIT_FAVORITES':
            getData('@Vera:user', [], (user) => {
                user_id = user.id;
                const data = new FormData();
                data.append('user_id', user_id);
            
                getJSON('movies', data, (favorites) => {
                    initialState.favoritesFilm = JSON.parse(favorites);
                    console.log('init favorites =>', JSON.parse(favorites))
                });
            });

            return nextState || state;
        default:
            return state
    }
}

export default toggleFavorite