import {Splash} from '@/components/organisms';
import {Favorite, Main, Pose} from '@/screens';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';

export type ScreenNames = ['Main', 'Pose', 'Favorite'];
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const App = () => {
  const Stack = createNativeStackNavigator();
  const [loaded, setLoaded] = useState(false);

  return loaded ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Pose" component={Pose} />
        <Stack.Screen name="Favorite" component={Favorite} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <Splash setLoaded={setLoaded} />
  );
};

export default App;
