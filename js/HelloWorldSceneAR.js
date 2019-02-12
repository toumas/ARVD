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
  ViroSpatialSound,
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
    } else if (state == ViroConstants.TRACKING_UNAVAILABLE) {
      this.setState({
        ready: false,
      });
    }
  };

  render() {
    const {ready} = this.state;
    const {arSceneNavigator: {viroAppProps: {muted}}} = this.props;

    return (
      <ViroARScene onTrackingUpdated={this.onInitialized}>
        <ViroSpatialSound
          loop={true}
          paused={!ready}
          muted={muted}
          minDistance={0}
          maxDistance={2}
          rolloffModel='linear'
          position={[0, 0, -1]}
          source={require('../res/haddaway_what_is_love.mp3')}
        />
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
