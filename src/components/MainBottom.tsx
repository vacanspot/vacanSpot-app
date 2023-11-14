import React from 'react';
import Assets from 'assets';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const MainBottom = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.Section}>
        <Image
          source={Assets.location}
          style={styles.LocationImage}
          width={12}
          height={12}
        />
        <Text>광안리</Text>
      </View>
      <View style={styles.Section}>
        <TouchableOpacity style={styles.CaptureButton} />
      </View>
    </View>
  );
};

export default MainBottom;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  Section: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  LocationImage: {
    marginRight: 8,
  },
  CaptureButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#352E1E',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
  },
});
