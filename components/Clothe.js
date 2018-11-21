// Components/Clothe.js

import React from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

class Clothes extends React.Component {
    constructor(props) {
        super(props);
    }

   
    render() {
        console.log(this.props.clothe, this.props.clothe.image);
        return (
            <View style={{width: (Layout.window.width / 3 - 1), marginBottom: 1, marginRight: 1}}>
                {/* <Text style={{ fontWeight: 'bold', fontSize: 14}}>#{this.props.index} {this.props.clothe.id}</Text> */}
                <Image style={{ flex: 1, aspectRatio: 1}} source={this.props.clothe.image} />
            </View>
        )
    }
}


export default Clothes
