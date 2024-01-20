import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {v4 as uuid} from 'uuid';
import {COLORS} from '@/constants/colors';
import Assets from 'assets';
import {ImageList} from '@/components/organisms';
import {StackActions, useNavigation} from '@react-navigation/core';
import {StackNavigation} from 'App';
import {useSetRecoilState} from 'recoil';
import {poseReferenceState} from '@/recoil/atom/camera';
import {Button} from '@/components/atom';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

interface DefaultPoseProps {
  onlyFavorite?: boolean;
}

const DefaultPose = ({onlyFavorite = false}: DefaultPoseProps) => {
  const navigation = useNavigation<StackNavigation>();
  const setPoseReference = useSetRecoilState(poseReferenceState);
  const {getItem, setItem} = useAsyncStorage('favorite');
  const [favoriteList, setFavoriteList] = useState<{
    [key: string]: boolean;
  } | null>(null);

  // storage favorite 조회
  const readItemFromStorage = async () => {
    const item = await getItem();
    if (item) {
      const jsonValue = JSON.parse(item);
      setFavoriteList(jsonValue);
    }
  };

  // storage favorite 업데이트
  const writeItemToStorage = async () => {
    if (favoriteList) {
      await setItem(JSON.stringify(favoriteList));
    }
  };

  // favoriteList에 추가
  const addFavorite = async (path: number) => {
    setFavoriteList(prev => {
      return {...prev, [`${path}`]: true};
    });
  };

  // favoriteList에서 삭제
  const deleteFavorite = (path: string) => {
    setFavoriteList(prev => {
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
  }, [favoriteList]);

  if (!onlyFavorite) {
    return (
      <View style={styles.Container}>
        <ImageList
          data={Assets.pose_recommend?.map((item, index) => {
            const isFavorite = favoriteList ? favoriteList[item] : false;
            return {
              id: `${index}_${uuid}`,
              image: item,
              isFavorite,
              handleFavorite: () => {
                isFavorite ? deleteFavorite(item) : addFavorite(item);
              },
              handleSelect: () => {
                setPoseReference(item);
                navigation.navigate('Main');
              },
            };
          })}
        />
      </View>
    );
  } else if (
    onlyFavorite &&
    (!favoriteList || Object.keys(favoriteList).length === 0)
  ) {
    return (
      <View style={[styles.Container, styles.LinkContainer]}>
        <Text>포즈를 즐겨찾기로 등록해보세요!</Text>
        <View style={styles.LinkButtonWrapper}>
          <Button
            onPress={() => navigation.dispatch(StackActions.replace('Pose'))}>
            <Text>포즈로 이동</Text>
          </Button>
        </View>
      </View>
    );
  } else if (favoriteList) {
    return (
      <View style={styles.Container}>
        <ImageList
          data={Object.keys(favoriteList).map((favorite, index) => {
            return {
              id: `${index}_${uuid}`,
              image: Number(favorite),
              isFavorite: true,
              handleFavorite: () => deleteFavorite(favorite),
              handleSelect: () => {
                setPoseReference(Number(favorite));
                navigation.navigate('Main');
              },
            };
          })}
        />
      </View>
    );
  }
};

export default DefaultPose;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
  },
  LinkContainer: {
    alignItems: 'center',
    paddingTop: 120,
    gap: 20,
  },
  LinkButtonWrapper: {
    width: 100,
    height: 40,
  },
});
