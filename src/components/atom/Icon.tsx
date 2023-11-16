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
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    IconWrapper: {
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
      width: 44,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
      borderRadius: 22,
      opacity: 0.5,
    } as ViewStyle,
    IconWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    Icon: {
      resizeMode: 'contain',
    } as ImageProps,
    IconText: undefined,
  },
};
