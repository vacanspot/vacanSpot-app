import {StyleSheet, Text, View} from 'react-native';
import {PrimaryIcon} from '@/components/atom';
import {COLORS} from '@/constants/colors';
import Assets from 'assets';

const Header = () => {
  return (
    <View style={styles.LogoContainer}>
      <PrimaryIcon iconSource={Assets.logo} />
      <Text style={styles.LogoName}>VACANSPOT</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
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
