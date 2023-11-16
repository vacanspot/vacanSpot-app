import {COLORS} from '@/constants/colors';
import React from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface IconProps {
  type: keyof typeof styles;
  onPress?: () => void;
  iconSource: ImageSourcePropType;
  iconText?: string;
  width?: number;
  height?: number;
}

const Icon = ({
  type,
  onPress,
  iconSource,
  iconText,
  width = 32,
  height = 32,
}: IconProps) => {
  return (
    <TouchableOpacity style={styles[type].TouchArea} onPress={onPress}>
      <View style={styles[type].IconWrapper}>
        <Image
          source={iconSource}
          style={{...styles[type].Icon, width, height}}
        />
      </View>
      {iconText && <Text style={styles[type].IconText}>{iconText}</Text>}
    </TouchableOpacity>
  );
};

export default Icon;

const styles = {
  Primary: {
    TouchArea: {
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    IconWrapper: {
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    Icon: {
      resizeMode: 'contain',
    } as ImageProps,
    IconText: {
      color: COLORS.main,
    },
  },
  Transparent: {
    TouchArea: {
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    IconWrapper: {
      width: 44,
      height: 44,
      opacity: 0.5,
      borderRadius: 22,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    Icon: {
      resizeMode: 'contain',
    } as ImageProps,
    IconText: undefined,
  },
};
