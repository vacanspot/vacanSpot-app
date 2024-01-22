import {StyleSheet, View} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {StackNavigation} from 'App';
import {PrimaryIcon} from '@/components/atom';
import {useNavigation} from '@react-navigation/native';
import Assets from 'assets';
import CaptureButton from './CaptureButton';
import PhotosButton from './PhotosButton';
import PoseSetting from './PoseSetting';

interface MainBottomProps {
  camera: React.RefObject<Camera>;
}

const MainBottom = ({camera}: MainBottomProps) => {
  const navigation = useNavigation<StackNavigation>();

  return (
    <View style={styles.Container}>
      <View style={styles.SectionContainer}>
        <View style={styles.Section}>
          <PhotosButton />
        </View>
        <View style={styles.Section}>
          <CaptureButton camera={camera} />
        </View>
        <View style={styles.Section}>
          <PrimaryIcon
            onPress={() => navigation.navigate('Pose')}
            iconSource={Assets.pose}
            iconText="포즈"
          />
          <PrimaryIcon
            onPress={() => navigation.navigate('Favorite')}
            iconSource={Assets.favorite}
            iconText="MY"
            width={24}
            height={24}
          />
        </View>
      </View>
      <PoseSetting />
    </View>
  );
};

export default MainBottom;

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '100%',
  },
  SectionContainer: {
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
});
