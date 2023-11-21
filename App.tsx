import {Splash} from '@/components/organisms';
import {COLORS} from '@/constants/colors';
import {Favorite, Main, Pose} from '@/screens';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {RecoilRoot} from 'recoil';
import {RealmProvider} from '@realm/react';
import ImageSchema from '@/model/ImageSchema';
import {QueryClient, QueryClientProvider} from 'react-query';

export type ScreenNames = ['Main', 'Pose', 'Favorite', 'Setting'];
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const App = () => {
  const Stack = createNativeStackNavigator();
  const queryClient = new QueryClient();
  const [loaded, setLoaded] = useState(false);

  const HeaderDefaultOption = useMemo(() => {
    return {
      headerShadowVisible: false,
      headerTintColor: COLORS.main,
      headerBackTitleVisible: false,
      headerTitleStyle: {
        fontFamily: 'SpoqaHanSansNeo-Bold',
      },
    };
  }, []);

  if (!loaded) {
    return <Splash setLoaded={setLoaded} />;
  }

  return (
    <RealmProvider schema={[ImageSchema]} schemaVersion={4} inMemory={true}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Main"
                component={Main}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Pose"
                component={Pose}
                options={{...HeaderDefaultOption, headerTitle: '포즈'}}
              />
              <Stack.Screen
                name="Favorite"
                component={Favorite}
                options={{...HeaderDefaultOption, headerTitle: 'MY'}}
              />
              <Stack.Screen
                name="Setting"
                component={Favorite}
                options={{...HeaderDefaultOption, headerTitle: '서비스 정보'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </RecoilRoot>
    </RealmProvider>
  );
};

export default App;
