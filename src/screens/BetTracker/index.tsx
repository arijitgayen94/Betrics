import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useStyles from './styles';
import {useIsFocused, useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import LinearGradient from 'react-native-linear-gradient';
import {Table, Row, Rows} from 'react-native-table-component';
import {SlidingModal, WagerActivityInnerCard} from '../../components';
import {
  AppDispatch,
  BetTrackerFilters,
  BetTrackerModal,
  getNotificationCountAction,
  setFiltersAction,
} from '../../redux';
import {useDispatch, useSelector} from 'react-redux';
import {getBetTrackerAction} from '../../redux/actions/betTracker';
import moment from 'moment';
import {CREATE_POST} from '../../routes/const';
import {PLUS_ICON_IMG} from '../../assets';

type BetTrackerParamList = StackNavigationProp<
  PostLoginParamList,
  'CreatePost'
>;

const BetTracker = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<BetTrackerParamList>();
  const isFocused = useIsFocused();
  const [selectedStat, setSelectedStat] = useState<string>('pending');
  const [betTracker, setBetTracker] = useState<BetTrackerModal>({});
  const [newData, setNewData] = useState<BetTrackerModal>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {initialFilters} = useSelector((state: any) => state.betTrackerReducer);
  const dispatch = useDispatch<AppDispatch>();
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (isFocused) {
      const _startDate: string = initialFilters.date_range.find(
        (element: any) => element.type === 'startDate',
      )?.value;
      const _endDate: string = initialFilters.date_range.find(
        (element: any) => element.type === 'endDate',
      )?.value;
      let filters: BetTrackerFilters = {
        wager_status: initialFilters.wager_status
          .filter((item: any) => item.isChecked)
          .map((_item: any) => _item.name),
        sports_type: initialFilters.sports_type
          .filter((item: any) => item.isChecked)
          .map((_item: any) => _item.name),
        wager_types: initialFilters.wager_types
          .filter((item: any) => item.isChecked)
          .map((_item: any) => _item.name),
        bet_types: initialFilters.bet_types
          .filter((item: any) => item.isChecked)
          .map((_item: any) => _item.name),
        book_ids: initialFilters.books
          .filter((item: any) => item.isChecked)
          .map((item: any) => item.isChecked && item.book_id),
        date_range: [],
        sort_by: initialFilters.sort_by,
      };
      if (_startDate && _endDate) {
        filters.date_range = [
          moment(_startDate).format('YYYY-MM-DD'),
          moment(_endDate).format('YYYY-MM-DD'),
        ];
      }
      dispatch(
        getBetTrackerAction(
          1,
          filters,
          (data: BetTrackerModal) => {
            setBetTracker(data);
          },
          error => {
            console.error(error);
          },
        ),
      );

      dispatch(getNotificationCountAction());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFilters, isFocused]);

  useEffect(() => {
    if (newData.bet_tracking_result?.results) {
      if (betTracker) {
        var betData = betTracker;
        let newDataResult = [
          ...betTracker?.bet_tracking_result?.results,
          ...newData?.bet_tracking_result?.results,
        ];
        if (betData) {
          betData.bet_tracking_result.results = newDataResult;
          betData.bet_tracking_result.pagination =
            newData.bet_tracking_result?.pagination;
        }
        setBetTracker(betData);
        setNewData({});
      }
    }
  }, [newData, betTracker]);

  const renderPeddingtable = () => {
    let rows: any = [];
    let totalBetsCount = 0;
    let totalAtRiscCount = 0;
    let totalToWinCount: any = 0;
    let pending_wagers: any =
      betTracker?.performance_state?.pending_wagers || {};
    Object.keys(pending_wagers).forEach((key: string) => {
      if (key === 'straight') {
        return;
      }
      totalBetsCount = totalBetsCount + +pending_wagers[key].wager_type__count;
      totalAtRiscCount = totalAtRiscCount + +pending_wagers[key].at_risk__sum;
      totalToWinCount = totalToWinCount + +pending_wagers[key].payout__sum;
      let arr: any = [
        key,
        pending_wagers[key].wager_type__count,
        pending_wagers[key].at_risk__sum?.toFixed(2),
        pending_wagers[key].payout__sum?.toFixed(2),
      ];
      rows.push(arr);
    });
    return (
      <Table borderStyle={styles.tableBorderStyle}>
        <Row
          data={['Bet Type', 'Bets', 'At Risk', 'To Win']}
          style={styles.tableHeaderRowStyle}
          textStyle={styles.tableHeaderTextStyle}
          flexArr={[1, 0.6, 1, 1]}
        />
        <Rows
          data={rows}
          textStyle={styles.tableBodyTextStyle}
          flexArr={[1, 0.6, 1, 1]}
        />
        <Row
          data={[
            'All Wagers',
            totalBetsCount,
            `$${parseFloat(totalAtRiscCount + '').toFixed(2)}`,
            `$${parseFloat(totalToWinCount + '').toFixed(2)}`,
          ]}
          style={styles.tableFooterRowStyle}
          textStyle={styles.tableFooterTextStyle}
          flexArr={[1, 0.6, 1, 1]}
        />
      </Table>
    );
  };

  const renderCompletedTable = () => {
    let rows: any = [];
    let totalBetsCount = 0;
    let totalAtRiscCount = 0;
    let totalWinSum = 0;
    let totalLossSum = 0;
    let totalTossSum = 0;
    let totalProfitLossSum = 0;
    let completed_wagers: any =
      betTracker?.performance_state?.completed_wagers || {};

    Object.keys(completed_wagers).forEach((key: string) => {
      if (key === 'straight') {
        return;
      }
      totalBetsCount =
        totalBetsCount + +completed_wagers[key].wager_type__count;
      totalAtRiscCount = totalAtRiscCount + completed_wagers[key].at_risk__sum;
      totalProfitLossSum =
        totalProfitLossSum + +completed_wagers[key].profit_loss_sum;
      totalWinSum = totalWinSum + +completed_wagers[key].win__count;
      totalLossSum = totalLossSum + +completed_wagers[key].loss__count;
      totalTossSum = totalTossSum + +completed_wagers[key].push__count;
      let arr: any = [
        key,
        completed_wagers[key].wager_type__count,
        completed_wagers[key].at_risk__sum.toFixed(2),
        `${completed_wagers[key].win__count}-${completed_wagers[key].loss__count}-${completed_wagers[key].push__count}`,
        completed_wagers[key].profit_loss_sum.toFixed(2),
      ];
      rows.push(arr);
    });
    return (
      <Table borderStyle={styles.tableBorderStyle}>
        <Row
          data={['Bet Type', 'Bets', 'At Risk', 'W-L-T', 'PL']}
          style={styles.tableHeaderRowStyle}
          textStyle={styles.tableHeaderTextStyle}
          flexArr={[1, 0.6, 1, 1, 1]}
        />
        <Rows
          data={rows}
          textStyle={styles.tableBodyTextStyle}
          flexArr={[1, 0.6, 1, 1, 1]}
        />
        <Row
          data={[
            'All Wagers',
            totalBetsCount,
            `$${totalAtRiscCount}`,
            `${totalWinSum}-${totalLossSum}-${totalTossSum}`,
            totalProfitLossSum.toFixed(2),
          ]}
          flexArr={[1, 0.6, 1, 1, 1]}
          style={styles.tableFooterRowStyle}
          textStyle={styles.tableFooterTextStyle}
        />
      </Table>
    );
  };

  const renderShortModal = () => {
    return (
      <SlidingModal isModalVisible={isModalVisible} toggleModal={toggleModal}>
        <View style={styles.modalInnerContainer}>
          <View style={styles.textWrapper}>
            <Text style={styles.modalHeadingText}>SORT BY</Text>
            <View style={styles.separator} />
            <FlatList
              data={[
                {label: 'Sort by Latest', value: 'Latest', id: 0},
                {label: 'Sort by Win', value: 'Win', id: 1},
                {label: 'Sort by Loss', value: 'Loss', id: 2},
                {label: 'Sort by Push', value: 'Push', id: 3},
                {label: 'Sort by Pending', value: 'Pending', id: 4},
                {
                  label: 'Sort by at Risk High to Low',
                  value: 'At_risk_h_to_l',
                  id: 5,
                },
                {
                  label: 'Sort by at Risk Low to High',
                  value: 'At_risk_l_to_h',
                  id: 6,
                },
              ]}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View style={styles.filterItemWrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          setFiltersAction({
                            ...initialFilters,
                            sort_by: item.value,
                          }),
                        );
                        toggleModal();
                      }}
                      key={item.id}
                      style={styles.filterItemModal}>
                      <Text style={[styles.filterItemLabel]}>{item.label}</Text>
                      <View
                        style={[
                          styles.filterItemCircle,
                          item.value === initialFilters.sort_by &&
                            styles.lightBlueBorder,
                        ]}>
                        {item.value === initialFilters.sort_by && (
                          <View style={styles.filterItemInnerCircle} />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </SlidingModal>
    );
  };
  const isScrollviewCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const loadMoreData = () => {
    if (betTracker?.bet_tracking_result?.pagination?.next === true) {
      const _startDate: string = initialFilters.date_range.find(
        (element: any) => element.type === 'startDate',
      )?.value;
      const _endDate: string = initialFilters.date_range.find(
        (element: any) => element.type === 'endDate',
      )?.value;
      let filters: BetTrackerFilters = {
        wager_status: initialFilters.wager_status
          .filter((item: any) => item.isChecked)
          .map((_item: any) => _item.name),
        sports_type: initialFilters.sports_type
          .filter((item: any) => item.isChecked)
          .map((_item: any) => _item.name),
        wager_types: initialFilters.wager_types
          .filter((item: any) => item.isChecked)
          .map((_item: any) => _item.name),
        bet_types: initialFilters.bet_types
          .filter((item: any) => item.isChecked)
          .map((_item: any) => _item.name),
        book_ids: initialFilters.books
          .filter((item: any) => item.isChecked)
          .map((item: any) => item.isChecked && item.book_id),
        date_range: [],
        sort_by: initialFilters.sort_by,
      };
      if (_startDate && _endDate) {
        filters.date_range = [
          moment(_startDate).format('YYYY-MM-DD'),
          moment(_endDate).format('YYYY-MM-DD'),
        ];
      }
      dispatch(
        getBetTrackerAction(
          betTracker?.bet_tracking_result?.pagination?.page,
          filters,
          (data: BetTrackerModal) => {
            setNewData(data);
          },
          error => {
            console.error(error);
          },
        ),
      );
    }
  };

  const navigateToCreatePost = () => {
    navigation.navigate(CREATE_POST, {mode: 'add'});
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.filterRowContainer}>
        <Pressable onPress={toggleModal} style={styles.filterItem}>
          <Text style={styles.filterItemText}>Sort</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Filters', {from: 'others'})}
          style={styles.filterItem}>
          <Text style={styles.filterItemText}>Filter</Text>
        </Pressable>
      </View>
      <ScrollView
        style={styles.innerContainer}
        onMomentumScrollEnd={event => {
          if (isScrollviewCloseToBottom(event.nativeEvent)) {
            loadMoreData();
          }
        }}>
        <View style={styles.statsCard}>
          <LinearGradient
            colors={theme.colors.primaryGradient}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={styles.statsCardHeader}>
            <Text style={styles.statsCardHeading}>Performance Stats</Text>
          </LinearGradient>
          <View style={styles.statsCardInnerContainer}>
            <View style={styles.statsCardTabContainer}>
              <Pressable
                onPress={() => setSelectedStat('pending')}
                style={[
                  styles.statsCardTab,
                  selectedStat === 'pending' && styles.statsCardTabSelected,
                ]}>
                <Text
                  style={[
                    styles.statsCardTabText,
                    selectedStat === 'pending' && styles.blueText,
                  ]}>
                  Pending Wagers
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setSelectedStat('completed')}
                style={[
                  styles.statsCardTab,
                  selectedStat === 'completed' && styles.statsCardTabSelected,
                ]}>
                <Text
                  style={[
                    styles.statsCardTabText,
                    selectedStat === 'completed' && styles.blueText,
                  ]}>
                  Completed Wagers
                </Text>
              </Pressable>
            </View>
            {betTracker && (
              <View style={styles.tableWrapper}>
                {selectedStat === 'pending'
                  ? renderPeddingtable()
                  : renderCompletedTable()}
              </View>
            )}
          </View>
        </View>
        {/* wager activity card starts here */}
        <View style={styles.statsCard}>
          <LinearGradient
            colors={theme.colors.primaryGradient}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={styles.statsCardHeader}>
            <Text style={styles.statsCardHeading}>Wager Activity</Text>
          </LinearGradient>
          {betTracker?.bet_tracking_result?.results?.map((item, index) => {
            return <WagerActivityInnerCard key={index} wagerActivity={item} />;
          })}
        </View>
      </ScrollView>
      {renderShortModal()}
      <TouchableOpacity
        onPress={navigateToCreatePost}
        style={styles.floatingBtn}>
        <LinearGradient
          colors={theme.colors.secondaryGradient}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          style={styles.floatingBtnGradient}>
          <Image source={PLUS_ICON_IMG} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default BetTracker;
