import React from 'react';
import {settingPoseValueState} from '@/recoil/atom/camera';
import {Image, StyleSheet, View} from 'react-native';
import {useRecoilValue} from 'recoil';

interface PoseReferenceProps {
  poseReference: number | string;
}

const PoseReference = ({poseReference}: PoseReferenceProps) => {
  const settingPoseValue = useRecoilValue(settingPoseValueState);

  return (
    <View style={styles.PoseController}>
      <Image
        source={
          typeof poseReference === 'number'
            ? poseReference
            : {uri: poseReference}
        }
        style={{
          ...styles.PoseReference,
          width: `${settingPoseValue.size}%`,
          height: `${settingPoseValue.size}%`,
          marginBottom: `${settingPoseValue.height}%`,
          opacity: settingPoseValue.opacity,
        }}
      />
    </View>
  );
};

export default PoseReference;

const styles = StyleSheet.create({
  PoseController: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  PoseReference: {
    resizeMode: 'contain',
  },
});
