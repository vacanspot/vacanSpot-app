import {SearchKeyword, SearchLocation} from '@/components/panel';
import {COLORS} from '@/constants/colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';

const Tab = createMaterialTopTabNavigator();

const Pose = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          color: COLORS.main,
          fontFamily: 'SpoqaHanSansNeo-Medium',
        },
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.main,
          height: 2,
        },
      }}>
      <Tab.Screen name="장소" component={SearchLocation} />
      <Tab.Screen name="검색" component={SearchKeyword} />
    </Tab.Navigator>
  );
};

export default Pose;
