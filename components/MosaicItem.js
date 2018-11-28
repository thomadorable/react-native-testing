// Components/Clothe.js

import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import Layout from '../constants/Layout'

class MosaicItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const clothe = this.props.clothe;
        let imageUrl = clothe.image;
        if (clothe.thumb) {
            imageUrl = {
                uri: clothe.thumb
            }
        }

        return (
            <TouchableOpacity 
                style={{width: (Layout.window.width / 3 - 1), marginBottom: 1, marginRight: 1, backgroundColor: '#' + clothe.color}}
                onPress={() => {
                    this.props.navigation.navigate('Filter', {
                        image: imageUrl
                    })
                    console.log()
                }}
            >
                <Image style={{ flex: 1, aspectRatio: 1}} source={imageUrl} />
            </TouchableOpacity>
        )
    }
}


export default MosaicItem
