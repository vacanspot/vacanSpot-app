import React from 'react';
import {Text} from './src/components/atoms';
import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-screen-helper';
import {styled} from 'styled-components/native';
import {Platform} from 'react-native';

function App(): JSX.Element {
  return (
    <RootView>
      <Text>vacanSpot</Text>
    </RootView>
  );
}

export default App;

const RootView = styled.View`
  padding-top: ${Platform.OS === 'android' ? 0 : getStatusBarHeight()}px;
  padding-bottom: ${getBottomSpace()}px;
`;
