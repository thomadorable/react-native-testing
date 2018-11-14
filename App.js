/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Loading from './components/Loading';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'


export default class App extends Component {
    state = {
        isLoading: true,
    };

    render() {
        return (
            <Provider store={Store}>
                <Loading />
            </Provider>
        );
    }
}