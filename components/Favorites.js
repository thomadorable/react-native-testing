// Components/Favorites.js

import React from 'react'
import { ScrollView, RefreshControl, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import FilmList from './FilmList'
import Avatar from './Avatar'
import Colors from '../constants/Colors'

class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 1000);
    }

    _displayFavorites() {
        if (!this.state.refreshing) {
            return (
                <FilmList
                    films={this.props.favoritesFilm}
                    navigation={this.props.navigation}
                />
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Avatar />
                <ScrollView
                    style={{paddingTop: 20}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />}
                    >
                    {this._displayFavorites()}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}


const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.bg
    }
})


export default connect(mapStateToProps)(Favorites)
