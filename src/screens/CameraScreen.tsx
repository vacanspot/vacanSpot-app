import React, {useEffect, useState} from 'react';
import {styled} from 'styled-components/native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Dimensions, Image, ImageSourcePropType, View} from 'react-native';
import Controller from '../components/Controller';

const appLogo = require('../assets/app_logo.png');

const CameraScreen = () => {
  const [guideImage, setGuideImage] = useState<ImageSourcePropType | null>(
    null,
  );
  //   const devices = useCameraDevices('wide-angle-camera');

  const devices = useCameraDevices();
  const device = devices.back;

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
        <Slider />
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

const Slider = styled.View`
  z-index: 3;
  position: absolute;
  bottom: 20px;
  height: 20px;
  width: 20px;
  background-color: red;
  left: ${Dimensions.get('screen').width / 2};
`;
