// screens/Filter.js

import React from 'react'
import { StyleSheet, TouchableOpacity, Text, ImageBackground, View } from 'react-native'


class Filterbtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0.1
        };

    }

    _imageOrText = (image, isActive) => {
        return image ? (
            <ImageBackground
                style={[styles.filter, (isActive ? styles.focus : null)]} 
                source={{uri: image}}
            ></ImageBackground>
        ) : (
            <View
                style={[styles.filter, (isActive ? styles.focus : null)]} 
            >
                <Text style={[(isActive ? styles.focusText : null), {fontWeight: 'bold'}]}>{this.props.name}</Text>
            </View>
        )
    }

    render() {
        const image = (typeof (this.props.image) !== 'undefined') ? this.props.image.uri : null;
        const isActive = this.props.active === this.props.filter;
        return (
            <TouchableOpacity 
                style={{borderRadius: 5, overflow: 'hidden', flex: 1, backgroundColor: 'red', margin: 5, marginLeft: 10}}
                onPress={() => {this.props.switch(this.props.filter, this.props.index)}}
            >
                {this._imageOrText(image, isActive)}
            </TouchableOpacity>

        )
    }
}

export default Filterbtn
const styles = StyleSheet.create({
    filter: {
        flex: 1,
        backgroundColor: 'lightgrey',
        width: 130,
        // height: 70,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    focus: {
        backgroundColor: '#292929',
    },
    focusText: {
        color: 'white'
    }
})