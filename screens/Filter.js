// screens/Filter.js

import React from 'react'
import { StyleSheet, View, Animated, Easing, Image, ActivityIndicator, Text, ScrollView, TouchableWithoutFeedback} from 'react-native'
import Colors from '../constants/Colors'
import Avatar from '../components/Avatar'
import Filterbtn from '../components/Filterbtn'
import { getFilter } from '../API/filters.js'
import Layout from '../constants/Layout'

class Filter extends React.Component {
    constructor(props) {
        super(props);
        defaultImage = this.props.navigation.state.params.image;

        this.state = {
            currentFilter: 'normal',
            isFilterLoading: false,
            image: defaultImage,
            opacity: 1,
            filters: {
                normal: defaultImage
            }
        };

        getFilter('vintage', defaultImage.uri, (photo) => {
            console.log('init image filter', photo)
        });

        this.anim_switch = new Animated.Value(1);
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 1000);
    }

    _showLoader = () => {
        if (this.state.isFilterLoading) {
            return (
                <View style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', zIndex: 12}}>
                    <ActivityIndicator size='large' color="white" />
                </View>
            )
        }
    }

    _switchFilter =  (filerName, index) => {
        if (!this.state.isFilterLoading) {

            Animated.timing(
                this.anim_switch, {
                    toValue: 0,
                    duration: 300,
                    easing: Easing.ease
                }
            ).start();

            this.refs._scrollView.scrollTo({x: (146 * index - 114), y: 0, animated: true});
            this.setState({
                currentFilter: filerName,
                isFilterLoading: true
            });

            if (this.state.filters[filerName]) {
                this._showNewFilter(this.state.filters[filerName], filerName);
            } else {
                console.log('ajax !!!')
                getFilter(filerName, null, (photo) => {
                    var imageUrl = defaultImage;
                    if (photo.status === 200) {
                        imageUrl = {uri: photo.output};
                        let stateFilters = this.state.filters;
                        stateFilters[filerName] = imageUrl;

                        this.setState({
                            filters: stateFilters
                        })
                    }
    
                    this._showNewFilter(imageUrl, filerName);
                })
            }
        }
    }

    _showNewFilter = (image, filter) => {
        this.setState({
            currentFilter: filter,
            image: image
        });
    }

    _showFilters = () => {
        var filters = ['Normal', 'Vintage', 'Lomo', 'Clarity', 'Sin City', 'Sunrise', 'Cross Process', 'Orange Peel', 'Love', 'Grungy', 'Jarques', 'Pinhole', 'Old Boot', 'Glowing Sun', 'Hazy Days', 'Her Majesty', 'Nostalgia', 'Hemingway', 'Concentrate'];


        var filtersNode = [];
        for (let i = 0, l = filters.length; i < filters.length; i++) {
            const filter = filters[i];
            const key = filter[0].toLowerCase() + filter.slice(1).replace(' ', '');

            filtersNode.push(<Filterbtn key={'filter_btn_' + i} index={i} filter={key} name={filter} switch={this._switchFilter} active={this.state.currentFilter} image={this.state.filters[key]} />);
        }

        return filtersNode;
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Avatar />

                <View style={{position: 'relative', marginTop: 30}}>
                    <Animated.View style={{opacity: this.anim_switch, width: '100%', height: '100%', position: 'absolute', top: 0, zIndex: 10}}>
                        <TouchableWithoutFeedback 
                            onPressIn={() => {
                                this.setState({
                                    opacity: 0
                                })
                            }} 
                            onPressOut={() => {
                                this.setState({
                                    opacity: 1
                                })
                            }}
                        >
                            <Image 
                                onLoad={() => {
                                    this.setState({
                                        isFilterLoading: false,
                                    });

                                    Animated.timing(
                                        this.anim_switch, {
                                            toValue: 1,
                                            duration: 300,
                                            easing: Easing.ease
                                        }
                                    ).start();
                                }}
                                style={[styles.picture, {opacity: this.state.opacity}]} 
                                source={this.state.image} />
                        </TouchableWithoutFeedback>

                    </Animated.View>
                        {this._showLoader()}

                    <Image source={defaultImage} style={{width: '100%', aspectRatio: 1}}/>

                </View>

                <ScrollView ref='_scrollView' horizontal={true} style={{paddingHorizontal: 5, marginVertical: 25}}>
                    {this._showFilters()}
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
    picture: {width: Layout.window.width, height: Layout.window.width}
})

export default Filter
