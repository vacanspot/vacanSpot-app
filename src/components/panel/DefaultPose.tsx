import React from 'react';
import Realm from 'realm';
import {StyleSheet, Text, View} from 'react-native';
import {v4 as uuid} from 'uuid';
import {COLORS} from '@/constants/colors';
import Assets from 'assets';
import {ImageList} from '@/components/organisms';
import {StackActions, useNavigation} from '@react-navigation/core';
import {StackNavigation} from 'App';
import {useSetRecoilState} from 'recoil';
import {poseReferenceState} from '@/recoil/atom/camera';
import {useQuery, useRealm} from '@realm/react';
import ImageSchema from '@/model/ImageSchema';
import {Button} from '@/components/atom';

interface DefaultPoseProps {
  onlyFavorite?: boolean;
}

const DefaultPose = ({onlyFavorite = false}: DefaultPoseProps) => {
  const realm = useRealm();
  const favoriteList = useQuery(ImageSchema);
  const navigation = useNavigation<StackNavigation>();
  const setPoseReference = useSetRecoilState(poseReferenceState);

  const favoriteUrlList = favoriteList.map(fovorite =>
    fovorite.path.split('/').pop(),
  );

  const registerFavorite = (url: number) => {
    realm.write(() =>
      realm.create('Image', {
        _id: new Realm.BSON.UUID(),
        path: `/assets/pose/${url}`,
      }),
    );
  };

  const deleteFavorite = (url: number) => {
    const obj = favoriteList.filter(favorite =>
      favorite.path.includes(`${url}`),
    )[0];
    realm.write(() => {
      realm.delete(obj);
    });
  };

  // 추천
  if (!onlyFavorite) {
    return (
      <View style={styles.Container}>
        <ImageList
          data={Assets.pose_recommend?.map((item, index) => {
            const isFavorite = favoriteUrlList.indexOf(`${item}`) !== -1;
            return {
              id: `${index}_${uuid}`,
              image: item,
              isFavorite,
              handleFavorite: () => {
                isFavorite ? deleteFavorite(item) : registerFavorite(item);
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
  } else if (onlyFavorite && favoriteList.length === 0) {
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
  } else {
    return (
      <View style={styles.Container}>
        <ImageList
          data={favoriteList.map((favorite, index) => {
            const url = Number(favorite.path.split('/').pop());
            return {
              id: `${index}_${uuid}`,
              image: url,
              isFavorite: true,
              handleFavorite: () => deleteFavorite(url),
              handleSelect: () => {
                setPoseReference(url);
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
