import {atom} from 'recoil';

export const cameraFlashState = atom({
  key: 'cameraFlashState',
  default: false,
});

export const settingPoseState = atom({
  key: 'settingPoseState',
  default: false,
});

export const poseResizeState = atom<'height' | 'size'>({
  key: 'poseAdjustHeightState',
  default: 'height',
});

export const poseReferenceState = atom({
  key: 'poseReferenceState',
  default: undefined,
});
