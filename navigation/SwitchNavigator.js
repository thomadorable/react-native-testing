import React from 'react'
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import AppNavigator from './AppNavigator';
import Loading from '../screens/Loading'
import Login from '../screens/Login'
import Register from '../screens/Register'
import CustomHeader from '../components/CustomHeader'
import t from '../utils/translation.js';

const LoadingStack = createStackNavigator({ Loading: Loading });

const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: props => <CustomHeader {...props} title={t.login} />,
            animationEnabled: true
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: props => <CustomHeader {...props} title={t.register} />,
            animationEnabled: true
        }
    }
})

export default createSwitchNavigator(
    {
        AuthLoading: LoadingStack,
        App: AppNavigator,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);