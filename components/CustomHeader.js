import React from "react";
import { View, Platform, Text} from "react-native";

const CustomHeader = props => {
    return (
        <View
            style={{
                height: 90,
                paddingTop: Platform.OS == "ios" ? 20 : 0,
                backgroundColor: 'white',
                alignContent: 'center',
                justifyContent: 'flex-end',
                borderBottomColor: 'lightgrey',
                borderBottomWidth: 1,
                paddingBottom: 5
            }}
        >
            <Text style={{fontFamily: 'RozhaOne-Regular', fontSize: 20, textAlign: 'center'}}>
                {props.title}
            </Text>
        </View>
    );
};

export default CustomHeader;