import React from 'react';
import {Image, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {PrimaryButton} from '../PrimaryButton';
import {CHECK_CIRCLE} from '../../assets';

interface GetSubscriptionProps {
  onSubscribe: () => void;
}

const GetSubscription = (props: GetSubscriptionProps) => {
  const {onSubscribe} = props;

  const theme: any = useTheme();
  const styles = useStyles(theme);

  return (
    <View style={styles.containerView}>
      <View style={styles.opacityView} />
      <View style={[styles.containerView, styles.center]}>
        <View style={[styles.containView, styles.shadowProp]}>
          <Text style={styles.premiumText}>
            Enable subscription to use these features
          </Text>
          <PrimaryButton
            text="Get Subscription"
            style={styles.btnSignup}
            gradientStyle={styles.btnGradient}
            textStyle={styles.btnText}
            handleClick={onSubscribe}
            gradientColors={theme.colors.secondaryGradient}
          />
          <Text style={styles.whySubText}>Why enable subscription ?</Text>
          <View style={styles.premiumBox}>
            <View style={styles.premiumOptionView}>
              <Image source={CHECK_CIRCLE} />
              <Text style={styles.premiumOptionText}>
                Decision engine recommendation
              </Text>
            </View>
            {/* <View style={styles.premiumOptionView}>
              <Image source={CHECK_CIRCLE} />
              <Text style={styles.premiumOptionText}>
                Track your wager's result
              </Text>
            </View> */}
            <View style={styles.premiumOptionView}>
              <Image source={CHECK_CIRCLE} />
              <Text style={styles.premiumOptionText}>
                View projection, ratings, etc.
              </Text>
            </View>
            <View style={styles.premiumOptionView}>
              <Image source={CHECK_CIRCLE} />
              <Text style={styles.premiumOptionText}>Premium support</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

GetSubscription.propTypes = {
  onSubscribe: PropTypes.func,
};

export {GetSubscription};
