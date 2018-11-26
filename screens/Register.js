// screens/Register.js

import React, { Component } from 'react';
import { Text, TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import Layout from '../constants/Layout'
import { getJSON } from '../utils/datas.js'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleSubmit = () => {
        var formData = new FormData();
        formData.append('firstname', this.state.firstname);
        formData.append('lastname', this.state.lastname);
        formData.append('mail', this.state.mail);
        formData.append('password', this.state.password);

        getJSON('register', formData, (data) => {
            console.log(data);
            if (!data) {
                alert('Connexion internet requise');
            } else if (data.status === '200') {
                console.log('register ok');
                this.props.navigation.state.params.login(data.user);
            } else {
                alert("Cette adresse n'est associée à aucun compte Vera.");
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontWeight: 'bold', marginBottom: 20, fontSize: 20 }}>
                    Inscription
                </Text>
                <TextInput
                    ref={(input) => { this.firstnameInput = input; }}
                    style={Layout.input}
                    placeholder="Prénom"
                    textContentType="name"
                    returnKeyType="next"
                    onSubmitEditing={() => { this.lastnameInput.focus(); }}
                    blurOnSubmit={false}
                    onChangeText={(firstname) => this.setState({ firstname })}
                />
                <TextInput
                    ref={(input) => { this.lastnameInput = input; }}
                    style={Layout.input}
                    placeholder="Nom"
                    textContentType="familyName"
                    returnKeyType="next"
                    onSubmitEditing={() => { this.loginInput.focus(); }}
                    blurOnSubmit={false}
                    onChangeText={(lastname) => this.setState({ lastname })}
                />


                <TextInput
                    ref={(input) => { this.loginInput = input; }}
                    style={Layout.input}
                    placeholder="Adresse e-mail"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() => { this.passwordInput.focus(); }}
                    blurOnSubmit={false}
                    onChangeText={(mail) => this.setState({ mail })}
                />
                <TextInput
                    ref={(input) => { this.passwordInput = input; }}
                    style={Layout.input}
                    textContentType="password"
                    placeholder="Mot de passe"
                    secureTextEntry={true}
                    returnKeyType="send"
                    onSubmitEditing={() => { this.confirmPasswordInput.focus(); }}
                    onChangeText={(password) => this.setState({ password })}
                />

                <TextInput
                    ref={(input) => { this.confirmPasswordInput = input; }}
                    style={Layout.input}
                    textContentType="password"
                    placeholder="Confirmer le mot de passe"
                    secureTextEntry={true}
                    returnKeyType="send"
                    onSubmitEditing={this.handleSubmit}
                    onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                />
                <TouchableOpacity onPress={this.handleSubmit}>
                    <Text>Inscription</Text>
                </TouchableOpacity>
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

export default Login;