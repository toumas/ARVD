'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroAnimations,
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroAmbientLight,
  ViroSpotLight,
  Viro3DObject,
  ViroSpatialSound,
  ViroARPlaneSelector,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  planeSelectorRef = React.createRef()
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
        <ViroARPlaneSelector ref={this.planeSelectorRef}>
          <ViroSpatialSound
            loop={true}
            paused={!ready}
            muted={muted}
            minDistance={0}
            maxDistance={2}
            rolloffModel='linear'
            position={[0, 0.25, 0]}
            source={require('../res/haddaway_what_is_love.mp3')}
          />
          <Viro3DObject
            source={require('../res/heart/love_heart.obj')}
            position={[0, 0, 0]}
            scale={[0.2, 0.2, 0.2]}
            type='OBJ'
            animation={{name: 'beat', run: true, loop: true}}
          />
        </ViroARPlaneSelector>
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

const duration = 483.870967742;

ViroAnimations.registerAnimations({
  grow: {
    properties: {
      scaleX: '+=0.05',
      scaleY: '+=0.05',
      scaleZ: '+=0.05',
    },
    easing: 'Bounce',
    duration: duration,
  },
  shrink: {
    properties: {
      scaleX: '-=0.05',
      scaleY: '-=0.05',
      scaleZ: '-=0.05',
    },
    easing: 'Bounce',
    duration: duration,
  },
  beat: [['grow', 'shrink']],
});
