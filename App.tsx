import React, {useMemo, useState} from 'react';
import 'react-native-get-random-values';
import {Splash} from '@/components/organisms';
import {COLORS} from '@/constants/colors';
import {Favorite, Main, Pose} from '@/screens';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RecoilRoot} from 'recoil';
import {RealmProvider} from '@realm/react';
import ImageSchema from '@/model/ImageSchema';
import FavoriteSchema from '@/model/FavoriteSchema';

export type ScreenNames = ['Main', 'Pose', 'Favorite', 'Setting'];
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const App = () => {
  const Stack = createNativeStackNavigator();
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
    <RealmProvider
      schema={[ImageSchema, FavoriteSchema]}
      schemaVersion={4}
      inMemory={true}>
      <RecoilRoot>
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
          </Stack.Navigator>
        </NavigationContainer>
      </RecoilRoot>
    </RealmProvider>
  );
};

export default App;
