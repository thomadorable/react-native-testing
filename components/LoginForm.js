// screens/MyLooks.js

import React from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import Layout from '../constants/Layout'
import { getJSON } from '../utils/datas.js'
import t from '../utils/translation.js';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleSubmit = () => {
        if (!this.state.isLoading) {
            this.setState({
                isLoading: true
            });

            var formData = new FormData();
            formData.append('mail', this.state.mail);
            formData.append('password', this.state.password);
    
            getJSON('login', formData, (data) => {
                this.setState({
                    isLoading: false
                });

                console.log('submit : ', data)
                if (!data) {
                    alert(t.networkNeeded)
                } else if (data.status === '200') {
                    this.props.loginUser(data.user);
                } else {
                    alert(t.wrongCredentials);
                }
            });
        }
    }

    render() {
        return (
            <View>
                <Text style={{ fontWeight: 'bold', marginBottom: 20, fontSize: 20 }}>
                    Connexion
                </Text>
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
                    onSubmitEditing={this.handleSubmit}
                    onChangeText={(password) => this.setState({ password })}
                />
                <Button 
                    title={t.login}
                    onPress={this.handleSubmit} 
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tab_container : {
        flexDirection: 'row',
        margin: 10
    }
})



export default LoginForm