// Components/Avatar.js

import React from 'react'
import { ActivityIndicator, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import { setAvatar, getRegister } from '../API/registerApi'
import ImageResizer from 'react-native-image-resizer';

class Avatar extends React.Component {

    constructor(props) {
        super(props)
        this._avatarClicked = this._avatarClicked.bind(this)

        this.state = {
            isLoading: false,
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size='small' style={{position: 'absolute', top: 10, right: 10}} color="white" />
            )
        }
    }

    _avatarClicked() {
        this.setState({ isLoading: true })

        ImagePicker.showImagePicker({}, (photo) => {
            if (photo.didCancel) {
                this.setState({ isLoading: false })
                console.log('L\'utilisateur a annulé')
            }
            else if (photo.error) {
                this.setState({ isLoading: false })
                console.log('Erreur : ', photo.error)
            }
            else {
                var ext = photo.fileName.split('.')
                ext = ext[ext.length - 1];
                ext = ext.toLowerCase();

                var exts = ['jpeg', 'gif', 'png'];
                if (exts.indexOf(ext) === -1) {
                    ext = 'jpg';
                }

                ImageResizer.createResizedImage(photo.uri, 200, 200, 'PNG', 90, 0, null).then((response) => {

                    const action = { type: "SET_AVATAR", value: { uri: response.uri } }
                    this.props.dispatch(action);


                    const data = new FormData();
                    data.append('name', this.props.user.id + '.' + ext);
                    data.append('image', {  
                        uri: response.uri,
                        name: response.name,
                        type: 'image/png'
                    });

                    setAvatar(data, (result) => {
                        if (result !== null) {
                            alert('sauvegarde : ok');
                        } else {
                            alert('sauvegarde fail');
                        }
                        console.log(result, result.avatar )
                        
                    });
                  }).catch((err) => {
                    // Oops, something went wrong. Check that the filename is correct and
                    // inspect err to get more details.
                  });

                
            }
        })
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({ isLoading: false })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.pseudo}>Welcome, {this.props.user.name}</Text>
                </View>
                <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={this._avatarClicked}>
                        <Image style={styles.avatar} source={this.props.user.avatar} />
                        {this._displayLoading()}
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20
    },
    touchableOpacity: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginLeft: 15
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    pseudo: {
        fontSize: 16,
        textAlign: 'right',
        fontWeight: 'bold'
    }
})

// On mappe l'avatar aux props de notre component
const mapStateToProps = state => {
    return {
        user: state.setUser.user,
    }
}

export default connect(mapStateToProps)(Avatar)