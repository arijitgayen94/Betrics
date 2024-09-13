import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface PrimaryButtonProps {
  handleClick: () => void;
  text: string;
  style?: any;
  textStyle?: any;
  gradientStyle?: any;
  gradientColors: any;
  isLoading?: boolean;
  disabled?: boolean;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const {isLoading = false} = props;
  return (
    <TouchableOpacity
      onPress={props?.handleClick}
      style={props?.style}
      disabled={props?.disabled ? props.disabled : false}>
      <LinearGradient
        colors={props?.gradientColors}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={props?.gradientStyle}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={props?.textStyle}>{props?.text}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

PrimaryButton.propTypes = {
  handleClick: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.any,
  textStyle: PropTypes.any,
  gradientStyle: PropTypes.any,
  gradientColors: PropTypes.any,
};

export {PrimaryButton};
