import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ViroARSceneNavigator} from 'react-viro';
import {Button, Icon} from 'react-native-elements';

// Sets the default scene you want for AR and VR
import HelloWorldSceneAR from './js/HelloWorldSceneAR';
import configs from './configs';

export default class ViroSample extends Component {
  state = {muted: true};

  onMutePress = () => {
    this.setState(({muted}) => ({muted: !muted}));
  };

  render() {
    const {muted} = this.state;
    return (
      <View style={styles.wrapper}>
        <ViroARSceneNavigator
          apiKey={configs.apiKey}
          initialScene={{scene: HelloWorldSceneAR}}
          viroAppProps={this.state}
        />
        <Button
          onPress={this.onMutePress}
          buttonStyle={styles.button}
          icon={
            <Icon name={muted ? 'volume-off' : 'volume-up'} color='#ffffff' />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
