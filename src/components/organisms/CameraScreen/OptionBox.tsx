import React from 'react';

import {TransparentIcon} from '@/components/atom';
import {StyleSheet, View} from 'react-native';
import Assets from 'assets';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {
  cameraFlashState,
  poseReferenceState,
  settingPoseState,
} from '@/recoil/atom/camera';

interface OptionBoxProps {
  poseReference?: number | string;
  deviceType: 'back' | 'front';
  setDeviceType: React.Dispatch<React.SetStateAction<'back' | 'front'>>;
}

const OptionBox = ({
  poseReference,
  deviceType,
  setDeviceType,
}: OptionBoxProps) => {
  const setPoseReference = useSetRecoilState(poseReferenceState);
  const [isOnFlash, setIsOnFlash] = useRecoilState(cameraFlashState);
  const [settingPose, setSettingPose] = useRecoilState(settingPoseState);

  return (
    <View style={styles.IconController}>
      <TransparentIcon
        iconSource={isOnFlash ? Assets.flashOn : Assets.flashOff}
        width={24}
        height={24}
        onPress={() => setIsOnFlash(!isOnFlash)}
      />
      <TransparentIcon
        iconSource={Assets.switch}
        width={24}
        height={24}
        onPress={() => setDeviceType(deviceType === 'back' ? 'front' : 'back')}
      />
      {poseReference && (
        <>
          <TransparentIcon
            iconSource={settingPose ? Assets.poseSettingOn : Assets.poseSetting}
            width={24}
            height={24}
            onPress={() => setSettingPose(!settingPose)}
          />
          <TransparentIcon
            iconSource={Assets.cancleWhite}
            width={24}
            height={24}
            onPress={() => {
              setSettingPose(false);
              setPoseReference(undefined);
            }}
          />
        </>
      )}
    </View>
  );
};

export default OptionBox;

const styles = StyleSheet.create({
  IconController: {
    position: 'absolute',
    width: 44,
    height: '100%',
    top: 12,
    right: 12,
    gap: 12,
    justifyContent: 'flex-start',
    zIndex: 2,
  },
});
