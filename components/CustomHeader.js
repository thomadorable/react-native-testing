import React from "react";
import { View, Platform, Text, Button, TouchableWithoutFeedback} from "react-native";
import { setData } from '../utils/datas.js'
import t from '../utils/translation.js';
import { connect } from 'react-redux'

const CustomHeader = props => {
    _logout = () => {
        props.dispatch({type: "INIT_USER", value: null})
        props.navigation.navigate('AuthLoading')
    }
    _goBack = () => {
        const index = props.scene.index - 1;
        const routeName = props.scenes[index].route.routeName;
        props.navigation.navigate(routeName)
    }

    _showBack = () => {
        if (props.scenes.length > 1) {
            return (
                <View style={{position: 'absolute', left: 10, bottom: 10, zIndex: 10}}>
                    <TouchableWithoutFeedback onPress={this._goBack}>
                        <Text>back</Text>
                    </TouchableWithoutFeedback>
                </View>
            )
        }
    }

    _showLogout = () => {
        console.log(props.user)
        if (props.user && props.user.id) {
            return (
                <View style={{position: 'absolute', right: 10, bottom: 10}}>
                    <TouchableWithoutFeedback onPress={this._logout}>
                        <Text>{t.logout}</Text>
                    </TouchableWithoutFeedback>
                </View>
            )
        }
    }

    return (
        <View
            style={{
                height: 90,
                paddingTop: Platform.OS == "ios" ? 20 : 0,
                backgroundColor: 'white',
                // backgroundColor: Colors.bg,
                alignContent: 'center',
                justifyContent: 'flex-end',
                borderBottomColor: 'lightgrey',
                borderBottomWidth: 1,
                paddingBottom: 5,
            }}
        >
            {_showBack()}

            <Text style={{fontFamily: 'RozhaOne-Regular', fontSize: 20, textAlign: 'center'}}>
                {props.title}
            </Text>

            {_showLogout()}
        </View>
    );
};

const mapStateToProps = state => {
    return {
        user: state.setUser.user,
    }
}

export default connect(mapStateToProps)(CustomHeader)