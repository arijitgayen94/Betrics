import React from 'react';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {CustomSelect} from '../../components';

const WrLineView = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);

  return (
    <View style={styles.lineDropdownWr}>
      <Text style={styles.lineViewLabelText}>
        {props.label ? props.label : 'Line View'}
      </Text>
      <View style={styles.lineViewSelect}>
        <CustomSelect
          options={props.options}
          selectedValue={props.selected}
          onChange={e => props.onChange && props.onChange(e)}
        />
      </View>
    </View>
  );
};

export default WrLineView;
