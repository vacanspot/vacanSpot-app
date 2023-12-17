import React from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Assets from 'assets';
import {COLORS} from '@/constants/colors';

interface ImageItemProps {
  image: ImageSourcePropType;
  canDelete?: boolean;
  handleDelete?: () => void;
  handleSelect?: () => void;
}

const ImageItem = ({
  image,
  canDelete,
  handleSelect,
  handleDelete,
}: ImageItemProps) => {
  return (
    <TouchableOpacity onPress={handleSelect}>
      <View style={styles.Container}>
        <Image source={image} style={styles.ImageBox} />
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
    backgroundColor: COLORS.black,
  },
  ImageBox: {
    width: '100%',
    height: '100%',
  },
  CancelIconWrapper: {
    position: 'absolute',
    right: -8,
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
