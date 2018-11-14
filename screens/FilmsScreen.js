import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Search from '../components/Search'


export default class FilmsScreen extends React.Component {
  static navigationOptions = {
    title: 'Films',
  };

  render() {
    return (
        <Search navigation={this.props.navigation}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
