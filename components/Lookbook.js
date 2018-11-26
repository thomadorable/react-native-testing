// Components/Lookbooks.js

import React from 'react'
import { ScrollView, RefreshControl, StyleSheet, View, ActivityIndicator, Text, Dimensions, Animated, Easing } from 'react-native'
// import { connect } from 'react-redux'
import Avatar from './Avatar'
import Tabs from './Tabs'
import Colors from '../constants/Colors'
import { getJSON } from '../utils/datas.js'
import Look from './Look'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { connect } from 'react-redux'

class Lookbooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            currentPage: 0,
            looks: []
        };

        this.preLoadOpacity = new Animated.Value(0);
        this.isPreLoad = true;

        this.isLoadMoreLocker = true;

        this.props.navigation.setParams({
            scrollToTop: this._scrollToTop,
        });

        this.nb_img_per_page = 20;
    }

    _scrollToTop = () => {
        this.props.navigation.navigate('Lookbook');
        this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true});
    }

    componentWillMount() {
        this._getLooks();
    }

    _onRefresh = () => {
        ReactNativeHapticFeedback.trigger('impactLight', true);
        this.setState({ refreshing: true });
        this.scrape(true);
    }

    scrape = (isReloaded) => {
        getJSON('generate', null, (looks) => {
            console.log('generated : ', looks);

            if (isReloaded) {
                this.setState({
                    currentPage: 0,
                    looks: [],
                }, this._getLooks)
            }
        })
    }

    _getLooks = () => {
        const data = new FormData();
        data.append('page', this.state.currentPage);

        getJSON('insta', data, (looks) => {
            if (this.isPreLoad) {
                this.isPreLoad = false;
            }

            if (looks) {
                this.setState({
                    looks: [...this.state.looks, ...looks],
                    currentPage: this.state.currentPage + 1,
                    refreshing: false
                }, () => {
                    Animated.timing(
                        this.preLoadOpacity, {
                            toValue: 1,
                            duration: 300,
                            easing: Easing.linear
                        }
                    ).start();
                });
            }

            setTimeout(() => {
                this.isLoadMoreLocker = false;
            }, (1000));
        })
    }

    isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - (Dimensions.get('window').height * 4);
    }

    _displayLookbook() {
        var looks = [];
        for (let i = 0; i < this.state.looks.length; i++) {
            const look = this.state.looks[i];
            looks.push(<Look look={look} index={i} key={i} tab={0}/>);
        }

        return (
            <Animated.View style={{flex: 1, opacity: this.preLoadOpacity}}>
                {looks}
            </Animated.View>
        )
    }


    _preLoad() {
        if (this.isPreLoad) {
            return(
                <View style={{flex: 0.8, justifyContent: 'flex-end'}}>
                    <ActivityIndicator size='small' color="#494949" />
                </View>
            )
        }
    }

    render() {
        console.log('render lookbook page', this.isPreLoad)
        return (
            <View style={styles.main_container}>
                <Avatar />
                
                <Tabs navigation={this.props.navigation} currentTab={0} />

                {this._preLoad()}

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
                            // TODO TOFIX ne pas load à l'infini quand il n'y en a plus (eh oui)
                            this.isLoadMoreLocker = true;

                            this._getLooks(); 
                            this.scrape(false);
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
    }
})

const mapStateToProps = (state) => {
    return {
        looks: state.setLooks.looks
    }
}

export default connect(mapStateToProps)(Lookbooks)