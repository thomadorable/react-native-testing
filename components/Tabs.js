// Components/MyLooks.js

import React from 'react'
import { ScrollView, RefreshControl, StyleSheet, View, ActivityIndicator, Text, Dimensions, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'

class Tabs extends React.Component {
    constructor(props) {
        super(props);
    }

    switchTab = (indexTab) => {
        if(indexTab === 0) {
            this.props.navigation.navigate('Lookbook');
        } else {
            this.props.navigation.navigate('MyLooks');
        }
    }

    _showTab(indexTab, name) {
        return (
            <TouchableOpacity 
                onPress={() => {
                    this.switchTab(indexTab)
                }}
                style={[styles.tab, this.props.currentTab === indexTab ? styles.activeTab : null]}
            >
                <Text style={styles.tabText}>{name}</Text>
            </TouchableOpacity>
        )
    }


    render() {
        return (
            <View style={styles.tab_container}>
                {this._showTab(0, 'Lookbook')}
                {this._showTab(1, 'Mes looks')}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        padding: 12,
        margin: 10,
        backgroundColor: Colors.bg,
        shadowColor: '#a3a3a5',
        shadowOffset: { width: -2, height: -5 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'white'
    },
    tabText: {
        fontFamily: 'LydianBT-Roman',
        fontSize: 17,
        textAlign: 'center',
        letterSpacing: 0.2
    },
    tab_container : {
        flexDirection: 'row',
        margin: 10
    }, 
    activeTab: {
        borderColor: '#a3a3a5',
    }
})



export default Tabs