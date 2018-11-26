import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import AppNavigator from './AppNavigator';
import Loading from '../screens/Loading'
import Login from '../screens/Login'
import Register from '../screens/Register'


const LoadingStack = createStackNavigator({ Loading: Loading });
const AuthStack = createStackNavigator({ Login: Login, Register: Register });

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