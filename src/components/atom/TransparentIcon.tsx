import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

interface TransparentIconProps {
  onPress?: () => void;
  iconSource: ImageSourcePropType;
  iconText?: string;
  width?: number;
  height?: number;
}

const TransparentIcon = ({
  onPress,
  iconSource,
  width = 32,
  height = 32,
}: TransparentIconProps) => {
  return (
    <TouchableOpacity style={styles.TouchArea} onPress={onPress}>
      <View style={styles.IconWrapper}>
        <Image source={iconSource} style={{...styles.Icon, width, height}} />
      </View>
    </TouchableOpacity>
  );
};

export default TransparentIcon;

const styles = StyleSheet.create({
  TouchArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  IconWrapper: {
    width: 44,
    height: 44,
    opacity: 0.5,
    borderRadius: 22,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Icon: {
    resizeMode: 'contain',
  },
});
