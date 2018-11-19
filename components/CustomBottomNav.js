import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'

class CustomBottomNav extends React.Component {
    constructor(props) {
        super(props);
        lastTap = null;
    }
    
    _press = () => {
        const now = Date.now();
        if (this.lastTap && (now - this.lastTap) < 300) {
            console.log('double tap !!!');
        } else {
            this.lastTap = now;
            this.props.onPress();
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback 
                onPress={this._press}    
            >
                <View style={{flex: 1, width: '100%'}}>
                    {this.props.children}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default CustomBottomNav;

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'column',
        marginBottom: 30
    }
})