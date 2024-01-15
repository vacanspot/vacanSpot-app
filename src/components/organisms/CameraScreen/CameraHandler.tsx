import React from 'react';
import {StyleSheet, View} from 'react-native';

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
import PoseReference from '@/components/organisms/CameraScreen/PoseReference';

interface CameraHandlerProps {
  deviceType: 'back' | 'front';
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 6.5;

Reanimated.addWhitelistedNativeProps({
  zoom: true,
});
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

const CameraHandler = ({
  camera,
  deviceType,
}: CameraHandlerProps & CameraProps) => {
  const device = useCameraDevice(deviceType, {
    physicalDevices: ['ultra-wide-angle-camera', 'wide-angle-camera'],
  });

  const isFocussed = useIsFocused();
  const isForeground = useIsForeground();
  const isActive = isFocussed && isForeground;

  const zoom = useSharedValue(device?.neutralZoom || 1);
  const zoomOffset = useSharedValue(0);
  const gesture = Gesture.Pinch()
    .onBegin(() => {
      zoomOffset.value = zoom.value;
    })
    .onUpdate(event => {
      zoom.value = Math.max(
        MIN_ZOOM,
        Math.min(zoomOffset.value * event.scale, MAX_ZOOM),
      );
    });

  const animatedProps = useAnimatedProps(() => ({zoom: zoom.value}), [zoom]);

  // 카메라 해상도 설정
  const format = useCameraFormat(device, [
    {photoResolution: 'max'}, // 사진 해상도
    {videoResolution: 'max'}, // 동영상 해상도 - 미리보기(화면) 해상도에 영향이 있음
  ]);

  if (!device) {
    return (
      <View style={styles.Wrapper}>
        <SystemErrorModal text="카메라 정보를 가져올 수 없습니다." />
      </View>
    );
  }
  return (
    <>
      <GestureDetector gesture={gesture}>
        <ReanimatedCamera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive}
          animatedProps={animatedProps}
          format={format}
          enableHighQualityPhotos
          photo
        />
      </GestureDetector>
      <PoseReference />
    </>
  );
};

export default CameraHandler;

const styles = StyleSheet.create({
  Wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.black,
  },
});
