// Components/Mosaic.js

import React from 'react'
import { View } from 'react-native'
import MosaicItem from './MosaicItem'

class Mosaic extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var clothes = [];
        for (let i = 0; i < this.props.clothes.length; i++) {
            const clothe = this.props.clothes[i];
            clothes.push(<MosaicItem clothe={clothe} index={i} key={i}/>);
        }

        return (
            <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 20}}>
                {clothes}
            </View>
        )
    }
}


export default Mosaic
