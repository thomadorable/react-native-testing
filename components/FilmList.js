// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import Colors from '../constants/Colors'
import { connect } from 'react-redux'

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

  _displayDetailForFilm = (idFilm) => {
    console.log('open film : ' + idFilm);
    this.props.navigation.navigate('FilmDetail', { idFilm: idFilm })
  }

  render() {
    return (
      <View style={styles.main_container}>
        <FlatList
          data={this.props.films}
          keyExtractor={(item) => item.id.toString()}
            renderItem={({item, index}) => <FilmItem 
            film={item} 
            index={index}
            favoritesFilm={this.props.favoritesFilm}
            displayDetailForFilm={this._displayDetailForFilm} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
              if (this.props.loadFilms && this.props.films.length > 0 && this.props.page < this.props.totalPages) {
                  console.log('load more')
                 this.props.loadFilms()
              }
          }}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: Colors.bg
  },
  textinput: {
    marginLeft: 20,
        marginRight: 20,
        height: 50,
        backgroundColor: '#F0F0F0',
        paddingLeft: 5,
        borderRadius: 20,
        paddingLeft: 20
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps)(Search)