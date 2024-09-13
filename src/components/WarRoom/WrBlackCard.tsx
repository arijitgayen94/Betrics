import React from 'react';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';

const WrBlackCard = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);

  const team = props.team ?? 'Away';
  const betType = props.betType ?? 'Spread';

  return (
    <TouchableOpacity
      style={[
        props.isBetSelected(team, betType)
          ? styles.selectedBlackCard
          : styles.blackCard,
      ]}
      onPress={() => {
        if (props.onBet) {
          !props.isBetSelected(team, betType)
            ? props.onBet(team, betType)
            : props.removeFromBetQueue(team, betType);
        }
      }}>
      <View>
        <Text style={styles.blackCardValue1}>{props?.value1}</Text>
        <Text
          style={[
            props.isBetSelected(team, betType)
              ? (styles.blackCardValue2i, {color: props.valueTwoColor})
              : (styles.blackCardValue2, {color: props.valueTwoColor}),
          ]}>
          {props?.value2}
        </Text>
        {/* {props.imageUrl !== '' && (
          <Image
            source={{
              uri: props.imageUrl,
            }}
            resizeMode="contain"
            style={styles.image}
          />
        )} */}
      </View>
    </TouchableOpacity>
  );
};

export default WrBlackCard;
