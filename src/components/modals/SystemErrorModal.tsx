import {Button} from '@/components/atom';
import {FadeModal} from '@/components/modals';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface SystemErrorModalProps {
  text: string;
}

const SystemErrorModal = ({text}: SystemErrorModalProps) => {
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => setShowModal(false);

  return (
    <FadeModal
      visible={showModal}
      onRequestClose={closeModal}
      content={<Text>{text}</Text>}
      button={
        <View style={styles.ButtonWrapper}>
          <Button type="Primary" onPress={closeModal}>
            <Text>닫기</Text>
          </Button>
        </View>
      }
    />
  );
};

export default SystemErrorModal;

const styles = StyleSheet.create({
  ButtonWrapper: {
    height: 40,
  },
});
