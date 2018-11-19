// Components/Lookbooks.js

import React from 'react'
import { ScrollView, RefreshControl, StyleSheet, View, Button, Dimensions } from 'react-native'
// import { connect } from 'react-redux'
import Avatar from './Avatar'
import Colors from '../constants/Colors'
import { getJSON } from '../API/registerApi'
import Look from './Look'


class Lookbooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            refreshing: false,
            currentPage: 0,
            looks: []
        };

        this.props.navigation.setParams({
            scrollToTop: this._scrollToTop,
        });

        this.nb_img_per_page = 20;
    }

    _scrollToTop = () => {
        this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true});
        this.scrape(true);
    }

    componentDidMount() {
        this._getLooks();
    }

    _onRefresh = () => {
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

            // TODO TOFIX change this
            setTimeout(() => {
                this.setState({
                    isLoading: false
                })
            }, (1000));
        })
    }

    _displayLookbook() {
        if (!this.state.refreshing) {
            var looks = [];
            for (let i = 0; i < this.state.looks.length; i++) {
                const look = this.state.looks[i];
                looks.push(<Look look={look} index={i} key={i} />);
            }

            return (
                <View style={{flex: 1, paddingVertical: 20}}>
                    {looks}

                    <Button onPress={this._getLooks} title="See more" />
                </View>
            )
        }
    }

    isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - (Dimensions.get('window').height * 2);
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Avatar />
                <ScrollView
                    ref='_scrollView'
                    style={{flex: 1}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />}
                    scrollEventThrottle={300}
                    // scrollEventThrottle={15}
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

// const mapStateToProps = (state) => {
//     return {
//         Lookbooks: state.setLookbooks.Lookbooks
//     }
// }

// export default connect(mapStateToProps)(Lookbooks)
export default (Lookbooks)
