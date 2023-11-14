import React from 'react';
import {COLORS} from '@/constants/colors';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-screen-helper';
import Assets from 'assets';
import {MainBottom} from '@/components';

const Main = () => {
  return (
    <View>
      <View style={styles.Header}>
        <Image source={Assets.logo} width={32} height={32} />
      </View>
      <View style={styles.CameraArea} />
      <View style={styles.Bottom}>
        <MainBottom />
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  Header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: getStatusBarHeight(),
    paddingBottom: 12,
    paddingHorizontal: 20,
    backgroundColor: COLORS.painBeige,
  },
  CameraArea: {
    width: '100%',
    height:
      Dimensions.get('screen').height -
      getStatusBarHeight() -
      getBottomSpace() -
      240,
  },
  Bottom: {
    width: '100%',
    height: 240,
    paddingTop: 12,
    paddingBottom: getBottomSpace(),
    paddingHorizontal: 20,
    backgroundColor: COLORS.painBeige,
  },
});
