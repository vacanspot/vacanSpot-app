import {ImageList} from '@/components/organisms';
import {COLORS} from '@/constants/colors';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Pose = () => {
  return (
    <View style={styles.Container}>
      <ImageList />
    </View>
  );
};

export default Pose;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
  },
});
