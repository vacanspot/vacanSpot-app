import React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {COLORS} from '@/constants/colors';
import {NoDeviceErrorModal, ReqGrantModal} from '@/components/modals';

const CameraScreen = () => {
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
        <NoDeviceErrorModal />
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
      <Camera style={styles.Camera} device={device} isActive={true} />
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
