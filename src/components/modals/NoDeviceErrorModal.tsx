import {FadeModal} from '@/components/modals';
import React from 'react';
import {BackHandler, Text} from 'react-native';

const NoDeviceErrorModal = () => {
  const handleAndroidBackButton = () => {
    BackHandler.exitApp();
  };

  return (
    <FadeModal
      visible
      onRequestClose={handleAndroidBackButton}
      content={<Text>카메라 정보를 받아올 수 없습니다.</Text>}
    />
  );
};

export default NoDeviceErrorModal;
