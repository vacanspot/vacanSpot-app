import React, {useEffect} from 'react';
import {ReqGrantModal} from '@/components/modals';
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
  const [showDisableAccessPhotos, setShowDisableAccessPhotos] = useState(true);
  const [reqAccessPhoto, setReqAccessPhoto] = useState(false);
  const [firstPhoto, setFirstPhoto] = useState<PhotoIdentifiersPage | null>(
    null,
  );

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 1,
    })
      .then(data => {
        setFirstPhoto(data);
      })
      .catch(err => {
        if (err.code === 'E_PHOTO_LIBRARY_AUTH_DENIED') {
          setShowDisableAccessPhotos(false);
        }
      });
  }, []);

  const openPhotos = () => {
    if (!showDisableAccessPhotos) {
      setReqAccessPhoto(true);
    } else {
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
    }
  };

  return (
    <>
      <ReqGrantModal
        text="사진첩 접근 권한"
        visible={reqAccessPhoto}
        setVisible={setReqAccessPhoto}
        canClose={true}
        require={false}
      />
      <TouchableOpacity style={styles.TouchArea} onPress={openPhotos}>
        <View style={styles.PhotoButtonOutLine}>
          {firstPhoto?.edges[0] ? (
            <Image
              source={{uri: firstPhoto.edges[0].node.image.uri}}
              style={styles.photoStyle}
            />
          ) : (
            <Icon
              onPress={openPhotos}
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
