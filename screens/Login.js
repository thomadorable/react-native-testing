// screens/Loading.js

import React, { Component } from 'react';
import { TextInput, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { loginFbUser, loginMailUser } from '../API/registerApi'
import { setData, updateUser } from '../utils/datas.js'

import Form from 'react-native-form'

var FBLoginButton = require('../components/FBLoginButton');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    _loginUser = (user) => {
        console.log('connexion à ', user);
        setData('@Vera:user', user);
        updateUser();

        this.props.navigation.navigate('AuthLoading');
    }

    _login = (profile) => {
        loginFbUser(profile.id, (data) => {
            if (!data) {
                alert('Connexion internet requise');
            } else if(data.status === '200') {
                this._loginUser(data.user);
            } else {
                alert("Ce compte Facebook n'est associé à aucun compte Vera.");
            }
        });
    }


    handleSubmit = () => {
        loginMailUser ({
            mail: this.state.mail,
            password: this.state.password
        }, (data) => {
            console.log('submit : ', data)
            if (!data) {
                alert('Connexion internet requise')
            } else if(data.status === '200') {
                this._loginUser(data.user);
            } else {
                alert("Les identifiants ne sont pas corrects.");
            }
        });
    }

    _loginForm = () => {
        return (
            <View>
                <Text style={{fontWeight: 'bold', marginBottom: 20, fontSize: 20}}>
                    Connexion
                    </Text>
                <TextInput
                    ref={(input) => { this.loginInput = input; }}
                    style={styles.input}
                    placeholder="Adresse e-mail"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() => { this.passwordInput.focus(); }}
                    blurOnSubmit={false}
                    onChangeText={(mail) => this.setState({mail})}
                />
                <TextInput
                    ref={(input) => { this.passwordInput = input; }}
                    style={styles.input}
                    textContentType="password"
                    placeholder="Mot de passe"
                    secureTextEntry={true}
                    returnKeyType="send"
                    onSubmitEditing={this.handleSubmit}
                    onChangeText={(password) => this.setState({password})}
                />
                <TouchableOpacity onPress={this.handleSubmit}>
                    <Text>Connexion</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this._loginForm()}
                <FBLoginButton login={this._login}/>
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
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 250,
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10
    }
  });



const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Login)