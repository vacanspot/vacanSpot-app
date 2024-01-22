import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FadeModal} from '@/components/modals';
import {COLORS} from '@/constants/colors';

interface ReqGrantModalProps {
  text: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  canClose?: boolean;
  require?: boolean;
}

const ReqGrantModal = ({
  text,
  visible,
  setVisible,
  canClose = false,
  require = true,
}: ReqGrantModalProps) => {
  const closeModal = () => {
    setVisible(false);
  };

  const linkToSetting = () => {
    Linking.openSettings();
  };

  return (
    <FadeModal
      visible={visible}
      onRequestClose={closeModal}
      content={
        <>
          {require && <Text style={styles.Title}>필수 권한 허용 안내</Text>}
          <Text style={styles.Content}>{text} 허용이 필요합니다.</Text>
        </>
      }
      button={
        <View style={styles.ButtonWrapper}>
          {canClose && (
            <TouchableOpacity
              style={styles.CancleButton}
              onPress={closeModal}
              activeOpacity={0.8}>
              <Text style={styles.CancleButtonText}>닫기</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.CloseButton}
            onPress={linkToSetting}
            activeOpacity={0.8}>
            <Text style={styles.CloseButtonText}>설정으로 가기</Text>
          </TouchableOpacity>
        </View>
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
  Content: {
    textAlign: 'center',
  },
  ButtonWrapper: {
    flexDirection: 'row',
  },
  CloseButtonText: {
    color: COLORS.white,
  },
  CloseButton: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.main,
  },
  CancleButtonText: {
    color: COLORS.main,
  },
  CancleButton: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderTopColor: COLORS.main,
    borderColor: COLORS.white,
    borderWidth: 1,
  },
});
