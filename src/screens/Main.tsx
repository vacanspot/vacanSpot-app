import React, {useRef} from 'react';
import {COLORS} from '@/constants/colors';
import {Dimensions, StyleSheet, View} from 'react-native';
import {CameraScreen, MainBottom} from '@/components/organisms';
import {Camera} from 'react-native-vision-camera';
import Header from '@/components/organisms/Header';
import {BottomHeight, HeaderHeight} from '@/constants/layout';
import {getStatusBarHeight} from 'react-native-iphone-screen-helper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export interface CameraProps {
  camera: React.RefObject<Camera>;
}

const Main = () => {
  const camera = useRef<Camera>(null);

  return (
    <GestureHandlerRootView>
      <View style={styles.Container}>
        <View style={styles.Header}>
          <Header />
        </View>
        <View style={styles.CameraArea}>
          <CameraScreen camera={camera} />
        </View>
        <View style={styles.Bottom}>
          <MainBottom camera={camera} />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default Main;

const styles = StyleSheet.create({
  Container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  Header: {
    width: '100%',
    height: HeaderHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: getStatusBarHeight(),
    paddingBottom: 12,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
    zIndex: 1,
  },
  CameraArea: {
    width: '100%',
    height: Dimensions.get('window').height - HeaderHeight - BottomHeight,
  },
  Bottom: {
    width: '100%',
    height: BottomHeight,
    backgroundColor: COLORS.white,
    zIndex: 1,
  },
});
