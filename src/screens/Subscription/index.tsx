import React, {useState, useEffect} from 'react';

import {useNavigation, useIsFocused, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BaseLayout} from '../../layout';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {ActivityIndicator, Text, View} from 'react-native';
import {
  BuySubscriptionCard,
  PrimaryButton,
  PrimaryModal,
  SubscrpitionCard,
} from '../../components';
import {CHECKOUT} from '../../routes/const';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  cancelSubscriptionAction,
  checkSubscriptionAction,
  getProductsAction,
  getUserDetailsAction,
  ProductModal,
  SubscribedProductModal,
} from '../../redux';
import useStyles from './styles';
import {requestEmailVerification} from '../../redux/apis';
import toast from 'react-native-simple-toast';
import {SET_SUBSCRIPTION} from '../../redux/actionTypes';
type SubscriptionList = StackNavigationProp<PostLoginParamList, 'Subscription'>;

const Subscription = () => {
  const theme: any = useTheme();
  const navigation = useNavigation<SubscriptionList>();
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();
  const styles = useStyles(theme);
  const loading = useSelector(
    (state: any) => state.subscriptionReducer.isLoading,
  );
  const {user} = useSelector((state: any) => state.authReducer);
  const [isHavingSubscription, setIsHavingSubscription] =
    useState<boolean>(false);
  const [showVerifiedPopup, setShowVerifiedPopup] = useState<boolean>(false);
  const [products, setProducts] = useState<Array<ProductModal>>([]);
  const [subscribedProduct, setSubscribedProduct] =
    useState<SubscribedProductModal>();

  const handleBtnClick = (product: ProductModal) => {
    navigation.navigate(CHECKOUT, {product});
  };

  const getProductDetails = () => {
    dispatch(
      getProductsAction((data: Array<ProductModal>) => {
        setProducts(data);
      }),
    );
  };

  useEffect(() => {
    if (isFocused) {
      if (!user?.verified) {
        setShowVerifiedPopup(true);
      } else {
        dispatch(
          checkSubscriptionAction((data: any) => {
            if (!data?.status) {
              setIsHavingSubscription(false);
              getProductDetails();
            } else {
              setSubscribedProduct(data);
              setIsHavingSubscription(true);
            }
          }),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const handleSubscriptionCancel = () => {
    dispatch(
      cancelSubscriptionAction(() => {
        dispatch(
          getUserDetailsAction(
            () => {},
            () => {},
          ),
        );
        dispatch({type: SET_SUBSCRIPTION, payload: false});
        getProductDetails();
        setIsHavingSubscription(false);
      }),
    );
  };

  const renderVerifyPopup = () => {
    return (
      <PrimaryModal
        visible={showVerifiedPopup}
        headerTitle={'Verify your email'}
        handleClose={() => {
          setShowVerifiedPopup(false);
          navigation.goBack();
        }}>
        <View style={styles.verifiedView}>
          <Text style={styles.messageText}>
            Verify your email by 12'O clock noon, otherwise account will be
            inactive!
          </Text>
          <View style={styles.btnWrapper}>
            <PrimaryButton
              style={[styles.w45, styles.ml15]}
              text="Resend link"
              gradientStyle={styles.modalGradientBtn}
              textStyle={[styles.btnTextStyle, styles.ph15]}
              handleClick={() => {
                requestEmailVerification(
                  {email: user.email},
                  () => {
                    setShowVerifiedPopup(false);
                    navigation.goBack();
                  },
                  err => {
                    setShowVerifiedPopup(false);
                    navigation.goBack();
                    toast.show(err?.[0]?.message, 2);
                  },
                );
              }}
              gradientColors={theme.colors.secondaryGradient}
            />
            <PrimaryButton
              style={[styles.w45, styles.ml15]}
              text="Close"
              gradientStyle={styles.modalGradientBtn}
              textStyle={[styles.btnTextStyle, styles.ph15]}
              handleClick={() => {
                setShowVerifiedPopup(false);
                navigation.goBack();
              }}
              gradientColors={theme.colors.grayGradient}
            />
          </View>
        </View>
      </PrimaryModal>
    );
  };

  const renderContent = () => {
    return !isHavingSubscription ? (
      products?.map((product: ProductModal) => {
        return (
          <BuySubscriptionCard
            key={product?.price_id}
            onBtnClick={handleBtnClick}
            product={product}
          />
        );
      })
    ) : (
      <SubscrpitionCard
        isEndingSoon={false}
        subscribedProduct={subscribedProduct}
        handleSubscriptionCancel={handleSubscriptionCancel}
      />
    );
  };

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Subscription"
      navigation={navigation}
      renderScrollview={true}>
      <View style={loading ? styles.mt20 : {}}>
        {loading ? (
          <ActivityIndicator color={theme.colors.lightBlueText} />
        ) : (
          renderContent()
        )}
        {renderVerifyPopup()}
      </View>
    </BaseLayout>
  );
};

export default Subscription;
