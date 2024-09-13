import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const NoInternetModal = ({show}) => (
  <View style={styles.offlineContainer}>
    {show && (
      <View style={styles.offline}>
        <Text style={styles.offlineText}>You are currently offline </Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  offlineContainer: {
    bottom: 0,
    elevation: 1,
    zIndex: 1,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  offline: {
    backgroundColor: '#FE4A65',
    height: 42,
    flex: 1,
    justifyContent: 'center',
  },
  offlineText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'italic',
  },
});
