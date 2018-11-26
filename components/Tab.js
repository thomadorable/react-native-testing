// screens/MyLooks.js

import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

class Tab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity 
                onPress={() => {
                    this.props.switchTab(this.props.index)
                }}
                style={[styles.tab, this.props.currentTab === this.props.index ? styles.activeTab : null]}
            >
                <View style={styles.shadow}>
                    <Text style={[styles.tabText, this.props.currentTab === this.props.index ? styles.activeText : null]}>
                        {this.props.name}
                    </Text>
                </View>
                
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        margin: 5,
        backgroundColor: Colors.bg,
        shadowColor: '#a3a3a5',
        shadowOffset: { width: -3, height: -3 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'white',
        backgroundColor: '#FAFAFA'
    },
    tabText: {
        fontFamily: 'LydianBT-Roman',
        fontSize: 17,
        textAlign: 'center',
        letterSpacing: 0.2,
        color: '#393939'
    },
    activeTab: {
        backgroundColor: 'white',
        zIndex: 1,
    },
    activeText: {
        color: 'black',
    },
    shadow: {
        padding: 12,
        shadowColor: '#a3a3a5',
        shadowOffset: { height: -10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        backgroundColor: '#FAFAFA'
    }
})



export default Tab