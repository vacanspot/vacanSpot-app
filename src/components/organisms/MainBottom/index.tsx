import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '@/constants/colors';
import PhotosButton from './PhotosButton';
import CaptureButton from './CaptureButton';
import {Camera} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from 'App';

interface MainBottomProps {
  camera: React.RefObject<Camera>;
}

const MainBottom = ({camera}: MainBottomProps) => {
  const navigation = useNavigation<StackNavigation>();

  return (
    <View style={styles.Container}>
      <View style={styles.Section}>
        <PhotosButton />
      </View>
      <View style={styles.Section}>
        <CaptureButton camera={camera} />
      </View>
      <View style={styles.Section}>
        <TouchableOpacity
          style={styles.TouchArea}
          onPress={() => navigation.navigate('Pose')}>
          <Text>포즈</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.TouchArea}
          onPress={() => navigation.navigate('Favorite')}>
          <Text>하트</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainBottom;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Section: {
    flex: 1,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  TouchArea: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  CaptureButtonOutLine: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: COLORS.main,
  },
  CaptureButton: {
    width: 68,
    height: 68,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.main,
    borderRadius: 34,
  },
});
