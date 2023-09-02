import React, {useEffect, useState} from 'react';
import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-screen-helper';
import {styled} from 'styled-components/native';
import {Platform, StatusBar} from 'react-native';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';
import Geolocation from '@react-native-community/geolocation';
import CameraScreen from './src/screens/CameraScreen';
import {useSearchAddress} from './src/hook/query/search';
import {QueryClient, QueryClientProvider} from 'react-query';

const App = () => {
  const [appLoaded, setAppLoaded] = useState(false);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false, // 컴포넌트가 마운트될 때, refetch
            refetchOnReconnect: true, // 네트워크가 재연결될 때, refetch
            refetchOnWindowFocus: false, // 브라우저 탭이 활성화될 때, refetch
            retry: 0, // query 호출 실패 시, 재호출 시도 횟수
            useErrorBoundary: false,
            cacheTime: 1000 * 60 * 30, // TODO: 임시
            staleTime: 1000 * 60 * 30, // TODO: 임시
          },
        },
      }),
  );

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAppLoaded(true);
    }, 3000);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="dark-content" />
      {appLoaded ? (
        <RootView>
          <CameraScreen />
        </RootView>
      ) : (
        <SplashView>
          <LottieView
            source={require('./assets/splash.json')}
            autoPlay
            loop
            resizeMode="cover"
            style={{
              width: 200,
              height: 200,
            }}
          />
        </SplashView>
      )}
    </QueryClientProvider>
  );
};

export default App;

const RootView = styled.View`
  padding-top: ${Platform.OS === 'android' ? 0 : getStatusBarHeight()}px;
  padding-bottom: ${getBottomSpace()}px;
  flex: 1;
  background-color: #fff7f1;
`;

const SplashView = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: 0;
  background-color: #fff7f1;
`;
