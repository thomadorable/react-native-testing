// Components/Look.js

import React from 'react'
import { Image, StyleSheet, View, Text, TouchableWithoutFeedback, Dimensions, Button, Animated, Easing } from 'react-native'
import { connect } from 'react-redux'
import Colors from '../constants/Colors'

class Look extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anim_load: new Animated.Value(0)
        };

        this.anim_fav = new Animated.Value(0);
        this.anim_opacity = new Animated.Value(0);
        lastTap = null;
    }

    _toggleLike = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(this.anim_fav, {
                        toValue: 1.3,
                        duration: 200,
                        easing: Easing.ease
                    }
                ),
                Animated.timing(this.anim_opacity, {
                    toValue: 1,
                    duration: 100,
                    easing: Easing.ease
                })
            ]),
            Animated.timing(this.anim_fav, {
                    toValue: 1,
                    duration: 120,
                    easing: Easing.ease
                }
            ),
            Animated.timing(this.anim_fav, {
                    toValue: 1.1,
                    duration: 120,
                    easing: Easing.ease
                }
            ),
            Animated.timing(this.anim_opacity, {
                    toValue: 0,
                    delay: 500,
                    duration: 120,
                    easing: Easing.ease
                }
            ),
            Animated.timing(this.anim_fav, {
                    toValue: 0,
                    duration: 0
                }
            ),
        ]).start();

        console.log('add look : ', this.props.look)
        const look = {
            id: this.props.look.id,
            shortcode: this.props.look.shortcode,
            added_date: Date.now()
        };
        this.props.dispatch({type: "ADD_LOOK", value: look })
    }

    validate() {

    }

    refuse() {

    }

    doubleTap = () => {
        const now = Date.now();
        if (this.lastTap && (now - this.lastTap) < 300) {
            this._toggleLike();
        } else {
            this.lastTap = now;
        }
    }

    _displayFavoriteImage = () => {
        return (
            <TouchableWithoutFeedback 
                onPress={this.doubleTap}
            >
                <View style={{flex: 1, position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Animated.Image
                        style={{width: 90, height: 90, tintColor: 'white', transform: [{ scale: this.anim_fav }], opacity: this.anim_opacity}}
                        source={require('../assets/images/like.png')}
                    />
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        return (
            <View
                style={styles.main_container}
            >
                <View style={styles.titre_container}>
                    <Text style={styles.titre}>#{this.props.look.tag} {this.props.look.id_insta}</Text>
                    <Text style={styles.vote}>{this.props.look.likes} | {this.props.look.comments}</Text>

                </View>
                <View style={{backgroundColor: '#' + this.props.look.color}}>
                    <Animated.View style={{opacity: this.state.anim_load, position: 'relative'}}>
                        <Image
                            onLoad={() => {
                                Animated.timing(
                                    this.state.anim_load,
                                    {
                                        toValue: 1,
                                        duration: 300,
                                        easing: Easing.ease
                                    }
                                ).start()
                            }}
                            style={styles.image}
                            source={{uri: this.props.look.thumb}}
                        />
                        {this._displayFavoriteImage()}
                    </Animated.View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'column',
        marginBottom: 30
    },
    image: {
        height: Dimensions.get('window').width
    },
    titre_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 15
    },
    titre: {
        flexWrap: 'wrap',
        flex: 1,
        fontWeight: 'bold',
        fontSize: 14
    },
    vote: {
        fontSize: 14
    }
})


const mapStateToProps = (state) => {
    return {
        looks: state.setLooks.looks
    }
}

export default connect(mapStateToProps)(Look)