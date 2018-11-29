// screens/Filter.js

import React from 'react'
import { StyleSheet, View, Picker, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView} from 'react-native'
import Colors from '../constants/Colors'
import Avatar from '../components/Avatar'
import FilterPreview from '../components/FilterPreview'
import Filterbtn from '../components/Filterbtn'
import { getFilter } from '../API/filters.js'

class Filter extends React.Component {
    constructor(props) {
        super(props);
        defaultImage = this.props.navigation.state.params.image;

        this.state = {
            currentFilter: 'normal',
            isFilterLoading: false,
            image: defaultImage
        };

        getFilter('vintage', defaultImage.uri, (photo) => {
            console.log('>>>>>>>>>>', photo)
        })
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
                <View style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size='large' color="white" />
                </View>
            )
        }
    }

    _switchFilter =  (itemValue, index) => {
        if (!this.state.isFilterLoading) {

            this.refs._scrollView.scrollTo({x: (146 * index - 114), y: 0, animated: true});
            
            this.setState({
                currentFilter: itemValue,
                isFilterLoading: true
            });

            getFilter(itemValue, null, (photo) => {

                console.log('get : ', photo)
                var imageUrl = defaultImage;
                if (photo.status === 200) {
                    imageUrl = {uri: photo.output};
                }

                this.setState({
                    currentFilter: itemValue,
                    isFilterLoading: false,
                    image: imageUrl
                });

            })
        }
    }

    _showFilters = () => {
        var filters = ['Normal', 'Vintage', 'Lomo', 'Clarity', 'Sin City', 'Sunrise', 'Cross Process', 'Orange Peel', 'Love', 'Grungy', 'Jarques', 'Pinhole', 'Old Boot', 'Glowing Sun', 'Hazy Days', 'Her Majesty', 'Nostalgia', 'Hemingway', 'Concentrate'];
        var filtersNode = [];
        for (let i = 0, l = filters.length; i < filters.length; i++) {
            const filter = filters[i];
            const key = filter[0].toLowerCase() + filter.slice(1).replace(' ', '');
            console.log(key)
            filtersNode.push(<Filterbtn key={'filter_btn_' + i} index={i} filter={key} name={filter} switch={this._switchFilter} active={this.state.currentFilter}/>);
        }

        return filtersNode;
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Avatar />

                <View style={{position: 'relative', marginTop: 30}}>
                    <FilterPreview image={defaultImage}/>
                    <Image source={this.state.image} style={{width: '100%', aspectRatio: 1}}/>

                    {this._showLoader()}
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
    }
})

export default Filter
