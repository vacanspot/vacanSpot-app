import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS} from '@/constants/colors';
import Assets from 'assets';
import {ImageList} from '@/components/organisms';
import {useNavigation} from '@react-navigation/core';
import {StackNavigation} from 'App';
import {useSetRecoilState} from 'recoil';
import {poseReferenceState} from '@/recoil/atom/camera';
import {useQuery, useRealm} from '@realm/react';
import ImageSchema from '@/model/ImageSchema';

interface DefaultPoseProps {
  onlyFavorite?: boolean;
}

const DefaultPose = ({onlyFavorite = false}: DefaultPoseProps) => {
  const realm = useRealm();
  const readFavorite = useQuery(ImageSchema);
  const navigation = useNavigation<StackNavigation>();
  const setPoseReference = useSetRecoilState(poseReferenceState);
  const [newFavoriteList, setNewFavoriteList] = useState<Map<number, boolean>>(
    new Map<number, boolean>(),
  );

  const favoriteList = readFavorite.reduce<Map<number, boolean>>(
    (prev, curr) => {
      return new Map([...prev, [Number(curr.path), true]]);
    },
    new Map<number, boolean>(),
  );

  useEffect(() => {
    setNewFavoriteList(favoriteList);
  }, []);

  useEffect(() => {
    console.log('s');
    return () => {
      console.log('e');
      realm.write(() => {
        realm.deleteAll();
        for (const [key, value] of newFavoriteList) {
          if (value) {
            realm.create('Image', {
              _id: new Realm.BSON.UUID(),
              path: `${key}`,
            });
          }
        }
      });
    };
  }, [newFavoriteList]);

  return (
    <View style={styles.Container}>
      <ImageList
        data={Assets.pose_recommend
          ?.map((item, index) => {
            const isFavorite = newFavoriteList.get(item);
            return {
              id: `${index}_${Math.random().toString(16).substring(2, 11)}`,
              isFavorite,
              image: item,
              canFavorite: true,
              handleFavorite: () => {
                if (isFavorite) {
                  setNewFavoriteList(prev => new Map([...prev, [item, false]]));
                } else {
                  setNewFavoriteList(prev => new Map([...prev, [item, true]]));
                }
              },
              handleSelect: () => {
                setPoseReference(item);
                navigation.navigate('Main');
              },
            };
          })
          .filter(item => {
            return onlyFavorite ? item.isFavorite : item;
          })}
      />
    </View>
  );
};

export default DefaultPose;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
  },
});
