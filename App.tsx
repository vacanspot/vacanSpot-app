import React from 'react';
import {Text, View} from 'react-native';
import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-screen-helper';

const App = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#6b6bce',
        paddingTop: getStatusBarHeight(),
        paddingBottom: getBottomSpace(),
        paddingHorizontal: 40,
      }}>
      <Text style={{color: '#000000', fontSize: 16}}>111</Text>
      <Text style={{color: '#000000', fontSize: 16}}>111</Text>
      <Text style={{color: '#000000', fontSize: 16}}>111</Text>
      <Text style={{color: '#000000', fontSize: 16}}>111</Text>
      <Text style={{color: '#000000', fontSize: 16}}>111</Text>
      <Text style={{color: '#000000', fontSize: 16}}>111</Text>
    </View>
  );
};

export default App;
