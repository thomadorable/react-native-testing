// Components/Lookbooks.js

import React from 'react'
import { ScrollView, RefreshControl, StyleSheet, View, Text, FlatList, Button } from 'react-native'
// import { connect } from 'react-redux'
import Avatar from './Avatar'
import Colors from '../constants/Colors'
import { getJSON } from '../API/registerApi'
import Look from './Look'


class Lookbooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            currentPage: 0,
            looks: []
        };

        this.looks = [];
        this.nb_img_per_page = 20;
    }

    componentDidMount() {
        this._getLooks();
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 1000);
    }

    _loadLooks = () => {
        const current_index = (this.state.currentPage * this.nb_img_per_page);
        const added_looks = this.looks.slice(current_index, current_index + this.nb_img_per_page);

        console.log('from', current_index, 'to', current_index + this.nb_img_per_page)

        // TODO TOFIX check it left more than nb_img_per_page to load
        this.setState({
            looks: [...this.state.looks, ...added_looks],
            currentPage : this.state.currentPage + 1
        });
    }

    _getLooks = () => {
        getJSON('insta', null, (looks) => {
            this.looks = looks;

            console.log('nb looks =>', looks.length);


            this.setState({
                currentPage: 0,
                isLoading: false,
            }, this._loadLooks)
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
                </View>
            )
        }
    }

    isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
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
                    scrollEventThrottle={15}
                    onScroll={({nativeEvent})=>{
                        if(this.isCloseToBottom(nativeEvent)){
                            alert('bottom !');
                        }
                    }}
                    >
                    {this._displayLookbook()}
                    <Button onPress={this._loadLooks} title="See more" />
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
