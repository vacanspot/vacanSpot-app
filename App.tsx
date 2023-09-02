import React, {useEffect, useState} from 'react';
import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-screen-helper';
import {styled} from 'styled-components/native';
import {Platform, StatusBar} from 'react-native';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';
import Geolocation from '@react-native-community/geolocation';
import CameraScreen from './src/screens/CameraScreen';

const App = () => {
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => console.log(info));
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAppLoaded(true);
    }, 3000);
  }, []);

  return appLoaded ? (
  <>
   <StatusBar barStyle="light-content" />
      <RootView>
        <CameraScreen />
      </RootView>
      </>
  ) : (
    <SplashView>
      <LottieView
        source={require('./assets/splash.json')}
        autoPlay
        loop
        resizeMode="cover"
        style={{
          width: 200,
          height: 200,
        }}
      />
    </SplashView>
  );
};

export default App;

const RootView = styled.View`
  padding-top: ${Platform.OS === 'android' ? 0 : getStatusBarHeight()}px;
  padding-bottom: ${getBottomSpace()}px;
  flex: 1;
  background-color: black;
`;

const SplashView = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: 0;
  background-color: #fff7f1;
`;
