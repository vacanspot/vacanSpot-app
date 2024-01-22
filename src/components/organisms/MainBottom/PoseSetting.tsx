import React, {useState, useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {PrimaryIcon} from '@/components/atom';
import {COLORS} from '@/constants/colors';
import {BottomHeight} from '@/constants/layout';
import {settingPoseState, settingPoseValueState} from '@/recoil/atom/camera';
import {Slider} from '@react-native-assets/slider';
import Assets from 'assets';

const settingValue = {
  height: {
    minimumValue: 0,
    maximumValue: 60,
    step: 5,
  },
  size: {
    minimumValue: 80,
    maximumValue: 140,
    step: 5,
  },
  opacity: {
    minimumValue: 0.2,
    maximumValue: 1,
    step: 0.1,
  },
};

const PoseSetting = () => {
  const settingPose = useRecoilValue(settingPoseState);
  const [settingPoseValue, setSettingPoseValue] = useRecoilState(
    settingPoseValueState,
  );
  const [settingState, setSettingState] = useState<
    'height' | 'size' | 'opacity'
  >('height');
  const slideAnim = useRef(new Animated.Value(BottomHeight)).current;

  useEffect(() => {
    if (settingPose) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
    if (!settingPose) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: BottomHeight,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [settingPose, slideAnim]);

  return (
    <Animated.View
      style={{
        ...styles.SlideUpContainer,
        height: BottomHeight,
        transform: [
          {
            translateY: slideAnim,
          },
        ],
      }}>
      <Slider
        minimumValue={settingValue[settingState].minimumValue}
        maximumValue={settingValue[settingState].maximumValue}
        style={styles.Slider}
        thumbStyle={styles.Thumb}
        thumbSize={32}
        minimumTrackTintColor={COLORS.main}
        maximumTrackTintColor={COLORS.whiteSmoke}
        trackHeight={4}
        value={settingPoseValue[settingState]}
        onValueChange={value =>
          setSettingPoseValue(prev => {
            return {...prev, [settingState]: value};
          })
        }
        step={settingValue[settingState].step}
        enabled={true}
        slideOnTap={true}
      />
      <>
        <View style={styles.SectionContainer}>
          <View style={styles.Section}>
            <PrimaryIcon
              iconText="높이"
              isActive={settingState === 'height'}
              onPress={() => setSettingState('height')}
              iconSource={
                settingState === 'height'
                  ? Assets.adjustHeight
                  : Assets.adjustHeightOff
              }
            />
          </View>
          <View style={styles.Section}>
            <PrimaryIcon
              iconText="크기"
              isActive={settingState === 'size'}
              onPress={() => setSettingState('size')}
              iconSource={
                settingState === 'size' ? Assets.resize : Assets.resizeOff
              }
            />
          </View>
          <View style={styles.Section}>
            <PrimaryIcon
              iconText="투명도"
              isActive={settingState === 'opacity'}
              onPress={() => setSettingState('opacity')}
              iconSource={
                settingState === 'opacity' ? Assets.opacity : Assets.opacityOff
              }
            />
          </View>
        </View>
      </>
    </Animated.View>
  );
};

export default PoseSetting;

const styles = StyleSheet.create({
  SlideUpContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  Slider: {
    width: 160,
    height: 20,
  },
  Thumb: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.main,
    borderWidth: 2,
  },
  SectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Section: {
    flex: 1,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
