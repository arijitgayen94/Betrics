import React from 'react';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import PropTypes from 'prop-types';
import PhoneInput from 'react-native-phone-number-input';

interface PhoneNumberInputProps {
  containerStyle?: object | [];
  inputStyle?: object;
  labelStyle?: object;
  labelText?: string;
  onChangeText?: (text: string) => void;
  onChangeFormattedText?: (text: string) => void;
  value?: any;
  inputContainerStyle?: object | [];
  editable?: boolean;
  onChangeCountry: (country: any) => void;
  country?: string;
}
const PhoneNumberInput = (props: PhoneNumberInputProps) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <PhoneInput
      defaultCode={props?.country ? props.country : 'US'}
      value={props?.value}
      layout="second"
      placeholder="Phone Number"
      onChangeText={props?.onChangeText}
      onChangeFormattedText={props?.onChangeFormattedText}
      containerStyle={[styles.inputContainer, props?.containerStyle]}
      textContainerStyle={[
        styles.textContainerStyle,
        props?.inputContainerStyle,
      ]}
      textInputStyle={styles.textInputStyle}
      onChangeCountry={props?.onChangeCountry}
    />
  );
};

PhoneNumberInput.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inputStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  labelText: PropTypes.string,
  inputContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChangeText: PropTypes.func,
  onChangeFormattedText: PropTypes.func,
  onChangeCountry: PropTypes.func,
  country: PropTypes.string,
};

export {PhoneNumberInput};
