import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import {styled} from 'styled-components';
import {Text} from './atoms';
import {Camera} from 'react-native-vision-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

const offImage = require('../assets/off_image.png');
const iconLocation = require('../assets/icon-location.png');
const dummyImage = require('../assets/dummy_image.png');

const Controller = ({
  camera,
  onGuideImage,
}: {
  camera: React.RefObject<Camera>;
  onGuideImage: (image: ImageSourcePropType | null) => void;
}) => {
  const [click, setClick] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const colorAnim = new Animated.Value(0); // 초기 배경색 애니메이션 값

  const handleSelectImage = (image: ImageSourcePropType) => {
    onGuideImage(image);
    setIsEdit(false);
  };

  const takePhoto = useCallback(async () => {
    try {
      if (camera.current == null) {
        throw new Error('Camera ref is null!');
      }

      const photo = await camera.current.takePhoto({
        flash: 'auto',
        qualityPrioritization: 'speed',
        enableShutterSound: false,
      });
      console.log('Taking photo...', photo.path);
      if (photo) {
        const isSaved = await CameraRoll.save(photo.path);
        if (isSaved) {
          setClick(true);
        }
      }
    } catch (e) {
      console.error('Failed to take photo!', e);
    }
  }, [camera]);

  useEffect(() => {
    if (click) {
      // 화면 깜빡임 효과 (배경색 변경)
      Animated.timing(colorAnim, {
        toValue: 1, // 목표 애니메이션 값
        duration: 70, // 애니메이션 지속 시간 (짧게 설정)
        useNativeDriver: false,
      }).start(() => {
        // 애니메이션 완료 후 다시 원래 상태로
        Animated.timing(colorAnim, {
          toValue: 0, // 원래 애니메이션 값으로
          duration: 70, // 애니메이션 지속 시간 (짧게 설정)
          useNativeDriver: false,
        }).start(() => {
          // click를 false로 설정
          setClick(false);
        });
      });
    }
  }, [click]);

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)'], // 투명에서 검은색으로
  });

  if (isEdit) {
    return (
      <Wrapper style={{paddingRight: 0, paddingLeft: 20}}>
        <ScrollView
          horizontal
          contentContainerStyle={{gap: 4}}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => {
              setIsEdit(false);
              onGuideImage(null);
            }}>
            <View
              style={{
                width: 120,
                height: 120,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={offImage} style={{width: 60, height: 60}} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectImage(dummyImage)}>
            <Image source={dummyImage} style={{width: 120, height: 120}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectImage(dummyImage)}>
            <Image source={dummyImage} style={{width: 120, height: 120}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectImage(dummyImage)}>
            <Image source={dummyImage} style={{width: 120, height: 120}} />
          </TouchableOpacity>
        </ScrollView>
      </Wrapper>
    );
  }
  return (
    <>
      <Animated.View
        style={{
          backgroundColor: backgroundColor,
          pointerEvents: 'none',
          position: 'absolute',
          top: 120,
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').width + 60,
        }}
      />
      <Wrapper>
        <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
          <Image source={iconLocation} style={{width: 16, height: 16}} />
          <Text style={{color: '#352E1E', fontSize: 18, lineHeight: 16}}>
            광안리
          </Text>
        </View>
        <ShutterButton onPress={() => takePhoto()} />
        <TouchableOpacity
          onPress={() => {
            setIsEdit(true);
          }}>
          <Image source={dummyImage} style={{width: 52, height: 52}} />
        </TouchableOpacity>
      </Wrapper>
    </>
  );
};

export default Controller;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  height: 160px;
  padding: 0 44px;
`;

const ShutterButton = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'absolute',
        left: Dimensions.get('screen').width / 2 - 36,
      }}>
      <View
        style={{
          position: 'relative',
          width: 72,
          height: 72,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#352E1E',
          borderRadius: 36,
        }}>
        <View
          style={{
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#352E1E',
            borderRadius: 30,
            borderWidth: 2,
            borderColor: 'white',
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
