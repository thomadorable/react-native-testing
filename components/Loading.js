/**
 * Sample React Native Loading
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, Image } from 'react-native';
import FilmNavigation from '../navigation/FilmNavigator';
import { connect } from 'react-redux'

import { getRegister } from '../API/registerApi'

class Loading extends Component {
    state = {
        isLoading: true,
    };

    componentWillMount() {
        getRegister((onlineUser) => {
            if (onlineUser) {
                this.props.dispatch({type: "INIT_USER" })
                this.props.dispatch({type: "INIT_LOOKS" })
                this.props.dispatch({type: "INIT_CLOTHES", value: onlineUser })

                // TODO TOFIX : wait before isLoading true
                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                    });
                }, 400)
            } else {
                alert('erreur pas d\'utilisateur ??? ')
            }
        })
    }

    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <Image
                    style={{width: 234, height: 154}}
                    source={require('../assets/images/splash.png')}
                />
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
    }
}

export default connect(mapStateToProps)(Loading)