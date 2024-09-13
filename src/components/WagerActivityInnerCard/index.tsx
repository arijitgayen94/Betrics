import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {
  ARROW_DOWN,
  ARROW_UP,
  CHECK_CIRCLE,
  RED_CROSS_CIRCLE,
  GREY_CIRCLE,
  YELLOW_CIRCLE,
} from '../../assets';
import Collapsible from 'react-native-collapsible';
import {Bet, WagerActivityResult} from '../../redux';
import PropTypes from 'prop-types';
import moment from 'moment';

interface WagerActivityInnerCardProps {
  wagerActivity: WagerActivityResult;
}

const WagerActivityInnerCard = (props: WagerActivityInnerCardProps) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const getNameByBetType = (_bet: Bet) => {
    if (_bet.bet_type === 'Spread' || _bet.bet_type === 'Moneyline') {
      if (_bet.bet_side === 'Away') {
        return _bet?.away?.abbreviation;
      } else if (_bet.bet_side === 'Home') {
        return _bet?.home?.abbreviation;
      }
    } else if (_bet.bet_type === 'Total') {
      return _bet.bet_side;
    }
  };

  const getBetPoints = (
    _bet: Bet,
    wager_type: string,
    teaser_points: number,
  ) => {
    // bet point calculation for teaser
    if (teaser_points && wager_type && wager_type === 'Teaser') {
      let value = 0;
      if (_bet.bet_side === 'Over') {
        if (_bet.bet_point) {
          value = +_bet.bet_point - teaser_points;
        }
      } else {
        if (_bet.bet_point) {
          value = +_bet.bet_point + teaser_points;
        }
      }
      return value > -1 ? '+' + value : value;
    }
    // bet point calculation for rest
    if (_bet.bet_type === 'Total') {
      return _bet.bet_point;
    }
    if (_bet.bet_point && _bet.bet_point > -1) {
      return '+' + _bet.bet_point;
    } else if (
      _bet.bet_point &&
      _bet.bet_point.toLocaleString().includes('%')
    ) {
      if (_bet.am_odds > -1) {
        return '+' + _bet.am_odds;
      } else {
        return _bet.am_odds;
      }
    } else {
      return _bet.bet_point;
    }
  };

  return (
    <View style={[styles.wagerActivityData, styles.pb0]}>
      <View style={styles.statsCardInnerContainer}>
        <Pressable
          onPress={() => {
            setIsCollapsed(!isCollapsed);
          }}
          style={styles.wagerActivityHeadingRow}>
          <Text style={styles.innerHeadingText}>
            {props?.wagerActivity?.wager_type}
          </Text>
          <Image source={isCollapsed ? ARROW_DOWN : ARROW_UP} />
        </Pressable>
        <Pressable
          onPress={() => {
            setIsCollapsed(!isCollapsed);
          }}
          style={styles.wagerTextWrapper}>
          <View style={[styles.width33, styles.alignFlexStart]}>
            <Text style={styles.wagerTextFirst}>
              {props?.wagerActivity?.book_name}
              {props?.wagerActivity?.teaser_points || ''}
            </Text>
            <Text style={styles.wagerTextSecond}>
              {moment(props?.wagerActivity?.created_date).format('MM-DD-YYYY')}
            </Text>
            <View>
              <Text style={styles.wagerTextSecond}>
                {props?.wagerActivity?.user_name}
              </Text>
            </View>
          </View>
          <View style={[styles.width33, styles.alignFlexCenter]}>
            <Text style={styles.wagerTextFirst}>
              At Risk ${props?.wagerActivity?.at_risk}
            </Text>
            {props?.wagerActivity?.wager_type === 'Straight' &&
            props?.wagerActivity?.bet ? (
              <Text
                style={
                  styles.wagerTextSecond
                }>{`${props?.wagerActivity?.bet[0]?.away?.abbreviation} @ ${props?.wagerActivity?.bet[0]?.home?.abbreviation}`}</Text>
            ) : null}
            <Text style={styles.wagerTextSecond}>
              {props?.wagerActivity?.wager_type === 'Straight' &&
              props?.wagerActivity?.bet
                ? `${props?.wagerActivity?.bet[0]?.bet_type}`
                : props?.wagerActivity?.bet?.length +
                  ' Leg ' +
                  props?.wagerActivity?.wager_type}
            </Text>
          </View>
          <View style={[styles.width33, styles.alignFlexEnd]}>
            <Text
              style={[
                styles.wagerTextFirst,
                styles.textRight,
                props?.wagerActivity?.wager_status === 'Win'
                  ? styles.lightGreenColor
                  : props?.wagerActivity?.wager_status === 'Loss'
                  ? styles.googleRedColor
                  : styles.blackTextColor,
              ]}>
              {props?.wagerActivity?.prize_status}
            </Text>
            <Text style={[styles.wagerTextSecond, styles.textRight]}>
              To Win ${parseFloat(props?.wagerActivity?.payout + '').toFixed(2)}
            </Text>
            <Text style={[styles.wagerTextSecond, styles.textRight]}>
              Odds{' '}
              {props?.wagerActivity?.am_odds > -1
                ? '+' +
                  `${parseFloat(props?.wagerActivity?.am_odds + '').toFixed(2)}`
                : `${parseFloat(props?.wagerActivity?.am_odds + '').toFixed(
                    2,
                  )}`}
            </Text>
          </View>
        </Pressable>
      </View>
      <Collapsible style={styles.mt0} collapsed={isCollapsed}>
        {props?.wagerActivity?.bet?.map((bet, index) => {
          return (
            <View key={index} style={styles.collapseRow}>
              <View style={styles.collapseRowLeft}>
                <View style={[styles.flexRow, styles.justifyBetween]}>
                  <Text style={styles.collapseRowTextFirst}>
                    {getNameByBetType(bet)}{' '}
                    {getBetPoints(
                      bet,
                      props?.wagerActivity?.wager_type,
                      props?.wagerActivity?.teaser_points,
                    )}
                  </Text>
                  <Text style={styles.collapseRowTextFirst}>
                    {bet.sport.toUpperCase()}
                  </Text>
                  <Text style={styles.collapseRowTextFirst}>
                    {bet?.am_odds > -1 ? '+' + bet?.am_odds : bet?.am_odds}
                  </Text>
                </View>
                <View
                  style={[styles.flexRow, styles.justifyBetween, styles.mt3]}>
                  <Text style={styles.collapseRowTextSecond}>
                    {bet?.away?.abbreviation} @ {bet?.home?.abbreviation}
                  </Text>
                  <View style={styles.horizontalSeparator} />
                  <Text style={styles.collapseRowTextSecond}>
                    {moment(bet?.event_time).format('MM-DD-YYYY')}
                  </Text>
                  <View style={styles.horizontalSeparator} />
                  <Text style={styles.collapseRowTextSecond}>
                    {moment(bet?.event_time).format('hh:mm A')}
                  </Text>
                </View>
              </View>
              <View style={styles.collapseRowRight}>
                <Image
                  source={
                    bet?.bet_status === 'Win'
                      ? CHECK_CIRCLE
                      : bet.bet_status === 'Loss'
                      ? RED_CROSS_CIRCLE
                      : bet.bet_status === 'Push'
                      ? GREY_CIRCLE
                      : YELLOW_CIRCLE
                  }
                />
              </View>
            </View>
          );
        })}
      </Collapsible>
    </View>
  );
};

WagerActivityInnerCard.propTypes = {
  wagerActivity: PropTypes.any,
};

export {WagerActivityInnerCard};
