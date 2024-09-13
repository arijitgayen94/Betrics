import React, {useEffect, useState} from 'react';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {FlatList, Platform, Text, View} from 'react-native';
import WrTeamAvatar from './WrTeamAvatar';
import WrBlackCard from './WrBlackCard';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {
  AppDispatch,
  getBetInfoAction,
  getBetQueueCountAction,
  postAddBetToQueueAction,
  postClearBetQueueAction,
} from '../../redux';
import toast from 'react-native-simple-toast';
import {PrimaryModal} from '../PrimaryModal';
import {PrimaryButton} from '../PrimaryButton';

const WrMatchDetailsView = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const matchup = props.matchup;
  const lineViewOptions = props.lineViewOptions;
  const lineViewEngineOptions = props.lineViewEngineOptions;
  const [selectedEngineFilter, setSelectedEngineFilter] = useState<string>('');
  const [showBetModal, setShowBetModal] = useState<boolean>(false);
  const [betInfo, setBetInfo] = useState<any>([]);

  useEffect(() => {
    if (lineViewOptions.find((x: any) => x.isSelected)?.display === 'Engine') {
      setSelectedEngineFilter(
        lineViewEngineOptions.find((x: any) => x.isSelected)?.key || '',
      );
    } else {
      setSelectedEngineFilter('');
    }
  }, [lineViewOptions, lineViewEngineOptions]);

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
          props.getMatchupView();
          dispatch(getBetQueueCountAction());
        },
        (error: Error) => {
          console.error(error);
        },
      ),
    );
  };

  const addBetQueue = async (bet_side: any, bet_type: any) => {
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

    let betObj: any = {
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
    };

    dispatch(
      postAddBetToQueueAction(betObj, (response: any) => {
        if (response) {
          toast.show('Bet added successfully', 2);
        }
        dispatch(getBetQueueCountAction());
        props.getMatchupView();
      }),
    );
  };
  const getBetInfo = () => {
    const body = {
      match_id: matchup?.match_id,
      book: props?.selectedBook?.book_id,
    };

    dispatch(
      getBetInfoAction(
        body,
        data => {
          setBetInfo(data);
          setShowBetModal(true);
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
        <View style={styles.modalChildren}>
          <FlatList
            data={betInfo}
            renderItem={renderBetInfo}
            contentContainerStyle={styles.width60}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.extraView} />
        </View>
      </PrimaryModal>
    );
  };

  const getEngineesponseOnKey = () => {
    let result: any = matchup?.engine_result;
    return result ? result[selectedEngineFilter] : {};
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

  const valueTwoColor = (type: string) => {
    if (selectedEngineFilter) {
      if (checkPossitiveNumber(matchup?.engine_result?.EV?.[type])) {
        return theme.colors.onlineGreen;
      } else {
        return theme.colors.googleRed;
      }
    } else {
      return theme.colors.primaryText;
    }
  };

  return (
    <View style={styles.WrMatchDetailsView}>
      <Text style={styles.headingStyle1}>
        {`${matchup?.away?.abbreviation} vs ${matchup?.home?.abbreviation}`}
      </Text>
      <Text style={styles.subHeadingStyle1}>
        {moment(matchup.scheduled).format('ddd MM/DD hh:mm A')}{' '}
        {matchup.broadcast}
      </Text>
      <View style={styles.teamDetails}>
        <View style={styles.teamsCards}>
          <View style={styles.teamCard}>
            {Platform.OS === 'android' && (
              <WrTeamAvatar
                src={{
                  uri: matchup?.away?.icon,
                }}
              />
            )}
            <Text style={styles.teamHeadingStyle1}>
              {matchup?.away?.abbreviation}
            </Text>
            <Text style={styles.subHeadingStyle1}>{matchup?.away?.record}</Text>
          </View>
          <View style={styles.teamCard}>
            {Platform.OS === 'android' && (
              <WrTeamAvatar
                src={{
                  uri: matchup?.home?.icon,
                }}
              />
            )}
            <Text style={styles.teamHeadingStyle1}>
              {matchup?.home?.abbreviation}
            </Text>
            <Text style={styles.subHeadingStyle1}>{matchup?.home?.record}</Text>
          </View>
        </View>
        {/* Center View */}
        <View style={styles.centerValue}>
          <View style={styles.centerTextView}>
            <Text
              style={[
                styles.teamHeadingStyle1,
                {
                  fontWeight:
                    matchup?.status === 'closed'
                      ? matchup?.spread?.open?.home_spread <
                        matchup?.total?.open?.total
                        ? 'bold'
                        : '500'
                      : '500',
                },
              ]}>
              {matchup?.total?.open?.total}
            </Text>
          </View>
          <View style={styles.centerTextView}>
            <Text
              style={[
                styles.teamHeadingStyle1,
                {
                  fontWeight:
                    matchup?.status === 'closed'
                      ? matchup?.spread?.open?.home_spread >
                        matchup?.total?.open?.total
                        ? 'bold'
                        : '500'
                      : '500',
                },
              ]}>
              {`${
                matchup?.spread?.open?.home_spread > -1
                  ? matchup.status !== 'closed' &&
                    matchup.status !== 'inprogress'
                    ? '+'
                    : ''
                  : ''
              }${matchup?.spread?.open?.home_spread}`}
            </Text>
          </View>
        </View>
        {/* Bet Grids */}
        <View style={styles.blackCardsWr}>
          <View style={styles.blackCardsRow}>
            <WrBlackCard
              isBetSelected={isBetSelected}
              onBet={addBetQueue}
              removeFromBetQueue={removeFromBetQueue}
              value1={
                matchup?.spread?.current?.away_spread > -1
                  ? '+' + matchup?.spread?.current?.away_spread
                  : matchup?.spread?.current?.away_spread
              }
              value2={
                selectedEngineFilter
                  ? getEngineesponseOnKey()?.away_spread
                  : matchup?.spread?.current?.away > 1
                  ? '+' + matchup?.spread?.current?.away
                  : matchup?.spread?.current?.away
              }
              valueTwoColor={valueTwoColor('away_spread')}
              imageUrl={matchup?.spread?.current?.away_best_line}
            />
            <WrBlackCard
              betType="Moneyline"
              isBetSelected={isBetSelected}
              onBet={addBetQueue}
              removeFromBetQueue={removeFromBetQueue}
              value1={
                matchup?.moneyline?.current?.away > -1
                  ? '+' + matchup?.moneyline?.current?.away
                  : matchup?.moneyline?.current?.away
              }
              value2={
                selectedEngineFilter
                  ? getEngineesponseOnKey()?.away_moneyline
                  : matchup?.moneyline?.current?.away_imp
              }
              valueTwoColor={valueTwoColor('away_moneyline')}
              imageUrl={matchup?.moneyline?.current?.away_best_line}
            />
            <WrBlackCard
              team="Over"
              betType="Total"
              isBetSelected={isBetSelected}
              onBet={addBetQueue}
              removeFromBetQueue={removeFromBetQueue}
              value1={`${matchup?.total?.current?.total !== 'OFF' ? 'o' : ''}${
                matchup?.total?.current?.total
              }`}
              value2={
                selectedEngineFilter
                  ? getEngineesponseOnKey()?.over_total
                  : matchup?.total?.current?.over
              }
              valueTwoColor={valueTwoColor('over_total')}
              imageUrl={matchup?.total?.current?.over_best_line}
            />
          </View>
          <View style={styles.blackCardsRow}>
            <WrBlackCard
              isBetSelected={isBetSelected}
              onBet={addBetQueue}
              team="Home"
              removeFromBetQueue={removeFromBetQueue}
              value1={
                matchup?.spread?.current?.home_spread > 1
                  ? '+' + matchup?.spread?.current?.home_spread
                  : matchup?.spread?.current?.home_spread
              }
              value2={
                selectedEngineFilter
                  ? getEngineesponseOnKey()?.home_spread
                  : matchup?.spread?.current?.home > -1
                  ? '+' + matchup?.spread?.current?.home
                  : matchup?.spread?.current?.home
              }
              valueTwoColor={valueTwoColor('home_spread')}
              imageUrl={matchup?.spread?.current?.home_best_line}
            />
            <WrBlackCard
              team="Home"
              betType="Moneyline"
              isBetSelected={isBetSelected}
              onBet={addBetQueue}
              removeFromBetQueue={removeFromBetQueue}
              value1={
                matchup?.moneyline?.current?.home > -1
                  ? '+' + matchup?.moneyline?.current?.home
                  : matchup?.moneyline?.current?.home
              }
              value2={
                selectedEngineFilter
                  ? getEngineesponseOnKey()?.home_moneyline
                  : matchup?.moneyline?.current?.home_imp
              }
              valueTwoColor={valueTwoColor('home_moneyline')}
              imageUrl={matchup?.moneyline?.current?.home_best_line}
            />
            <WrBlackCard
              team="Under"
              betType="Total"
              isBetSelected={isBetSelected}
              onBet={addBetQueue}
              removeFromBetQueue={removeFromBetQueue}
              value1={`${matchup?.total?.current?.total !== 'OFF' ? 'u' : ''}${
                matchup?.total?.current?.total
              }`}
              value2={
                selectedEngineFilter
                  ? getEngineesponseOnKey()?.under_total
                  : matchup?.total?.current?.under
              }
              valueTwoColor={valueTwoColor('under_total')}
              imageUrl={matchup?.total?.current?.under_best_line}
            />
          </View>
        </View>
      </View>
      <View style={[styles.betRow, {paddingLeft: 0}]}>
        {props.selectedMainTab !== 'handicap' ? (
          <PrimaryButton
            text={`${matchup.placed_bets_count || 0} ${
              matchup.placed_bets_count && matchup.placed_bets_count > 1
                ? 'Bets'
                : 'Bet'
            }`}
            gradientStyle={styles.matchupBetCountContainer}
            textStyle={styles.btnTextStyle}
            handleClick={() => getBetInfo()}
            gradientColors={theme.colors.secondaryGradient}
          />
        ) : (
          <Text />
        )}

        {renderBetOptionModal()}
        <Text style={[styles.headingStyle2, {textTransform: 'capitalize'}]}>
          {matchup?.status}
        </Text>
        {/* <Text style={styles.headingStyle2}>{matchup.broadcast}</Text> */}
      </View>
    </View>
  );
};

export default WrMatchDetailsView;
