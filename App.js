/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import SwitchNavigator from './navigation/SwitchNavigator';


export default class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <SwitchNavigator />
            </Provider>
        );
    }
}