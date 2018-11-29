// screens/Filter.js

import React from 'react'
import { StyleSheet, View, Picker, Text} from 'react-native'
import Colors from '../constants/Colors'
import Avatar from '../components/Avatar'

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFilter: 'normal'
        };

    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 1000);
    }

    render() {
        var currentFilter = this.state.currentFilter;
        return (
            <View style={styles.main_container}>
                <Avatar />

                <Text>
                    Filter : {currentFilter}
                </Text>

                <Picker
                    selectedValue={currentFilter}
                    style={{ height: 30, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({currentFilter: itemValue})}>
                        <Picker.Item label="vintage" value="Vintage" />
                        <Picker.Item label="lomo" value="Lomo" />
                        <Picker.Item label="clarity" value="Clarity" />
                        <Picker.Item label="sinCity" value="Sin City" />
                        <Picker.Item label="sunrise" value="Sunrise" />
                        <Picker.Item label="crossProcess" value="Cross Process" />
                        <Picker.Item label="orangePeel" value="Orange Peel" />
                        <Picker.Item label="love" value="Love" />
                        <Picker.Item label="grungy" value="Grungy" />
                        <Picker.Item label="jarques" value="Jarques" />
                        <Picker.Item label="pinhole" value="Pinhole" />
                        <Picker.Item label="oldBoot" value="Old Boot" />
                        <Picker.Item label="glowingSun" value="Glowing Sun" />
                        <Picker.Item label="hazyDays" value="Hazy Days" />
                        <Picker.Item label="herMajesty" value="Her Majesty" />
                        <Picker.Item label="nostalgia" value="Nostalgia" />
                        <Picker.Item label="hemingway" value="Hemingway" />
                        <Picker.Item label="concentrate" value="Concentrate" />
                </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.bg
    }
})

export default Filter
