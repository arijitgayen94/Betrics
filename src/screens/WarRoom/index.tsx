import React, {useEffect, useState} from 'react';
import {
  useTheme,
  useNavigation,
  useRoute,
  useIsFocused,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {BaseLayout} from '../../layout';
import WrTabView from '../../components/WarRoom/WrTabView';
import WrMatchDetailsView from '../../components/WarRoom/WrMatchDetailsView';
import WrGrayTabView from '../../components/WarRoom/WrGrayTabView';
import WrGameLogCard from '../../components/WarRoom/WrGameLogCard';
import WrMatchGrayView from '../../components/WarRoom/WrMatchGrayView';
import WrSnapshotStatsTable from '../../components/WarRoom/Snapshot/WrStatsTable';
import WrSnapshotProjectionTable from '../../components/WarRoom/Snapshot/WrProjectionTable';
import WrSnapshotRatingTable from '../../components/WarRoom/Snapshot/WrRatingTable';
import WrInjuryTable from '../../components/WarRoom/Lineups/WrInjuryTable';
import WrLineupsStats from '../../components/WarRoom/Lineups/WrStatsTable';
import WrLineupsProjections from '../../components/WarRoom/Lineups/WrProjectionTable';
import WrLineupsRating from '../../components/WarRoom/Lineups/WrRatingTable';
import WrLineMoveView from '../../components/WarRoom/LineMove/WrLineMoveDropdowns';
import WrRankingTable from '../../components/WarRoom/Rankings/WrRanking';
import WrHandiCap from '../../components/WarRoom/Handicap/WrHandicap';
// import {WrMatchup} from '../../redux/modals/WarRoom';
import useStyles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  getSnapshotStatsAction,
  getBetQueueCountAction,
  postLiveMoveAction,
  postGameLogAction,
  setSelectedMatchupBookAction,
  getSubscribedSportsBookAction,
  getRetriveMatchupViewAction,
  getRetriveNflMatchupViewAction,
} from '../../redux';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomSelect} from '../../components';
import {SET_MATCHUP_LOADING} from '../../redux/actionTypes';
import toast from 'react-native-simple-toast';
import WrGameLogTable from '../../components/WarRoom/Snapshot/WrGameLogTable';
import {CREATE_POST} from '../../routes/const';
import LinearGradient from 'react-native-linear-gradient';
import {PLUS_ICON_IMG} from '../../assets';

type WarRoomParamList = StackNavigationProp<PostLoginParamList, 'Comments'>;

const WarRoom = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<WarRoomParamList>();
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();
  const route: any = useRoute();
  const sportName = useSelector((state: any) => state.authReducer.sport);
  const loading = useSelector((state: any) => state.loadingReducer.isLoading);
  const isMatchupLoading = useSelector(
    (state: any) => state.matchupReducer.isMatchupLoading,
  );
  const optionOne: any = [
    {id: 0, display: 'Spread'},
    {id: 1, display: 'Moneyline'},
    {id: 2, display: 'Total'},
  ];
  const [optionTwo, setOptionTwo] = useState<any>([
    {id: 0, display: 'Home'},
    {id: 1, display: 'Away'},
  ]);
  const [options1, setOption1] = useState<number>(0);
  const [options2, setOption2] = useState<number>(0);
  const [isActive, setIsActive] = useState<number>(1);
  const [bookOptions, setBookOptions] = useState<any>([]);
  const [lineViewOptions, setLineViewOptions] = useState<any>([
    {
      id: 1,
      display: 'Odds',
      isSelected: true,
    },
    {
      id: 3,
      display: 'Engine',
      isSelected: false,
    },
  ]);
  const [lineViewEngineOptions, setLineViewEngineOptions] = useState<any>([
    {id: 1, display: 'Pred', isSelected: true, key: 'prediction'},
    {id: 2, display: 'Prob', isSelected: false, key: 'probability'},
    {id: 3, display: 'Edge', isSelected: false, key: 'edge'},
    {id: 4, display: 'EV', isSelected: false, key: 'EV'},
    {id: 5, display: 'Kelly', isSelected: false, key: 'kelly'},
  ]);
  const selectedBook = useSelector(
    (state: any) => state.matchupReducer.selectedBook,
  );
  const selectedSchedule = useSelector(
    (state: any) => state.matchupReducer.selectedSchedule,
  );

  const [team1Stats, setTeam1Stats] = useState({});
  const [team2Stats, setTeam2Stats] = useState({});
  const [matchups, setMatchups] = useState({});
  const [matchupData, setMatchupData] = useState<any>(route?.params?.matchup);
  const [activeButton, setActiveButton] = useState('spread');

  // Main Tabs
  const mainTabItems = [
    {
      name: 'snapshot',
      label: 'Snapshot',
    },
    {
      name: 'lineups',
      label: 'Lineups',
    },
    {
      name: 'live_move',
      label: 'Live Move',
    },
    {
      name: 'rankings',
      label: 'Rankings',
    },
    {
      name: 'handicap',
      label: 'Handicap',
    },
  ];
  const [selectedMainTab, setSelectedMainTab] = useState('snapshot');

  // Snapshot Sub Tabs
  const snapshotTabItems =
    sportName === 'nfl'
      ? [
          {
            name: 'projection',
            label: 'Projection',
          },
          {
            name: 'game_log',
            label: 'Game Log',
          },
          {
            name: 'stats',
            label: 'Stats',
          },
          {
            name: 'ratings',
            label: 'Ratings',
          },
        ]
      : [
          {
            name: 'projection',
            label: 'Projection',
          },
          {
            name: 'game_log',
            label: 'Game Log',
          },
        ];
  const [selectedSnapshotSubTab, setSelectedSnapshotSubTab] =
    useState('projection');

  // Lineups Sub Tabs
  const lineupsTabItems =
    sportName === 'nfl'
      ? [
          {
            name: 'injury',
            label: 'Injury',
          },
          {
            name: 'stats',
            label: 'Stats',
          },
          {
            name: 'projection',
            label: 'Projection',
          },
          {
            name: 'ratings',
            label: 'Ratings',
          },
        ]
      : [
          {
            name: 'injury',
            label: 'Injury',
          },
          {
            name: 'projection',
            label: 'Projection',
          },
        ];
  const [selectedLineupsSubTab, setSelectedLineupsSubTab] = useState('injury');

  useEffect(() => {
    if (isFocused) {
      dispatch(getBetQueueCountAction());
      getSnapshotStatsView();
      getBooks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(() => {
    getMatchupView(true);
    getLiveMoveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBook]);

  useEffect(() => {
    getLiveMoveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  useEffect(() => {
    if (options1 === 2) {
      setOptionTwo([
        {id: 0, display: 'Over'},
        {id: 1, display: 'Under'},
      ]);
    } else {
      setOptionTwo([
        {id: 0, display: 'Home'},
        {id: 1, display: 'Away'},
      ]);
    }
  }, [options1]);

  const getBooks = () => {
    dispatch(
      getSubscribedSportsBookAction(data => {
        let arr: any = [];
        data.forEach((item: any) => {
          let option = {
            ...item.book,
            id: item.book.book_id,
            display: item.book.name,
            isSelected: false,
          };
          if (selectedBook?.book_id === item.book.book_id) {
            option.isSelected = true;
            dispatch(setSelectedMatchupBookAction(option));
          } else if (
            !selectedBook?.book_id &&
            item.book.book_id === 'sr:book:consensus'
          ) {
            option.isSelected = true;
            dispatch(setSelectedMatchupBookAction(option));
          }
          if (option?.book_id !== 'bet:book:bestline') {
            arr.push(option);
          }
        });
        setBookOptions(arr);
      }),
    );
  };

  const getMatchupView = (isLoading: true) => {
    if (selectedBook?.book_id && selectedSchedule?.id) {
      const book_id = selectedBook.book_id;
      const week_id = selectedSchedule.id;
      if (sportName === 'nba') {
        if (isLoading) {
          dispatch({type: SET_MATCHUP_LOADING, payload: true});
        }
        const body = {
          book_id: book_id,
          match_id: matchupData.match_id,
        };
        dispatch(
          getRetriveMatchupViewAction(body, sportName, onSuccess, onError),
        );
      } else {
        if (isLoading) {
          dispatch({type: SET_MATCHUP_LOADING, payload: true});
        }
        const body = {
          week_id: week_id,
          book_id: book_id,
          match_id: matchupData.match_id,
        };
        dispatch(getRetriveNflMatchupViewAction(body, onSuccess, onError));
      }
    }
  };

  const getLiveMoveData = () => {
    if (selectedBook?.book_id && selectedSchedule?.id) {
      let book_id = selectedBook.book_id;
      let days = 0;
      if (isActive === 0) {
        days = 1;
      } else if (isActive === 1) {
        if (sportName === 'nfl') {
          days = 3;
        } else {
          days = 2;
        }
      } else if (isActive === 2) {
        days = 7;
      } else if (isActive === 4) {
        days = 11;
      } else {
        days = 15;
      }

      const body = {
        book_id: book_id,
        match_id: matchupData.match_id,
        days: days,
      };
      dispatch(postLiveMoveAction(body));
    }
  };

  const onSuccess = (dataSet: any) => {
    dispatch({type: SET_MATCHUP_LOADING, payload: false});
    if (sportName === 'nba') {
      setMatchups(dataSet);
    } else {
      setMatchupData(dataSet);
    }
  };
  const onError = (dataSet: any) => {
    toast.show(dataSet?.[0]?.message, 2);
  };

  const getSnapshotStatsView = () => {
    const awayUuid = matchupData.away.id;
    const homeUuid = matchupData.home.id;
    if (awayUuid) {
      const team1_id = matchupData.away.sr_id;
      // Note: uuid replaced with id
      dispatch(
        getSnapshotStatsAction({team_id: team1_id}, sportName, setTeam1Stats),
      );
    }
    if (homeUuid) {
      const team2_id = matchupData.home.sr_id;
      // Note: uuid replaced with id
      dispatch(
        getSnapshotStatsAction({team_id: team2_id}, sportName, setTeam2Stats),
      );
    }
  };

  const setGameLogData = (team: string) => {
    const teamId =
      team === 'away' ? matchupData.away.sr_id : matchupData.home.sr_id;

    const body = {
      team_id: teamId,
    };

    dispatch(postGameLogAction(body, sportName));
  };

  const onChangeBook = (item: any) => {
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

  const navigateToCreatePost = () => {
    navigation.navigate(CREATE_POST, {mode: 'add'});
  };

  return (
    <>
      <BaseLayout
        back={true}
        titleType="text"
        titleText="War Room"
        navigation={navigation}
        renderScrollview={selectedMainTab !== 'rankings' ? true : false}
        showNFLHeader={true}>
        <View style={styles.dropdownLabelWrapper}>
          <View style={styles.sportsBookView}>
            <Text style={styles.labelText}>Sportsbook</Text>
            <CustomSelect
              options={bookOptions}
              selectedValue={selectedBook}
              onChange={onChangeBook}
            />
          </View>
          <View
            style={[
              styles.dropdownLabelWrapper,
              styles.flexRow,
              {width: '50%'},
            ]}>
            <View
              style={
                lineViewOptions?.find((x: any) => x.isSelected)?.display ===
                'Engine'
                  ? styles.w50
                  : styles.w100
              }>
              <Text style={styles.labelText}>Line View</Text>

              <CustomSelect
                options={lineViewOptions}
                selectedValue={
                  lineViewOptions?.find((x: any) => x.isSelected) ||
                  lineViewOptions[0]
                }
                onChange={value => {
                  let temp = [...lineViewOptions];
                  temp = temp.map(x => {
                    x.isSelected = false;
                    if (x.id === value.id) {
                      x.isSelected = true;
                    }
                    return x;
                  });
                  setLineViewOptions(temp);
                }}
              />
            </View>
            {lineViewOptions?.find((x: any) => x.isSelected)?.display ===
            'Engine' ? (
              <View style={styles.w50}>
                <Text style={styles.labelText}> </Text>
                <CustomSelect
                  options={lineViewEngineOptions}
                  selectedValue={
                    lineViewEngineOptions?.find((x: any) => x.isSelected) ||
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
                    setLineViewEngineOptions(temp);
                  }}
                />
              </View>
            ) : null}
          </View>
        </View>
        <WrTabView
          tabs={mainTabItems}
          selected={selectedMainTab}
          onPress={setSelectedMainTab}
        />

        {selectedMainTab !== 'rankings' && matchups && (
          <>
            {isMatchupLoading ? (
              <ActivityIndicator
                style={styles.mt50}
                color={theme.colors.lightBlueText}
              />
            ) : (
              <WrMatchDetailsView
                matchup={sportName === 'nba' ? matchups : matchupData}
                selectedBook={selectedBook}
                getMatchupView={getMatchupView}
                selectedMainTab={selectedMainTab}
                lineViewOptions={lineViewOptions}
                lineViewEngineOptions={lineViewEngineOptions}
              />
            )}
          </>
        )}

        {/* Snapshot View */}
        {selectedMainTab === 'snapshot' && (
          <>
            <WrMatchGrayView
              matchup={matchupData}
              setActiveButton={setActiveButton}
              activeButton={activeButton}
            />
            <WrGrayTabView
              tabs={snapshotTabItems}
              selected={selectedSnapshotSubTab}
              onPress={setSelectedSnapshotSubTab}
            />
            {selectedSnapshotSubTab === 'game_log' && (
              <>
                <WrGameLogCard
                  matchup={matchupData}
                  changeTeam={(e: string) => setGameLogData(e)}
                />
                {loading ? (
                  <ActivityIndicator color={theme.colors.lightBlueText} />
                ) : (
                  <WrGameLogTable />
                )}
              </>
            )}
            {selectedSnapshotSubTab === 'stats' && (
              <>
                <WrSnapshotStatsTable
                  snapshotstats1={team1Stats}
                  snapshotstats2={team2Stats}
                />
              </>
            )}
            {selectedSnapshotSubTab === 'projection' && (
              <WrSnapshotProjectionTable
                matchup={matchupData}
                week_id={selectedSchedule?.id}
                activeButton={activeButton}
              />
            )}
            {selectedSnapshotSubTab === 'ratings' ? (
              <WrSnapshotRatingTable matchup={matchupData} />
            ) : null}
          </>
        )}
        {/* Snapshot View End */}

        {selectedMainTab === 'lineups' && (
          <>
            <WrGrayTabView
              tabs={lineupsTabItems}
              selected={selectedLineupsSubTab}
              onPress={setSelectedLineupsSubTab}
            />
            {selectedLineupsSubTab === 'injury' && (
              <WrInjuryTable matchup={matchupData} />
            )}
            {selectedLineupsSubTab === 'stats' && (
              <WrLineupsStats matchup={matchupData} />
            )}
            {selectedLineupsSubTab === 'projection' && (
              <WrLineupsProjections matchup={matchupData} />
            )}
            {selectedLineupsSubTab === 'ratings' && (
              <WrLineupsRating matchup={matchupData} />
            )}
          </>
        )}
        {selectedMainTab === 'live_move' && (
          <WrLineMoveView
            options1={optionOne}
            selected1={optionOne[options1]}
            onChange1={(e: any) => {
              setOption1(e.id);
            }}
            options2={optionTwo}
            selected2={optionTwo[options2]}
            onChange2={(e: any) => {
              setOption2(e.id);
            }}
            isActive={isActive}
            onChangeDays={(e: number) => setIsActive(e)}
          />
        )}
        {selectedMainTab === 'rankings' && <WrRankingTable />}
        {selectedMainTab === 'handicap' && (
          <WrHandiCap matchup={sportName === 'nfl' ? matchupData : matchups} />
        )}
      </BaseLayout>
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
    </>
  );
};

export default WarRoom;
