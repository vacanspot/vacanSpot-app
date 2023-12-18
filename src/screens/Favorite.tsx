import {ImageList} from '@/components/organisms';
import {COLORS} from '@/constants/colors';
import ImageSchema from '@/model/ImageSchema';
import {useQuery, useRealm} from '@realm/react';
import Assets from 'assets';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const Favorite = () => {
  const realm = useRealm();
  const userSavedImageList = useQuery(ImageSchema);

  const selectFromPhotos = () => {
    launchImageLibrary({mediaType: 'photo'}).then(value => {
      const image = value.assets;

      if (image) {
        realm.write(() => {
          realm.create('Image', {
            _id: new Realm.BSON.UUID(),
            path: image[0].uri,
          });
        });
      }
    });
  };

  const deletePose = (deletableImage: ImageSchema) => {
    realm.write(() => {
      realm.delete(deletableImage);
    });
  };

  return (
    <View style={styles.Container}>
      <ImageList
        listHeaderComponent={
          <TouchableOpacity onPress={selectFromPhotos}>
            <View style={styles.AddPoseButton}>
              <Image source={Assets.registerImage} style={styles.AddPoseIcon} />
            </View>
          </TouchableOpacity>
        }
        data={userSavedImageList.map(item => {
          return {
            id: `${item._id}`,
            image: {uri: item.path},
            canDelete: true,
            handleDelete: () => deletePose(item),
          };
        })}
      />
      <ImageList />
    </View>
  );
};

export default Favorite;

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
    backgroundColor: COLORS.painBeige,
  },
  AddPoseIcon: {
    width: 44,
    height: 44,
  },
});
