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

export interface ImageItemProps {
  image: ImageSourcePropType;
  isFavorite?: boolean;
  handleFavorite?: () => void;
  handleDelete?: () => void;
  handleSelect?: () => void;
}

const ImageItem = ({
  image,
  isFavorite,
  handleFavorite,
  handleSelect,
  handleDelete,
}: ImageItemProps) => {
  return (
    <TouchableOpacity onPress={handleSelect}>
      <View style={styles.Container}>
        <Image source={image} style={styles.ImageBox} />
        {handleDelete && (
          <TouchableOpacity style={styles.IconWrapper} onPress={handleDelete}>
            <Image source={Assets.cancle} style={styles.Icon} />
          </TouchableOpacity>
        )}
        {handleFavorite && (
          <TouchableOpacity style={styles.IconWrapper} onPress={handleFavorite}>
            <Image
              source={isFavorite ? Assets.star : Assets.starOff}
              style={styles.Icon}
            />
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
    backgroundColor: COLORS.dark,
  },
  ImageBox: {
    width: '100%',
    height: '100%',
  },
  IconWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 44,
    height: 44,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Icon: {
    width: 28,
    height: 28,
  },
});
