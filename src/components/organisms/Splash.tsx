import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {COLORS} from '@/constants/colors';
import Assets from 'assets';

interface SplashProps {
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Splash = ({setLoaded}: SplashProps) => {
  return (
    <View style={styles.SplashContainer}>
      <LottieView
        style={styles.SplashIcon}
        source={Assets.splash}
        autoPlay
        loop={false}
        onAnimationFinish={() => setLoaded(true)}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  SplashContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  SplashIcon: {
    width: 200,
    height: 600,
  },
});
