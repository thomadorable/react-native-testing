// screens/Register.js

import React, { Component } from 'react';
import { Text, ActivityIndicator, StyleSheet, View, Image } from 'react-native';
import { connect } from 'react-redux'

class Login extends Component {
    render() {
        console.log(this.props.navigation.state.params);
        return (
            <View style={styles.container}>
                <Text>Register...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
  });



const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Login)