// Components/Resizer.js

import React from 'react'
import { Image, StyleSheet, View, PanResponder, TouchableOpacity, Text, ImageBackground } from 'react-native'
import Layout from '../constants/Layout'

class Resizer extends React.Component {
    constructor(props) {
        super(props);

        this.image = this.props.imageUri;

        const padding = 20;
        const height = this.image.height;
        const width = this.image.width;
        
        const screenWidth = Layout.window.width - (padding * 2);
        const maxHeight = Layout.window.height - (padding * 2) - 300;

        var finalWidth = screenWidth;
        var finalHeight = screenWidth * (height / width);

        
        if (finalHeight > maxHeight) {
            finalWidth = maxHeight * width / height;
            finalHeight = maxHeight
        }

        this.state = {
            width: finalWidth,
            height: finalHeight
        };

        this.position = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        };
        
        this.topLeftResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
                let touches = e.nativeEvent.touches;
                if (touches.length == 1) {
                    const top = touches[0].pageY - this.offsetY;
                    const left = touches[0].pageX - this.offsetX;

                    this.setLeft(left);
                    this.setTop(top);
                    this.refs.crop.setNativeProps({ style: this.position });
                }
            }
        })


        this.topRightResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
                let touches = e.nativeEvent.touches;
                if (touches.length == 1) {
                    const top = touches[0].pageY - this.offsetY;
                    const right = this.width - touches[0].pageX + this.offsetX;

                    this.setRight(right);
                    this.setTop(top);
                    this.refs.crop.setNativeProps({ style: this.position });
                }
            }
        })

        this.bottomLeftResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
                let touches = e.nativeEvent.touches;
                if (touches.length == 1) {
                    const bottom = this.height - touches[0].pageY + this.offsetY;
                    const left = touches[0].pageX - this.offsetX;

                    this.setLeft(left);
                    this.setBottom(bottom);
                    this.refs.crop.setNativeProps({ style: this.position });
                }
            }
        })

        this.bottomRightResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
                let touches = e.nativeEvent.touches;
                if (touches.length == 1) {
                    const bottom = this.height - touches[0].pageY + this.offsetY;
                    const right = this.width - touches[0].pageX + this.offsetX;

                    this.setRight(right);
                    this.setBottom(bottom);
                    this.refs.crop.setNativeProps({ style: this.position });
                }
            }
        })
    }

    setLeft(left) {
        if (left <= 0) {
            this.position.left = 0;
        } 
        else if ((this.state.width - left - this.position.right) < 100) {
            this.position.left = this.state.width - 100 - this.position.right;
        }
        else {
            this.position.left = left;
        }

        this.refs.cropped_image.setNativeProps({ left: - this.position.left });
    }

    setTop(top) {
        if (top <= 0) {
            this.position.top = 0;
        } 
        else if ((this.state.height - top - this.position.bottom) < 100) {
            this.position.top = this.state.height - 100 - this.position.bottom;
        } 
        else {
            this.position.top = top;
        }

        this.refs.cropped_image.setNativeProps({ top: - this.position.top });
    }

    setBottom(bottom) {
        if (bottom <= 0) {
            this.position.bottom = 0;
        } 
        else if ((this.state.height - bottom - this.position.top) < 100) {
            this.position.bottom = this.state.height - 100 - this.position.top;
        }
        else {
            this.position.bottom = bottom;
        }
    }

    setRight(right) {
        if (right <= 0) {
            this.position.right = 0;
        }
        else if ((this.state.width - right - this.position.left) < 100) {
            this.position.right = this.state.width - 100 - this.position.left;
        }
        else {
            this.position.right = right;
        }
    }

    _checkResizerPosition = () => {
        setTimeout(() => {
            this._getResizerPosition();
        }, 100);
    }

    _getResizerPosition = () => {
        this.refs.container.measure( (fx, fy, width, height, px, py) => {
            if (py === 0) {
                this._checkResizerPosition();
            } else {
                this.offsetX = px;
                this.offsetY = py;
                this.width = width;
                this.height = height;
            }
        })
    }

    componentDidMount() {
        console.log('did mount')
        this._checkResizerPosition();
    }


    render() {
        console.log('width', this.state.width, 'height', this.state.height)
        return (
            <ImageBackground
                style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative', paddingBottom: 50}}
                source={{uri: this.image.uri}}
                blurRadius={90}
            >
                
                <View
                    style={[styles.main_container]}
                    ref="container"
                >

                    <Image
                        source={{uri: this.image.uri}}
                        style={{width: this.state.width, height: this.state.height, opacity: 0}}
                        resizeMode="contain"
                    />

                    <View
                        ref="crop"
                        style={[styles.cropper]}
                    >

                        <View style={{overflow: 'hidden', height: '100%'}}>
                            <Image 
                                ref="cropped_image"
                                source={this.image}
                                style={{width: this.state.width, height: this.state.height}}
                            />
                        </View>

                        {/* TOP LEFT CORNER */}
                        <View
                            style={[styles.corner,  {left: -21, top: -21}]}
                            {...this.topLeftResponder.panHandlers}
                        >
                                <View style={[styles.inner_corner]}></View>
                        </View>

                        {/* TOP RIGHT CORNER */}
                        <View
                            style={[styles.corner, {right: -21, top: -21}]}
                            {...this.topRightResponder.panHandlers}
                        >
                                <View style={[styles.inner_corner]}></View>
                        </View>


                        {/* BOTTOM LEFT CORNER */}
                        <View
                            style={[styles.corner, {left: -21, bottom: -21}]}
                            {...this.bottomLeftResponder.panHandlers}
                        >
                                <View style={[styles.inner_corner]}></View>
                        </View>

                        {/* BOTTOM RIGHT CORNER */}
                        <View
                            style={[styles.corner, {right: -21, bottom: -21}]}
                            {...this.bottomRightResponder.panHandlers}
                        >
                                <View style={[styles.inner_corner]}></View>
                        </View>
                    </View>
                </View>

                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', bottom: 30, left: 20 }}>
                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: '#DFDFDF', color: '#292929'}]}
                        onPress={this.props.cancel}
                    >
                        <Text style={{ fontSize: 14, color: 'black' }}> RESNAP </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: '#DFDFDF', color: '#292929'}]}
                        onPress={() => {
                            this.props.save(this.position, {
                                width: this.state.width,
                                height: this.state.height,
                            });
                        }}
                    >
                        <Text style={{ fontSize: 14, color: 'black' }}> validate </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'column',
        position: 'relative',
    },
    corner: {
        position: 'absolute',
        width: 44,
        height: 44,
        padding: 14,
    },
    inner_corner: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: '#ec5176',
    },
    cropper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderWidth: 2,
        borderColor: '#ec5176'
    },
    layout: {
        backgroundColor: 'rgba(0, 0, 40, 0.5)',
        width: 0,
        height: '100%',
        position: 'absolute',
        opacity: 0.5
    },
    crop: {
        position: 'absolute',
        bottom: -50,
        left: '40%'
    }
})



export default Resizer
