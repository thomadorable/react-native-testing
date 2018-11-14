// Navigation/Navigation.js

import React from 'react' // N'oubliez pas l'import de React ici. On en a besoin pour rendre nos components React Native Image ! 
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Search from '../components/Search'
import FilmDetail from '../components/FilmDetail'
import Favorites from '../components/Favorites'
import Test from '../components/Test'
import Colors from '../constants/Colors'

const titleStyle = {
    fontFamily: 'RozhaOne-Regular',
    fontSize: 20
}

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Rechercher',
            headerTitleStyle: titleStyle
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})

const FavoritesStackNavigator = createStackNavigator({
    Favorite: {
        screen: Favorites,
        navigationOptions: {
            title: 'Favoris',
            headerTitleStyle: titleStyle
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})

const TestingStackNavigator = createStackNavigator({
    Favorite: {
        screen: Test,
        navigationOptions: {
            title: 'Test animations',
            headerTitleStyle: titleStyle
        }
    }
})

const MoviesTabNavigator = createBottomTabNavigator(
    {
        Search: {
            screen: SearchStackNavigator,
            navigationOptions: {
                tabBarIcon: ({ focused }) => (focused ?
                    <Image
                        source={require('../assets/images/unsearch.png')}
                        style={[styles.icon, { tintColor: 'black' }]}
                    />
                    :
                    <Image
                        source={require('../assets/images/search.png')}
                        style={[styles.icon, { tintColor: 'grey' }]}
                    />
                )
            }
        },
        Favorites: {
            screen: FavoritesStackNavigator,
            navigationOptions: {
                tabBarIcon: ({ focused }) => (focused ?
                    <Image
                        source={require('../assets/images/like.png')}
                        style={[styles.icon, { tintColor: 'black' }]}
                    />
                    :
                    <Image
                        source={require('../assets/images/unlike.png')}
                        style={[styles.icon, { tintColor: 'grey' }]}
                    />
                ),
            }
        },
        Testing: {
            screen: TestingStackNavigator,
            navigationOptions: {
                tabBarIcon: ({ focused }) => (focused ?
                    <Image
                        source={require('../assets/images/like.png')}
                        style={[styles.icon, { tintColor: 'black' }]}
                    />
                    :
                    <Image
                        source={require('../assets/images/unlike.png')}
                        style={[styles.icon, { tintColor: 'grey' }]}
                    />
                ),
            }
        }
    },
    {
        tabBarOptions: {
            // activeBackgroundColor: '#DFDFDF',
            inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
            showLabel: false,
            showIcon: true,
            activeTintColor: '#292929',
            inactiveTintColor: '#494949',
            // safeAreaInset: {
            //     bottom: 'never'
            // },
            // style: { height: 70 },
            labelStyle: { paddingBottom: 20 }
        }
    }
)

const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25,
    }
})

export default MoviesTabNavigator