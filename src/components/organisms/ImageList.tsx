import {ImageItem} from '@/components/Molecules';
import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

const ImageList = () => {
  const DATA = [
    {id: '1'},
    {id: '2'},
    {id: '3'},
    {id: '4'},
    {id: '5'},
    {id: '6'},
    {id: '7'},
    {id: '8'},
    {id: '9'},
    {id: '10'},
    {id: '11'},
    {id: '12'},
    {id: '13'},
    {id: '14'},
    {id: '15'},
    {id: '16'},
    {id: '17'},
    {id: '18'},
  ];

  return (
    <View style={styles.Container}>
      <FlatList
        data={DATA}
        renderItem={() => <ImageItem />}
        keyExtractor={item => item.id}
        numColumns={3}
        horizontal={false}
        columnWrapperStyle={styles.ColumnWrapper}
      />
    </View>
  );
};

export default ImageList;

const styles = StyleSheet.create({
  Container: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  ColumnWrapper: {
    gap: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
});
