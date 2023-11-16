import React from 'react';
import {useEffect, useState} from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
} from 'react-native-vision-camera';
import {COLORS} from '@/constants/colors';
import {SystemErrorModal, ReqGrantModal} from '@/components/modals';
import Assets from 'assets';
import {Icon} from '@/components/atom';
import {useRecoilState} from 'recoil';
import {cameraFlashState} from '@/recoil/atom/camera';
import Reanimated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/core';
import {useIsForeground} from '@/hook/useIsForeground';
import {getBottomSpace} from 'react-native-iphone-screen-helper';

interface CameraScreenProps {
  camera: React.RefObject<Camera>;
}

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

const CameraScreen = ({camera}: CameraScreenProps) => {
  const [deviceType, setDeviceType] = useState<'back' | 'front'>('back');
  const [showReqGrantModal, setShowReqGrantModal] = useState(false);
  const [isOnFlash, setIsOnFlash] = useRecoilState(cameraFlashState);

  const isFocussed = useIsFocused();
  const isForeground = useIsForeground();
  const isActive = isFocussed && isForeground;
  const {hasPermission, requestPermission} = useCameraPermission();

  const device = useCameraDevice(deviceType);
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

  useEffect(() => {
    if (!hasPermission) {
      requestPermission().then(result => {
        setShowReqGrantModal(!result);
      });
    }
  }, [hasPermission, requestPermission]);

  if (!device) {
    return (
      <View style={styles.Wrapper}>
        <SystemErrorModal text="카메라 정보를 가져올 수 없습니다." />
      </View>
    );
  }

  if (showReqGrantModal) {
    return (
      <View style={styles.Wrapper}>
        <ReqGrantModal
          text={`사진 촬영을 위해 카메라 권한${'\n'}`}
          visible
          setVisible={setShowReqGrantModal}
        />
      </View>
    );
  }

  return (
    <>
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
          </Reanimated.View>
        </PinchGestureHandler>
      </GestureHandlerRootView>
      <View style={styles.Controller}>
        <Icon
          type="Transparent"
          iconSource={isOnFlash ? Assets.flashOn : Assets.flashOff}
          width={24}
          height={24}
          onPress={() => setIsOnFlash(!isOnFlash)}
        />
        <Icon
          type="Transparent"
          iconSource={Assets.switch}
          width={24}
          height={24}
          onPress={() =>
            setDeviceType(deviceType === 'back' ? 'front' : 'back')
          }
        />
      </View>
    </>
  );
};

export default CameraScreen;

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
  Controller: {
    position: 'absolute',
    width: 44,
    height: '100%',
    top: 12,
    right: 12,
    gap: 12,
    justifyContent: 'flex-start',
  },
});
