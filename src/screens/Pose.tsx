import {SearchKeyword, SearchLocation} from '@/components/panel';
import {COLORS} from '@/constants/colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Geolocation from '@react-native-community/geolocation';
import {useGetAddress} from '@/hook/query/search';
import React, {useEffect, useState} from 'react';

const Tab = createMaterialTopTabNavigator();

const Pose = () => {
  const [location, setLocation] = useState({
    x: '',
    y: '',
  });

  const {data} = useGetAddress(location);

  useEffect(() => {
    Geolocation.getCurrentPosition(info =>
      setLocation({
        x: `${info.coords.longitude}`,
        y: `${info.coords.latitude}`,
      }),
    );
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.main,
          height: 2,
        },
      }}>
      <Tab.Screen
        name="장소"
        options={{tabBarLabel: data}}
        children={() => <SearchLocation location={location} />}
      />
      <Tab.Screen name="검색" component={SearchKeyword} />
    </Tab.Navigator>
  );
};

export default Pose;
