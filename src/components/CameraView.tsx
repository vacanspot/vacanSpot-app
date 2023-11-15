import React, {useEffect, useRef, useState} from 'react';
import {styled} from 'styled-components/native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import Controller from './Controller';
import Reanimated from 'react-native-reanimated';

import {Slider} from '@react-native-assets/slider';
import {useSearchAddress} from '../hook/query/search';
import Geolocation from '@react-native-community/geolocation';

const appLogo = require('../assets/app_logo.png');
const iconLocation = require('../assets/icon-location.png');

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

const CameraView = () => {
  const {mutate} = useSearchAddress();

  const camera = useRef<Camera>(null);

  const [opacity, setOpacity] = useState(30);
  const [guideImage, setGuideImage] = useState<string | null>(null);
  const [cameraFace, setCameraFace] = useState<'back' | 'front'>('back');
  const [address, setAddress] = useState('');

  const devices = useCameraDevices();
  const device = devices[cameraFace];

  const handleGuideImage = (image: string | null) => {
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

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      mutate(
        {
          x: info.coords.longitude,
          y: info.coords.latitude,
        },
        {
          onSuccess: res => {
            if (res) {
              setAddress(res);
            }
          },
        },
      );
    });
  }, [address, mutate]);

  if (device == null) {
    return <Wrapper />;
  }
  return (
    <Wrapper>
      <Header>
        <View
          style={{
            position: 'relative',
            width: 50,
            height: 50,
          }}>
          <Image
            source={appLogo}
            style={{
              position: 'absolute',
              top: -60,
              left: -20,
              width: 100,
              height: 100,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 4,
            justifyContent: 'center',
          }}>
          <Image source={iconLocation} style={{width: 16, height: 16}} />
          {address ? (
            <></>
          ) : (
            // <Text style={{color: '#352E1E', fontSize: 18}}>{address}</Text>
            <ActivityIndicator />
          )}
        </View>
      </Header>
      <View
        style={{
          position: 'absolute',
          top: 100,
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').width + 80,
        }}>
        <ReanimatedCamera
          ref={camera}
          device={device}
          isActive={true}
          style={StyleSheet.absoluteFill}
          enableZoomGesture={false}
          orientation="portrait"
          photo={true}
        />
      </View>
      {guideImage && (
        <>
          <View
            style={{
              zIndex: 2,
              position: 'absolute',
              top: 100,
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').width + 80,
              opacity: opacity / 100,
            }}>
            <Image
              source={{uri: guideImage}}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <SliderView>
            <Slider
              style={{
                width: 200,
                height: 40,
              }}
              minimumValue={0} // Minimum value
              maximumValue={100} // Maximum value
              thumbTintColor="#FA8F21" // The color of the slider's thumb
              value={opacity} // set the current slider's value
              onValueChange={value => setOpacity(value)}
              step={0} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
              minimumTrackTintColor="grey" // The track color before the current value
              maximumTrackTintColor="grey" // The track color after the current value
              vertical={false} // If true, the slider will be drawn vertically
              inverted={false} // If true, min value will be on the right, and max on the left
              enabled={true} // If false, the slider won't respond to touches anymore
              trackHeight={4} // The track's height in pixel
              thumbSize={15} // The thumb's size in pixel
              slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
            />
          </SliderView>
        </>
      )}
      <Controller
        onGuideImage={handleGuideImage}
        camera={camera}
        onCameraFace={() => {
          setCameraFace(prev => (prev === 'back' ? 'front' : 'back'));
        }}
      />
    </Wrapper>
  );
};

export default CameraView;

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
  padding: 0 24px;
`;

const SliderView = styled.View`
  z-index: 999;
  position: absolute;
  top: ${Dimensions.get('screen').width + 140};
  width: 100%;
  align-items: center;
`;