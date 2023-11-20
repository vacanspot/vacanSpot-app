import React from 'react';
import {StyleSheet, View} from 'react-native';
import PhotosButton from './PhotosButton';
import CaptureButton from './CaptureButton';
import {Camera} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from 'App';
import Assets from 'assets';
import {Icon} from '@/components/atom';

interface MainBottomProps {
  camera: React.RefObject<Camera>;
  setIsTakenPhoto: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainBottom = ({camera, setIsTakenPhoto}: MainBottomProps) => {
  const navigation = useNavigation<StackNavigation>();

  return (
    <>
      <View style={styles.Section}>
        <PhotosButton />
      </View>
      <View style={styles.Section}>
        <CaptureButton camera={camera} setIsTakenPhoto={setIsTakenPhoto} />
      </View>
      <View style={styles.Section}>
        <Icon
          type="Primary"
          onPress={() => navigation.navigate('Pose')}
          iconSource={Assets.pose}
          iconText="포즈"
        />
        <Icon
          type="Primary"
          onPress={() => navigation.navigate('Favorite')}
          iconSource={Assets.favorite}
          iconText="MY"
          width={24}
          height={24}
        />
      </View>
    </>
  );
};

export default MainBottom;

const styles = StyleSheet.create({
  Section: {
    flex: 1,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
