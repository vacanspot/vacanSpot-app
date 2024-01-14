import React, {useEffect} from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Reanimated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import PoseReference from '@/components/organisms/CameraScreen/PoseReference';
import {useIsFocused} from '@react-navigation/core';
import {useIsForeground} from '@/hook/useIsForeground';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import {SystemErrorModal} from '@/components/modals';
import {COLORS} from '@/constants/colors';
import {CameraProps} from '@/screens/Main';
import {BottomHeight, HeaderHeight} from '@/constants/layout';

interface CameraHandlerProps {
  deviceType: 'back' | 'front';
}

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

const CameraHandler = ({
  camera,
  deviceType,
}: CameraHandlerProps & CameraProps) => {
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

  const zoom = useSharedValue(0);
  const minZoom = device?.minZoom ?? 1;
  const maxZoom = Math.min(device?.maxZoom ?? 1, 5);
  const neutralZoom = device?.neutralZoom ?? 1;

  const layoutHeight = HeaderHeight + BottomHeight; // Header, Bottom 영역 높이
  const SCREEN_HEIGHT = Platform.select<number>({
    android: Dimensions.get('screen').height - layoutHeight,
    ios: Dimensions.get('window').height - layoutHeight,
  }) as number;
  const SCREEN_WIDTH = Dimensions.get('window').width;

  const format = useCameraFormat(device, [
    {photoAspectRatio: SCREEN_HEIGHT / SCREEN_WIDTH}, // 카메라 비율
    {
      photoResolution: {
        // 카메라 영역 높이와 너비
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
      },
    },
  ]);

  const cameraAnimatedProps = useAnimatedProps(() => {
    const z = Math.max(Math.min(zoom.value, maxZoom), minZoom);
    return {
      zoom: z,
    };
  }, [maxZoom, minZoom, zoom]);

  const onPinchGesture = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    {startZoom?: number}
  >({
    onStart: (_, context) => {
      context.startZoom = zoom.value;
    },
    onActive: (event, context) => {
      const startZoom = context.startZoom ?? 0;
      const scale = interpolate(
        event.scale,
        [1 - 1 / 3, 1, 3],
        [-1, 0, 1],
        Extrapolate.CLAMP,
      );
      zoom.value = interpolate(
        scale,
        [-1, 0, 1],
        [minZoom, startZoom, maxZoom],
        Extrapolate.CLAMP,
      );
    },
  });

  useEffect(() => {
    zoom.value = neutralZoom;
  }, [neutralZoom, zoom]);

  if (!device) {
    return (
      <View style={styles.Wrapper}>
        <SystemErrorModal text="카메라 정보를 가져올 수 없습니다." />
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={styles.Camera}>
      <PinchGestureHandler onGestureEvent={onPinchGesture} enabled={isActive}>
        <Reanimated.View style={StyleSheet.absoluteFill}>
          <TapGestureHandler numberOfTaps={2}>
            <ReanimatedCamera
              ref={camera}
              style={styles.Camera}
              device={device}
              format={format}
              isActive={isActive}
              enableZoomGesture={false}
              animatedProps={cameraAnimatedProps}
              photo
              enableHighQualityPhotos
            />
          </TapGestureHandler>
          <PoseReference />
        </Reanimated.View>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

export default CameraHandler;

const styles = StyleSheet.create({
  Wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.black,
  },
  Camera: {
    width: '100%',
    height: '100%',
  },
});
