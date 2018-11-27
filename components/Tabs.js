// screens/MyLooks.js

import React from 'react'
import { StyleSheet, View } from 'react-native'
import Tab from './Tab'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import t from '../utils/translation.js';

class Tabs extends React.Component {
    constructor(props) {
        super(props);
    }

    switchTab = (indexTab) => {
        ReactNativeHapticFeedback.trigger('impactLight', true);

        console.log('switching to : ', indexTab);

        if(indexTab === 0) {
            this.props.navigation.navigate('Lookbook');
        } else {
            this.props.navigation.navigate('MyLooks');
        }
    }

    render() {
        return (
            <View style={styles.tab_container}>
                <Tab index={0} name="Lookbook" switchTab={this.switchTab} currentTab={this.props.currentTab}/>
                <Tab index={1} name={t.page.title.looks} switchTab={this.switchTab} currentTab={this.props.currentTab}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tab_container : {
        flexDirection: 'row',
        margin: 10
    }
})



export default Tabs