/**
 * Sample React Native Loading
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import FilmNavigation from '../navigation/FilmNavigator';

import Store from '../Store/configureStore'
import { connect } from 'react-redux'

import { getRegister } from '../API/registerApi'
import { getGenre } from '../API/TMDBApi'

class Loading extends Component {
    state = {
        isLoading: true,
    };

    componentWillMount() {
        console.log('will mount !!!!!');

        getRegister((onlineUser) => {
            if (onlineUser) {
                // TODO : wait before isLoading true
                this.props.dispatch({type: "INIT_USER", value: onlineUser })
                this.props.dispatch({type: "INIT_FAVORITES", value: onlineUser })
                this.props.dispatch({type: "INIT_CLOTHES", value: onlineUser })
            } else {
                alert('erreur pas d\'utilisateur ??? ')
            }

            getGenre().then(genres => {
                this.props.dispatch({type: "INIT_GENRES", value: genres.genres })

                this.setState({
                    isLoading: false,
                });
            })
        })
    }

    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' color="red"/>
            </View>
        )
    }
    
    render() {
        return (
            this.state.isLoading ? this._displayLoading() : 
            (<FilmNavigation />)
        );
    }
}


const styles = StyleSheet.create({
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = state => {
    return {
        genres: state.setGenre.genres,
    }
}

export default connect(mapStateToProps)(Loading)