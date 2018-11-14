// animations/FadeIn.js

import React from 'react'
import { Text, Animated, Dimensions } from 'react-native'

class FadeIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      positionLeft: new Animated.Value(Dimensions.get('window').width)
    }
  }

  componentDidMount() {
    var nb = (this.props.index % 20) + 1;
    setTimeout(() => {
      Animated.spring(
        this.state.positionLeft,
        {
          toValue: 0
        }
      ).start()
    }, (200 * nb))
  }

  render() {
    return (
      <Animated.View
        style={{ left: this.state.positionLeft }}>
          {this.props.children}
      </Animated.View>
    )
  }
}

export default FadeIn