import {TouchableOpacity, ViewStyle, Text} from 'react-native';
import {COLORS} from '@/constants/colors';

interface ButtonProps {
  children: JSX.Element;
  type?: keyof typeof styles;
  onPress: () => void;
}

const Button = ({children, type = 'Primary', onPress}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={styles[type].CloseButton}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={styles[type].CloseButtonText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = {
  Primary: {
    CloseButton: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.main,
      borderRadius: 4,
    } as ViewStyle,
    CloseButtonText: {
      color: COLORS.white,
    },
  },
};
