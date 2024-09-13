import React, {useState} from 'react';
import useStyles from './styles';
import PropTypes from 'prop-types';
import {Image, Text, View} from 'react-native';
import {PRODUCT_ICON} from '../../assets';
import {SecondaryButton} from '../SecondaryButton';
import {useTheme} from '@react-navigation/native';
import {SubscribedProductModal} from '../../redux';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {PrimaryModal} from '../PrimaryModal';
import {PrimaryButton} from '../PrimaryButton';

interface SubscrpitionCard {
  isEndingSoon: boolean;
  subscribedProduct?: SubscribedProductModal;
  handleSubscriptionCancel: () => void;
}

const SubscrpitionCard = (props: SubscrpitionCard) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);

  const loading = useSelector(
    (state: any) => state.subscriptionReducer.isLoading,
  );

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardImgWrapper}>
        <Image source={PRODUCT_ICON} />
      </View>
      <View style={styles.textSectionWrapper}>
        <View
          style={[styles.flexRow, styles.justifyBetween, styles.alignCenter]}>
          <Text numberOfLines={1} style={styles.headingText}>
            {props?.subscribedProduct?.name}
          </Text>
          <View
            style={[
              styles.statusWrapper,
              props?.subscribedProduct?.is_trial &&
                styles.tomatoBgColorLowOpacity,
            ]}>
            <Text
              style={[
                styles.statusText,
                props?.subscribedProduct?.is_trial && styles.tomatoColor,
              ]}>
              {props?.subscribedProduct?.is_trial
                ? 'Trial ends ' +
                  moment(props?.subscribedProduct?.trial_end).format('DD MMM')
                : 'Active'}
            </Text>
          </View>
        </View>
        <Text numberOfLines={1} style={[styles.subHeadingText, styles.mw90]}>
          Billing every{' '}
          {props?.subscribedProduct &&
          props?.subscribedProduct.interval_count > 1
            ? props.subscribedProduct.interval_count + ' '
            : ''}
          {props?.subscribedProduct &&
          props?.subscribedProduct.interval_count > 1
            ? props?.subscribedProduct?.interval + 's'
            : props?.subscribedProduct?.interval}
        </Text>
        <Text numberOfLines={2} style={[styles.subHeadingText]}>
          Next invoice on{' '}
          {props?.subscribedProduct?.next_invoice_date
            ? moment(props?.subscribedProduct?.next_invoice_date).format(
                'DD MMM',
              ) +
              ' for US $' +
              props?.subscribedProduct?.amount / 100
            : ''}
        </Text>
        <SecondaryButton
          style={styles.btnStyle}
          handleClick={() => setShowCancelModal(true)}
          textStyle={styles.btnTextStyle}
          text="Cancel Subscription"
          isLoading={loading}
        />
        <PrimaryModal
          headerTitle="Cancel Subscription"
          visible={showCancelModal}
          handleClose={() => setShowCancelModal(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Are you sure to cancel subscription ?{' '}
            </Text>
            <View style={styles.modalBtnContainer}>
              <SecondaryButton
                text="No"
                handleClick={() => setShowCancelModal(false)}
                style={styles.modalNoBtn}
                textStyle={styles.modalNoBtnText}
              />
              <PrimaryButton
                text="Yes"
                gradientColors={theme.colors.secondaryGradient}
                handleClick={() => {
                  setShowCancelModal(false);
                  props?.handleSubscriptionCancel();
                }}
                gradientStyle={styles.modalYesBtn}
                textStyle={styles.modalYesBtnText}
              />
            </View>
          </View>
        </PrimaryModal>
      </View>
    </View>
  );
};

SubscrpitionCard.propTypes = {
  isEndingSoon: PropTypes.bool,
  subscribedProduct: PropTypes.any,
  handleSubscriptionCancel: PropTypes.func,
};

export {SubscrpitionCard};
