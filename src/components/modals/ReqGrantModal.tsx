import {FadeModal} from '@/components/modals';
import {COLORS} from '@/constants/colors';
import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity} from 'react-native';

interface ReqGrantModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReqGrantModal = ({visible, setVisible}: ReqGrantModalProps) => {
  const handleAndroidBackButton = () => {
    setVisible(false);
  };

  const linkToSetting = () => {
    Linking.openSettings();
  };

  return (
    <FadeModal
      visible={visible}
      onRequestClose={handleAndroidBackButton}
      content={
        <>
          <Text style={styles.Title}>필수 권한 허용 안내</Text>
          <Text>사진 촬영을 위해 카메라 권한 허용이</Text>
          <Text>필요합니다.</Text>
        </>
      }
      button={
        <TouchableOpacity style={styles.CloseButton} onPress={linkToSetting}>
          <Text style={styles.CloseButtonText}>설정으로 가기</Text>
        </TouchableOpacity>
      }
    />
  );
};

export default ReqGrantModal;

const styles = StyleSheet.create({
  Title: {
    fontSize: 16,
    marginBottom: 20,
  },
  CloseButtonText: {
    color: COLORS.white,
  },
  CloseButton: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.main,
  },
});
