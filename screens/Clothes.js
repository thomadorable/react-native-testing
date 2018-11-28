// screens/Clothes.js

import React from 'react'
import { ScrollView, RefreshControl, StyleSheet, View, Text, Slider, Image } from 'react-native'
import { connect } from 'react-redux'
import Avatar from '../components/Avatar'
import Mosaic from '../components/Mosaic'
import Colors from '../constants/Colors'


import {
  Grayscale,
  Sepia,
  Tint,
  ColorMatrix,
  concatColorMatrices,
  invert,
  contrast,
  saturate,
  Vintage,
Browni,
Kodachrome,
ToBGR,
Polaroid,
Technicolor
} from 'react-native-color-matrix-image-filters';

class Clothes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 1000);
    }

    _displayClothes() {
        if (!this.state.refreshing) {
            return (<Mosaic clothes={this.props.clothes} navigation={this.props.navigation} />);
        }
    }

    render() {

        var img = (<Image style={{width: '100%', aspectRatio: 1}} source={{uri: 'https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg'}} />);
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


                    // {img}

                    // <Vintage >{img}</Vintage>
                    // <Kodachrome >{img}</Kodachrome>
                    // <ToBGR >{img}</ToBGR>
                    // <Technicolor >{img}</Technicolor>

// cools :
// Vintage
// Lsd
// Kodachrome
// ToBGR
// Technicolor

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
