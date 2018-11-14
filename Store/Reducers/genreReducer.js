// Store/Reducers/genreReducer.js
const initialState = { genres: [] }

function setGenre(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'INIT_GENRES':

            var genres = {};

            action.value.forEach(genre => {
                genres[genre.id] = genre.name;
            });

            nextState = {
                ...state,
                genres: genres
            };

            return nextState || state;
        default:
            return state
    }
}

export default setGenre