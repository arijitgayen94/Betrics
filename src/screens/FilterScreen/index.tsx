import React, {useEffect, useState} from 'react';
import useStyles from './styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {FlatList, Platform, Text, TouchableOpacity, View} from 'react-native';
import {BaseLayout} from '../../layout';
import {BELL_ICON_IMG, CHECK_RIGHT} from '../../assets';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {DatePicker, PrimaryButton} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {Moment} from 'moment';
import {AppDispatch, resetFiltersAction, setFiltersAction} from '../../redux';

type FiltersScreenParamList = StackNavigationProp<
  PostLoginParamList,
  'Filters'
>;

const Filters = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const {from} = props.route.params;
  const navigation = useNavigation<FiltersScreenParamList>();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedFilterSection, setSelectedFilterSection] = useState<number>(0);
  const [selectedStartDate, setSelectedStartDate] = useState<string>();
  const [selectedEndDate, setSelectedEndDate] = useState<string>();
  const {subscribedSportsbook} = useSelector(
    (state: any) => state.booksReducer,
  );
  const {initialFilters} = useSelector((state: any) => state.betTrackerReducer);
  const [filters, setFilters] = useState<any>(initialFilters);
  const [filterNames, setFilterNames] = useState<any>([
    {id: 0, name: 'Wager Status'},
    {id: 1, name: 'Sports Type'},
    {id: 2, name: 'Wager Types'},
    {id: 3, name: 'Books'},
    {id: 4, name: 'Bet Types'},
    {id: 5, name: 'Date Range'},
  ]);

  useEffect(() => {
    setFilters(initialFilters);
    const _startDate = initialFilters.date_range.find(
      (element: any) => element.type === 'startDate',
    );
    const _endDate = initialFilters.date_range.find(
      (element: any) => element.type === 'endDate',
    );
    if (_startDate) {
      setSelectedStartDate(_startDate.value);
    }
    if (_endDate) {
      setSelectedEndDate(_endDate.value);
    }
  }, [initialFilters]);

  useEffect(() => {
    const tempArr: any = [];
    subscribedSportsbook.forEach((book: any) => {
      tempArr.push({
        name: book.book.name,
        book_id: book.book.book_id,
        isChecked: initialFilters.books.find(
          (x: any) => x.book_id === book.book.book_id,
        )?.isChecked,
      });
    });
    setFilters({...filters, books: tempArr});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribedSportsbook]);

  useEffect(() => {
    if (from === 'tribe') {
      setFilterNames([
        {id: 0, name: 'Wager Status'},
        {id: 1, name: 'Wager Types'},
        {id: 2, name: 'Date Range'},
      ]);
    } else {
      setFilterNames([
        {id: 0, name: 'Wager Status'},
        {id: 1, name: 'Sports Type'},
        {id: 2, name: 'Wager Types'},
        {id: 3, name: 'Books'},
        {id: 4, name: 'Bet Types'},
        {id: 5, name: 'Date Range'},
      ]);
    }
  }, [from]);

  const handleStartDateChange = (date: Moment) => {
    setSelectedStartDate(date.format('DD-MMM-YYYY'));
    setFilters({
      ...filters,
      date_range: [
        ...filters.date_range,
        {type: 'startDate', value: date.format('DD-MMM-YYYY')},
      ],
    });
  };

  const handleEndDateChange = (date: Moment) => {
    setSelectedEndDate(date.format('DD-MMM-YYYY'));
    setFilters({
      ...filters,
      date_range: [
        ...filters.date_range,
        {type: 'endDate', value: date.format('DD-MMM-YYYY')},
      ],
    });
  };

  const handleApplyClick = () => {
    dispatch(setFiltersAction(filters));
    navigation.pop();
  };

  const renderWagerStatusFilter = () => {
    return filters.wager_status.map(
      (filter: {name: string; isChecked: boolean}) => {
        return (
          <View key={filter.name} style={styles.mb26}>
            <BouncyCheckbox
              size={20}
              isChecked={filter.isChecked}
              fillColor={theme.colors.primaryBg}
              checkIconImageSource={CHECK_RIGHT}
              unfillColor={theme.colors.primaryBg}
              onPress={() => {
                const wager_status_copy = [...filters.wager_status];
                let index = wager_status_copy.findIndex(
                  element => element.name === filter.name,
                );
                if (index > -1) {
                  wager_status_copy[index].isChecked =
                    !wager_status_copy[index].isChecked;
                }
                setFilters({...filters, wager_status: wager_status_copy});
              }}
              textComponent={
                <Text style={styles.checkboxText}>{filter.name}</Text>
              }
              iconStyle={
                filter.isChecked
                  ? styles.checkboxIconSelected
                  : styles.checkboxIcon
              }
            />
          </View>
        );
      },
    );
  };
  const renderSportsTypeFilter = () => {
    return filters.sports_type.map(
      (filter: {name: string; isChecked: boolean}) => {
        return (
          <View key={filter.name} style={styles.mb26}>
            <BouncyCheckbox
              size={20}
              isChecked={filter.isChecked}
              fillColor={theme.colors.primaryBg}
              checkIconImageSource={CHECK_RIGHT}
              unfillColor={theme.colors.primaryBg}
              onPress={() => {
                const sports_type_copy = [...filters.sports_type];
                let index = sports_type_copy.findIndex(
                  element => element.name === filter.name,
                );
                if (index > -1) {
                  sports_type_copy[index].isChecked =
                    !sports_type_copy[index].isChecked;
                }
                setFilters({...filters, sports_type: sports_type_copy});
              }}
              textComponent={
                <Text style={styles.checkboxText}>
                  {Platform.OS === 'ios'
                    ? filter.name === 'Nfl'
                      ? 'PRO FB'
                      : 'PRO BB'
                    : filter.name}
                </Text>
              }
              iconStyle={
                filter.isChecked
                  ? styles.checkboxIconSelected
                  : styles.checkboxIcon
              }
            />
          </View>
        );
      },
    );
  };
  const renderWagerTypesFilter = () => {
    return filters.wager_types.map(
      (filter: {name: string; isChecked: boolean}) => {
        return (
          <View key={filter.name} style={styles.mb26}>
            <BouncyCheckbox
              size={20}
              isChecked={filter.isChecked}
              fillColor={theme.colors.primaryBg}
              checkIconImageSource={CHECK_RIGHT}
              unfillColor={theme.colors.primaryBg}
              onPress={() => {
                const wager_types_copy = [...filters.wager_types];
                let index = wager_types_copy.findIndex(
                  element => element.name === filter.name,
                );
                if (index > -1) {
                  wager_types_copy[index].isChecked =
                    !wager_types_copy[index].isChecked;
                }
                setFilters({...filters, wager_types: wager_types_copy});
              }}
              textComponent={
                <Text style={styles.checkboxText}>{filter.name}</Text>
              }
              iconStyle={
                filter.isChecked
                  ? styles.checkboxIconSelected
                  : styles.checkboxIcon
              }
            />
          </View>
        );
      },
    );
  };
  const renderBetTypeFilter = () => {
    return filters.bet_types.map(
      (filter: {name: string; isChecked: boolean}) => {
        return (
          <View key={filter.name} style={styles.mb26}>
            <BouncyCheckbox
              size={20}
              isChecked={filter.isChecked}
              fillColor={theme.colors.primaryBg}
              checkIconImageSource={CHECK_RIGHT}
              unfillColor={theme.colors.primaryBg}
              onPress={() => {
                const bet_types_copy = [...filters.bet_types];
                let index = bet_types_copy.findIndex(
                  element => element.name === filter.name,
                );
                if (index > -1) {
                  bet_types_copy[index].isChecked =
                    !bet_types_copy[index].isChecked;
                }
                setFilters({...filters, bet_types: bet_types_copy});
              }}
              textComponent={
                <Text style={styles.checkboxText}>{filter.name}</Text>
              }
              iconStyle={
                filter.isChecked
                  ? styles.checkboxIconSelected
                  : styles.checkboxIcon
              }
            />
          </View>
        );
      },
    );
  };
  const renderBooksFilter = () => {
    return filters.books.map(
      (filter: {name: string; book_id: string; isChecked: boolean}) => {
        return (
          <View key={filter.name} style={styles.mb26}>
            <BouncyCheckbox
              size={20}
              isChecked={filter.isChecked}
              fillColor={theme.colors.primaryBg}
              checkIconImageSource={CHECK_RIGHT}
              unfillColor={theme.colors.primaryBg}
              onPress={() => {
                const books_copy = [...filters.books];
                let index = books_copy.findIndex(
                  element => element.name === filter.name,
                );
                if (index > -1) {
                  books_copy[index].isChecked = !books_copy[index].isChecked;
                }
                setFilters({...filters, books: books_copy});
              }}
              textComponent={
                <Text style={styles.checkboxText}>{filter.name}</Text>
              }
              iconStyle={
                filter.isChecked
                  ? styles.checkboxIconSelected
                  : styles.checkboxIcon
              }
            />
          </View>
        );
      },
    );
  };
  const renderDatePickerFilter = () => {
    return (
      <>
        <DatePicker
          selectedDate={selectedStartDate}
          selectedStartDate={selectedStartDate}
          onChangeDate={handleStartDateChange}
          isDisabled={false}
          label={'From'}
        />

        <DatePicker
          selectedDate={selectedEndDate}
          onChangeDate={handleEndDateChange}
          selectedStartDate={selectedEndDate}
          isDisabled={false}
          label={'To'}
        />
      </>
    );
  };
  const renderFooter = () => {
    return (
      <View style={styles.footerWrapper}>
        <TouchableOpacity
          onPress={() => {
            dispatch(resetFiltersAction());
            navigation.pop();
          }}>
          <Text style={styles.clearFilterText}>Clear Filters</Text>
        </TouchableOpacity>
        <PrimaryButton
          text="Apply"
          gradientStyle={styles.modalGradientBtn}
          textStyle={styles.btnTextStyle}
          handleClick={handleApplyClick}
          gradientColors={theme.colors.secondaryGradient}
        />
      </View>
    );
  };
  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Filters"
      actionImage={BELL_ICON_IMG}
      navigation={navigation}
      footer={renderFooter()}
      renderScrollview={false}>
      <View style={[styles.flexRow, styles.flex1]}>
        <View style={styles.leftContainer}>
          <FlatList
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedFilterSection(item.id)}
                  style={[
                    styles.leftContainerItem,
                    selectedFilterSection === item.id && styles.blueBackground,
                  ]}>
                  <Text
                    style={[
                      styles.leftContainerItemText,
                      selectedFilterSection === item.id && styles.whiteText,
                    ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
            data={filterNames}
          />
        </View>
        {from === 'tribe' ? (
          <View style={styles.rightSection}>
            {selectedFilterSection === 0 && renderWagerStatusFilter()}
            {selectedFilterSection === 1 && renderWagerTypesFilter()}
            {selectedFilterSection === 2 && renderDatePickerFilter()}
          </View>
        ) : (
          <View style={styles.rightSection}>
            {selectedFilterSection === 0 && renderWagerStatusFilter()}
            {selectedFilterSection === 1 && renderSportsTypeFilter()}
            {selectedFilterSection === 2 && renderWagerTypesFilter()}
            {selectedFilterSection === 3 && renderBooksFilter()}
            {selectedFilterSection === 4 && renderBetTypeFilter()}
            {selectedFilterSection === 5 && renderDatePickerFilter()}
          </View>
        )}
      </View>
    </BaseLayout>
  );
};

export default Filters;
