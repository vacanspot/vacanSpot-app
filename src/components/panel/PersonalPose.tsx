import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {StackNavigation} from 'App';
import {useSetRecoilState} from 'recoil';
import {v4 as uuid} from 'uuid';
import {ImageList} from '@/components/organisms';
import {COLORS} from '@/constants/colors';
import {poseReferenceState} from '@/recoil/atom/camera';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import Assets from 'assets';

const PersonalPose = () => {
  const navigation = useNavigation<StackNavigation>();
  const setPoseReference = useSetRecoilState(poseReferenceState);
  const {getItem, setItem} = useAsyncStorage('personal');
  const [userSavedImageList, setUserSavedImageList] = useState<{
    [key: string]: boolean;
  } | null>(null);

  // storage personal 조회
  const readItemFromStorage = async () => {
    const item = await getItem();
    if (item) {
      const jsonValue = JSON.parse(item);
      setUserSavedImageList(jsonValue);
    }
  };

  // storage personal 업데이트
  const writeItemToStorage = async () => {
    if (userSavedImageList) {
      await setItem(JSON.stringify(userSavedImageList));
    }
  };

  // userSavedImageList에 추가
  const addToSavedImageList = () => {
    launchImageLibrary({mediaType: 'photo'}).then(value => {
      const image = value.assets;
      if (image) {
        setUserSavedImageList(prev => {
          return {...prev, [`${image[0].uri}`]: true};
        });
      }
    });
  };

  // userSavedImageList에서 삭제
  const deleteFavorite = (path: string) => {
    setUserSavedImageList(prev => {
      if (prev) {
        const {[`${path}`]: _, ...rest} = prev;
        return rest;
      }
      return null;
    });
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  useEffect(() => {
    writeItemToStorage();
  }, [userSavedImageList]);

  return (
    <View style={styles.Container}>
      <ImageList
        listHeaderComponent={
          <TouchableOpacity onPress={addToSavedImageList}>
            <View style={styles.AddPoseButton}>
              <Image source={Assets.registerImage} style={styles.AddPoseIcon} />
            </View>
          </TouchableOpacity>
        }
        data={
          userSavedImageList
            ? Object.keys(userSavedImageList).map((uri, index) => {
                return {
                  id: `${index}_${uuid}`,
                  image: {uri},
                  handleDelete: () => deleteFavorite(uri),
                  handleSelect: () => {
                    setPoseReference(uri);
                    navigation.navigate('Main');
                  },
                };
              })
            : undefined
        }
      />
    </View>
  );
};

export default PersonalPose;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
  },
  AddPoseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: (Dimensions.get('screen').width - 1 * 4) / 3,
    height: (Dimensions.get('screen').width - 1 * 4) / 3,
    backgroundColor: COLORS.dark,
  },
  AddPoseIcon: {
    width: 44,
    height: 44,
  },
});
