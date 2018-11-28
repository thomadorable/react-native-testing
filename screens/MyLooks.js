// screens/MyLooks.js

import React from 'react'
import { ScrollView, RefreshControl, StyleSheet, View, ActivityIndicator, Text, Dimensions, TouchableOpacity } from 'react-native'
// import { connect } from 'react-redux'
import Avatar from '../components/Avatar'
import Tabs from '../components/Tabs'
import Mosaic from '../components/Mosaic'
import Colors from '../constants/Colors'
import { connect } from 'react-redux'

class MyLooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            currentPage: 0,
            looks: this.props.looks
        };

        this.isLoadMoreLocker = true;

        this.props.navigation.setParams({
            scrollToTop: this._scrollToTop,
        });

        this.nb_img_per_page = 20;
    }

    componentDidMount() {
        // this._getLooks();
    }

    componentWillReceiveProps(receive){
        this.setState({
            looks: receive.looks,
        });
    }

    _onRefresh = () => {
        // this.setState({ refreshing: true });
        // TODO : refresh my looks ?
    }

    _getLooks = () => {
        // // todo : pagination
        // var looks = this.props.looks;
        // this.setState({
        //     looks: [...this.state.looks, ...looks],
        //     refreshing: false
        // });

        // setTimeout(() => {
        //     this.isLoadMoreLocker = false;
        // }, (1000));
    }

    isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - (Dimensions.get('window').height * 4);
    }

    _displayLookbook() {
        if (!this.state.refreshing) {
            return (<Mosaic clothes={this.state.looks}  navigation={this.props.navigation} />);
        }
    }

    render() {
        console.log('render my looks page')
        // TODO TOFIX : add "loader" before mount
        return (
            <View style={styles.main_container}>
                <Avatar />
                
                <Tabs navigation={this.props.navigation} currentTab={1} />

                <ScrollView
                    ref='_scrollView'
                    style={{flex: 1}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />}
                    scrollEventThrottle={300}
                    onScroll={({nativeEvent})=>{
                        if(this.isCloseToBottom(nativeEvent) && !this.state.refreshing && !this.isLoadMoreLocker) {
                            // // TODO TOFIX ne pas load à l'infini quand il n'y en a plus (eh oui)
                            // this.isLoadMoreLocker = true;

                            
                            // if (this.state.currentTab === 0) {
                            //     this._getLooks(); // TODO TOFIX sortir ça du currentab 0
                            // }
                        }
                    }}
                    >
                    {this._displayLookbook()}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.bg
    },
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

const mapStateToProps = (state) => {
    return {
        looks: state.setLooks.looks
    }
}

export default connect(mapStateToProps)(MyLooks)