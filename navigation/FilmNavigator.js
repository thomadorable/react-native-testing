// Navigation/Navigation.js

import React from 'react' // N'oubliez pas l'import de React ici. On en a besoin pour rendre nos components React Native Image ! 
import { StyleSheet, Image, Easing, Animated } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Search from '../components/Search'
import FilmDetail from '../components/FilmDetail'
import Favorites from '../components/Favorites'
import Camera from '../components/Camera'
import Clothes from '../components/Clothes'
import Lookbook from '../components/Lookbook'
import CustomHeader from '../components/CustomHeader'
import { fromLeft } from 'react-navigation-transitions';

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            header: props => <CustomHeader {...props} title="Search"/>,
            // animationEnabled: true
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
},
{
    // initialRouteName: 'Search',
    // transitionConfig: () => fromLeft(1000)
})

const FavoritesStackNavigator = createStackNavigator({
    Favorite: {
        screen: Favorites,
        navigationOptions: {
            header: props => <CustomHeader {...props} title="Favoris"/>,
            animationEnabled: true
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})

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
    }
})

const MoviesTabNavigator = createBottomTabNavigator(
    {
        Search: {
            screen: SearchStackNavigator,
            navigationOptions: {
                tabBarIcon: ({ focused }) => (focused ?
                    <Image
                        source={require('../assets/images/search2.png')}
                        style={[styles.icon, { tintColor: 'black' }]}
                    />
                    :
                    <Image
                        source={require('../assets/images/search2.png')}
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
                        source={require('../assets/images/unheart2.png')}
                        style={[styles.icon, { tintColor: 'black' }]}
                    />
                    :
                    <Image
                        source={require('../assets/images/unheart2.png')}
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
            // labelStyle: { paddingBottom: 60 }
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