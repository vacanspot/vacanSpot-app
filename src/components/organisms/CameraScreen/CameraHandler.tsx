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
import {useRecoilValue} from 'recoil';
import {useIsFocused} from '@react-navigation/core';
import {useIsForeground} from '@/hook/useIsForeground';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import {poseReferenceState} from '@/recoil/atom/camera';
import {SystemErrorModal} from '@/components/modals';
import {COLORS} from '@/constants/colors';
import {getBottomSpace} from 'react-native-iphone-screen-helper';
import {CameraProps} from '@/screens/Main';

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
  const poseReference = useRecoilValue(poseReferenceState);
  const device = useCameraDevice(deviceType);

  const isFocussed = useIsFocused();
  const isForeground = useIsForeground();
  const isActive = isFocussed && isForeground;

  const zoom = useSharedValue(0);
  const minZoom = device?.minZoom ?? 1;
  const maxZoom = Math.min(device?.maxZoom ?? 1, 5);
  const neutralZoom = device?.neutralZoom ?? 1;

  const SCREEN_HEIGHT = Platform.select<number>({
    android: Dimensions.get('screen').height - getBottomSpace(),
    ios: Dimensions.get('window').height,
  }) as number;
  const screenAspectRatio = SCREEN_HEIGHT / Dimensions.get('window').width;

  const format = useCameraFormat(device, [
    {fps: 60},
    {photoAspectRatio: screenAspectRatio},
    {photoResolution: 'max'},
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
            />
          </TapGestureHandler>
          {poseReference && <PoseReference poseReference={poseReference} />}
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
