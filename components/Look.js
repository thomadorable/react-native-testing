// Components/Look.js

import React from 'react'
import { Image, StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Colors from '../constants/Colors'

class Look extends React.Component {
    constructor(props) {
        super(props);
    }

    _displayFavoriteImage = () => {
        var sourceImage = require('../assets/images/unlike.png')
        if (this.props.favoritesFilm.findIndex(item => item.id === this.props.look.id) !== -1) {
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

    render() {
        // console.log(this.props.look, this.props.look.image);
        return (
            <TouchableOpacity
                style={styles.main_container}
                // onPress={() => displayDetailForFilm(film.id)}
            >

            <View style={styles.titre_container}>
                {/* {this._displayFavoriteImage()} */}

                <Text style={styles.titre}>{this.props.look.tag}</Text>
                <Text style={styles.vote}>{this.props.look.nb_comments} | {this.props.look.nb_likes}</Text>

            </View>
            <Image
                style={styles.image}
                source={{uri: this.props.look.thumb}}
            />

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'column',
        marginBottom: 30
    },
    image: {
        height: Dimensions.get('window').width
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

export default connect(mapStateToProps)(Look)
