import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { LoginManager, GraphRequest, GraphRequestManager, AccessToken } from "react-native-fbsdk";

export default class FBLoginButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: null
        };

        LoginManager.logOut();
    }

    _updateToken = () => {
        // AccessToken.getCurrentAccessToken().then((data) => {
        //     this.setState({
        //         token: data
        //     })
        // });
    }

    _fbTryLogin = () => {
        LoginManager.logInWithReadPermissions(["public_profile"]).then((result) => {
            if (result.isCancelled) {
                console.log("Login cancelled");
            } else {
                this.fetchProfile().then((profile) => {
                    var formData = new FormData();
                    formData.append('facebookID', profile.id);
                    this.props.login(formData);
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
            const request = new GraphRequest('/me',
                {
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
                }
            )

            new GraphRequestManager().addRequest(request).start()
        })
    }

    render() {
        return (
            <View>
                <Button onPress={this._fbTryLogin} title="ou sinon : facebook login" />
            </View>
        );
    }
};

module.exports = FBLoginButton;