import {StyleSheet, View, FlatList} from 'react-native';
import {ImageItem} from '@/components/molecules';
import {ImageItemProps} from '@/components/molecules/ImageItem';

interface ImageListProps {
  data?: Array<
    {
      id: string;
    } & ImageItemProps
  >;
  listHeaderComponent?: JSX.Element;
}

const ImageList = ({data, listHeaderComponent}: ImageListProps) => {
  return (
    <View style={styles.Container}>
      <FlatList
        ListHeaderComponent={listHeaderComponent}
        data={data}
        renderItem={({item}) => {
          return (
            <ImageItem
              image={item.image}
              isFavorite={item.isFavorite}
              handleDelete={item.handleDelete}
              handleSelect={item.handleSelect}
              handleFavorite={item.handleFavorite}
            />
          );
        }}
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
    paddingTop: 2,
    paddingLeft: 1,
    height: '100%',
  },
  ContentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 1,
  },
});
