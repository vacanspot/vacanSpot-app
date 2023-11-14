import LottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MainView from './src/components/MainView';

const App = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {loaded ? (
        <MainView />
      ) : (
        <View style={styles.SplashContainer}>
          <LottieView
            style={styles.SplashIcon}
            source={require('./assets/splash.json')}
            autoPlay
            onAnimationFinish={() => setLoaded(true)}
          />
        </View>
      )}
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  SplashContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff1d9',
  },
  SplashIcon: {
    width: 200,
    height: 600,
  },
});
