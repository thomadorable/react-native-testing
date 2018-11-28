import React from 'react';
import PropTypes from 'prop-types';

import { GLSL, Shaders, Node } from 'gl-react';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

const shaders = Shaders.create({
  F1977: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        texel = vec3(
                    texture2D(inputImageTexture2, vec2(texel.r, .16666)).r,
                    texture2D(inputImageTexture2, vec2(texel.g, .5)).g,
                    texture2D(inputImageTexture2, vec2(texel.b, .83333)).b);
        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

export default class F1977 extends React.PureComponent<{ on: boolean, children: React.Node }> {
  render() {
      const { on, children: inputImageTexture } = this.props;
      if (!on) {
          return this.props.children;
      }
      return (
          <Node
              shader={shaders.F1977}
              uniforms={{
                  inputImageTexture: this.props.children,
                  inputImageTexture2: resolveAssetSource(require('../../assets/images/insta/1977map.png'))
              }}
          />
      );
  }
}
