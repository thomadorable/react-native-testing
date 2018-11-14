import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'

class Genres extends React.Component {
    _displayGenres = () => {
        var genres = [];
        var film = this.props.film;
        var film_id_genres = film.genre_ids;

        if (film.genre_ids == undefined && film.genres != undefined) {
            film_id_genres = film.genres.map((genre) => {
                return genre.id;
            });
        }

        if (film_id_genres != undefined) {
            film_id_genres.forEach(genre_id => {
                var id_key = film.id.toString() + '_' + genre_id.toString();
                genres.push(<View key={id_key} style={styles.genre}><Text style={styles.genreText}>{this.props.all_genres[genre_id]}</Text></View>)
            });
        }

        return genres;
    }

    render() {
        var style = (this.props.style) ? this.props.style : { flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'wrap' };
        return (
            <View style={style}>
                {this._displayGenres()}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        all_genres: state.setGenre.genres
    }
}

export default connect(mapStateToProps)(Genres)

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'column',
        marginBottom: 30
    },
    image: {
        height: 200
    },
    titre_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 15
    },
    titre: {
        flexWrap: 'wrap',
        flex: 1,
        fontWeight: 'bold',
        fontSize: 14
    },
    vote: {
        fontSize: 14
    },
    genre: {
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#F0F0F0',
        marginRight: 10,
        marginTop: 10,
    },
    genreText: {
        fontSize: 11,
        textTransform: 'lowercase',
        color: '#222'
    }
})