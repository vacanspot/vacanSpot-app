import React, {useRef} from 'react';
import {COLORS} from '@/constants/colors';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-screen-helper';
import Assets from 'assets';
import {CameraScreen, MainBottom} from '@/components/organisms';
import {Camera} from 'react-native-vision-camera';

const Main = () => {
  const camera = useRef<Camera>(null);

  return (
    <View>
      <View style={styles.Header}>
        <Image style={styles.Logo} source={Assets.logo} />
        <Text style={styles.HeaderAppName}>VACANSPOT</Text>
      </View>
      <View style={styles.CameraArea}>
        <CameraScreen camera={camera} />
      </View>
      <View style={styles.Bottom}>
        <MainBottom camera={camera} />
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.painBeige,
    flexDirection: 'row',
  },
  HeaderAppName: {
    marginTop: 2,
    marginLeft: 2,
    color: COLORS.main,
  },
  CameraArea: {
    width: '100%',
    height:
      Dimensions.get('screen').height -
      getStatusBarHeight() -
      getBottomSpace() -
      220,
  },
  Bottom: {
    width: '100%',
    height: 220,
    paddingTop: 12,
    paddingBottom: getBottomSpace(),
    paddingHorizontal: 20,
    backgroundColor: COLORS.painBeige,
  },
});
