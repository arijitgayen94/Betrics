import React from 'react';
import useStyles from './styles';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {
  AppDispatch,
  getBetQueueCountAction,
  Matchup,
  postClearBetQueueAction,
} from '../../../redux';
import {useDispatch} from 'react-redux';

interface MatchupCardProps {
  wrapperStyle?: any;
  matchup: Matchup;
  onBet?: (matchup: Matchup, bet_side: string, bet_type: string) => void;
  getMatchupView: () => void;
}

const WrMatchupCard = (props: MatchupCardProps) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const {matchup} = props;
  const dispatch = useDispatch<AppDispatch>();

  const isBetSelected = (bet_side: string, bet_type: string) => {
    if (bet_type === 'Spread' && bet_side === 'Away') {
      return matchup.selected_bets.away_spread.status;
    }
    if (bet_type === 'Spread' && bet_side === 'Home') {
      return matchup.selected_bets.home_spread.status;
    }
    if (bet_type === 'Moneyline' && bet_side === 'Away') {
      return matchup.selected_bets.away_moneyline.status;
    }
    if (bet_type === 'Moneyline' && bet_side === 'Home') {
      return matchup.selected_bets.home_moneyline.status;
    }
    if (bet_type === 'Total' && bet_side === 'Over') {
      return matchup.selected_bets.over.status;
    }
    if (bet_type === 'Total' && bet_side === 'Under') {
      return matchup.selected_bets.under.status;
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

  return (
    <View style={[styles.cardWrapper, props?.wrapperStyle]}>
      <View style={styles.cardDetailsWrapper}>
        <View style={styles.flexRow}>
          <Image
            style={styles.teamIconSmall}
            source={{
              uri: matchup?.away?.icon,
            }}
          />
          <View style={styles.ml10}>
            <Text style={styles.teamNameCard}>
              {matchup?.away?.abbreviation}
            </Text>
            <Text style={styles.teamScore}>{matchup?.away?.record}</Text>
          </View>
        </View>
        <Text style={styles.teamNameCard}>{`${
          matchup?.total?.open?.total > -1 ? '+' : ''
        }${matchup?.total?.open?.total}`}</Text>
        <View style={styles.spreadSectionWrapper}>
          <TouchableOpacity
            style={[
              styles.spreadCard,
              isBetSelected('Away', 'Spread') ? styles.selectedBetBg : {},
            ]}
            onPress={() => {
              if (props.onBet) {
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
            <Text style={styles.spreadBottomText}>
              {matchup?.spread?.current?.away > 1
                ? '+' + matchup?.spread?.current?.away
                : matchup?.spread?.current?.away}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.spreadCard,
              isBetSelected('Away', 'Moneyline') ? styles.selectedBetBg : {},
            ]}
            onPress={() => {
              if (props.onBet) {
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
            <Text style={styles.spreadBottomText}>
              {matchup?.moneyline?.current?.away_imp}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.spreadCard,
              isBetSelected('Over', 'Total') ? styles.selectedBetBg : {},
            ]}
            onPress={() => {
              if (props.onBet) {
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
            <Text style={styles.spreadBottomText}>
              {matchup?.total?.current?.over}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardDetailsWrapper}>
        <View style={styles.flexRow}>
          <Image
            style={styles.teamIconSmall}
            source={{
              uri: matchup?.home?.icon,
            }}
          />
          <View style={styles.ml10}>
            <Text style={styles.teamNameCard}>
              {matchup?.home?.abbreviation}
            </Text>
            <Text style={styles.teamScore}>{matchup?.home?.record}</Text>
          </View>
        </View>
        <Text style={styles.teamNameCard}>
          {`${matchup?.spread?.open?.home_spread > -1 ? '+' : ''}${
            matchup?.spread?.open?.home_spread
          }`}
        </Text>
        <View style={styles.spreadSectionWrapper}>
          <TouchableOpacity
            style={[
              styles.spreadCard,
              isBetSelected('Home', 'Spread') ? styles.selectedBetBg : {},
            ]}
            onPress={() => {
              if (props.onBet) {
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
            <Text style={styles.spreadBottomText}>
              {matchup?.spread?.current?.home > -1
                ? '+' + matchup?.spread?.current?.home
                : matchup?.spread?.current?.home}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.spreadCard,
              isBetSelected('Home', 'Moneyline') ? styles.selectedBetBg : {},
            ]}
            onPress={() => {
              if (props.onBet) {
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
            <Text style={styles.spreadBottomText}>
              {matchup?.moneyline?.current?.home_imp}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.spreadCard,
              isBetSelected('Under', 'Total') ? styles.selectedBetBg : {},
            ]}
            onPress={() => {
              if (props.onBet) {
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
            <Text style={styles.spreadBottomText}>
              {matchup?.total?.current?.under}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

WrMatchupCard.prototype = {
  wrapperStyle: PropTypes.any,
  onBet: PropTypes.func,
  getMatchupView: PropTypes.func,
  matchup: PropTypes.any,
};

export {WrMatchupCard};
