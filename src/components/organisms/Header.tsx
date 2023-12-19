import React from 'react';
import {PrimaryIcon} from '@/components/atom';
import {useNavigation} from '@react-navigation/core';
import {StackNavigation} from 'App';
import {StyleSheet, Text, View} from 'react-native';
import Assets from 'assets';
import {COLORS} from '@/constants/colors';
import {getStatusBarHeight} from 'react-native-iphone-screen-helper';

const Header = () => {
  const navigation = useNavigation<StackNavigation>();

  return (
    <View style={styles.Header}>
      <View style={styles.LogoContainer}>
        <PrimaryIcon iconSource={Assets.logo} />
        <Text style={styles.LogoName}>VACANSPOT</Text>
      </View>
      <PrimaryIcon
        iconSource={Assets.setting}
        width={24}
        height={24}
        onPress={() => navigation.navigate('Setting')}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  Header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: getStatusBarHeight(),
    paddingBottom: 12,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
    zIndex: 1,
  },
  LogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Logo: {
    width: 32,
    height: 32,
  },
  LogoName: {
    marginTop: 2,
    color: COLORS.main,
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
});
