import {DefaultPose, PersonalPose} from '@/components/panel';
import {COLORS} from '@/constants/colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Pose = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.main,
          height: 2,
        },
      }}>
      <Tab.Screen name="추천" component={DefaultPose} />
      <Tab.Screen name="사진첩" component={PersonalPose} />
    </Tab.Navigator>
  );
};

export default Pose;
