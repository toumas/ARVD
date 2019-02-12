'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroAmbientLight,
  ViroSpotLight,
  Viro3DObject,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  state = {
    text: 'Initializing AR...',
    ready: false,
  };

  onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: '',
        ready: true,
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  };

  render() {
    const {ready} = this.state;
    return (
      <ViroARScene onTrackingUpdated={this.onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
        <ViroAmbientLight color={'#aaaaaa'} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color='#ffffff'
          castsShadow={true}
        />
        {ready && (
          <Viro3DObject
            source={require('../res/heart/love_heart.obj')}
            position={[0, 0, -1]}
            scale={[0.2, 0.2, 0.2]}
            type='OBJ'
          />
        )}
      </ViroARScene>
    );
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;
