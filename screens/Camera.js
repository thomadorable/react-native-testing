// screens/Camera.js

import React from 'react'

import { TouchableOpacity, TouchableWithoutFeedback, StyleSheet, View, Text, Image, Button } from 'react-native'
import Colors from '../constants/Colors'
import Resizer from '../components/Resizer'
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux'
import { setSnap } from '../API/registerApi'
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-picker'

class Camera extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            typeCamera: RNCamera.Constants.Type.back,
            flashLight: RNCamera.Constants.FlashMode.off,
            isLoading: false,
            step: 1
        }
    
        lastTap = null;
    }

    takePicture = async () => {
        this.setState({
            isLoading: true
        });

        if (this.camera && !this.state.isLoading) {
            const options = { quality: 0.5, base64: true };
            const photo = await this.camera.takePictureAsync(options)
            this.setState({
                imageUri: {
                    uri: photo.uri,
                },
                step: 2,
                isLoading: false
            });
        } else {
            alert('is loading !!!');
        }
    };

    cropAndSave = (cropPositions, pictureSize) => {
        // TOFIX : ADD LOADER
        ImageResizer.createResizedImage(this.state.imageUri.uri, 1000, 1000, 'JPEG', 90, 0, null).then((response) => {
            const data = new FormData();
            data.append('name', this.props.user.id + '.jpg');


            data.append('top', cropPositions.top);
            data.append('left', cropPositions.left);
            data.append('right', cropPositions.right);
            data.append('bottom', cropPositions.bottom);

            data.append('width', pictureSize.width);
            data.append('height', pictureSize.height);

            data.append('image', {
                uri: response.uri,
                name: 'snaping-' + this.props.user.id,
                type: 'image/jpeg'
            });


            setSnap(data, (result) => {
                if (result !== null) {
                    const clothe = {
                        id: Date.now(),
                        image: result.avatar,
                        added_date: Date.now()
                    };

                    this.props.dispatch({type: "ADD_CLOTHES", value: clothe })

                    alert("*changer de page vers les vêtements");
                } else {
                    alert('fail !');
                }
            });

        }).catch((err) => {
            // Oops, something went wrong. Check that the filename is correct and
            // inspect err to get more details.
        });
    }

    _showImagePicker() {
        ImagePicker.showImagePicker({}, (response) => {
          if (response.didCancel) {
            console.log('L\'utilisateur a annulé')
          }
          else if (response.error) {
            console.log('Erreur : ', response.error)
          }
          else {
            console.log('Photo : ', response.uri )
            let requireSource = { uri: response.uri }
          }
        })
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

    _resnap = () => {
        this.setState({
            imageUri: null,
            step: 1
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
    

    capture(){
        this.refs.cropper.crop().then(base64 => console.log(base64))
    }

    _renderCrop = () => {
        console.log('render crop');
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20}}>
                
                <Resizer imageUri={this.state.imageUri} save={this.cropAndSave} cancel={this._resnap}/>
            </View>
        )
    }

    _renderFail = () => {
        return (
            <Text style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>Error...</Text>
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
                        permissionDialogTitle={'Vera : Permission to use camera'} // TODO WORDING
                        permissionDialogMessage={'Vera : We need your permission to use your camera phone'}
                        onGoogleVisionBarcodesDetected={({ barcodes }) => {
                            console.log('barcodes', barcodes)
                        }}
                    />

                    <View style={{position: 'absolute', top: 20, left: 20}}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={this.switchLight}
                        >
                            {this._showLight()}
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 30, width: '100%', paddingHorizontal: 20 }}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={this._showImagePicker}
                        >
                            <Image
                                source={require('../assets/images/switch-camera.png')}
                                style={{width: 30, height: 30}}
                            />
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
        var selectFunction = this._renderCamera;
        switch(this.state.step) {
            case 2:
                selectFunction = this._renderCrop
            break;
        }
        return selectFunction();
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