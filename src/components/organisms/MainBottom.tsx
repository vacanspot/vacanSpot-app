import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '@/constants/colors';

const MainBottom = () => {
  return (
    <View style={styles.Container}>
      <TouchableOpacity>
        <Text>사진첩</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>포즈</Text>
      </TouchableOpacity>
      <View style={styles.CaptureButtonOutLine}>
        <TouchableOpacity style={styles.CaptureButton} />
      </View>
      <TouchableOpacity>
        <Text>화면전환</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>설정</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainBottom;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
