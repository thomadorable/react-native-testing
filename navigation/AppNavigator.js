// Navigation/AppNavigator.js

import React from 'react'
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Camera from '../screens/Camera'
import Clothes from '../screens/Clothes'
import Lookbook from '../components/Lookbook'
import MyLooks from '../screens/MyLooks'
import CustomHeader from '../components/CustomHeader'
import { fadeIn } from 'react-navigation-transitions';

const CameraStackNavigator = createStackNavigator({
    Camera: {
        screen: Camera,
        navigationOptions: {
            header: props => <CustomHeader {...props} title="Add clothes"/>,
            animationEnabled: true
        }
    }
})

const ClothesStackNavigator = createStackNavigator({
    Clothes: {
        screen: Clothes,
        navigationOptions: {
            header: props => <CustomHeader {...props} title="My clothes"/>,
            animationEnabled: true
        }
    }
})

const LookbookStackNavigator = createStackNavigator({
    Lookbook: {
        screen: Lookbook,
        navigationOptions: {
            header: props => <CustomHeader {...props} title="Lookbook"/>,
            animationEnabled: true
        }
    },
    MyLooks: {
        screen: MyLooks,
        navigationOptions: {
            header: props => <CustomHeader {...props} title="Mes looks"/>,
            animationEnabled: true
        }
    }
},
{
    initialRouteName: 'Lookbook',
    transitionConfig: () => fadeIn(300),
})

const MoviesTabNavigator = createBottomTabNavigator(
    {
        Clothes: {
            screen: ClothesStackNavigator,
            navigationOptions: {
                tabBarIcon: ({ focused }) => (focused ?
                    <Image
                        source={require('../assets/images/hanger.png')}
                        style={[styles.icon, { tintColor: 'black' }]}
                    />
                    :
                    <Image
                        source={require('../assets/images/hanger.png')}
                        style={[styles.icon, { tintColor: 'grey' }]}
                    />
                ),
            }
        },
        Camera: {
            screen: CameraStackNavigator,
            navigationOptions: {
                tabBarIcon: ({ focused }) => (focused ?
                    <Image
                        source={require('../assets/images/camera.png')}
                        style={[styles.icon, { tintColor: 'black' }]}
                    />
                    :
                    <Image
                        source={require('../assets/images/camera.png')}
                        style={[styles.icon, { tintColor: 'grey' }]}
                    />
                ),
            }
        },
        Lookbook: {
            screen: LookbookStackNavigator,
            navigationOptions: {
                tabBarOnPress: ({navigation}) => {
                    if (navigation.isFocused()) {
                        navigation.state.routes[0].params.scrollToTop()
                    } else {
                        navigation.navigate('Lookbook');
                    }
                },
                tabBarIcon: ({ focused }) => (focused ?
                    <Image
                        source={require('../assets/images/insta.png')}
                        style={[styles.icon, { tintColor: 'black' }]}
                    />
                    :
                    <Image
                        source={require('../assets/images/insta.png')}
                        style={[styles.icon, { tintColor: 'grey' }]}
                    />
                ),
            }
        }
    },
    {
        initialRouteName: 'Lookbook',
        tabBarOptions: {
            activeBackgroundColor: 'white',
            inactiveBackgroundColor: 'white',
            showLabel: false,
            showIcon: true,
            activeTintColor: '#292929',
            inactiveTintColor: '#494949',
        }
    }
)

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
        marginTop: 5
    }
})
export default MoviesTabNavigator