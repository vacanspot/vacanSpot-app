import React, {useEffect} from 'react';
import {SystemErrorModal} from '@/components/modals';
import {useState} from 'react';
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '@/constants/colors';
import {
  CameraRoll,
  PhotoIdentifiersPage,
} from '@react-native-camera-roll/camera-roll';
import {Icon} from '@/components/atom';
import Assets from 'assets';

const PhotosButton = () => {
  const [showDisableAccessPhotos, setShowDisableAccessPhotos] = useState(false);
  const [firstPhoto, setFirstPhoto] = useState<PhotoIdentifiersPage | null>(
    null,
  );

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 1,
    }).then(data => setFirstPhoto(data));
  }, []);

  const openPhotos = () => {
    switch (Platform.OS) {
      case 'ios':
        Linking.openURL('photos-redirect://');
        break;
      case 'android':
        Linking.openURL('content://media/internal/images/media');
        break;
      default:
        setShowDisableAccessPhotos(true);
    }
  };

  return (
    <>
      {showDisableAccessPhotos && (
        <SystemErrorModal text="사진첩에 접근할 수 없습니다." />
      )}
      <TouchableOpacity style={styles.TouchArea} onPress={openPhotos}>
        <View style={styles.PhotoButtonOutLine}>
          {firstPhoto?.edges[0] ? (
            <Image
              source={{uri: firstPhoto.edges[0].node.image.uri}}
              style={styles.photoStyle}
            />
          ) : (
            <Icon
              type="Primary"
              iconSource={Assets.photo}
              width={28}
              height={28}
            />
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default PhotosButton;

const styles = StyleSheet.create({
  TouchArea: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PhotoButtonOutLine: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.main,
  },
  photoStyle: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
});
