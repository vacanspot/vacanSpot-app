import {atom} from 'recoil';

export const cameraFlashState = atom({
  key: 'cameraFlashState',
  default: false,
});

export const poseReferenceState = atom({
  key: 'poseReferenceState',
  default: undefined,
});
