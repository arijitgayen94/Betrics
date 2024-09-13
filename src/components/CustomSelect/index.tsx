import React, {useState} from 'react';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import {ARROW_DOWN_LIGHT, ARROW_UP} from '../../assets';
import {Image} from 'react-native';
import PropType from 'prop-types';

interface Options {
  display: string;
  id: string;
  key?: string;
}

interface CustomSelectProps {
  options: Options[];
  buttonStyle?: any;
  selectedValue: Options;
  onChange: (item: any) => void;
  isDisable?: boolean;
}

const CustomSelect = (props: CustomSelectProps) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const {options, onChange, isDisable} = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const getDropdownStyles = () => {
    if (isDropdownOpen) {
      return {
        ...styles.dropdownButtonStyle,
        ...styles.dropdownOpened,
        ...props?.buttonStyle,
      };
    } else {
      return {...styles.dropdownButtonStyle, ...props?.buttonStyle};
    }
  };

  return (
    <SelectDropdown
      data={options.filter(
        (option: any) =>
          option.id !== props?.selectedValue?.id || options.length === 1,
      )}
      dropdownStyle={styles.dropdownStyle}
      defaultButtonText={props?.selectedValue?.display}
      defaultValue={props?.selectedValue}
      rowStyle={styles.rowStyle}
      rowTextStyle={{...styles.dropdownButtonTextStyle, ...styles.ml15}}
      dropdownOverlayColor="transparent"
      buttonStyle={getDropdownStyles()}
      onFocus={() => setIsDropdownOpen(true)}
      onBlur={() => setIsDropdownOpen(false)}
      buttonTextStyle={styles.dropdownButtonTextStyle}
      dropdownIconPosition={'right'}
      renderDropdownIcon={() => (
        <Image source={isDropdownOpen ? ARROW_UP : ARROW_DOWN_LIGHT} />
      )}
      disabled={isDisable}
      onSelect={selectedItem => {
        onChange(selectedItem);
      }}
      buttonTextAfterSelection={selectedItem => {
        return selectedItem.display;
      }}
      rowTextForSelection={item => {
        return item.display;
      }}
    />
  );
};

CustomSelect.propTypes = {
  options: PropType.any,
  buttonStyle: PropType.any,
  selectedValue: PropType.any,
  onChange: PropType.func,
  isDisable: PropType.bool,
};

export {CustomSelect};
