// screens/Loading.js

import React, { Component } from 'react';
import {StyleSheet, View, Button } from 'react-native';
import { setData, getJSON, updateUser } from '../utils/datas.js'
import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import LoginForm from '../components/LoginForm'
import t from '../utils/translation.js';
import Colors from '../constants/Colors.js';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };

        GoogleSignin.configure();
    }

    _googleLogin = async (loginOrRegister) => {
        try {
            await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn();
            var formData = new FormData();
            formData.append('googleID', user.user.id);
            this._facebookLogin(formData, loginOrRegister);

        } catch (error) {
            console.log('error =>', error)
        }
    }

    _facebookLogin = (formData, loginOrRegister) => {
        getJSON(loginOrRegister, formData, (data) => {
            if (!data) {
                alert(t.networkNeeded);
            } else if (data.status === '200') {
                this._loginUser(data.user);
            } else {
                alert(t.noAccountFound);
            }
        });
    }

    _loginUser = (user) => {
        setData('@Vera:user', user);
        updateUser();

        this.props.navigation.navigate('AuthLoading');
    }

    _registerPage = () => {
        this.props.navigation.navigate('Register', {
            login: this._loginUser
        });
    }


    _fbTryLogin = (loginOrRegister) => {
        LoginManager.logInWithReadPermissions(["public_profile"]).then((result) => {
            if (!result.isCancelled) {
                this.fetchProfile().then((profile) => {
                    var formData = new FormData();
                    formData.append('facebookID', profile.id);
                    this._facebookLogin(formData, loginOrRegister);
                }, (error) => {
                    alert('Login fail with error')
                    console.log('rejected', error)
                });
            }
        }, (error) => {
            console.log("Login fail with error: " + error);
        });
    }

    fetchProfile = async () => {
        return new Promise((resolve, reject) => {
            const request = new GraphRequest('/me', {
                parameters: {
                    fields: {
                        string: 'email, first_name, last_name, picture.type(large)' // what you want to get
                    }
                }
            }, (error, result) => {
                if (result) {
                    resolve(result)
                } else {
                    reject(error)
                }
            })

            new GraphRequestManager().addRequest(request).start()
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <LoginForm loginUser={this._loginUser}/>

                <Button 
                    onPress={() => {
                        this._fbTryLogin('login')
                    }}
                    title={t.facebookLogin} />

                <Button 
                    title={t.googleLogin}
                    onPress={() => {
                        this._googleLogin('login');
                    }} 
                />
                <View style={{width: 200, height: 1, backgroundColor: 'black', marginVertical: 20}}></View>

                <View>
                    <Button title={t.register} onPress={this._registerPage} />
                    <Button 
                        title={t.facebookRegister}
                        onPress={() => {
                            this._fbTryLogin('register');
                        }}
                    />
                    <Button
                        title={t.googleRegister}
                        onPress={() => {
                            this._googleLogin('register');
                        }} 
                    />
                </View>
                
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
        backgroundColor: Colors.bg
    }
});

export default Login