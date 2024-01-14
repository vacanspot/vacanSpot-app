import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import {useIsFocused} from '@react-navigation/core';
import {useIsForeground} from '@/hook/useIsForeground';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import {SystemErrorModal} from '@/components/modals';
import {COLORS} from '@/constants/colors';
import Reanimated, {
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import {CameraProps} from '@/screens/Main';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {BottomHeight, HeaderHeight} from '@/constants/layout';

interface CameraHandlerProps {
  deviceType: 'back' | 'front';
}

Reanimated.addWhitelistedNativeProps({
  zoom: true,
});
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

const CameraTest = ({camera, deviceType}: CameraHandlerProps & CameraProps) => {
  const device = useCameraDevice(deviceType, {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });

  const isFocussed = useIsFocused();
  const isForeground = useIsForeground();
  const isActive = isFocussed && isForeground;

  const zoom = useSharedValue(1.5); // 기본카메라 초기 확대값과 일치
  const zoomOffset = useSharedValue(0);
  const gesture = Gesture.Pinch()
    .onBegin(() => {
      zoomOffset.value = zoom.value;
    })
    .onUpdate(event => {
      zoom.value = Math.max(0.5, Math.min(zoomOffset.value * event.scale, 6.5));
    });

  const animatedProps = useAnimatedProps(
    () => ({zoom: deviceType === 'back' ? zoom.value : 0}),
    [zoom],
  );

  const format = useCameraFormat(device, [
    {
      photoResolution: {
        // 카메라 영역 높이와 너비
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - BottomHeight - HeaderHeight,
      },
    },
  ]);

  if (!device) {
    return (
      <View style={styles.Wrapper}>
        <SystemErrorModal text="카메라 정보를 가져올 수 없습니다." />
      </View>
    );
  }
  return (
    <GestureDetector gesture={gesture}>
      <ReanimatedCamera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        animatedProps={animatedProps}
        enableHighQualityPhotos
        photo
        format={format}
      />
    </GestureDetector>
  );
};

export default CameraTest;

const styles = StyleSheet.create({
  Wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.black,
  },
});
