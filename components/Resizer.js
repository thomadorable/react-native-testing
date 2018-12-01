// Components/Resizer.js

import React from 'react'
import { Image, StyleSheet, View, PanResponder, TouchableOpacity, Text } from 'react-native'
import Layout from '../constants/Layout'

class Resizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 100,
            height: 100
        };

        this.image = this.props.imageUri;
        // this.image = {uri: 'http://thomasderoua.fr/vera/snap/dizni.jpg'}

        this.position = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        };
        
        this.lastKnownLeft = this.position.left;
        this.lastKnownTop = this.position.top;
        this.lastKnownRight = this.position.right;
        this.lastKnownBottom = this.position.bottom;

        this.topLeftResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (e, gestureState) => {
                const left = this.lastKnownLeft + gestureState.dx;
                const top = this.lastKnownTop + gestureState.dy;

                this.setLeft(left);
                this.setTop(top);
                this.refs.crop.setNativeProps({ style: this.position });
            },
            onPanResponderRelease: (e, gestureState) => {
                this.lastKnownLeft += gestureState.dx;
                this.lastKnownTop += gestureState.dy;
            },
            onPanResponderTerminate: (e, gestureState) => {
                this.lastKnownLeft += gestureState.dx;
                this.lastKnownTop += gestureState.dy;
            }
        })


        this.topRightResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (e, gestureState) => {
                const right = this.lastKnownRight + (1 - gestureState.dx);
                const top = this.lastKnownTop + gestureState.dy;

                this.setRight(right);
                this.setTop(top);
                this.refs.crop.setNativeProps({ style: this.position });
            },
            onPanResponderRelease: (e, gestureState) => {
                this.lastKnownRight += (1 - gestureState.dx);
                this.lastKnownTop += gestureState.dy;
            },
            onPanResponderTerminate: (e, gestureState) => {
                this.lastKnownRight += (1 - gestureState.dx);
                this.lastKnownTop += gestureState.dy;
            }
        })

        this.bottomLeftResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (e, gestureState) => {
                const bottom = this.lastKnownBottom + (1 -  gestureState.dy);
                const left = this.lastKnownLeft + gestureState.dx;

                this.setLeft(left);
                this.setBottom(bottom);
                this.refs.crop.setNativeProps({ style: this.position });
            },
            onPanResponderRelease: (e, gestureState) => {
                this.lastKnownBottom += (1 - gestureState.dy);
                this.lastKnownLeft += gestureState.dx;
            },
            onPanResponderTerminate: (e, gestureState) => {
                this.lastKnownBottom += (1 - gestureState.dy);
                this.lastKnownLeft += gestureState.dx;
            }
        })

        this.bottomRightResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (e, gestureState) => {
                const bottom = this.lastKnownBottom + (1 -  gestureState.dy);
                const right = this.lastKnownRight + (1 - gestureState.dx);

                this.setRight(right);
                this.setBottom(bottom);
                this.refs.crop.setNativeProps({ style: this.position });
            },
            onPanResponderRelease: (e, gestureState) => {
                this.lastKnownBottom += (1 - gestureState.dy);
                this.lastKnownRight += (1 - gestureState.dx);
            },
            onPanResponderTerminate: (e, gestureState) => {
                this.lastKnownBottom += (1 - gestureState.dy);
                this.lastKnownRight += (1 - gestureState.dx);
            }
        })
    }

    setLeft(left) {
        if (left <= 0) {
            this.position.left = 0;
        } else if ((this.state.width - left - this.position.right) <= 200) {
            this.position.left = this.state.width - 200 - this.position.right;
        } else {
            this.position.left = left;
        }

        this.refs.layer_left.setNativeProps({ width: this.position.left });
    }

    setTop(top) {
        if (top <= 0) {
            this.position.top = 0;
        } else if ((this.state.height - top - this.position.bottom) <= 200) {
            this.position.top = this.state.height - 200 - this.position.bottom;
        } else {
            this.position.top = top;
        }

        this.refs.layer_top.setNativeProps({ height: this.position.top });
    }

    setBottom(bottom) {
        if (bottom <= 0) {
            this.position.bottom = 0;
        } else if ((this.state.height - bottom - this.position.top) <= 200) {
            this.position.bottom = this.state.height - 200 - this.position.top;
        } else {
            this.position.bottom = bottom;
        }

        this.refs.layer_bottom.setNativeProps({ height: this.position.bottom });
    }

    setRight(right) {
        if (right <= 0) {
            this.position.right = 0;
        } else if ((this.state.width - right - this.position.left) <= 200) {
            this.position.right = this.state.width - 200 - this.position.left;
        } else {
            this.position.right = right;
        }

        this.refs.layer_right.setNativeProps({ width: this.position.right });
    }

    componentWillMount() {
        Image.getSize(this.image, (width, height) => {
            const padding = 20;
            const screenWidth = Layout.window.width - (padding * 2);
            const maxHeight = Layout.window.height - (padding * 2) - 300;

            var finalWidth = screenWidth;
            var finalHeight = screenWidth * (height / width);

            
            if (finalHeight > maxHeight) {
                finalWidth = maxHeight * width / height;
                finalHeight = maxHeight
            }

            this.setState({
                width: finalWidth,
                height: finalHeight
            });
        });
    }


    render() {
        console.log('width', this.state.width, 'height', this.state.height)
        return (
            <View
                style={[styles.main_container]}
            >

                <Image
                    source={this.image}
                    style={{width: this.state.width, height: this.state.height}}
                    resizeMode="contain"
                />

                <View ref="layer_left" style={[styles.layout, {top: 0, left: 0}]}></View>
                <View ref="layer_top" style={[styles.layout, {top: 0, left: 0, right: 0, width: '100%', height: 0 }]}></View>
                <View ref="layer_right" style={[styles.layout, {right: 0, top: 0}]}></View>
                <View ref="layer_bottom" style={[styles.layout, {bottom: 0, left: 0, width: '100%', height: 0}]}></View>

                <View
                    ref="crop"
                    style={[styles.cropper]}
                >

                    

                    {/* TOP LEFT CORNER */}
                    <View
                        style={[styles.corner,  {left: -19, top: -19}]}
                        {...this.topLeftResponder.panHandlers}
                    >
                            <View style={[styles.inner_corner]}></View>
                    </View>

                    {/* TOP RIGHT CORNER */}
                    <View
                        style={[styles.corner, {right: -19, top: -19}]}
                        {...this.topRightResponder.panHandlers}
                    >
                            <View style={[styles.inner_corner]}></View>
                    </View>


                    {/* BOTTOM LEFT CORNER */}
                    <View
                        style={[styles.corner, {left: -19, bottom: -19}]}
                        {...this.bottomLeftResponder.panHandlers}
                    >
                            <View style={[styles.inner_corner]}></View>
                    </View>

                    {/* BOTTOM RIGHT CORNER */}
                    <View
                        style={[styles.corner, {right: -19, bottom: -19}]}
                        {...this.bottomRightResponder.panHandlers}
                    >
                            <View style={[styles.inner_corner]}></View>
                    </View>
                </View>

                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: -50, width: '100%', paddingHorizontal: 20 }}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.props.cancel}
                    >
                        <Text style={{ fontSize: 14, color: 'black' }}> RESNAP </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btn}
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
            </View>
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
        width: 40,
        height: 40,
        
        padding: 12
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
        borderColor: '#ec5176',
    },
    layout: {
        backgroundColor: 'rgba(0, 0, 40, 0.5)',
        width: 0,
        height: '100%',
        position: 'absolute',
    },
    crop: {
        position: 'absolute',
        bottom: -50,
        left: '40%'
    }
})



export default Resizer
