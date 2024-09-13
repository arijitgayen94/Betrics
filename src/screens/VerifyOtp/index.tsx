import {useTheme, useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {LoginLayout} from '../../layout';
import useStyles from './styles';
import {PrimaryButton, PrimaryModal} from '../../components';
import {RootStackParamList} from '../../routes/NavigationInnerContainer';
import {StackNavigationProp} from '@react-navigation/stack';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {CREATE_NEW_PASSWORD} from '../../routes/const';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, forgotPasswordAction, verfiOtpAction} from '../../redux';

type VerifyOtpNavigationProp = StackNavigationProp<
  RootStackParamList,
  'VerifyOtp'
>;

export const VerifyOtp = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<VerifyOtpNavigationProp>();
  const route: any = useRoute();
  const [isResendModal, setResendModal] = useState(false);
  const [otp, setOtp] = useState<string>('');
  const loading = useSelector((state: any) => state.loadingReducer.isLoading);
  const dispatch = useDispatch<AppDispatch>();

  const onResend = () => {
    dispatch(forgotPasswordAction(route?.params?.email));
  };

  const onConfirm = () => {
    dispatch(
      verfiOtpAction(route?.params?.email, otp, () => {
        navigation.navigate(CREATE_NEW_PASSWORD, {
          email: route?.params?.email,
        });
      }),
    );
  };

  const renderRenderModal = () => {
    const handleModalClose = () => {
      setResendModal(false);
    };
    return (
      <PrimaryModal
        headerTitle="Resend Verification Code"
        visible={isResendModal}
        handleClose={handleModalClose}>
        <View style={styles.modalContentContainer}>
          <Text style={styles.modalText}>
            We are sending verification code to this email address. Please check
            it it before continuing
          </Text>
          <PrimaryButton
            text="Continue"
            style={styles.btnContinue}
            gradientStyle={styles.btnGradient}
            textStyle={styles.btnText}
            handleClick={handleModalClose}
            gradientColors={theme.colors.secondaryGradient}
          />
        </View>
      </PrimaryModal>
    );
  };

  return (
    <LoginLayout back onBack={() => navigation.pop()}>
      <Text style={styles.title}>Verify Your OTP</Text>
      <View style={styles.descContainer}>
        <Text style={styles.desc}>Please Enter The 6 Digit Code Send to</Text>
        <Text style={styles.emailText}>{route?.params?.email}</Text>
      </View>
      <OTPInputView
        keyboardType="default"
        pinCount={6}
        style={styles.otpInputContainer}
        autoFocusOnLoad
        codeInputFieldStyle={styles.otpInputField}
        onCodeFilled={code => setOtp(code)}
      />
      {renderRenderModal()}
      <View style={styles.resendContainer}>
        <Text style={styles.desc}>Don’t receive the code? </Text>
        <TouchableOpacity
          onPress={() => {
            onResend();
            setResendModal(true);
          }}>
          <Text style={styles.emailText}>RESEND</Text>
        </TouchableOpacity>
      </View>
      <PrimaryButton
        text="Confirm"
        style={styles.btnConfirm}
        gradientStyle={styles.btnGradient}
        textStyle={styles.btnText}
        handleClick={onConfirm}
        gradientColors={theme.colors.primaryGradient}
        isLoading={loading}
      />
    </LoginLayout>
  );
};

export default VerifyOtp;
