// screens/Filter.js

import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'


class Filterbtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0.1
        };

    }

    render() {
        return (
            <TouchableOpacity 
                style={[styles.filter, {marginLeft: 10}, (this.props.active === this.props.filter ? styles.focus : null)]} 
                onPress={() => {this.props.switch(this.props.filter, this.props.index)}}
            >
                <Text style={[(this.props.active === this.props.filter ? styles.focusText : null), {fontWeight: 'bold'}]}>{this.props.name}</Text>
            </TouchableOpacity>

        )
    }
}

export default Filterbtn
const styles = StyleSheet.create({
    filter: {
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        margin: 5,
        width: 130,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // height: 70,
    },
    focus: {
        backgroundColor: '#292929',
    },
    focusText: {
        color: 'white'
    }
})