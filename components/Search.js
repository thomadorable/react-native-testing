// Components/Search.js

import React from 'react'
import { StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native'
import FilmList from './FilmList'
import Avatar from './Avatar'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import Colors from '../constants/Colors'
import { connect } from 'react-redux'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.searchedText = "Born"
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoading: false
        }

        this._loadFilms = this._loadFilms.bind(this)
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true })
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: [...this.state.films, ...data.results],
                    isLoading: false
                })
            })
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _searchFilms() {
        ReactNativeHapticFeedback.trigger('impactLight', true);
        Keyboard.dismiss()

        this.page = 0
        this.totalPages = 0
        this.setState({
            films: [],
        }, () => {
            this._loadFilms()
        })
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Avatar />

                <View style={{flexDirection: 'row', margin: 20}}>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Titre du film'
                        onChangeText={(text) => this._searchTextInputChanged(text)}
                        onSubmitEditing={() => this._searchFilms()}
                        defaultValue={this.searchedText}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            this._searchFilms()
                        }}
                        style={styles.searchButton}
                    >
                        <Image
                            source={require('../assets/images/search.png')}
                            style={[styles.searchicon, { tintColor: 'grey' }]}
                        />
                    </TouchableOpacity>
                </View>

                <FilmList
                    films={this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this._loadFilms}
                    page={this.page}
                    totalPages={this.totalPages}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.bg,
        width: '100%'
    },
    textinput: {
        height: 50,
        backgroundColor: '#F0F0F0',
        paddingLeft: 5,
        borderRadius: 20,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        paddingLeft: 20,
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchButton: {
        width: 50,
        height: 50,
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        backgroundColor: '#F0F0F0',
        borderLeftWidth: 1,
        borderColor: 'lightgrey',
        justifyContent: 'center'
    },
    searchicon: {
        width: 20,
        height: 20,
        marginLeft: 12
    }
})


export default Search