// Components/Clothe.js

import React from 'react'
import { Image, View } from 'react-native'
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
            <View style={{width: (Layout.window.width / 3 - 1), marginBottom: 1, marginRight: 1, backgroundColor: '#' + clothe.color}}>
                <Image style={{ flex: 1, aspectRatio: 1}} source={imageUrl} />
            </View>
        )
    }
}


export default MosaicItem
