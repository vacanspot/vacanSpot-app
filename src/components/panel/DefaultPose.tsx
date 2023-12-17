import React from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS} from '@/constants/colors';
import Assets from 'assets';
import {ImageList} from '@/components/organisms';

const DefaultPose = () => {
  return (
    <View style={styles.Container}>
      <ImageList
        data={Assets.pose_recommend?.map((item, index) => {
          return {
            id: `${index}_${Math.random().toString(16).substring(2, 11)}`,
            image: item,
            canDelete: false,
          };
        })}
      />
    </View>
  );
};

export default DefaultPose;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
  },
});
