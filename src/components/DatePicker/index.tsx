import React, {useState} from 'react';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {CALENDER_ICON_IMG} from '../../assets';
import {SlidingModal} from '../SlidingModal';
import CalendarPicker from 'react-native-calendar-picker';
import PropTypes from 'prop-types';
import {Moment} from 'moment';

interface DatePickerProps {
  label: string;
  onChangeDate: (date: Moment) => void;
  selectedDate: any;
  isDisabled: boolean;
  selectedStartDate: any;
}

const DatePicker = (props: DatePickerProps) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleDateChange = (date: Moment) => {
    props.onChangeDate(date);
    toggleModal();
  };
  return (
    <>
      <Text style={styles.labelText}>{props.label}</Text>
      <TouchableOpacity
        onPress={!props.isDisabled ? toggleModal : undefined}
        style={[styles.inputWrapper, props.isDisabled && styles.lowOpacity]}>
        <Text style={styles.dateText}>
          {props.selectedDate ? props.selectedDate : ''}
        </Text>
        <Image source={CALENDER_ICON_IMG} />
      </TouchableOpacity>
      <SlidingModal toggleModal={toggleModal} isModalVisible={isModalVisible}>
        <View style={styles.modalInnerContainer}>
          <CalendarPicker
            // selectedDayTextStyle={styles.lightBlueBg}
            selectedDayStyle={styles.lightBlueBg}
            selectedDayTextColor="#FFFFFF"
            selectedStartDate={props.selectedStartDate}
            onDateChange={(date: Moment) => handleDateChange(date)}
          />
        </View>
      </SlidingModal>
    </>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string,
  onChangeDate: PropTypes.func,
  selectedDate: PropTypes.any,
  selectedStartDate: PropTypes.any,
  isDisabled: PropTypes.bool,
};

export {DatePicker};
