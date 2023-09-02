import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {styled} from 'styled-components';
import {Text} from './atoms';

const offImage = require('../assets/off_image.png');
const iconLocation = require('../assets/icon-location.png');
const dummyImage = require('../assets/dummy_image.png');

const Controller = ({
  onGuideImage,
}: {
  onGuideImage: (image: ImageSourcePropType) => void;
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleSelectImage = (image: ImageSourcePropType) => {
    onGuideImage(image);
    setIsEdit(false);
  };

  if (isEdit) {
    return (
      <Wrapper style={{padding: 0, paddingLeft: 20}}>
        <ScrollView horizontal contentContainerStyle={{gap: 4}}>
          <TouchableOpacity onPress={() => setIsEdit(false)}>
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
    <Wrapper>
      <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
        <Image source={iconLocation} style={{width: 16, height: 16}} />
        <Text style={{color: 'white', fontSize: 18, lineHeight: 16}}>
          광안리
        </Text>
      </View>
      <ShutterButton />
      <TouchableOpacity
        onPress={() => {
          setIsEdit(true);
        }}>
        <Image source={dummyImage} style={{width: 52, height: 52}} />
      </TouchableOpacity>
    </Wrapper>
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

const ShutterButton = () => {
  return (
    <TouchableOpacity
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
          backgroundColor: 'white',
          borderRadius: 36,
        }}>
        <View
          style={{
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 30,
            borderWidth: 4,
            borderColor: 'black',
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
