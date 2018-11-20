// Components/Lookbooks.js

import React from 'react'
import { ScrollView, RefreshControl, StyleSheet, View, Button, Text, Dimensions, TouchableOpacity } from 'react-native'
// import { connect } from 'react-redux'
import Avatar from './Avatar'
import Colors from '../constants/Colors'
import { getJSON } from '../API/registerApi'
import Look from './Look'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

class Lookbooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            refreshing: false,
            currentPage: 0,
            looks: [],
            currentTab: 0
        };

        this.props.navigation.setParams({
            scrollToTop: this._scrollToTop,
        });

        this.nb_img_per_page = 20;
    }

    _scrollToTop = () => {
        this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true});
    }

    componentDidMount() {
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
            console.log('nb looks =>', looks.length);

            this.setState({
                looks: [...this.state.looks, ...looks],
                currentPage: this.state.currentPage + 1,
                refreshing: false
            });

            setTimeout(() => {
                this.setState({
                    isLoading: false
                })
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
            looks.push(<Look look={look} index={i} key={i} />);
        }

        return (
            <View style={{flex: 1}}>
                {looks}
            </View>
        )
    }

    switchTab = (indexTab) => {
        this.setState({
            currentTab: indexTab
        })
    }

    _showTabs() {
        return (
            <View style={styles.tab_container}>
                <TouchableOpacity 
                    onPress={() => {
                        this.switchTab(0)
                    }}
                    style={[styles.tab, this.state.currentTab === 0 ? styles.activeTab : null]}
                >
                    <Text style={styles.tabText}>Lookbooks</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {
                        this.switchTab(1)
                    }}
                    style={[styles.tab, this.state.currentTab === 1 ? styles.activeTab : null]}
                >
                    <Text style={styles.tabText}>Mes looks</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _showMyLooksOrLookbooks = () => {
        if (this.state.currentTab === 0) {
            return (
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
                        if(this.isCloseToBottom(nativeEvent) && !this.state.refreshing && !this.state.isLoading) {
                            console.log('load more !!')
                            this.setState({
                                isLoading: true
                            })

                            this._getLooks();
                            this.scrape(false);
                        }
                    }}
                    >
                    {this._displayLookbook()}
                </ScrollView>
            )
        } else {
            return (
                <Text>Mes looks !</Text>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Avatar />
                
                {this._showTabs()}

                {this._showMyLooksOrLookbooks()}
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

// const mapStateToProps = (state) => {
//     return {
//         Lookbooks: state.setLookbooks.Lookbooks
//     }
// }

// export default connect(mapStateToProps)(Lookbooks)
export default (Lookbooks)
