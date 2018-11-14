// Components/Tests.js

import React from 'react'

import { TouchableOpacity, Animated, Easing, StyleSheet, View, Text, PanResponder, Dimensions } from 'react-native'
import Colors from '../constants/Colors'
import { RNCamera, FaceDetector } from 'react-native-camera';
import { connect } from 'react-redux'
import { setSnap } from '../API/registerApi'
import ImageResizer from 'react-native-image-resizer';


class Test extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            topPosition: 300,
            leftPosition: 130,
            anim_fav: new Animated.Value(1),
            isAnimated: false,
            typeCamera: RNCamera.Constants.Type.back
        }

        var { height, width } = Dimensions.get('window');
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                let touches = evt.nativeEvent.touches;
                if (touches.length == 1) {

                    var topPosition = touches[0].pageY - 80;
                    if (topPosition <= 0) topPosition = 0;
                    else if (topPosition >= (height - 256)) topPosition = (height - 256);

                    var leftPosition = touches[0].pageX - 50;
                    if (leftPosition <= 0) leftPosition = 0;
                    else if (leftPosition >= (width - 100)) leftPosition = (width - 100);

                    this.setState({
                        topPosition: topPosition,
                        leftPosition: leftPosition
                    })
                }
            },
            onPanResponderEnd: (evt, gestureState) => {
                this.setState({
                    isAnimated: false
                })
            },
            onPanResponderStart: (evt, gestureState) => {
                this.setState({
                    isAnimated: true
                }, () => {
                    this._animScale();
                })

            },
        })

        this._animScale = this._animScale.bind(this)
    }

    _animScale() {
        if (this.state.isAnimated) {
            Animated.sequence([
                Animated.timing(
                    this.state.anim_fav,
                    {
                        toValue: 1.5,
                        duration: 500,
                        easing: Easing.ease
                    }
                ),
                Animated.timing(
                    this.state.anim_fav,
                    {
                        toValue: 1,
                        duration: 500,
                        easing: Easing.ease
                    }
                )
            ]).start(() => {
                this._animScale();
            });
        }
    }

    takePicture = async function() {
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const photo = await this.camera.takePictureAsync(options)
          
          ImageResizer.createResizedImage(photo.uri, 1000, 1000, 'JPEG', 90, 0, null).then((response) => {

            const data = new FormData();
            data.append('name', this.props.user.id + '.jpg');
            data.append('image', {  
                uri: response.uri,
                name: 'snaping-' + this.props.user.id,
                type: 'image/jpeg'
            });

            setSnap(data, (result) => {
                if (result !== null) {
                    alert('sauvegarde : ok');
                } else {
                    alert('sauvegarde fail');
                }
                console.log(result )
            });
                
          }).catch((err) => {
            // Oops, something went wrong. Check that the filename is correct and
            // inspect err to get more details.
          });
         
        }
      };

      switchType = () => {
            var type = (this.state.typeCamera === RNCamera.Constants.Type.back) ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back;
            this.setState({
                typeCamera: type
            });
      }

    render() {
        return (
            // <View
            //     {...this.panResponder.panHandlers}
            //     style={styles.main_container}>

                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                {/* </View> */}

                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style = {{flex: 1}}
                    type={this.state.typeCamera}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={'Vera : Permission to use camera'}
                    permissionDialogMessage={'Vera : We need your permission to use your camera phone'}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                    console.log(barcodes)
                    }}
                />

                <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 30, width: '100%', paddingHorizontal: 20}}>
                    <TouchableOpacity
                            style={{backgroundColor: '#F0F0F0', padding: 5, borderRadius: 5}}
                            onPress={this.takePicture.bind(this)}
                        >
                            <Text style={{fontSize: 14, color: 'black'}}> SNAP </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                            style={{backgroundColor: '#F0F0F0', padding: 5, borderRadius: 5}}
                            onPress={this.switchType}
                        >
                            <Text style={{fontSize: 14, color: 'black'}}> SWITCH </Text>
                    </TouchableOpacity>
                </View>

                 

                {/* <Animated.View
                     style={[styles.animation_view, { top: this.state.topPosition, left: this.state.leftPosition, transform: [{ scale: this.state.anim_fav }] }]}>
                </Animated.View> */}
                
            </View>
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
    }
})

// On mappe l'avatar aux props de notre component
const mapStateToProps = state => {
    return {
        user: state.setUser.user,
    }
}

export default connect(mapStateToProps)(Test)