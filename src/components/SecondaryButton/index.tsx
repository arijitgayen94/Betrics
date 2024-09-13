import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';

interface SecondaryButtonProps {
  handleClick: () => void;
  text: string;
  style?: any;
  textStyle?: any;
  gradientColors: any;
  isLoading?: boolean;
  disabled?: boolean;
}

const SecondaryButton = (props: SecondaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={props?.handleClick}
      style={props?.style}
      disabled={props?.disabled}>
      {props.isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={props?.textStyle}>{props?.text}</Text>
      )}
    </TouchableOpacity>
  );
};

SecondaryButton.propTypes = {
  handleClick: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.any,
  textStyle: PropTypes.any,
  gradientStyle: PropTypes.object,
  gradientColors: PropTypes.any,
  isLoading: PropTypes.bool,
};

export {SecondaryButton};
