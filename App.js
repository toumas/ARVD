import React, {Component} from 'react';
import {ViroARSceneNavigator} from 'react-viro';

// Sets the default scene you want for AR and VR
import HelloWorldSceneAR from './js/HelloWorldSceneAR';
import configs from './configs';

export default class ViroSample extends Component {
  render() {
    return (
      <ViroARSceneNavigator
        apiKey={configs.apiKey}
        initialScene={{scene: HelloWorldSceneAR}}
      />
    );
  }
}
