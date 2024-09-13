import React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface OutlineButtonProps {
  onPress: () => void;
  text: string;
  style?: any;
  textStyle?: any;
  isLoading?: boolean;
  icon: any;
}

const OutlineButton = (props: OutlineButtonProps) => {
  return (
    <TouchableOpacity onPress={props?.onPress} style={props?.style}>
      {props.isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          {props?.icon}
          <Text style={props?.textStyle}>{props?.text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

OutlineButton.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.any,
  textStyle: PropTypes.any,
  icon: PropTypes.any,
  isLoading: PropTypes.bool,
};

export {OutlineButton};
