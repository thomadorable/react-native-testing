// Components/FilmItem.js

import React from 'react'
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native'
import FadeIn from '../animations/FadeIn'
import { connect } from 'react-redux'
import Genres from './Genres'

class FilmItem extends React.Component {

    _displayFavoriteImage = () => {
        var sourceImage = require('../assets/images/unlike.png')
        if (this.props.favoritesFilm.findIndex(item => item.id === this.props.film.id) !== -1) {
          sourceImage = require('../assets/images/like.png')
        }
        return (
            <TouchableOpacity onPress={() => this._toggleFavorite()} style={{width: 20, marginTop: 2, marginLeft: 5}}>
                <Image
                    style={{width: 16, height: 16}}
                    source={sourceImage}
                    />
            </TouchableOpacity>
        )
    }

    _toggleFavorite = () => {
        const action = { type: "TOGGLE_FAVORITE", value: this.props.film }
        this.props.dispatch(action)
    }

    render() {
        const { film, displayDetailForFilm } = this.props
        return (
            <FadeIn index={this.props.index}>
                <TouchableOpacity
                    style={styles.main_container}
                    onPress={() => displayDetailForFilm(film.id)}
                >
                    
                    <View style={styles.titre_container}>
                        {this._displayFavoriteImage()}

                        <Text style={styles.titre}>{this.props.film.title}</Text>
                        <Text style={styles.vote}>{this.props.film.vote_average} / 10</Text>

                    </View>
                    <Image
                        style={styles.image}
                        source={{ uri: 'https://image.tmdb.org/t/p/w500' + this.props.film.backdrop_path}}
                    />

                    <Genres film={film}/>
                </TouchableOpacity>
            </FadeIn>
        )
    }
}

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
    }
})

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmItem)