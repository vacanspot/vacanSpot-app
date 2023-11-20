import React, {useEffect, useMemo, useRef, useState} from 'react';
import {COLORS} from '@/constants/colors';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-screen-helper';
import Assets from 'assets';
import {CameraScreen, MainBottom} from '@/components/organisms';
import {Camera} from 'react-native-vision-camera';

const Main = () => {
  const camera = useRef<Camera>(null);
  const [isTakenPhoto, setIsTakenPhoto] = useState(false);
  const colorAnim = useMemo(() => new Animated.Value(0), []); // 초기 배경색 애니메이션 값

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
  }, [colorAnim, isTakenPhoto]);

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0)', 'rgba(255, 255, 255, 0.7)'], // 투명에서 검은색으로
  });

  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <Image style={styles.Logo} source={Assets.logo} />
        <Text style={styles.HeaderAppName}>VACANSPOT</Text>
      </View>
      <View style={styles.CameraArea}>
        <Animated.View style={{...styles.AnimationView, backgroundColor}} />
        <CameraScreen camera={camera} />
      </View>
      <View style={styles.Bottom}>
        <MainBottom camera={camera} setIsTakenPhoto={setIsTakenPhoto} />
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  Container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  Logo: {
    width: 32,
    height: 32,
  },
  Header: {
    width: '100%',
    alignItems: 'center',
    paddingTop: getStatusBarHeight(),
    paddingBottom: 12,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
  },
  HeaderAppName: {
    marginTop: 2,
    marginLeft: 2,
    color: COLORS.main,
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  CameraArea: {
    width: '100%',
    height:
      Dimensions.get('window').height -
      getStatusBarHeight() -
      getBottomSpace() -
      220,
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
  Bottom: {
    width: '100%',
    height: 180 + getBottomSpace(),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: getBottomSpace(),
    backgroundColor: COLORS.white,
  },
});
