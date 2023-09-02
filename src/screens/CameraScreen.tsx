import React, {useEffect} from 'react';
import {styled} from 'styled-components/native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import Controller from '../components/Controller';

const appLogo = require('../assets/app_logo.png');

const CameraScreen = () => {
  //   const devices = useCameraDevices('wide-angle-camera');

  const devices = useCameraDevices();
  const device = devices.back;

  console.log('devices', devices);

  useEffect(() => {
    const checkCameara = async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      if (cameraPermission !== 'granted') {
        await Camera.requestCameraPermission();
      }
    };

    checkCameara();
  }, []);

  if (device == null) {
    return <Wrapper />;
  }
  return (
    <Wrapper>
      <Header>
        <View style={{position: 'relative', width: 50, height: 50}}>
          <Image
            source={appLogo}
            style={{
              position: 'absolute',
              top: -40,
              left: -40,
              width: 100,
              height: 100,
            }}
          />
        </View>
      </Header>
      <View
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').width,
        }}>
        <Camera
          device={device}
          isActive={true}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <Controller />
    </Wrapper>
  );
};

export default CameraScreen;

const Wrapper = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  height: 160px;
  padding: 0 44px;
`;

const ShutterButton = () => {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        left: Dimensions.get('screen').width / 2 - 36,
      }}>
      <View
        style={{
          position: 'relative',
          width: 72,
          height: 72,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 36,
        }}>
        <View
          style={{
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 30,
            borderWidth: 4,
            borderColor: 'black',
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
