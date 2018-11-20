// Components/Clothes.js

import React from 'react'
import { ScrollView, RefreshControl, StyleSheet, View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Avatar from './Avatar'
import Colors from '../constants/Colors'
import Clothe from './Clothe'


class Clothes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };

        console.log('loaded clothes =>', this.props.clothes);
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 1000);
    }

    _displayClothes() {
        if (!this.state.refreshing) {

            var clothes = [];
            for (let i = 0; i < this.props.clothes.length; i++) {
                const clothe = this.props.clothes[i];
                clothes.push(<Clothe clothe={clothe} index={i} key={i}/>);
            }

            return (
                <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10}}>
                    {clothes}
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Avatar />
                <ScrollView
                    style={{flex: 1}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />}
                    >
                    {this._displayClothes()}
                </ScrollView>
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

const mapStateToProps = (state) => {
    return {
        clothes: state.setClothes.clothes
    }
}

export default connect(mapStateToProps)(Clothes)
