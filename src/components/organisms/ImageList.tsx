import {ImageItem} from '@/components/molecules';
import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

interface ImageListProps {
  data?: Array<{
    id: string;
    uri: string;
    canDelete?: boolean;
    handleDelete?: () => void;
  }>;
  listHeaderComponent?: JSX.Element;
}

const ImageList = ({data, listHeaderComponent}: ImageListProps) => {
  return (
    <View style={styles.Container}>
      <FlatList
        ListHeaderComponent={listHeaderComponent}
        data={data}
        renderItem={({item}) => (
          <ImageItem
            uri={item.uri}
            canDelete={item.canDelete}
            handleDelete={item.handleDelete}
          />
        )}
        keyExtractor={item => item.id}
        horizontal={false}
        contentContainerStyle={styles.ContentContainer}
      />
    </View>
  );
};

export default ImageList;

const styles = StyleSheet.create({
  Container: {
    paddingTop: 16,
  },
  ContentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 1,
  },
});
