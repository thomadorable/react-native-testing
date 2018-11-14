// Components/FilmDetail.js

import React from 'react'
import { Animated, Easing, Platform, Share, Alert, TouchableOpacity, Image, StyleSheet, View, Text, ActivityIndicator, ScrollView } from 'react-native'
import { getFilmDetailFromApi } from '../API/TMDBApi'
import { connect } from 'react-redux'
import Colors from '../constants/Colors'
import Genres from './Genres'

class FilmDetail extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        // On accède à la fonction shareFilm et au film via les paramètres qu'on a ajouté à la navigation
        if (params.film != undefined && Platform.OS === 'ios') {
            return {
                // On a besoin d'afficher une image, il faut donc passe par une Touchable une fois de plus
                headerRight: <TouchableOpacity
                    style={{ marginRight: 20 }}
                    onPress={() => params.shareFilm()}>
                    <Image
                        style={{ width: 20, height: 20 }}
                        source={require('../assets/images/ic_share.png')} />
                </TouchableOpacity>
            }
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true
        }

        this._shareFilm = this._shareFilm.bind(this)
        this.anim_fav = new Animated.Value(1)
    }

    _updateNavigationParams() {
        this.props.navigation.setParams({
            shareFilm: this._shareFilm,
            film: this.state.film
        })
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            }, () => { this._updateNavigationParams() })
        })
    }


    _shareFilm() {
        const { film } = this.state
        Share.share({ title: film.title, message: film.overview })
            .then(
                Alert.alert(
                    'Succès',
                    'Film partagé',
                    [
                        { text: 'OK', onPress: () => { } },
                    ]
                )
            )
            .catch(err =>
                Alert.alert(
                    'Echec',
                    'Film non partagé',
                    [
                        { text: 'OK', onPress: () => { } },
                    ]
                )
            )
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _toggleFavorite() {
        Animated.sequence([
            Animated.timing(
                this.anim_fav,
                {
                    toValue: 1.5,
                    duration: 200,
                    easing: Easing.ease
                }
            ),
            Animated.timing(
                this.anim_fav,
                {
                    toValue: 1,
                    duration: 200,
                    easing: Easing.ease
                }
            )
        ]).start()

        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action)
    }

    _displayFavoriteImage() {
        var sourceImage = require('../assets/images/unlike.png')
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            sourceImage = require('../assets/images/like.png')
        }
        return (
            <Animated.Image
                style={{ width: 40, height: 40, transform: [{ scale: this.anim_fav }] }}
                source={sourceImage}
            />
        )
    }

    _displayFilm() {
        if (this.state.film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={{ height: 200, marginBottom: 20 }}
                        source={{ uri: 'https://image.tmdb.org/t/p/w500' + this.state.film.backdrop_path }}
                    />
                    <Text style={{ fontWeight: 'bold', fontSize: 28, textAlign: 'center' }}>{this.state.film.title}</Text>

                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>

                    <View style={{ margin: 20 }}>
                        <Text style={{ lineHeight: 25 }}>{this.state.film.overview}</Text>

                        <Genres film={this.state.film} style={{flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 10}}/>

                        <View style={{ flexDirection: 'row', marginTop: 25 }}>
                            <Text style={styles.bold}>Sorti le :</Text>
                            <Text>{this.state.film.release_date}</Text>
                        </View>

                        {/* Note */}
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Text style={styles.bold}>Note :</Text>
                            <Text>{this.state.film.vote_average}</Text>
                        </View>

                        {/* Nombre de votes */}
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Text style={styles.bold}>Nombre de vote :</Text>
                            <Text>{this.state.film.vote_count}</Text>
                        </View>

                        {/* Budget */}
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Text style={styles.bold}>Budget :</Text>
                            <Text>{this.state.film.budget}</Text>
                        </View>

                        {/* Genres : */}
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Text style={styles.bold}>Sorti le :</Text>
                            <Text>{this.state.film.release_date}</Text>
                        </View>

                        {/* Companies */}
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Text style={styles.bold}>Sorti le :</Text>
                            <Text>{this.state.film.release_date}</Text>
                        </View>

                    </View>
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.bg
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1,
        flexDirection: 'column'
    },
    bold: {
        fontWeight: 'bold',
        marginRight: 5
    }
})

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmDetail)