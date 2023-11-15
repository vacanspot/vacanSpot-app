import React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {COLORS} from '@/constants/colors';
import {SystemErrorModal, ReqGrantModal} from '@/components/modals';

interface CameraScreenProps {
  camera: React.RefObject<Camera>;
}

const CameraScreen = ({camera}: CameraScreenProps) => {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();

  const [showReqGrantModal, setShowReqGrantModal] = useState(false);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission().then(result => {
        setShowReqGrantModal(!result);
      });
    }
  }, [hasPermission, requestPermission]);

  if (!device) {
    return (
      <View style={styles.Wrapper}>
        <SystemErrorModal text="카메라 정보를 가져올 수 없습니다." />
      </View>
    );
  }

  if (showReqGrantModal) {
    return (
      <View style={styles.Wrapper}>
        <ReqGrantModal visible setVisible={setShowReqGrantModal} />
      </View>
    );
  }

  return (
    <View style={styles.Wrapper}>
      <Camera
        style={styles.Camera}
        device={device}
        isActive={true}
        ref={camera}
        photo
      />
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  Wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.black,
  },
  Camera: {
    width: '100%',
    height: '100%',
  },
});
