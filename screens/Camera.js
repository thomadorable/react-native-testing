// screens/Camera.js

import React from 'react'

import { TouchableOpacity, TouchableWithoutFeedback, StyleSheet, View, Text, Image } from 'react-native'
import Colors from '../constants/Colors'
import { RNCamera, FaceDetector } from 'react-native-camera';
import { connect } from 'react-redux'
import { setSnap } from '../API/registerApi'
import ImageResizer from 'react-native-image-resizer';


class Camera extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            typeCamera: RNCamera.Constants.Type.back,
            flashLight: RNCamera.Constants.FlashMode.off,
            imageUri: null,
            successPicture: null,
            isLoading: false
        }
    
        lastTap = null;
    }

    switchLoading = (value) => {
        this.setState({
            isLoading: value
        });
    }

    takePicture = async () => {

        this.setState({
            isLoading: true
        });

        // this.switchLoading(true);
        if (this.camera && !this.state.isLoading) {
            const options = { quality: 0.5, base64: true };
            const photo = await this.camera.takePictureAsync(options)
            this.setState({
                imageUri: {
                    uri: photo.uri,
                    isLoading: false
                }
            }, () => {
                // this.switchLoading(false);
            });
        } else {
            alert('is loading !!!');
        }
    };

    savePicture = () => {
        // TOFIX : ADD LOADER
        ImageResizer.createResizedImage(this.state.imageUri.uri, 1000, 1000, 'JPEG', 90, 0, null).then((response) => {

            const data = new FormData();
            data.append('name', this.props.user.id + '.jpg');
            data.append('image', {
                uri: response.uri,
                name: 'snaping-' + this.props.user.id,
                type: 'image/jpeg'
            });

            setSnap(data, (result) => {
                if (result !== null) {
                    console.log('add clothe : ', result.avatar)
                    const clothe = {
                        id: Date.now(),
                        image: result.avatar,
                        added_date: Date.now()
                    };
                    this.props.dispatch({type: "ADD_CLOTHES", value: clothe })

                    this.setState({
                        successPicture: true
                    });
                } else {
                    this.setState({
                        successPicture: false
                    });
                }
            });

        }).catch((err) => {
            // Oops, something went wrong. Check that the filename is correct and
            // inspect err to get more details.
        });
    }

    switchType = () => {
        var type = (this.state.typeCamera === RNCamera.Constants.Type.back) ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back;
        this.setState({
            typeCamera: type
        });
    }

    switchLight = () => {
        var type = (this.state.flashLight === RNCamera.Constants.FlashMode.off) ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off;
        this.setState({
            flashLight: type
        });
    }

    resnap = () => {
        this.setState({
            imageUri: null
        });
    }

    doubleTap = () => {
        const now = Date.now();
        if (this.lastTap && (now - this.lastTap) < 300) {
            this.switchType();
        } else {
            this.lastTap = now;
        }
    }

    _renderResult = () => {
        return (
            <View style={{flex: 1}} >
                <Image style={{ flex: 1, margin: 20, marginBottom: 80}} source={this.state.imageUri} />

                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 30, width: '100%', paddingHorizontal: 20 }}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.resnap}
                    >
                        <Text style={{ fontSize: 14, color: 'black' }}> RESNAP </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.savePicture}
                    >
                        <Text style={{ fontSize: 14, color: 'black' }}> validate </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _renderSuccess = () => {
        return (
            <Text style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>Success</Text>
        )
    }

    _renderFail = () => {
        return (
            <Text style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>Error...</Text>
        )
    }

    _renderImage = () => {
        return (
                this.state.successPicture === null ? this._renderResult() : ((this.state.successPicture === true) ? this._renderSuccess() : this._renderFail())
        )
    }

    _showLight = () => {

        var flashImg = require('../assets/images/flash.png');
        if (this.state.flashLight === RNCamera.Constants.FlashMode.off) {
            flashImg = require('../assets/images/no-flash.png');
        }

        return (
            <Image
                source={flashImg}
                style={{width: 30, height: 30}}
            />
        )
    }

    _renderCamera = () => {
        return (
            <TouchableWithoutFeedback onPress={this.doubleTap} style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <View style={{flex: 1}}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={{ flex: 1 }}
                        type={this.state.typeCamera}
                        flashMode={this.state.flashLight}
                        permissionDialogTitle={'Vera : Permission to use camera'}
                        permissionDialogMessage={'Vera : We need your permission to use your camera phone'}
                        onGoogleVisionBarcodesDetected={({ barcodes }) => {
                            console.log('barcodes', barcodes)
                        }}
                    />

                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 30, width: '100%', paddingHorizontal: 20 }}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={this.switchLight}
                        >
                            {this._showLight()}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btn, {backgroundColor: '#DFDFDF', borderRadius: 30, padding: 10}]}
                            onPress={this.takePicture}
                        >
                            <Image
                                source={require('../assets/images/camera.png')}
                                style={{width: 25, height: 25, tintColor: 'black'}}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={this.switchType}
                        >
                            <Image
                                source={require('../assets/images/switch-camera.png')}
                                style={{width: 30, height: 30}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        console.log('render camera page')
        return (
            (this.state.imageUri) ? this._renderImage() : this._renderCamera()
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.bg
    },
    animation_view: {
        backgroundColor: 'lightblue',
        width: 100,
        height: 100,
        borderRadius: 50
    },
    btn: {
        padding: 5,
        borderRadius: 5
    }
})

// On mappe l'avatar aux props de notre component
const mapStateToProps = state => {
    return {
        user: state.setUser.user,
    }
}

export default connect(mapStateToProps)(Camera)