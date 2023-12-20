import React, {useState} from 'react';
import {COLORS} from '@/constants/colors';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {ReqGrantModal} from '@/components/modals';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {cameraFlashState, takePhotoState} from '@/recoil/atom/camera';

interface CaptureButtonProps {
  camera: React.RefObject<Camera>;
}

const CaptureButton = ({camera}: CaptureButtonProps) => {
  const [failToSavePhoto, setFailToSavePhoto] = useState(false);

  const setIsTakenPhoto = useSetRecoilState(takePhotoState);
  const isOnFlash = useRecoilValue(cameraFlashState);

  const takePhoto = () => {
    if (camera.current) {
      setIsTakenPhoto(true);

      camera.current
        .takePhoto({enableShutterSound: false, flash: isOnFlash ? 'on' : 'off'})
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
      <ReqGrantModal
        text={`촬영 이미지를 저장하기 위해${'\n'}사진첩 접근 권한`}
        visible={failToSavePhoto}
        setVisible={setFailToSavePhoto}
      />
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
