import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from 'App';
import Assets from 'assets';

interface ImageItemProps {
  uri: string;
  canDelete?: boolean;
  handleDelete?: () => void;
}

const ImageItem = ({uri, canDelete, handleDelete}: ImageItemProps) => {
  const navigation = useNavigation<StackNavigation>();
  const dummy = require('assets/dummy_image.png');

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View style={styles.Container}>
        <Image source={uri ? {uri} : dummy} style={styles.ImageBox} />
        {canDelete && (
          <TouchableOpacity
            style={styles.CancelIconWrapper}
            onPress={handleDelete}>
            <Image source={Assets.cancle} style={styles.CancelIcon} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ImageItem;

const styles = StyleSheet.create({
  Container: {
    width: (Dimensions.get('screen').width - 1 * 4) / 3,
    height: (Dimensions.get('screen').width - 1 * 4) / 3,
  },
  ImageBox: {
    width: '100%',
    height: '100%',
  },
  CancelIconWrapper: {
    position: 'absolute',
    right: -4,
    top: 4,
    width: 44,
    height: 44,
    zIndex: 1,
  },
  CancelIcon: {
    width: 32,
    height: 32,
  },
});
