import React from 'react';
import {Image, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';

interface TransactionCardProps {
  heading: string;
  amount?: string;
  logo: string;
}

const TransactionCard = (props: TransactionCardProps) => {
  const {heading, amount, logo} = props;
  const theme: any = useTheme();
  const styles = useStyles(theme);
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardInnerWrapper}>
        <Image
          style={styles.cardImg}
          source={{
            uri: logo,
          }}
        />
        <Text numberOfLines={1} style={styles.headingText}>
          {heading}
        </Text>
      </View>
      <Text
        numberOfLines={1}
        style={
          Number(amount) >= 0 ? styles.amountGreenText : styles.amountRedText
        }>
        ${amount ? parseFloat(amount).toFixed(2) : 0}
      </Text>
    </View>
  );
};

TransactionCard.propTypes = {
  heading: PropTypes.string,
  amount: PropTypes.number,
  logo: PropTypes.string,
};

export {TransactionCard};
