import React from 'react';
import {COLORS} from '@/constants/colors';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const ImageItem = () => {
  return (
    <View style={styles.Container}>
      <Text>사진</Text>
    </View>
  );
};

export default ImageItem;

const styles = StyleSheet.create({
  Container: {
    maxWidth: 200,
    maxHeight: 200,
    width: (Dimensions.get('screen').width - 12 * 4) / 3,
    height: (Dimensions.get('screen').width - 12 * 4) / 3,
    backgroundColor: COLORS.white,
  },
});
