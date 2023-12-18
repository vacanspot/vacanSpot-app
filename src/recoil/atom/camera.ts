import {atom} from 'recoil';

export const cameraFlashState = atom({
  key: 'cameraFlashState',
  default: false,
});

export const settingPoseState = atom({
  key: 'settingPoseState',
  default: false,
});

export const settingPoseValueState = atom({
  key: 'settingPoseValueState',
  default: {
    size: 100,
    height: 0,
    opacity: 0.5,
  },
});

export const poseReferenceState = atom({
  key: 'poseReferenceState',
  default: undefined,
});
