// screens/Filter.js

import React from 'react'
import { StyleSheet, View, Picker, Text} from 'react-native'

// Filters
import {Surface} from "gl-react-native";
import GLImage from "gl-react-image";

import Amaro from '../components/filters/Amaro'
import Brannan from '../components/filters/Brannan';
import Earlybird from '../components/filters/Earlybird';
import F1977 from '../components/filters/F1977';
import Hefe from '../components/filters/Hefe';
import Hudson from '../components/filters/Hudson';
import Inkwell from '../components/filters/Inkwell';
import Lokofi from '../components/filters/Lokofi';
import LordKelvin from '../components/filters/LordKelvin';
import Nashville from '../components/filters/Nashville';
import Normal from '../components/filters/Normal';
import Rise from '../components/filters/Rise';
import Sierra from '../components/filters/Sierra';
import Sutro from '../components/filters/Sutro';
import Toaster from '../components/filters/Toaster';
import Valencia from '../components/filters/Valencia';
import Walden from '../components/filters/Walden';
import XproII from '../components/filters/XproII';

class CurrentFilter extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        var currentFilter = this.props.currentFilter;
        return (
            <Surface preload={true} style={{width: '100%', aspectRatio: 1}}>
            {/* <F1977 on={'F1977' === currentFilter}> */}
                {/* <Earlybird on={'Earlybird' === currentFilter || true}> */}
                    {/* <Brannan on={'Brannan' === currentFilter}>  */}
                        {/* <Amaro on={'Amaro' === currentFilter}> */}
                            <GLImage
                                source={this.props.image}
                                onDraw={() => {
                                    // alert('draw ' + currentFilter)
                                }}
                            />
                        {/* </Amaro> */}
                    {/* </Brannan> */}
                {/* </Earlybird> */}
            {/* </F1977> */}
        </Surface>
        )
    }
}

export default CurrentFilter


