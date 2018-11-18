// Components/Clothe.js

import React from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import Colors from '../constants/Colors'

class Clothes extends React.Component {
    constructor(props) {
        super(props);
    }

   
    render() {
        console.log(this.props.clothe, this.props.clothe.image);
        return (
            <View style={{width: '50%', padding: 10}}>
                <Text style={{ fontWeight: 'bold', fontSize: 14}}>#{this.props.index} {this.props.clothe.id}</Text>
                <Image style={{ flex: 1, marginTop: 5, height: 200}} source={this.props.clothe.image} />
            </View>
        )
    }
}


export default Clothes
