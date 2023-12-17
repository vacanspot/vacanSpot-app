import {ImageItem} from '@/components/molecules';
import React from 'react';
import {StyleSheet, View, FlatList, ImageSourcePropType} from 'react-native';

interface ImageListProps {
  data?: Array<{
    id: string;
    image: ImageSourcePropType;
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
            image={item.image}
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
