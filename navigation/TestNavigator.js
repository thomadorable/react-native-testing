import Home from '../components/Search'
import Screen from '../components/Search'
import {createStackNavigator} from 'react-navigation';
import React from 'react'
import { Animated, Easing, StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'



const App = createStackNavigator({
    Home: { screen: Screen },
    Profile: { screen: Screen },
});
  
  export default App;

