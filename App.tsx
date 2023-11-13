import LottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {View} from 'react-native';

const App = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {loaded ? (
        <View
          style={{width: '100%', height: '100%', backgroundColor: '#547392'}}
        />
      ) : (
        <View
          style={{width: '100%', height: '100%', backgroundColor: '#fff1d9'}}>
          <LottieView
            style={{
              flex: 1,
              justifyContent: 'center',
              width: 200,
              height: 400,
            }}
            source={require('./assets/splash.json')}
            autoPlay
            loop={false}
            onAnimationFinish={() => setLoaded(true)}
          />
        </View>
      )}
    </>
  );
};

export default App;
