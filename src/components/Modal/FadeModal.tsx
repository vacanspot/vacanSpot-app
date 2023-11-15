import {COLORS} from '@/constants/colors';
import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';

interface FadeModalProps {
  visible: boolean;
  onRequestClose?: () => void;
  content: JSX.Element;
  button?: JSX.Element;
}

const FadeModal = ({
  visible,
  onRequestClose,
  content,
  button,
}: FadeModalProps) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.Container}>
        <View style={styles.Box}>
          <View style={styles.Content}>{content}</View>
          {button}
        </View>
      </View>
    </Modal>
  );
};

export default FadeModal;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.stormDust,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: -40,
  },
  Box: {
    width: 300,
    borderRadius: 8,
    overflow: 'hidden',
  },
  Content: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: COLORS.white,
  },
});
