// screens/Filter.js

import React from 'react'
import { StyleSheet, View, Picker, Text} from 'react-native'
import Avatar from '../components/Avatar'
import FilterPreview from '../components/FilterPreview'
import Colors from '../constants/Colors'

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

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFilter: 'normal'
        };

    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 1000);
    }

    render() {
        var currentFilter = this.state.currentFilter;
        return (
            <View style={styles.main_container}>
                <Avatar />

                <Text>
                    Filter : {currentFilter}
                </Text>

                <View style={{position: 'relative'}}>
                    <FilterPreview image={require('../assets/images/dizni.jpg')}/>
                    <Surface style={{width: '100%', aspectRatio: 1, backgroundColor: 'lightgrey'}} autoRedraw={true} visibleContent={true}>
                        <F1977 on={'F1977' === currentFilter}>
                            <Earlybird on={'Earlybird' === currentFilter}>
                                <Brannan on={'Brannan' === currentFilter}> 
                                    <Amaro on={'Amaro' === currentFilter}>
                                        <GLImage
                                            source={this.props.navigation.state.params.image}
                                            onDraw={() => {
                                                // alert('draw ' + currentFilter)
                                            }}
                                        />
                                    </Amaro>
                                 </Brannan>
                           </Earlybird>
                        </F1977>
                    </Surface>
                </View>

                <Picker
                    selectedValue={currentFilter}
                    style={{ height: 30, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({currentFilter: itemValue})}>
                    <Picker.Item label="Normal" value="Normal" />
                    <Picker.Item label="Amaro" value="Amaro" />
                    <Picker.Item label="Brannan" value="Brannan" />
                    <Picker.Item label="Earlybird" value="Earlybird" />
                </Picker>

                    {/* <Surface style={{width: '100%', height: 300}}>
                        <F1977>
                            <GLImage source={require('../assets/images/dizni.jpg')}/>
                        </F1977>
                    </Surface>
                    <Surface style={{width: '100%', height: 300}}>
                        <Hefe>
                            <GLImage source={require('../assets/images/dizni.jpg')}/>
                        </Hefe>
                    </Surface>
                    <Surface style={{width: '100%', height: 300}}>
                        <Hudson>
                            <GLImage source={require('../assets/images/dizni.jpg')}/>
                        </Hudson>
                    </Surface>
                    <Surface style={{width: '100%', height: 300}}>
                        <Inkwell>
                            <GLImage source={require('../assets/images/dizni.jpg')}/>
                        </Inkwell>
                    </Surface>
                    <Surface style={{width: '100%', height: 300}}>
                        <Lokofi>
                            <GLImage source={require('../assets/images/dizni.jpg')}/>
                        </Lokofi>
                    </Surface>
                    <Surface style={{width: '100%', height: 300}}>
                        <LordKelvin>
                            <GLImage source={require('../assets/images/dizni.jpg')}/>
                        </LordKelvin>
                    </Surface>
                    <Surface style={{width: '100%', height: 300}}>
                        <Nashville>
                            <GLImage source={require('../assets/images/dizni.jpg')}/>
                        </Nashville>
                    </Surface>
                    <Surface style={{width: '100%', height: 300}}>
                        <Normal>
                            <GLImage source={require('../assets/images/dizni.jpg')}/>
                        </Normal>
                    </Surface>
                    <Surface style={{width: '100%', height: 300}}>
                        <Rise>
                            <GLImage source={require('../assets/images/dizni.jpg')}/>
                        </Rise>
                    </Surface>
                    <Surface style={{width: '100%', height: 300}}>
                        <Sierra>
                            <GLImage source={require('../assets/images/dizni.jpg')}/>
                        </Sierra>
                    </Surface>
                    <Surface style={{width: '100%', height: 300}}>
                        <Sutro>
                            <GLImage source={require('../assets/images/dizni.jpg')}/>
                        </Sutro>
                    </Surface>
                    <Surface style={{width: '100%', height: 300}}>
                        <Toaster>
                            <GLImage source={require('../assets/images/dizni.jpg')}/>
                        </Toaster>
                    </Surface>
                    <Surface style={{width: '100%', height: 300}}>
                        <Valencia>
                            <GLImage source={require('../assets/images/dizni.jpg')}/>
                        </Valencia>
                    </Surface>
                    <Surface style={{width: '100%', height: 300}}>
                        <Walden>
                            <GLImage source={require('../assets/images/dizni.jpg')}/>
                        </Walden>
                    </Surface>
                    <Surface style={{width: '100%', height: 300}}>
                        <XproII>
                            <GLImage source={require('../assets/images/dizni.jpg')}/>
                        </XproII>
                    </Surface> */}
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
