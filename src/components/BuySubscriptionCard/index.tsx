import React from 'react';
import useStyles from './styles';
import {Image, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {PrimaryButton} from '../PrimaryButton';
import PropTypes from 'prop-types';
import {ProductModal} from '../../redux';
interface BuySubscriptionCard {
  onBtnClick: (product: ProductModal) => void;
  product: ProductModal;
}

const BuySubscriptionCard = (props: BuySubscriptionCard) => {
  const theme: any = useTheme();
  const {} = props;
  const styles = useStyles(theme);

  return (
    <View style={styles.cardWrapper}>
      <Image
        style={styles.cardImg}
        source={{
          uri: props?.product?.images,
        }}
      />
      {/* <View style={styles.statusWrapper}>
        <Text style={styles.statusText}>Test Mode</Text>
      </View> */}
      <Text style={styles.subscriptionNameText}>{props?.product?.name}</Text>
      <Text style={styles.priceText}>
        US ${props?.product?.amount / 100}{' '}
        <Text style={styles.durationText}>
          {' '}
          Per {props?.product?.recurring?.interval}
        </Text>
      </Text>
      <PrimaryButton
        style={styles.btnStyle}
        text={props?.product?.is_trail ? 'Start Trial' : 'Buy now'}
        gradientStyle={styles.modalGradientBtn}
        textStyle={[styles.btnTextStyle, styles.ph15]}
        handleClick={() => props.onBtnClick(props?.product)}
        gradientColors={theme.colors.secondaryGradient}
      />
    </View>
  );
};

BuySubscriptionCard.propTypes = {
  onBtnClick: PropTypes.func,
  product: PropTypes.any,
};

export {BuySubscriptionCard};
