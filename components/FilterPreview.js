// screens/Filter.js

import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native'
import Layout from '../constants/Layout'


class FilterPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0.1
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
                        opacity: 0.1
                    })
                }}
            >
                <Image style={{width: Layout.window.width, height: Layout.window.width, opacity: this.state.opacity, position: 'absolute', top: 0, zIndex: 10}} source={this.props.image} />
            </TouchableWithoutFeedback>
        )
    }
}

export default FilterPreview
