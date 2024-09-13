import React from 'react';
import {
  Image,
  KeyboardTypeOptions,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import PropTypes from 'prop-types';

interface PrimaryInputProps {
  icon?: any;
  containerStyle?: object | [];
  inputStyle?: object;
  labelStyle?: object;
  placeholderColor?: string;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  labelText?: string;
  onChangeText?: (text: string) => void;
  value?: any;
  inputContainerStyle?: object | [];
  editable?: boolean;
  includeBtn?: boolean;
  btnText?: string;
  onBtnClick?: () => void;
  onIconClick?: () => void;
  onEndEditing?: () => void;
  maxLength?: number;
  returnKeyType?: string;
}
const PrimaryInput = (props: PrimaryInputProps) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const {editable = true} = props;
  return (
    <View style={[styles.container, props?.containerStyle]}>
      {props?.labelText && (
        <Text style={[styles.label, props.labelStyle]}>{props?.labelText}</Text>
      )}
      <View style={[styles.inputContainer, props.inputContainerStyle]}>
        <TextInput
          value={props.value}
          placeholder={props?.placeholder}
          onChangeText={props.onChangeText}
          editable={editable}
          keyboardType={props?.keyboardType || 'default'}
          style={[styles.inputStyle, props?.inputStyle]}
          placeholderTextColor={
            props?.placeholderColor ? props.placeholderColor : '#808080'
          }
          secureTextEntry={props?.secureTextEntry}
          onEndEditing={props?.onEndEditing}
          maxLength={props?.maxLength}
          returnKeyType={props?.returnKeyType || 'default'}
        />
        {props?.icon && (
          <Pressable
            onPress={() => {
              if (props?.onIconClick) {
                props.onIconClick();
              }
            }}>
            <Image source={props?.icon} />
          </Pressable>
        )}
        {props?.includeBtn && (
          <TouchableOpacity style={styles.btnStyle} onPress={props?.onBtnClick}>
            <Text style={styles.btnTextStyle}>{props?.btnText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

PrimaryInput.propTypes = {
  icon: PropTypes.any,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inputStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  placeholderColor: PropTypes.string,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.any,
  secureTextEntry: PropTypes.bool,
  labelText: PropTypes.string,
  inputContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  includeBtn: PropTypes.bool,
  btnText: PropTypes.string,
  onBtnClick: PropTypes.func,
  onIconClick: PropTypes.func,
  onEndEditing: PropTypes.func,
  maxLength: PropTypes.number,
  returnKeyType: PropTypes.string,
};

export {PrimaryInput};
