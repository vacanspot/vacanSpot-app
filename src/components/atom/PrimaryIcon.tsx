import {COLORS} from '@/constants/colors';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface PrimaryIconProps {
  onPress?: () => void;
  iconSource: ImageSourcePropType;
  iconText?: string;
  width?: number;
  height?: number;
  isActive?: boolean;
}

const PrimaryIcon = ({
  onPress,
  iconSource,
  iconText,
  width = 32,
  height = 32,
  isActive = true,
}: PrimaryIconProps) => {
  const style = styles(isActive);

  return (
    <TouchableOpacity style={style.TouchArea} onPress={onPress}>
      <View style={style.IconWrapper}>
        <Image source={iconSource} style={{...style.Icon, width, height}} />
      </View>
      {iconText && <Text style={style.IconText}>{iconText}</Text>}
    </TouchableOpacity>
  );
};

export default PrimaryIcon;

const styles = (isActive: boolean) =>
  StyleSheet.create({
    TouchArea: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    IconWrapper: {
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
    },
    Icon: {
      resizeMode: 'contain',
    },
    IconText: {
      color: isActive ? COLORS.main : COLORS.whiteSmoke,
      fontSize: 11,
      fontFamily: 'SpoqaHanSansNeo-Medium',
    },
  });
