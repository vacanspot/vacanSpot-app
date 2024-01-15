import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {useIsForeground} from '@/hook/useIsForeground';
import {
  Camera,
  Point,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import {SystemErrorModal} from '@/components/modals';
import {COLORS} from '@/constants/colors';
import Reanimated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
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

  // 카메라 해상도 설정
  const format = useCameraFormat(device, [
    {photoResolution: 'max'}, // 사진 해상도
    {videoResolution: 'max'}, // 동영상 해상도 - 미리보기(화면) 해상도에 영향이 있음
  ]);

  const zoom = useSharedValue(device?.neutralZoom || 1);
  const zoomOffset = useSharedValue(0);
  const animatedProps = useAnimatedProps(() => ({zoom: zoom.value}), [zoom]);

  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {
      zoomOffset.value = zoom.value;
    })
    .onUpdate(event => {
      zoom.value = Math.max(
        MIN_ZOOM,
        Math.min(zoomOffset.value * event.scale, MAX_ZOOM),
      );
    });

  const [focusBoxPosition, setFocusBoxPosition] = useState({x: 0, y: 0});
  const focusIconOpacity = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: focusIconOpacity.value,
    };
  });

  const focus = useCallback((point: Point) => {
    if (camera.current && point.x && point.y) {
      camera.current.focus(point);
      setFocusBoxPosition({x: point.x - 50, y: point.y - 50});
      focusIconOpacity.value = withTiming(1, {duration: 200}, () => {
        focusIconOpacity.value = withDelay(200, withTiming(0));
      });
    }
  }, []);

  const tapGesture = Gesture.Tap().onEnd(({x, y}) => {
    runOnJS(focus)({x, y});
  });

  const composedGesture = Gesture.Exclusive(pinchGesture, tapGesture);

  if (!device) {
    return (
      <View style={styles.Wrapper}>
        <SystemErrorModal text="카메라 정보를 가져올 수 없습니다." />
      </View>
    );
  }
  return (
    <>
      <GestureDetector gesture={composedGesture}>
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
      <Reanimated.View
        style={[
          {
            ...styles.FocusBox,
            top: focusBoxPosition.y,
            left: focusBoxPosition.x,
          },
          animatedStyles,
        ]}
      />
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
  FocusBox: {
    width: 100,
    height: 100,
    position: 'absolute',
    borderWidth: 2,
    borderColor: COLORS.focus,
  },
});
