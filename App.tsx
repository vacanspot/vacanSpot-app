import {Splash} from '@/components/organisms';
import {COLORS} from '@/constants/colors';
import {Favorite, Main, Pose} from '@/screens';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {RecoilRoot} from 'recoil';
import {RealmProvider} from '@realm/react';
import ImageSchema from '@/model/ImageSchema';

export type ScreenNames = ['Main', 'Pose', 'Favorite'];
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const App = () => {
  const Stack = createNativeStackNavigator();
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return <Splash setLoaded={setLoaded} />;
  }

  return (
    <RealmProvider schema={[ImageSchema]} schemaVersion={4}>
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
              options={{
                headerShadowVisible: false,
                headerTintColor: COLORS.main,
                headerTitle: '포즈',
                headerBackTitleVisible: false,
              }}
            />
            <Stack.Screen
              name="Favorite"
              component={Favorite}
              options={{
                headerShadowVisible: false,
                headerTintColor: COLORS.main,
                headerTitle: '즐겨찾기',
                headerBackTitleVisible: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RecoilRoot>
    </RealmProvider>
  );
};

export default App;
