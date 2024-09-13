import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {CANCEL, EDIT_ICON, SAVE, X_CIRCLE_DARK_IMG} from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {Bet} from '../../redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {PrimaryInput} from '../PrimaryInput';
import {
  convertAmToDecOdds,
  makeProperAmNumber,
  makeProperPointNumber,
  validateOddsNumber,
  validatePointNumber,
} from '../../service/helperFunction';
import toast from 'react-native-simple-toast';
interface ParlayCardProps {
  bet: Bet;
  index: number;
  onRemoveBet: (betId: any) => void;
  onChangeEdit: (isEdit: boolean) => void;
  changeDecValue: (val: number, index: number) => void;
  resetValue: (index: number) => void;
  saveEditBet: (body: any, uuid: string) => void;
}

const ParlayCard = (props: ParlayCardProps) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const [isEditEnable, setIsEditEnabled] = useState<boolean>(false);
  const [amOdds, setAmOdds] = useState<string>('');
  const [betPoint, setBetPoint] = useState<any>('');

  useEffect(() => {
    if (props.bet) {
      if (props.bet.am_odds > -1) {
        setAmOdds(`+ ${props.bet.am_odds}`);
      } else {
        setAmOdds(`${props.bet.am_odds}`);
      }
      const bet_point = getBetPoints(props.bet);
      setBetPoint(bet_point);
    }
  }, [props.bet]);

  useEffect(() => {
    props.onChangeEdit(isEditEnable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditEnable]);

  useEffect(() => {
    checkDecOddsValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amOdds]);

  const getNameByBetType = (_betType: string, _betSide: string, _bet: Bet) => {
    if (_betType === 'Spread' || _betType === 'Moneyline') {
      if (_betSide === 'Away') {
        return _bet?.away?.abbreviation;
      } else if (_betSide === 'Home') {
        return _bet?.home?.abbreviation;
      }
    } else if (_betType === 'Total') {
      return _betSide;
    }
  };

  const getBetPoints = (_bet: Bet) => {
    if (_bet.bet_type === 'Total') {
      return _bet.bet_point;
    }
    if (_bet.bet_point && Number(_bet.bet_point) > -1) {
      return '+' + Number(_bet.bet_point);
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

  const checkDecOddsValue = async () => {
    const isValidate = validateOddsNumber(amOdds);
    if (isValidate) {
      const val = await convertAmToDecOdds(Number(amOdds));
      props.changeDecValue(Number(val), props.index);
    }
  };

  const onDismissCheckValue = () => {
    const isValidate = validateOddsNumber(amOdds);
    if (!isValidate) {
      toast.show('Allowed odds >=100 or <= -100', 2);
    }
  };

  const onDismissPointCheckValue = () => {
    const isValidate = validatePointNumber(betPoint);
    if (!isValidate) {
      toast.show('Allowed bet point >=-100 or <= 300', 2);
    }
  };

  const resetLocalValue = () => {
    if (props.bet) {
      if (props.bet.am_odds > -1) {
        setAmOdds(`+ ${props.bet.am_odds}`);
      } else {
        setAmOdds(`${props.bet.am_odds}`);
      }
      const bet_point = getBetPoints(props.bet);
      setBetPoint(bet_point);
    }
  };

  const saveUpdatedValue = () => {
    let body: any = {};
    if (props.bet.am_odds !== Number(amOdds)) {
      body.am_odds = Number(amOdds);
    }
    if (betPoint > -1) {
      if (props.bet.bet_point !== betPoint.replace('+', '')) {
        body.bet_point = betPoint;
      }
    } else {
      if (props.bet.bet_point !== betPoint) {
        body.bet_point = betPoint;
      }
    }
    if (Object.keys(body).length > 0) {
      props.saveEditBet(body, props.bet.uuid);
    }
  };

  const renderParlayInnerCard = (bet: Bet, index: number) => {
    return (
      <View style={styles.innerCardWrapper} key={index + bet.book}>
        <View style={[styles.flexRow, styles.rowBetween]}>
          <View style={styles.dateTimeWrapper}>
            <Text style={styles.timetext}>
              {moment(bet.event_time).format('L')}
            </Text>
            <Text style={styles.timetext}>
              {moment(bet.event_time).format('LT')}
            </Text>
            <PrimaryInput
              containerStyle={styles.oddsInputContainer}
              inputContainerStyle={
                isEditEnable
                  ? styles.oddsTextBg
                  : [styles.oddsTextBg, styles.nonEditableView]
              }
              inputStyle={styles.amountText}
              onChangeText={(value: any) => {
                const val = makeProperAmNumber(value);
                if (val) {
                  setAmOdds(value);
                }
              }}
              maxLength={13}
              editable={isEditEnable}
              keyboardType={'numbers-and-punctuation'}
              placeholder=""
              value={amOdds}
              onEndEditing={onDismissCheckValue}
            />
          </View>
          <View style={[styles.dateTimeWrapper, styles.iconView]}>
            {!props.bet.rated && (
              <TouchableOpacity
                style={styles.cancelImg}
                onPress={() => {
                  setIsEditEnabled(true);
                }}>
                <Image source={EDIT_ICON} style={styles.editIconStyle} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.cancelImg}
              onPress={() => props.onRemoveBet(bet.uuid)}>
              <Image source={X_CIRCLE_DARK_IMG} />
            </TouchableOpacity>
          </View>
        </View>
        {isEditEnable && (
          <View style={[styles.w25, styles.rowBetween]}>
            <Pressable
              onPress={() => {
                setIsEditEnabled(false), saveUpdatedValue();
              }}>
              <Image source={SAVE} style={styles.saveIcon} />
            </Pressable>
            <Pressable
              onPress={() => {
                setIsEditEnabled(false);
                props.resetValue(props.index);
                resetLocalValue();
              }}>
              <Image source={CANCEL} style={styles.saveIcon} />
            </Pressable>
          </View>
        )}
        <LinearGradient
          colors={theme.colors.primaryGradient}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          style={styles.tableHeaderGradientStyle}>
          <View style={styles.gradientinnerWrapper}>
            <View style={styles.textInputView}>
              <Text style={[styles.headerText]}>
                {`${getNameByBetType(
                  props.bet.bet_type,
                  props.bet.bet_side,
                  props.bet,
                )}  `}
              </Text>
              <PrimaryInput
                containerStyle={styles.betTypeInputContainer}
                inputContainerStyle={
                  isEditEnable
                    ? styles.betTypeTextBg
                    : [styles.betTypeTextBg, styles.nonEditableView]
                }
                inputStyle={
                  isEditEnable
                    ? styles.amountTextInput
                    : [styles.amountTextInput, styles.nonEditableText]
                }
                onChangeText={(value: any) => {
                  const val = makeProperPointNumber(value);
                  if (val) {
                    setBetPoint(value);
                  }
                }}
                editable={isEditEnable}
                keyboardType={'numbers-and-punctuation'}
                placeholder=""
                value={`${betPoint}`}
                maxLength={6}
                onEndEditing={onDismissPointCheckValue}
              />
            </View>
            <View style={styles.separator} />
            <Text style={styles.headerText}>Game {bet.bet_type}</Text>
            <View style={styles.separator} />
            <Text style={styles.headerText}>
              {Platform.OS === 'ios'
                ? bet.sport === 'nfl'
                  ? 'PRO FB'
                  : 'PRO BB'
                : bet.sport.toUpperCase()}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.headerText}>
              {bet?.away?.abbreviation} @ {bet?.home?.abbreviation}{' '}
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <View
      style={
        props.index === 0
          ? styles.cardWrapper
          : [styles.cardWrapper, styles.marginTop0]
      }>
      {renderParlayInnerCard(props.bet, props.index)}
    </View>
  );
};

ParlayCard.propTypes = {
  bet: PropTypes.object,
  index: PropTypes.number,
  onRemoveBet: PropTypes.func,
  onChangeEdit: PropTypes.func,
  changeDecValue: PropTypes.func,
  resetValue: PropTypes.func,
};

export {ParlayCard};
