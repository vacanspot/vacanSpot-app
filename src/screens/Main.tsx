import React, {useRef} from 'react';
import {COLORS} from '@/constants/colors';
import {Dimensions, StyleSheet, View} from 'react-native';
import {CameraScreen, MainBottom} from '@/components/organisms';
import {Camera} from 'react-native-vision-camera';
import Header from '@/components/organisms/Header';
import {BottomHeight, HeaderHeight} from '@/constants/layout';

export interface CameraProps {
  camera: React.RefObject<Camera>;
}

const Main = () => {
  const camera = useRef<Camera>(null);

  return (
    <View style={styles.Container}>
      <Header />
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
  Container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
