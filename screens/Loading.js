// screens/Loading.js

import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, Image } from 'react-native';
import { connect } from 'react-redux'

import { getCurrentUser } from '../API/registerApi'

class Loading extends Component {
    state = {
        isLoading: true,
        isAuth: false
    };

    componentWillMount() {
        getCurrentUser((onlineUser) => {
            if (onlineUser) {
                this.props.dispatch({type: "INIT_USER", value: onlineUser})
                this.props.dispatch({type: "INIT_LOOKS" })
                this.props.dispatch({type: "INIT_CLOTHES"})

                // // TODO TOFIX : wait before isLoading true
                setTimeout(() => {
                    this.props.navigation.navigate('App');
                }, 400)
            } else {
                this.props.navigation.navigate('Auth');
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
            <View style={styles.loading_container}>
                <Image
                    style={{width: 234, height: 154}}
                    source={require('../assets/images/splash.png')}
                />
            </View>
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
        justifyContent: 'center',
        backgroundColor: 'white'
    }
})

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Loading)