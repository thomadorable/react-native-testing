import React from "react";
import { View, Platform, Text, Button, TouchableWithoutFeedback} from "react-native";
import { setData } from '../utils/datas.js'

const CustomHeader = props => {

    _logout = () => {
        setData('@Vera:user', null);
        props.navigation.navigate('AuthLoading')
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
            <Text style={{fontFamily: 'RozhaOne-Regular', fontSize: 20, textAlign: 'center'}}>
                {props.title}
            </Text>

            <View style={{backgroundColor: 'red', position: 'absolute', right: 10, bottom: 10}}>
                <TouchableWithoutFeedback onPress={this._logout}>
                    <Text title="logout">logout</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

export default CustomHeader;