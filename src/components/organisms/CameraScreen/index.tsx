import React, {useMemo} from 'react';
import {useEffect, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useCameraPermission} from 'react-native-vision-camera';
import {COLORS} from '@/constants/colors';
import {ReqGrantModal} from '@/components/modals';
import {useRecoilState} from 'recoil';
import {takePhotoState} from '@/recoil/atom/camera';
import OptionBox from '@/components/organisms/CameraScreen/OptionBox';
import CameraHandler from '@/components/organisms/CameraScreen/CameraHandler';
import {CameraProps} from '@/screens/Main';
import CameraTest from '@/components/organisms/CameraScreen/CameraTest';

const CameraScreen = ({camera}: CameraProps) => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [deviceType, setDeviceType] = useState<'back' | 'front'>('back');
  const [showReqGrantModal, setShowReqGrantModal] = useState(false);
  const [isTakenPhoto, setIsTakenPhoto] = useRecoilState(takePhotoState);
  const colorAnim = useMemo(() => new Animated.Value(0), []); // 초기 배경색 애니메이션 값

  useEffect(() => {
    if (!hasPermission) {
      requestPermission().then(result => {
        setShowReqGrantModal(!result);
      });
    }
  }, [hasPermission, requestPermission]);

  useEffect(() => {
    if (isTakenPhoto) {
      // 화면 깜빡임 효과 (배경색 변경)
      Animated.timing(colorAnim, {
        toValue: 1, // 목표 애니메이션 값
        duration: 140, // 애니메이션 지속 시간 (짧게 설정)
        useNativeDriver: false,
      }).start(() => {
        // 애니메이션 완료 후 다시 원래 상태로
        Animated.timing(colorAnim, {
          toValue: 0, // 원래 애니메이션 값으로
          duration: 140, // 애니메이션 지속 시간 (짧게 설정)
          useNativeDriver: false,
        }).start(() => {
          setIsTakenPhoto(false);
        });
      });
    }
  }, [colorAnim, isTakenPhoto, setIsTakenPhoto]);

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0)', 'rgba(255, 255, 255, 0.7)'], // 투명에서 검은색으로
  });

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
      <Animated.View style={{...styles.AnimationView, backgroundColor}} />
      {/* <CameraHandler camera={camera} deviceType={deviceType} /> */}
      <CameraTest camera={camera} deviceType={deviceType} />
      <OptionBox deviceType={deviceType} setDeviceType={setDeviceType} />
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
  AnimationView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    pointerEvents: 'none',
  },
});
