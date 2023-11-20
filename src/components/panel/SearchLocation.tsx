import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import {useGetAddress} from '@/hook/query/search';
import {COLORS} from '@/constants/colors';
import {ImageList} from '@/components/organisms';

const SearchLocation = () => {
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

  console.log(location, data);

  return (
    <View style={styles.Container}>
      <ImageList />
    </View>
  );
};

export default SearchLocation;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
  },
});
