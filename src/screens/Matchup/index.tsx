import React, {useEffect, useRef, useState} from 'react';
import useStyles from './styles';
import {useTheme, useNavigation, useIsFocused} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CustomSelect, MatchupCard, PrimaryButton} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {BET_QUEUE, CREATE_POST} from '../../routes/const';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  getMatchupScheduleAction,
  getSubscribedSportsBookAction,
  getMachupAction,
  postAddBetToQueueAction,
  Schedule,
  Matchup,
  Bet,
  getBetQueueCountAction,
  setSelectedMatchupBookAction,
  setSelectedMatchupSchedualAction,
  LineViewFilterOptionModal,
  setMatchupLineViewFilterOptionsAction,
  setMatchupLineViewEngineFilterOptionsAction,
  setNotificationToken,
  setSportName,
  getNotificationCountAction,
  getMachupBestLineAction,
} from '../../redux';
import {NBA, NFL_IMG, PLUS_ICON_IMG} from '../../assets';
import toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import sportsArray from '../../service/Sports.json';
import {capitalizeFirstLetter} from '../../service/helperFunction';

type MatchUpParamList = StackNavigationProp<PostLoginParamList, 'Comments'>;

const MatchUp = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<MatchUpParamList>();
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();
  const flatlistRef = useRef<FlatList>(null);

  const [bookOptions, setBookOptions] = useState<any>([]);
  const schedules = useSelector((state: any) => state.matchupReducer.schedules);
  const matchups = useSelector((state: any) => state.matchupReducer.matchups);
  const sportName = useSelector((state: any) => state.authReducer.sport);
  const [isFooterLoadder, setIsFooterLoadder] = useState<boolean>(false);
  const [isLoadingSport, setIsLoadingSport] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [canmomentum, setCanMomentum] = useState<boolean>(false);

  const betQueueCount = useSelector((state: any) => state.betReducer.count);
  const isMatchupLoading = useSelector(
    (state: any) => state.matchupReducer.isMatchupLoading,
  );
  const selectedBook = useSelector(
    (state: any) => state.matchupReducer.selectedBook,
  );
  const selectedSchedule = useSelector(
    (state: any) => state.matchupReducer.selectedSchedule,
  );
  const lineViewOptions: Array<LineViewFilterOptionModal> = useSelector(
    (state: any) => state.matchupReducer.lineViewOptions,
  );
  const lineViewEngineOptions: Array<LineViewFilterOptionModal> = useSelector(
    (state: any) => state.matchupReducer.lineViewEngineOptions,
  );
  useEffect(() => {
    getScheduleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sportName]);

  useEffect(() => {
    if (isFocused) {
      sendNotificationToken();
      dispatch(getNotificationCountAction());
      getBooks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, sportName]);

  const getScheduleList = () => {
    dispatch(
      getMatchupScheduleAction(sportName, data => {
        const isActive = data.filter((x: any) => x.is_active === true);
        if (isActive.length > 0) {
          dispatch(setSelectedMatchupSchedualAction(isActive[0]));
        } else {
          dispatch(setSelectedMatchupSchedualAction(data[data.length - 1]));
        }
      }),
    );
  };

  const getBooks = () => {
    dispatch(
      getSubscribedSportsBookAction(data => {
        let arr: any = [];
        const isContestBookArr = data.filter(
          (itemBook: any) => itemBook.book.is_contest_book === true,
        );
        data.forEach((item: any) => {
          let option = {
            ...item.book,
            id: item.book.book_id,
            display: item.book.name,
            isSelected: false,
          };
          if (selectedBook?.book_id) {
            if (selectedBook?.book_id === item.book.book_id) {
              option.isSelected = true;
              dispatch(setSelectedMatchupBookAction(option));
            }
          } else {
            if (isContestBookArr.length > 0) {
              if (item.book.book_id === isContestBookArr[0].book.book_id) {
                option.isSelected = true;
                dispatch(setSelectedMatchupBookAction(option));
              }
            } else if (
              !selectedBook?.book_id &&
              isContestBookArr.length === 0 &&
              item.book.book_id === 'sr:book:consensus'
            ) {
              option.isSelected = true;
              dispatch(setSelectedMatchupBookAction(option));
            }
          }
          arr.push(option);
        });
        setBookOptions(arr);
      }),
    );
    dispatch(getBetQueueCountAction());
  };

  const scrollToIndex = (index: number) => {
    flatlistRef?.current?.scrollToIndex({animated: true, index: index});
  };

  const sendNotificationToken = async () => {
    const token = await AsyncStorage.getItem('FCM_Token');
    if (token) {
      const deviceId = await DeviceInfo.getUniqueId();
      const device =
        Platform.OS === 'android'
          ? 'Android'
          : Platform.OS === 'ios'
          ? 'iOS'
          : 'Other';
      const body = {
        device_token: token,
        device_id: deviceId,
        device_type: device,
      };
      dispatch(
        setNotificationToken(
          body,
          () => {},
          () => {},
        ),
      );
    }
  };

  const resetLineViewFilter = () => {
    let temp = [...lineViewOptions];
    temp = temp.map((x, index) => {
      x.isSelected = false;
      if (index === 0) {
        x.isSelected = true;
      }
      return x;
    });
    dispatch(setMatchupLineViewFilterOptionsAction(temp));

    let temp1 = [...lineViewEngineOptions];
    temp1 = temp1.map((x, index) => {
      x.isSelected = false;
      if (index === 0) {
        x.isSelected = true;
      }
      return x;
    });
    dispatch(setMatchupLineViewEngineFilterOptionsAction(temp1));
  };

  const getMatchupView = (loading: boolean = true) => {
    if (selectedBook?.book_id && selectedSchedule?.id) {
      let book_id = selectedBook.book_id;
      let week_id = selectedSchedule.id;
      let params = {};
      if (sportName === 'nfl') {
        params = {book_id, week_id};
      } else if (sportName === 'nba') {
        params = {book_id: book_id, date: week_id};
      }
      if (selectedBook.book_id === 'bet:book:bestline') {
        dispatch(
          getMachupBestLineAction(params, currentPage, sportName, loading),
        );
      } else {
        dispatch(getMachupAction(params, currentPage, sportName, loading));
      }
    }
  };

  useEffect(() => {
    getMatchupView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBook]);

  useEffect(() => {
    if (selectedSchedule.id && schedules.length > 0) {
      const index = schedules.findIndex(
        (x: any) => x.id === selectedSchedule.id,
      );

      if (index <= schedules.length) {
        setTimeout(() => {
          scrollToIndex(index);
          getMatchupView();
        }, 1000);
        setTimeout(() => {
          setIsLoadingSport(false);
        }, 2000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSchedule]);

  const addBetQueue = async (
    matchup: Matchup,
    bet_side: any,
    bet_type: any,
  ) => {
    let am_odds: any = 0;
    let dec_odds: any = 0;
    let bet_point: any = 0;
    let oddup: any = 0;
    let odddown = 0;
    if (bet_type === 'Spread') {
      let odds_current: any = matchup.spread.current;
      am_odds = odds_current[bet_side.toLowerCase()];
      dec_odds = odds_current[bet_side.toLowerCase() + '_dec'];
      oddup =
        bet_side === 'Home'
          ? odds_current.home_spread
          : odds_current.away_spread;
      odddown = odds_current[bet_side.toLowerCase()];
      bet_point = parseFloat(oddup + '');
    }

    if (bet_type === 'Moneyline') {
      let odds_current: any = matchup.moneyline.current;
      am_odds = odds_current[bet_side.toLowerCase()];
      dec_odds = odds_current[bet_side.toLowerCase() + '_dec'];
      oddup = bet_side === 'Home' ? odds_current.home : odds_current.away;
      odddown =
        bet_side === 'Home' ? odds_current.home_imp : odds_current.away_imp;
      bet_point = odddown;
    }

    if (bet_type === 'Total') {
      am_odds =
        bet_side === 'Home'
          ? matchup?.total?.current?.over
          : matchup.total.current.under;
      dec_odds =
        bet_side === 'Home'
          ? matchup?.total?.current?.over_dec
          : matchup.total.current.under_dec;
      oddup = matchup.total.current.total;
      odddown =
        bet_side === 'Home'
          ? matchup?.total?.current?.under
          : matchup?.total?.current?.over;
      bet_point = parseFloat(oddup + '');
    }

    let betObj: Bet = {
      book: matchup.book_id,
      am_odds: am_odds,
      dec_odds,
      line: 0,
      match_id: matchup.match_id,
      bet_side,
      bet_type,
      home: matchup?.home,
      away: matchup?.away,
      event_time: matchup?.scheduled,
      bet_point,
      sport: capitalizeFirstLetter(sportName),
    };

    dispatch(
      postAddBetToQueueAction(betObj, (response: Bet) => {
        if (response) {
          toast.show('Bet added successfully', 2);
        }
        dispatch(getBetQueueCountAction());
        getMatchupView(false);
      }),
    );
  };

  const onChangeBook = (item: any) => {
    // resetLineViewFilter();
    let arr = bookOptions?.map((book: any) => {
      if (book.id === item.id) {
        book.isSelected = true;
        dispatch(setSelectedMatchupBookAction(book));
      } else {
        book.isSelected = false;
      }
      return book;
    });
    setBookOptions(arr);
  };

  const setGlobalSports = (name: string) => {
    AsyncStorage.setItem('Sport', name);
    dispatch(setSportName(name));
  };

  const renderItem = ({item, index}: any) => {
    return (
      <Pressable
        style={styles.btnWrapper}
        disabled={isLoadingSport}
        onPress={() => {
          setIsLoadingSport(true), setGlobalSports(item.name);
        }}>
        {Platform.OS === 'android' && (
          <Image style={styles.logo} source={index === 0 ? NBA : NFL_IMG} />
        )}
        <Text
          style={[
            styles.teamName,
            {
              color:
                sportName === item.name
                  ? theme.colors.secondaryGradient[0]
                  : theme.colors.primaryText,
            },
          ]}>
          {Platform.OS === 'ios'
            ? item.name === 'nfl'
              ? 'PRO FB'
              : 'PRO BB'
            : item.name}
        </Text>
      </Pressable>
    );
  };

  const sportSeparator = () => {
    return <View style={styles.separatorView} />;
  };
  const renderHead = () => {
    return (
      <LinearGradient
        colors={theme.colors.primaryGradient}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={styles.gradientStyle}>
        <View style={styles.gradientinnerWrapper}>
          <View style={styles.width75}>
            <FlatList
              horizontal
              bounces={false}
              data={sportsArray}
              renderItem={renderItem}
              ItemSeparatorComponent={sportSeparator}
            />
          </View>
          <View style={styles.btnWrapper}>
            <PrimaryButton
              text={`${betQueueCount} Bet`}
              style={styles.btnStyle}
              gradientStyle={styles.btnGradientStyle}
              textStyle={styles.btnTextStyle}
              handleClick={() => {
                if (betQueueCount > 0) {
                  navigation.navigate(BET_QUEUE);
                } else {
                  toast.show('Please add any bet', 2);
                }
              }}
              gradientColors={theme.colors.secondaryGradient}
            />
          </View>
        </View>
      </LinearGradient>
    );
  };

  const renderScheduleItems = (item: Schedule) => {
    return (
      <Pressable
        onPress={() => {
          resetLineViewFilter();
          dispatch(
            setSelectedMatchupSchedualAction(
              schedules.find((x: any) => x.id === item.id),
            ),
          );
        }}
        style={[
          styles.dateCard,
          selectedSchedule.id === item.id ? styles.blackBg : styles.whiteBg,
        ]}>
        <Text
          style={
            selectedSchedule.id === item.id
              ? styles.whiteText
              : styles.blackText
          }>
          {item.display1} {item.display2}
        </Text>
      </Pressable>
    );
  };

  const renderScheduals = () => {
    return (
      <View style={styles.mt14}>
        <FlatList
          horizontal
          ref={flatlistRef}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={365}
          data={schedules}
          keyExtractor={item => item.id}
          renderItem={({item}) => renderScheduleItems(item)}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 1000));
            wait.then(() => {
              flatlistRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
        />
      </View>
    );
  };

  const renderFilters = () => {
    return (
      <View style={styles.dropdownWrapperStyle}>
        <View style={styles.dropdownLabelWrapper}>
          <Text style={styles.labelText}>Sportsbook</Text>
          <CustomSelect
            options={bookOptions}
            selectedValue={selectedBook}
            onChange={onChangeBook}
          />
        </View>
        <View style={[styles.dropdownLabelWrapper, styles.flexRow]}>
          <View
            style={
              lineViewOptions?.find(x => x.isSelected)?.display === 'Engine'
                ? styles.w50
                : styles.w100
            }>
            <Text style={styles.labelText}>Line View</Text>
            <CustomSelect
              options={lineViewOptions}
              selectedValue={
                lineViewOptions?.find(x => x.isSelected) || lineViewOptions[0]
              }
              isDisable={selectedBook?.book_id === 'bet:book:bestline'}
              onChange={value => {
                let temp = [...lineViewOptions];
                temp = temp.map(x => {
                  x.isSelected = false;
                  if (x.id === value.id) {
                    x.isSelected = true;
                  }
                  return x;
                });
                dispatch(setMatchupLineViewFilterOptionsAction(temp));
              }}
            />
          </View>

          {lineViewOptions?.find(x => x.isSelected)?.display === 'Engine' ? (
            <View style={styles.w50}>
              <Text style={styles.labelText}> </Text>
              <CustomSelect
                options={lineViewEngineOptions}
                selectedValue={
                  lineViewEngineOptions?.find(x => x.isSelected) ||
                  lineViewEngineOptions[0]
                }
                onChange={value => {
                  let temp = [...lineViewEngineOptions];
                  temp = temp.map(x => {
                    x.isSelected = false;
                    if (x.id === value.id) {
                      x.isSelected = true;
                    }
                    return x;
                  });
                  dispatch(setMatchupLineViewEngineFilterOptionsAction(temp));
                }}
              />
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  const renderCardView = (matchup: Matchup, index: number) => {
    return (
      <>
        <MatchupCard
          key={index + 'matchup'}
          wrapperStyle={index % 2 === 0 ? null : styles.grayBg}
          matchup={matchup}
          onBet={addBetQueue}
          getMatchupView={(e: boolean) => getMatchupView(e)}
        />
      </>
    );
  };

  const renderMatchViewList = () => {
    return matchups?.results?.map((matchup: Matchup, index: number) => {
      return renderCardView(matchup, index);
    });
  };

  const renderCardHeader = () => {
    return (
      <View style={styles.mt10}>
        <LinearGradient
          colors={theme.colors.primaryGradient}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          style={styles.tableHeaderGradientStyle}>
          <View style={styles.gradientinnerWrapper}>
            <Text style={styles.headerText}>Teams</Text>
            <Text style={styles.headerText}>Open/Score</Text>
            <Text style={styles.headerText}>Spread</Text>
            <Text style={styles.headerText}> ML</Text>
            <Text style={styles.headerText}>Total</Text>
          </View>
        </LinearGradient>
      </View>
    );
  };

  const isScrollviewCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    const paddingToBottom = 50;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const loadMoreData = () => {
    if (matchups?.pagination?.next === true && !isFooterLoadder) {
      setIsFooterLoadder(true);
      if (selectedBook?.book_id && selectedSchedule?.id) {
        let book_id = selectedBook.book_id;
        let week_id = selectedSchedule.id;
        let params = {};
        if (sportName === 'nfl') {
          params = {book_id, week_id};
        } else if (sportName === 'nba') {
          params = {book_id: book_id, date: week_id};
        }
        toast.show('Loading...', 2);

        dispatch(
          getMachupAction(params, matchups?.pagination?.page, sportName, false),
        );
      }
      setIsFooterLoadder(false);
    }
  };

  const navigateToCreatePost = () => {
    navigation.navigate(CREATE_POST, {mode: 'add'});
  };

  return (
    <View style={styles.mainView}>
      {renderHead()}
      {renderScheduals()}
      <View style={styles.separator}>
        <View style={[styles.separatorDot, {left: 0}]} />
        <View style={[styles.separatorDot, {right: 0}]} />
      </View>
      {renderFilters()}
      {renderCardHeader()}
      <ScrollView
        style={styles.mainContainer}
        scrollEventThrottle={16}
        onScroll={event => {
          setCanMomentum(true);
        }}
        onMomentumScrollEnd={event => {
          if (canmomentum) {
            if (isScrollviewCloseToBottom(event.nativeEvent)) {
              loadMoreData();
            }
            setCanMomentum(false);
          }
        }}>
        <View>
          {isMatchupLoading ? (
            <ActivityIndicator
              style={styles.mt50}
              color={theme.colors.lightBlueText}
            />
          ) : (
            <>
              {renderMatchViewList()}
              {isFooterLoadder && (
                <ActivityIndicator
                  style={styles.mt30}
                  color={theme.colors.lightBlueText}
                />
              )}
            </>
          )}
          {!isMatchupLoading && matchups?.results?.length === 0 ? (
            <Text style={styles.noMatchFound}>No match found</Text>
          ) : null}
        </View>
      </ScrollView>
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

export default MatchUp;
