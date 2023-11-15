import React, {useState} from 'react';
import {COLORS} from '@/constants/colors';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {SystemErrorModal} from '@/components/modals';

interface CaptureButtonProps {
  camera: React.RefObject<Camera>;
}

const CaptureButton = ({camera}: CaptureButtonProps) => {
  const [failToSavePhoto, setFailToSavePhoto] = useState(false);

  const takePhoto = () => {
    if (camera.current) {
      camera.current
        .takePhoto()
        .then(photo => {
          CameraRoll.save(`file://${photo.path}`, {
            type: 'photo',
          }).catch(() => setFailToSavePhoto(true));
        })
        .catch(() => setFailToSavePhoto(true));
    }
  };

  return (
    <>
      {failToSavePhoto && <SystemErrorModal text="사진 저장을 실패했습니다." />}
      <TouchableOpacity style={styles.TouchArea} onPress={takePhoto}>
        <View style={styles.CaptureButtonOutLine}>
          <View style={styles.CaptureButton} />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default CaptureButton;

const styles = StyleSheet.create({
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
