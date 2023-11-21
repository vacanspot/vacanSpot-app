import {SearchKeyword, SearchLocation} from '@/components/panel';
import {COLORS} from '@/constants/colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Geolocation from '@react-native-community/geolocation';
import {useGetAddress} from '@/hook/query/search';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const Pose = () => {
  const [location, setLocation] = useState({
    x: '',
    y: '',
  });

  const {data} = useGetAddress(location);

  const getLabel = (addresssName?: string) => {
    return <Text style={styles.LabelText}>{addresssName}</Text>;
  };

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
        options={{tabBarLabel: () => getLabel(data)}}
        children={() => <SearchLocation location={location} />}
      />
      <Tab.Screen name="검색" component={SearchKeyword} />
    </Tab.Navigator>
  );
};

export default Pose;

const styles = StyleSheet.create({
  LabelText: {
    fontSize: 14,
    color: COLORS.main,
    fontFamily: 'SpoqaHanSansNeo-Medium',
  },
});
