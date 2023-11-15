import React from 'react';
import {SystemErrorModal} from '@/components/modals';
import {useState} from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const PhotosButton = () => {
  const [showDisableAccessPhotos, setShowDisableAccessPhotos] = useState(false);

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
        <Text>사진첩</Text>
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
});
