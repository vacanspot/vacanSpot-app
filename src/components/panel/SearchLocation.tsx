import React from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS} from '@/constants/colors';
import {ImageList} from '@/components/organisms';
import {useGetImagesByAddress} from '@/hook/query/search';

interface SearchLocationProps {
  location: {
    x: string;
    y: string;
  };
}

const SearchLocation = ({location}: SearchLocationProps) => {
  const {data} = useGetImagesByAddress(location);

  return (
    <View style={styles.Container}>
      <ImageList
        data={data?.map(item => {
          return {
            id: Math.random().toString(16).substring(2, 11),
            uri: item,
            canDelete: false,
          };
        })}
      />
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
