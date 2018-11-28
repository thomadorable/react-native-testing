// screens/Filter.js

import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native'
import Colors from '../constants/Colors'


class FilterPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0
        };

    }

    render() {
        return (
            <TouchableWithoutFeedback 
                onPressIn={() => {
                    this.setState({
                        opacity: 1
                    })
                }} 
                onPressOut={() => {
                    this.setState({
                        opacity: 0
                    })
                }}
            >
                <View style={{backgroundColor: 'red', width: 100, position: 'absolute', top: 0, opacity: this.state.opacity, zIndex: 10}}>
                    <Image style={{width: 100, aspectRatio: 1}} source={this.props.image} />
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default FilterPreview
