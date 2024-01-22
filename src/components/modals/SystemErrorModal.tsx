import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '@/components/atom';
import {FadeModal} from '@/components/modals';

interface SystemErrorModalProps {
  text: string;
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SystemErrorModal = ({
  text,
  visible,
  setVisible,
}: SystemErrorModalProps) => {
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    if (setVisible) {
      setVisible(false);
    } else {
      setShowModal(false);
    }
  };

  return (
    <FadeModal
      visible={visible ?? showModal}
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
