import React, {useState, useEffect} from 'react';
import {Alert, Image, Platform, Text, View} from 'react-native';
import useStyles from './styles';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {BaseLayout} from '../../layout';
import {PrimaryButton, PrimaryInput} from '../../components';
import {HELP_ICON_BLACK, PRODUCT_ICON} from '../../assets';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {
  AppDispatch,
  checkoutAction,
  checkSubscriptionAction,
  fetchClientSecret,
  getUserDetailsAction,
  ProductModal,
  toggleSubscriptionLoadingAction,
  verifyCouponAction,
} from '../../redux';
import {useDispatch, useSelector} from 'react-redux';
import {
  initStripe,
  confirmPayment,
  PlatformPayButton,
  isPlatformPaySupported,
  PlatformPay,
  confirmPlatformPayPayment,
} from '@stripe/stripe-react-native';
import {stripe_publishable_key} from '@env';
import toast from 'react-native-simple-toast';
import {SET_SUBSCRIPTION} from '../../redux/actionTypes';

type CheckoutNavigationProps = StackNavigationProp<
  PostLoginParamList,
  'Checkout'
>;

const Checkout = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<CheckoutNavigationProps>();
  const route: any = useRoute();
  const dispatch = useDispatch<AppDispatch>();
  const product: ProductModal = route.params?.product;
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryMonth, setExpiryMonth] = useState<string>('');
  const [expiryYear, setExpiryYear] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [couponCode, setCouponCode] = useState<string>('');
  const [coupon, setCoupon] = useState<any>({});
  const [errors, setError] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });
  const loading = useSelector(
    (state: any) => state.subscriptionReducer.isLoading,
  );
  const [isApplePaySupported, setIsApplePaySupported] = useState(false);

  const initialStripe = () => {
    initStripe({
      publishableKey: stripe_publishable_key,
    });
  };

  const initialStripeApplePay = () => {
    initStripe({
      publishableKey: stripe_publishable_key,
      merchantIdentifier: 'merchant.com.betrics.io.betricsapps',
    });
  };

  useEffect(() => {
    (async function () {
      if (Platform.OS === 'ios') {
        setIsApplePaySupported(await isPlatformPaySupported());
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlatformPaySupported]);

  const validateFields = () => {
    let error: any = {};
    if (!cardNumber || cardNumber.length < 15) {
      error.cardNumber = 'Please enter valid card number';
    }
    if (!expiryMonth) {
      error.expiryMonth = 'Please enter valid expiry month';
    }
    if (!expiryYear || expiryYear.length < 2) {
      error.expiryYear = 'Please enter valid expiry year';
    }
    if (!cvv || cvv.length < 3 || cvv.length > 4) {
      error.cvv = 'Please enter valid cvv';
    }
    setError(error);
    if (Object.keys(error).length > 0) {
      return false;
    }
    return true;
  };

  const confirmPaymentOnStripe = async (data: any) => {
    try {
      if (product?.is_trail) {
        toast.show('Successfully subscribed!');
        dispatch(checkSubscriptionAction());
        dispatch({type: SET_SUBSCRIPTION, payload: true});
        navigation.pop();
        dispatch(
          getUserDetailsAction(
            () => {},
            () => {},
          ),
        );
        return;
      }
      dispatch(toggleSubscriptionLoadingAction(true));
      if (data.client_secret) {
        let response = await confirmPayment(data.client_secret);
        if (response) {
          if (response.error) {
            toast.show(response.error.message);
            dispatch(checkSubscriptionAction());
            dispatch({type: SET_SUBSCRIPTION, payload: false});
            dispatch(
              getUserDetailsAction(
                () => {},
                () => {},
              ),
            );
            navigation.pop();
            return;
          } else {
            toast.show('Successfully subscribed!');
            dispatch(checkSubscriptionAction());
            dispatch({type: SET_SUBSCRIPTION, payload: true});
            dispatch(
              getUserDetailsAction(
                () => {},
                () => {},
              ),
            );
            navigation.pop();
            return;
          }
        }
      }
      if (data.paid) {
        toast.show('Successfully subscribed!');
        dispatch(checkSubscriptionAction());
        dispatch({type: SET_SUBSCRIPTION, payload: true});
        dispatch(
          getUserDetailsAction(
            () => {},
            () => {},
          ),
        );
        navigation.pop();
        return;
      }
    } catch (e: any) {
      toast.show(e.message);
    } finally {
      dispatch(toggleSubscriptionLoadingAction(false));
    }
  };

  const handleCheckout = () => {
    if (validateFields()) {
      initialStripe();
      dispatch(
        checkoutAction(
          {
            card_number: cardNumber,
            coupon: coupon?.name || null,
            cvc: cvv,
            exp_month: expiryMonth,
            exp_year: expiryYear,
            price_id: product?.price_id,
          },
          (data: any) => confirmPaymentOnStripe(data),
        ),
      );
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode.length > 0) {
      if (coupon?.name) {
        setCoupon([]);
        setCouponCode('');
      } else {
        dispatch(
          verifyCouponAction(couponCode, data => {
            setCoupon(data);
          }),
        );
      }
    }
  };

  const renderProductSummary = () => {
    return (
      <View style={[styles.productSummaryContainer, styles.mt20]}>
        <Image source={PRODUCT_ICON} />
        <View style={styles.ml20}>
          <Text style={styles.purchaseType}>{product.name}</Text>
          <Text style={styles.price}>
            US $
            {coupon?.percent_off
              ? product?.amount / 100 -
                (product?.amount / 100) * (coupon?.percent_off / 100)
              : product?.amount / 100}{' '}
            <Text style={styles.pricePeriodicity}>
              per {product?.recurring?.interval}
            </Text>
          </Text>
        </View>
      </View>
    );
  };

  const pay = async () => {
    initialStripeApplePay();
    const body = {
      price_id: product.price_id,
      coupon: coupon?.name || null,
      platform: 'APPLE',
    };
    dispatch(
      fetchClientSecret(
        body,
        async data => {
          if (data.client_secret) {
            const {error, paymentIntent} = await confirmPlatformPayPayment(
              data.client_secret,
              {
                applePay: {
                  cartItems: [
                    {
                      label: `${product.name}`,
                      amount: `${
                        coupon?.percent_off
                          ? product?.amount / 100 -
                            (product?.amount / 100) *
                              (coupon?.percent_off / 100)
                          : product?.amount / 100
                      }`,
                      paymentType:
                        product.type === 'recurring'
                          ? PlatformPay.PaymentType.Recurring
                          : PlatformPay.PaymentType.Immediate,
                      intervalCount: product.recurring.interval_count,
                      intervalUnit:
                        product.recurring.interval === 'day'
                          ? PlatformPay.IntervalUnit.Day
                          : product.recurring.interval === 'month'
                          ? PlatformPay.IntervalUnit.Month
                          : PlatformPay.IntervalUnit.Year,
                    },
                  ],
                  merchantCountryCode: 'US',
                  currencyCode: 'USD',
                },
              },
            );
            if (error) {
              // handle error
              toast.show(error?.localizedMessage);
              dispatch(checkSubscriptionAction());
              dispatch({type: SET_SUBSCRIPTION, payload: false});
              dispatch(
                getUserDetailsAction(
                  () => {},
                  () => {},
                ),
              );
              navigation.pop();
              return;
            } else {
              if (paymentIntent?.status === 'Succeeded') {
                toast.show('Successfully subscribed!');
                dispatch(checkSubscriptionAction());
                dispatch({type: SET_SUBSCRIPTION, payload: true});
                dispatch(
                  getUserDetailsAction(
                    () => {},
                    () => {},
                  ),
                );
                navigation.pop();
              }
            }
          } else {
            if (data.paid) {
              toast.show('Successfully subscribed!');
              dispatch(checkSubscriptionAction());
              dispatch({type: SET_SUBSCRIPTION, payload: true});
              dispatch(
                getUserDetailsAction(
                  () => {},
                  () => {},
                ),
              );
              navigation.pop();
              return;
            }
          }
        },
        () => {},
      ),
    );
  };

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Checkout"
      renderScrollview={true}
      navigation={navigation}>
      <View style={styles.mainContainer}>
        {renderProductSummary()}
        <Text style={styles.heading}>Have a Coupon Code?</Text>
        <Text style={styles.note}>
          Note: One discount can be redeemed per order. See terms for details.
        </Text>
        <PrimaryInput
          placeholder="Enter Coupon Code"
          onChangeText={setCouponCode}
          keyboardType={'default'}
          labelStyle={styles.inputLableStyle}
          containerStyle={styles.mt20}
          includeBtn={true}
          btnText={coupon?.name ? 'Clear' : 'Apply'}
          value={couponCode}
          onBtnClick={handleApplyCoupon}
        />
        <Text style={styles.heading}>Card Details</Text>
        <PrimaryInput
          labelText="Card Number"
          placeholder="4242 4242 4242 4242"
          onChangeText={setCardNumber}
          keyboardType={'number-pad'}
          labelStyle={styles.inputLableStyle}
          containerStyle={styles.mt20}
          value={cardNumber}
          maxLength={19}
        />
        {errors?.cardNumber?.length > 0 && (
          <Text style={styles.errorText}>{errors?.cardNumber}</Text>
        )}

        <View style={styles.expiryDateContainer}>
          <View style={styles.w48}>
            <PrimaryInput
              labelText="Expiry Month"
              placeholder="01"
              onChangeText={setExpiryMonth}
              keyboardType={'number-pad'}
              labelStyle={styles.inputLableStyle}
              value={expiryMonth}
              containerStyle={styles.w100}
            />
            {errors?.expiryMonth?.length > 0 && (
              <Text style={styles.errorText}>{errors?.expiryMonth}</Text>
            )}
          </View>
          <View style={styles.w48}>
            <PrimaryInput
              labelText="Expiry Year"
              placeholder="24"
              onChangeText={setExpiryYear}
              keyboardType={'number-pad'}
              labelStyle={styles.inputLableStyle}
              value={expiryYear}
              containerStyle={styles.w100}
            />
            {errors?.expiryYear?.length > 0 && (
              <Text style={styles.errorText}>{errors?.expiryYear}</Text>
            )}
          </View>
        </View>
        <PrimaryInput
          labelText="Security code (CVV)"
          placeholder="123"
          onChangeText={setCvv}
          keyboardType={'number-pad'}
          labelStyle={styles.inputLableStyle}
          containerStyle={styles.mt20}
          icon={HELP_ICON_BLACK}
          value={cvv}
        />
        {errors?.cvv?.length > 0 && (
          <Text style={styles.errorText}>{errors?.cvv}</Text>
        )}

        <PrimaryButton
          text="Pay with card"
          style={[styles.mt20, styles.btn]}
          gradientStyle={styles.btnGradient}
          textStyle={styles.btnText}
          handleClick={handleCheckout}
          gradientColors={theme.colors.secondaryGradient}
          isLoading={loading}
        />
        {isApplePaySupported && (
          <>
            <View style={styles.separateContainer}>
              <View style={styles.lineView} />
              <Text style={styles.separatorText}>Or pay another way</Text>
              <View style={styles.lineView} />
            </View>
            <PlatformPayButton
              onPress={pay}
              type={PlatformPay.ButtonType.Pay}
              appearance={PlatformPay.ButtonStyle.Black}
              borderRadius={8}
              style={styles.applePayBtn}
            />
          </>
        )}
      </View>
    </BaseLayout>
  );
};

export default Checkout;
