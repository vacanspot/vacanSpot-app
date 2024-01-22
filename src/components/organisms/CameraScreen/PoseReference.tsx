import {Image, StyleSheet, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {poseReferenceState, settingPoseValueState} from '@/recoil/atom/camera';

const PoseReference = () => {
  const poseReference = useRecoilValue(poseReferenceState);
  const settingPoseValue = useRecoilValue(settingPoseValueState);

  if (!poseReference) {
    return null;
  }
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
