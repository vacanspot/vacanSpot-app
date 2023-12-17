import {COLORS} from '@/constants/colors';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const PersonalPose = () => {
  return <View style={styles.Container} />;
};

export default PersonalPose;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
  },
  input: {
    height: 40,
    margin: 12,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteSmoke,
    padding: 10,
  },
});
