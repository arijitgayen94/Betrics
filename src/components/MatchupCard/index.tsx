import React, {useState, useEffect} from 'react';
import useStyles from './styles';
import PropTypes from 'prop-types';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import {PrimaryButton} from '../PrimaryButton';
import {PrimaryModal} from '../PrimaryModal';
import {PrimaryInput} from '../PrimaryInput';
import {
  AppDispatch,
  getBetInfoAction,
  getBetQueueCountAction,
  getHandicapAction,
  HandicapModal,
  LineViewFilterOptionModal,
  Matchup,
  postClearBetQueueAction,
  resetHandicapAction,
  updatetHandicapAction,
} from '../../redux';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {WAR_ROOM} from '../../routes/const';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {capitalizeFirstLetter} from '../../service/helperFunction';

interface MatchupCardProps {
  wrapperStyle?: any;
  matchup: Matchup;
  onBet?: (matchup: Matchup, bet_side: string, bet_type: string) => void;
  getMatchupView: (e: boolean) => void;
}

type WarRoomNavigation = StackNavigationProp<PostLoginParamList, 'WarRoom'>;

const MatchupCard = (props: MatchupCardProps) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const {matchup} = props;
  const [showHandicapModal, setShowHandicapModal] = useState<boolean>(false);
  const [handicap, setHandicap] = useState<HandicapModal>({
    away_score: 0.0,
    home_score: 0.0,
    book: matchup?.book_id,
    match_id: matchup?.match_id,
    sport_type: 'Nfl',
    uuid: '',
  });
  const [showBetModal, setShowBetModal] = useState<boolean>(false);
  const [selectedEngineFilter, setSelectedEngineFilter] = useState<string>('');
  const [betInfo, setBetInfo] = useState<any>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<WarRoomNavigation>();
  const sportName = useSelector((state: any) => state.authReducer.sport);
  const isHandicapLoading = useSelector(
    (state: any) => state.matchupReducer.isHandicapLoading,
  );
  const lineViewOptions: Array<LineViewFilterOptionModal> = useSelector(
    (state: any) => state.matchupReducer.lineViewOptions,
  );
  const lineViewEngineOptions: Array<LineViewFilterOptionModal> = useSelector(
    (state: any) => state.matchupReducer.lineViewEngineOptions,
  );
  const selectedBook = useSelector(
    (state: any) => state.matchupReducer.selectedBook,
  );

  useEffect(() => {
    if (lineViewOptions.find(x => x.isSelected)?.display === 'Engine') {
      setSelectedEngineFilter(
        lineViewEngineOptions.find(x => x.isSelected)?.key || '',
      );
    } else {
      setSelectedEngineFilter('');
    }
  }, [lineViewOptions, lineViewEngineOptions]);

  const getEngineesponseOnKey = () => {
    let result: any = matchup?.engine_result;
    return result ? result[selectedEngineFilter] : {};
  };

  const updateHandicap = () => {
    dispatch(
      updatetHandicapAction(handicap, sportName, () => {
        getHandicap();
        setShowHandicapModal(false);
      }),
    );
  };

  const resetHandicap = () => {
    dispatch(
      resetHandicapAction(handicap.uuid, sportName, () => {
        getHandicap();
        setShowHandicapModal(false);
      }),
    );
  };

  const getHandicap = () => {
    dispatch(
      getHandicapAction(
        {
          book: props?.matchup?.book_id,
          match_id: props?.matchup?.match_id,
          sport_type: capitalizeFirstLetter(sportName),
        },
        sportName,
        (data: HandicapModal) => {
          setHandicap(data);
        },
      ),
    );
  };

  const getBetInfo = () => {
    const body = {
      match_id: matchup?.match_id,
      book: matchup?.book_id,
    };

    dispatch(
      getBetInfoAction(
        body,
        data => {
          setBetInfo(data), setShowBetModal(true);
        },
        err => console.log(err),
      ),
    );
  };

  const renderBetInfo = ({item}: any) => {
    return (
      <View style={styles.betOptionView}>
        <Text style={styles.betNameCard}>{item?.team_abbr}</Text>
        <Text
          style={[
            styles.betNameCard,
            {
              color:
                item.bet_status === 'Win'
                  ? theme.colors.onlineGreen
                  : item.bet_status === 'Loss'
                  ? theme.colors.googleRed
                  : item.bet_status === 'Push'
                  ? theme.colors.yellow
                  : theme.colors.secondaryText,
            },
          ]}>
          {`${
            item.bet_side === 'Over'
              ? 'o'
              : item.bet_side === 'Under'
              ? 'u'
              : ''
          }${item.bet_point}`}
        </Text>
      </View>
    );
  };

  const renderBetOptionModal = () => {
    return (
      <PrimaryModal
        visible={showBetModal}
        headerTitle={'Bets'}
        height={'40%'}
        handleClose={() => {
          setShowBetModal(false);
        }}>
        <View style={[styles.modalChildren, styles.height100]}>
          <FlatList
            data={betInfo}
            renderItem={renderBetInfo}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.containerWidth}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.extraView} />
        </View>
      </PrimaryModal>
    );
  };

  const renderMyHandicapModal = () => {
    return (
      <PrimaryModal
        visible={showHandicapModal}
        headerTitle={'My Handicap'}
        handleClose={() => {
          setShowHandicapModal(false);
        }}>
        <View style={styles.modalChildren}>
          <View style={styles.modalContentWrapper}>
            <View style={styles.flexRow}>
              {Platform.OS === 'android' && (
                <Image
                  style={styles.teamIconSmall}
                  source={{
                    uri: props?.matchup?.away?.icon,
                  }}
                />
              )}
              <View style={styles.ml10}>
                <Text style={styles.teamNameCard}>
                  {matchup?.away?.abbreviation}
                </Text>
                <Text style={styles.teamScore}>{matchup?.away?.record}</Text>
              </View>
            </View>
            <View style={styles.spreadSectionWrapper}>
              <PrimaryInput
                keyboardType="numeric"
                placeholder="0"
                value={handicap?.away_score + ''}
                onChangeText={(value: any) => {
                  const validated = value.match(/^(\d*\.{0,1}\d{0,2}$)/);
                  if (validated) {
                    setHandicap({...handicap, away_score: value});
                  }
                }}
              />
            </View>
          </View>
          <View style={styles.modalContentWrapper}>
            <View style={styles.flexRow}>
              {Platform.OS === 'android' && (
                <Image
                  style={styles.teamIconSmall}
                  source={{
                    uri: props?.matchup?.home?.icon,
                  }}
                />
              )}
              <View style={styles.ml10}>
                <Text style={styles.teamNameCard}>
                  {matchup?.home?.abbreviation}
                </Text>
                <Text style={styles.teamScore}>{matchup?.home?.record}</Text>
              </View>
            </View>
            <View style={styles.spreadSectionWrapper}>
              <PrimaryInput
                keyboardType="numeric"
                placeholder="0"
                value={handicap?.home_score + ''}
                onChangeText={(value: any) => {
                  const validated = value.match(/^(\d*\.{0,1}\d{0,2}$)/);
                  if (validated) {
                    setHandicap({...handicap, home_score: value});
                  }
                }}
              />
            </View>
          </View>
          <View style={styles.modalFooterBtnWrapper}>
            <PrimaryButton
              style={styles.w40}
              text="Reset"
              gradientStyle={styles.modalGradientBtn}
              textStyle={[styles.btnTextStyle, styles.ph15]}
              handleClick={resetHandicap}
              gradientColors={theme.colors.primaryGradient}
              isLoading={isHandicapLoading}
            />
            <PrimaryButton
              style={[styles.w45, styles.ml15]}
              text="Save"
              gradientStyle={styles.modalGradientBtn}
              textStyle={[styles.btnTextStyle, styles.ph15]}
              handleClick={updateHandicap}
              gradientColors={theme.colors.secondaryGradient}
              isLoading={isHandicapLoading}
            />
          </View>
        </View>
      </PrimaryModal>
    );
  };

  const isBetSelected = (bet_side: string, bet_type: string) => {
    if (bet_type === 'Spread' && bet_side === 'Away') {
      return matchup.selected_bets?.away_spread?.status;
    }
    if (bet_type === 'Spread' && bet_side === 'Home') {
      return matchup.selected_bets?.home_spread?.status;
    }
    if (bet_type === 'Moneyline' && bet_side === 'Away') {
      return matchup.selected_bets?.away_moneyline?.status;
    }
    if (bet_type === 'Moneyline' && bet_side === 'Home') {
      return matchup.selected_bets?.home_moneyline?.status;
    }
    if (bet_type === 'Total' && bet_side === 'Over') {
      return matchup.selected_bets?.over?.status;
    }
    if (bet_type === 'Total' && bet_side === 'Under') {
      return matchup.selected_bets?.under?.status;
    }
    return false;
  };

  const removeFromBetQueue = (bet_side: string, bet_type: string) => {
    let betid = '';
    if (bet_type === 'Spread' && bet_side === 'Away') {
      betid = matchup.selected_bets.away_spread.uuid;
    }
    if (bet_type === 'Spread' && bet_side === 'Home') {
      betid = matchup.selected_bets.home_spread.uuid;
    }
    if (bet_type === 'Moneyline' && bet_side === 'Away') {
      betid = matchup.selected_bets.away_moneyline.uuid;
    }
    if (bet_type === 'Moneyline' && bet_side === 'Home') {
      betid = matchup.selected_bets.home_moneyline.uuid;
    }
    if (bet_type === 'Total' && bet_side === 'Over') {
      betid = matchup.selected_bets.over.uuid;
    }
    if (bet_type === 'Total' && bet_side === 'Under') {
      betid = matchup.selected_bets.under.uuid;
    }
    dispatch(
      postClearBetQueueAction(
        {bet_uuids: [betid]},
        () => {
          props.getMatchupView(false);
          dispatch(getBetQueueCountAction());
        },
        (error: Error) => {
          console.error(error);
        },
      ),
    );
  };

  const warRoomNavigator = () => {
    navigation.navigate(WAR_ROOM, {
      matchup: matchup,
    });
  };

  const checkPossitiveNumber = (number: any) => {
    if (number) {
      const num = Number(number.replace('%', ''));
      if (num > 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <View style={[styles.cardWrapper, props?.wrapperStyle]}>
      <View style={styles.cardDetailsWrapper}>
        <View style={styles.flexRow}>
          {Platform.OS === 'android' && (
            <Image
              style={styles.teamIconSmall}
              source={{
                uri: matchup?.away?.icon,
              }}
            />
          )}
          <View style={styles.ml10}>
            <Text style={styles.teamNameCard}>
              {matchup?.away?.abbreviation}
            </Text>
            <Text style={styles.teamScore}>{matchup?.away?.record}</Text>
          </View>
        </View>
        <Text
          style={[
            styles.teamNameCard,
            {
              fontWeight:
                matchup?.status === 'closed' &&
                matchup?.spread?.open?.home_spread < matchup?.total?.open?.total
                  ? 'bold'
                  : '500',
            },
          ]}>
          {matchup?.total?.open?.total}
        </Text>
        <View style={styles.spreadSectionWrapper}>
          <TouchableOpacity
            style={[
              styles.spreadCard,
              isBetSelected('Away', 'Spread') ? styles.selectedBetBg : {},
              selectedBook.book_id === 'bet:book:bestline'
                ? styles.height90
                : styles.height60,
            ]}
            onPress={() => {
              if (props.onBet && selectedBook.book_id !== 'bet:book:bestline') {
                !isBetSelected('Away', 'Spread')
                  ? props.onBet(matchup, 'Away', 'Spread')
                  : removeFromBetQueue('Away', 'Spread');
              }
            }}>
            <Text style={styles.spreadTopText}>
              {matchup?.spread?.current?.away_spread > -1
                ? '+' + matchup?.spread?.current?.away_spread
                : matchup?.spread?.current?.away_spread}
            </Text>
            <Text
              style={
                selectedEngineFilter
                  ? checkPossitiveNumber(
                      matchup?.engine_result?.EV?.away_spread,
                    )
                    ? styles.spreadBottomGreenText
                    : styles.spreadBottomRedText
                  : styles.spreadBottomText
              }>
              {selectedEngineFilter
                ? getEngineesponseOnKey()?.away_spread
                : matchup?.spread?.current?.away > 1
                ? '+' + matchup?.spread?.current?.away
                : matchup?.spread?.current?.away}
            </Text>
            {selectedBook.book_id === 'bet:book:bestline' && (
              <>
                {matchup?.spread?.current?.away_best_line !== '' && (
                  <Image
                    source={{
                      uri: matchup?.spread?.current?.away_best_line,
                    }}
                    resizeMode="contain"
                    style={styles.newImage}
                  />
                )}
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.spreadCard,
              isBetSelected('Away', 'Moneyline') ? styles.selectedBetBg : {},
              selectedBook.book_id === 'bet:book:bestline'
                ? styles.height90
                : styles.height60,
            ]}
            onPress={() => {
              if (props.onBet && selectedBook.book_id !== 'bet:book:bestline') {
                !isBetSelected('Away', 'Moneyline')
                  ? props.onBet(matchup, 'Away', 'Moneyline')
                  : removeFromBetQueue('Away', 'Moneyline');
              }
            }}>
            <Text style={styles.spreadTopText}>
              {matchup?.moneyline?.current?.away > 1
                ? '+' + matchup?.moneyline?.current?.away
                : matchup?.moneyline?.current?.away}
            </Text>
            <Text
              style={
                selectedEngineFilter
                  ? checkPossitiveNumber(
                      matchup?.engine_result?.EV?.away_moneyline,
                    )
                    ? styles.spreadBottomGreenText
                    : styles.spreadBottomRedText
                  : styles.spreadBottomText
              }>
              {selectedEngineFilter
                ? getEngineesponseOnKey()?.away_moneyline
                : matchup?.moneyline?.current?.away_imp}
            </Text>
            {selectedBook.book_id === 'bet:book:bestline' && (
              <>
                {matchup?.moneyline?.current?.away_best_line !== '' && (
                  <Image
                    source={{
                      uri: matchup?.moneyline?.current?.away_best_line,
                    }}
                    resizeMode="contain"
                    style={styles.newImage}
                  />
                )}
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.spreadCard,
              isBetSelected('Over', 'Total') ? styles.selectedBetBg : {},
              selectedBook.book_id === 'bet:book:bestline'
                ? styles.height90
                : styles.height60,
            ]}
            onPress={() => {
              if (props.onBet && selectedBook.book_id !== 'bet:book:bestline') {
                !isBetSelected('Over', 'Total')
                  ? props.onBet(matchup, 'Over', 'Total')
                  : removeFromBetQueue('Over', 'Total');
              }
            }}>
            <Text style={styles.spreadTopText}>
              {`${matchup?.total?.current?.total !== 'OFF' ? 'o' : ''}${
                matchup?.total?.current?.total
              }`}
            </Text>
            <Text
              style={
                selectedEngineFilter
                  ? checkPossitiveNumber(matchup?.engine_result?.EV?.over_total)
                    ? styles.spreadBottomGreenText
                    : styles.spreadBottomRedText
                  : styles.spreadBottomText
              }>
              {selectedEngineFilter
                ? getEngineesponseOnKey()?.over_total
                : matchup?.total?.current?.over}
            </Text>
            {selectedBook.book_id === 'bet:book:bestline' && (
              <>
                {matchup?.total?.current?.over_best_line !== '' && (
                  <Image
                    source={{
                      uri: matchup?.total?.current?.over_best_line,
                    }}
                    resizeMode="contain"
                    style={styles.newImage}
                  />
                )}
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardDetailsWrapper}>
        <View style={styles.flexRow}>
          {Platform.OS === 'android' && (
            <Image
              style={styles.teamIconSmall}
              source={{
                uri: matchup?.home?.icon,
              }}
            />
          )}
          <View style={styles.ml10}>
            <Text style={styles.teamNameCard}>
              {matchup?.home?.abbreviation}
            </Text>
            <Text style={styles.teamScore}>{matchup?.home?.record}</Text>
          </View>
        </View>
        <Text
          style={[
            styles.teamNameCard,
            {
              fontWeight:
                matchup?.status === 'closed' &&
                matchup?.spread?.open?.home_spread > matchup?.total?.open?.total
                  ? 'bold'
                  : '500',
            },
          ]}>
          {`${
            matchup?.spread?.open?.home_spread > -1
              ? matchup.status !== 'closed' && matchup.status !== 'inprogress'
                ? '+'
                : ''
              : ''
          }${matchup?.spread?.open?.home_spread}`}
        </Text>
        <View style={styles.spreadSectionWrapper}>
          <TouchableOpacity
            style={[
              styles.spreadCard,
              isBetSelected('Home', 'Spread') ? styles.selectedBetBg : {},
              selectedBook.book_id === 'bet:book:bestline'
                ? styles.height90
                : styles.height60,
            ]}
            onPress={() => {
              if (props.onBet && selectedBook.book_id !== 'bet:book:bestline') {
                !isBetSelected('Home', 'Spread')
                  ? props.onBet(matchup, 'Home', 'Spread')
                  : removeFromBetQueue('Home', 'Spread');
              }
            }}>
            <Text style={styles.spreadTopText}>
              {matchup?.spread?.current?.home_spread > -1
                ? '+' + matchup?.spread?.current?.home_spread
                : matchup?.spread?.current?.home_spread}
            </Text>
            <Text
              style={
                selectedEngineFilter
                  ? checkPossitiveNumber(
                      matchup?.engine_result?.EV?.home_spread,
                    )
                    ? styles.spreadBottomGreenText
                    : styles.spreadBottomRedText
                  : styles.spreadBottomText
              }>
              {selectedEngineFilter
                ? getEngineesponseOnKey()?.home_spread
                : matchup?.spread?.current?.home > -1
                ? '+' + matchup?.spread?.current?.home
                : matchup?.spread?.current?.home}
            </Text>
            {selectedBook.book_id === 'bet:book:bestline' && (
              <>
                {matchup?.spread?.current?.home_best_line !== '' && (
                  <Image
                    source={{
                      uri: matchup?.spread?.current?.home_best_line,
                    }}
                    resizeMode="contain"
                    style={styles.newImage}
                  />
                )}
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.spreadCard,
              isBetSelected('Home', 'Moneyline') ? styles.selectedBetBg : {},
              selectedBook.book_id === 'bet:book:bestline'
                ? styles.height90
                : styles.height60,
            ]}
            onPress={() => {
              if (props.onBet && selectedBook.book_id !== 'bet:book:bestline') {
                !isBetSelected('Home', 'Moneyline')
                  ? props.onBet(matchup, 'Home', 'Moneyline')
                  : removeFromBetQueue('Home', 'Moneyline');
              }
            }}>
            <Text style={styles.spreadTopText}>
              {matchup?.moneyline?.current?.home > -1
                ? '+' + matchup?.moneyline?.current?.home
                : matchup?.moneyline?.current?.home}
            </Text>
            <Text
              style={
                selectedEngineFilter
                  ? checkPossitiveNumber(
                      matchup?.engine_result?.EV?.home_moneyline,
                    )
                    ? styles.spreadBottomGreenText
                    : styles.spreadBottomRedText
                  : styles.spreadBottomText
              }>
              {selectedEngineFilter
                ? getEngineesponseOnKey()?.home_moneyline
                : matchup?.moneyline?.current?.home_imp}
            </Text>
            {selectedBook.book_id === 'bet:book:bestline' && (
              <>
                {matchup?.moneyline?.current?.home_best_line !== '' && (
                  <Image
                    source={{
                      uri: matchup?.moneyline?.current?.home_best_line,
                    }}
                    resizeMode="contain"
                    style={styles.newImage}
                  />
                )}
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.spreadCard,
              isBetSelected('Under', 'Total') ? styles.selectedBetBg : {},
              selectedBook.book_id === 'bet:book:bestline'
                ? styles.height90
                : styles.height60,
            ]}
            onPress={() => {
              if (props.onBet && selectedBook.book_id !== 'bet:book:bestline') {
                !isBetSelected('Under', 'Total')
                  ? props.onBet(matchup, 'Under', 'Total')
                  : removeFromBetQueue('Under', 'Total');
              }
            }}>
            <Text style={styles.spreadTopText}>
              {`${matchup?.total?.current?.total !== 'OFF' ? 'u' : ''}${
                matchup?.total?.current?.total
              }`}
            </Text>
            <Text
              style={
                selectedEngineFilter
                  ? checkPossitiveNumber(
                      matchup?.engine_result?.EV?.under_total,
                    )
                    ? styles.spreadBottomGreenText
                    : styles.spreadBottomRedText
                  : styles.spreadBottomText
              }>
              {selectedEngineFilter
                ? getEngineesponseOnKey()?.under_total
                : matchup?.total?.current?.under}
            </Text>
            {selectedBook.book_id === 'bet:book:bestline' && (
              <>
                {matchup?.total?.current?.under_best_line !== '' && (
                  <Image
                    source={{
                      uri: matchup?.total?.current?.under_best_line,
                    }}
                    resizeMode="contain"
                    style={styles.newImage}
                  />
                )}
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* add bet input here */}
      {selectedBook.book_id !== 'bet:book:bestline' && (
        <View style={styles.finalScoreWrapper}>
          <PrimaryButton
            text={`${matchup.placed_bets_count || 0} ${
              matchup.placed_bets_count && matchup.placed_bets_count > 1
                ? 'Bets'
                : 'Bet'
            }`}
            gradientStyle={[
              styles.matchupBetCountContainer,
              styles.btnGradientStyle,
            ]}
            textStyle={[styles.btnTextStyle, styles.matchupBetCount]}
            handleClick={() => getBetInfo()}
            gradientColors={theme.colors.secondaryGradient}
          />
          {renderBetOptionModal()}
          <View style={styles.btnWrapper}>
            <PrimaryButton
              text="My Handicap"
              gradientStyle={styles.btnGradientStyle}
              textStyle={[styles.btnTextStyle, styles.ph15]}
              handleClick={() => {
                setShowHandicapModal(true);
                getHandicap();
              }}
              gradientColors={theme.colors.secondaryGradient}
            />
            {renderMyHandicapModal()}
            <PrimaryButton
              text="War Room"
              style={styles.ml10}
              gradientStyle={styles.btnGradientStyle}
              textStyle={[styles.btnTextStyle, styles.ph15]}
              handleClick={() => warRoomNavigator()}
              gradientColors={theme.colors.secondaryGradient}
            />
          </View>
        </View>
      )}
      <View style={[styles.flexRow, styles.justifyBetween, styles.mt15]}>
        <Text style={styles.finalScoreText}>
          {moment(matchup?.scheduled).format('ddd MM/DD hh:mm A')}
        </Text>
        <Text style={styles.finalScoreText}>{matchup.broadcast}</Text>
        <Text style={[styles.finalScoreText, {textTransform: 'capitalize'}]}>
          {matchup?.status}
        </Text>
      </View>
    </View>
  );
};

MatchupCard.prototype = {
  wrapperStyle: PropTypes.any,
  onBet: PropTypes.func,
  getMatchupView: PropTypes.func,
  matchup: PropTypes.any,
};

export {MatchupCard};
