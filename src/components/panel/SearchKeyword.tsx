import {ImageList} from '@/components/organisms';
import {COLORS} from '@/constants/colors';
import {useGetImagesByKeyword} from '@/hook/query/search';
import useDebounce from '@/hook/useDebounce';
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const SearchKeyword = () => {
  const [text, onChangeText] = React.useState('');
  const debounceResult = useDebounce(text, 300);
  const {data} = useGetImagesByKeyword({p: debounceResult});

  return (
    <View style={styles.Container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="검색어를 입력해주세요."
      />
      <ImageList
        data={data?.map((item, index) => {
          return {
            id: `${index}_${Math.random().toString(16).substring(2, 11)}`,
            uri: item,
            canDelete: false,
          };
        })}
      />
    </View>
  );
};

export default SearchKeyword;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
  },
  input: {
    height: 40,
    margin: 12,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteSmoke,
    padding: 10,
  },
});
