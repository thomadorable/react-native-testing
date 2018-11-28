// screens/Filter.js

import React from 'react'
import { ScrollView, RefreshControl, StyleSheet, View, TouchableWithoutFeedback, Slider, Image, Text} from 'react-native'
import Avatar from '../components/Avatar'
import Colors from '../constants/Colors'


import {
    ColorMatrix,
    concatColorMatrices,
    saturate,
    sepia,
    brightness,
    contrast,
    temperature,
    tint,
    threshold
} from 'react-native-color-matrix-image-filters';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            saturate: 1,
            sepia: 0,
            bright: 1,
            contrast: 1,
            temperature: 0,
            tint: 0,
            opacity: 0
        };

    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 1000);
    }


    render() {
        var img = (<Image style={{width: '100%', aspectRatio: 1}} source={this.props.navigation.state.params.image} />);
        return (
            <View style={styles.main_container}>
                <Avatar />

                <View>
                    <ColorMatrix
                        matrix={concatColorMatrices([
                            saturate(this.state.saturate), 
                            sepia(this.state.sepia),
                            brightness(this.state.bright),
                            contrast(this.state.contrast),
                            temperature(this.state.temperature),
                            tint(this.state.tint)
                        ])}
                    >
                        {img}
                    </ColorMatrix>
                </View>

                <TouchableWithoutFeedback 
                    onPressIn={() => {
                        console.log('press in')
                        this.setState({
                            opacity: 1
                        })
                    }} 
                    onPressOut={() => {
                        console.log('press out')
                        this.setState({
                            opacity: 0
                        })
                    }}
                >
                    <View style={{backgroundColor: 'red', width: '100%', position: 'absolute', top: 60, opacity: this.state.opacity, zIndex: 10}}>
                        {img}
                    </View>
                </TouchableWithoutFeedback>

                <ScrollView
                    style={{flex: 1}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />}
                    >

                    <Text style={{marginTop: 10}}>Saturation {this.state.saturate}</Text>
                    <Slider
                        maximumValue={3}
                        minimumValue={0}
                        onValueChange={(saturate) => this.setState({ saturate })}
                        value={this.state.saturate}
                    />

                    <Text style={{marginTop: 10}}>Luminosité {this.state.bright}</Text>
                    <Slider
                        maximumValue={1.5}
                        minimumValue={0}
                        onValueChange={(bright) => this.setState({ bright })}
                        value={this.state.bright}
                    />

                    <Text style={{marginTop: 10}}>Contraste {this.state.contrast}</Text>
                    <Slider
                        maximumValue={2}
                        minimumValue={0.2}
                        onValueChange={(contrast) => this.setState({ contrast })}
                        value={this.state.contrast}
                    />

                    <Text style={{marginTop: 10}}>Température {this.state.temperature}</Text>
                    <Slider
                        maximumValue={1}
                        minimumValue={-1}
                        onValueChange={(temperature) => this.setState({ temperature })}
                        value={this.state.temperature}
                    />

                    <Text style={{marginTop: 10}}>Teinte {this.state.tint}</Text>
                    <Slider
                        maximumValue={1}
                        minimumValue={-1}
                        onValueChange={(tint) => this.setState({ tint })}
                        value={this.state.tint}
                    />

                        <Text style={{marginTop: 10}}>Sepia {this.state.sepia}</Text>
                    <Slider
                        maximumValue={1}
                        minimumValue={0}
                        onValueChange={(sepia) => this.setState({ sepia })}
                        value={this.state.sepia}
                    />

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

export default Filter
