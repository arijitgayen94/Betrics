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
import {SecondaryButton} from '../SecondaryButton';
import LinearGradient from 'react-native-linear-gradient';
import {PrimaryInput} from '../PrimaryInput';
import {Bet} from '../../redux';
import PropType from 'prop-types';
import moment from 'moment';
import {
  convertAmToDecOdds,
  makeProperAmNumber,
  makeProperBetPointNumber,
  makeProperDecNumber,
  makeProperPointNumber,
  validateOddsNumber,
  validatePointNumber,
} from '../../service/helperFunction';
import toast from 'react-native-simple-toast';
interface BetQueueStraightCardProps {
  bet: Bet;
  onAddToBetTracker: (amount: number, wager_type: any) => void;
  onRemoveBet: (betId: any) => void;
  onChangeBetAmount: (obj: any) => void;
  onChangeEditable: (isEditEnable: boolean) => void;
  saveEditBet: (body: any, uuid: string) => void;
}

const BetQueueStraightCard = (props: BetQueueStraightCardProps) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const [amount, setAmount] = useState<number>(100);
  const [oddsAmount, setOddsAmount] = useState<string>('');
  const [betPoint, setBetPoint] = useState<any>('');
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [betDecOdds, setBetDecOdds] = useState<number>(0);
  const {bet} = props;

  useEffect(() => {
    let betUuid: any = bet?.uuid;
    props?.onChangeBetAmount({
      [betUuid]: amount,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  useEffect(() => {
    if (bet) {
      if (bet.am_odds > -1) {
        setOddsAmount(`+${bet.am_odds}`);
      } else {
        setOddsAmount(`${bet.am_odds}`);
      }
      const bet_point = getBetPoints();
      setBetPoint(bet_point);
      setBetDecOdds(bet.dec_odds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bet]);
  useEffect(() => {
    props.onChangeEditable(isEditable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditable]);

  useEffect(() => {
    checkDecOddsValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oddsAmount]);

  const getNameByBetType = (_betType: string, _betSide: string) => {
    if (_betType === 'Spread' || _betType === 'Moneyline') {
      if (_betSide === 'Away') {
        return bet?.away?.abbreviation;
      } else if (_betSide === 'Home') {
        return bet?.home?.abbreviation;
      }
    } else if (_betType === 'Total') {
      return _betSide;
    }
  };

  const getBetPoints = () => {
    if (bet.bet_type === 'Total') {
      return bet.bet_point;
    }
    if (bet.bet_point && Number(bet.bet_point) > -1) {
      return '+' + Number(bet.bet_point);
    } else if (bet.bet_point && bet.bet_point.toLocaleString().includes('%')) {
      if (bet.am_odds > -1) {
        return '+' + bet.am_odds;
      } else {
        return bet.am_odds;
      }
    } else {
      return bet.bet_point;
    }
  };

  const checkDecOddsValue = async () => {
    const isValidate = validateOddsNumber(oddsAmount);
    if (isValidate) {
      const numvalue: number = Number(oddsAmount);
      const val = await convertAmToDecOdds(numvalue);
      setBetDecOdds(Number(val));
    }
  };

  const onDismissCheckValue = () => {
    const isValidate = validateOddsNumber(oddsAmount);
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

  const resetValue = () => {
    if (bet) {
      if (bet.am_odds > -1) {
        setOddsAmount(`+${bet.am_odds}`);
      } else {
        setOddsAmount(`${bet.am_odds}`);
      }
      const bet_point = getBetPoints();
      setBetPoint(bet_point);
      setBetDecOdds(bet.dec_odds);
    }
  };

  const saveUpdatedValue = () => {
    let body: any = {};
    if (bet.am_odds !== Number(oddsAmount)) {
      body.am_odds = Number(oddsAmount);
    }
    if (betPoint > -1) {
      if (bet.bet_point !== betPoint.replace('+', '')) {
        body.bet_point = betPoint;
      }
    } else {
      if (bet.bet_point !== betPoint) {
        body.bet_point = betPoint;
      }
    }
    if (Object.keys(body).length > 0) {
      props.saveEditBet(body, bet.uuid);
    }
  };

  return (
    <View style={styles.cardWrapper}>
      <View style={[styles.rowBetween, styles.w100]}>
        <View style={styles.dateTimeWrapper}>
          <Text style={styles.timetext}>
            {moment(bet.event_time).format('L')}
          </Text>
          <Text style={styles.timetext}>
            {moment(bet.event_time).format('LT')}
          </Text>
        </View>
        <View style={[styles.dateTimeWrapper, styles.iconView]}>
          {!bet.rated && !isEditable && (
            <TouchableOpacity
              style={styles.cancelImg}
              onPress={() => {
                setIsEditable(true);
              }}>
              <Image source={EDIT_ICON} style={styles.editIconStyle} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.cancelImg}
            onPress={() => {
              props?.onRemoveBet(bet.uuid);
            }}>
            <Image source={X_CIRCLE_DARK_IMG} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.rowBetween]}>
        <Text style={styles.name}>{bet.book_name}</Text>
        {isEditable && (
          <View style={[styles.w25, styles.rowBetween]}>
            <Pressable
              onPress={() => {
                saveUpdatedValue(), setIsEditable(false);
              }}>
              <Image source={SAVE} style={styles.saveIcon} />
            </Pressable>
            <Pressable
              onPress={() => {
                setIsEditable(false);
                resetValue();
              }}>
              <Image source={CANCEL} style={styles.saveIcon} />
            </Pressable>
          </View>
        )}
      </View>
      <View style={styles.addRow}>
        <PrimaryInput
          containerStyle={styles.oddsInputContainer}
          inputContainerStyle={
            isEditable
              ? styles.oddsTextBg
              : [styles.oddsTextBg, styles.nonEditableView]
          }
          inputStyle={styles.amountText}
          onChangeText={(value: any) => {
            const val = makeProperAmNumber(value);
            if (val) {
              setOddsAmount(value);
            }
          }}
          editable={isEditable}
          keyboardType={'numbers-and-punctuation'}
          placeholder=""
          value={oddsAmount}
          onEndEditing={onDismissCheckValue}
          maxLength={13}
        />
        <View style={styles.flexRow}>
          <PrimaryInput
            containerStyle={styles.amountInputContainer}
            inputContainerStyle={styles.amountTextBg}
            inputStyle={styles.amountTextInput}
            onChangeText={(value: any) => {
              setAmount(value);
            }}
            keyboardType={'decimal-pad'}
            placeholder=""
            value={amount + ''}
          />
          <SecondaryButton
            style={styles.btnStyle}
            handleClick={() => {
              props?.onAddToBetTracker(amount, 'Straight');
            }}
            textStyle={styles.btnTextStyle}
            text="Add to Bet Tracker"
          />
        </View>
      </View>
      <LinearGradient
        colors={theme.colors.primaryGradient}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={styles.tableHeaderGradientStyle}>
        <View style={styles.gradientinnerWrapper}>
          <View style={styles.textInputView}>
            <Text style={[styles.headerText]}>
              {`${getNameByBetType(bet.bet_type, bet.bet_side)}  `}
            </Text>
            <PrimaryInput
              containerStyle={styles.betTypeInputContainer}
              inputContainerStyle={
                isEditable
                  ? styles.betTypeTextBg
                  : [styles.betTypeTextBg, styles.nonEditableView]
              }
              inputStyle={
                isEditable
                  ? styles.amountTextInput
                  : [styles.amountTextInput, styles.nonEditableText]
              }
              onChangeText={(value: any) => {
                const val = makeProperPointNumber(value);
                if (val) {
                  setBetPoint(value);
                }
              }}
              editable={isEditable}
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
      <View style={styles.amountWrapper}>
        <Text style={styles.amountTextDark}>
          At Risk: <Text style={styles.grayText}>${amount}</Text>
        </Text>
        <Text style={styles.amountTextDark}>
          Potential Payout:{' '}
          <Text style={styles.grayText}>
            ${parseFloat(amount * betDecOdds + '').toFixed(2)}
          </Text>
        </Text>
      </View>
    </View>
  );
};

BetQueueStraightCard.propTypes = {
  bet: PropType.any,
  onAddToBetTracker: PropType.func,
  onRemoveBet: PropType.func,
  onChangeBetAmount: PropType.func,
};

export {BetQueueStraightCard};
