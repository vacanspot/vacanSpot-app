import React, {useEffect, useState} from 'react';
import {styled} from 'styled-components/native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';
import Controller from '../components/Controller';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-screen-helper';

const appLogo = require('../assets/app_logo.png');

const CameraScreen = () => {
  const [guideImage, setGuideImage] = useState<ImageSourcePropType | null>(
    null,
  );
  //   const devices = useCameraDevices('wide-angle-camera');

  const devices = useCameraDevices();
  const device = devices.back;

  console.log('devices', devices);

  const handleGuideImage = (image: ImageSourcePropType) => {
    setGuideImage(image);
  };

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
          position: 'absolute',
          top: Dimensions.get('screen').width / 2,
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
      {guideImage && (
        <View
          style={{
            zIndex: 2,
            position: 'absolute',
            top: Dimensions.get('screen').width / 2,
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').width,
            opacity: 0.4,
          }}>
          <Image source={guideImage} style={{width: '100%', height: '100%'}} />
        </View>
      )}
      <Controller onGuideImage={handleGuideImage} />
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
