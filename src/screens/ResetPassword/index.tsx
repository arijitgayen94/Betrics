import {useTheme, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {LoginLayout} from '../../layout';
import useStyles from './styles';
import {MAIL_ICON_IMG} from '../../assets/index';
import {PrimaryInput} from '../../components';
import {PrimaryButton} from '../../components';
import {RootStackParamList} from '../../routes/NavigationInnerContainer';
import {StackNavigationProp} from '@react-navigation/stack';
import {VERIFY_OTP} from '../../routes/const';
import {useDispatch} from 'react-redux';
import {AppDispatch, forgotPasswordAction} from '../../redux';

type ResetPasswordProp = StackNavigationProp<
  RootStackParamList,
  'ResetPassword'
>;

export const ResetPassword = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<ResetPasswordProp>();
  const [email, setEmail] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  const onSend = () => {
    dispatch(
      forgotPasswordAction(email, (data: any) => {
        if (data) {
          navigation.navigate(VERIFY_OTP, {email: email});
        }
      }),
    );
  };

  return (
    <LoginLayout back onBack={() => navigation.pop()}>
      <Text style={styles.title}>Reset Password</Text>
      <View style={styles.descContainer}>
        <Text style={styles.desc}>Enter your Registered</Text>
        <TouchableOpacity>
          <Text style={styles.emailText}> Email Address</Text>
        </TouchableOpacity>
      </View>
      <PrimaryInput
        icon={MAIL_ICON_IMG}
        placeholder="Email Address"
        keyboardType="email-address"
        containerStyle={styles.emailInputContainer}
        value={email}
        onChangeText={setEmail}
      />
      <PrimaryButton
        text="Send"
        style={styles.btnSend}
        gradientStyle={styles.btnGradient}
        textStyle={styles.btnText}
        handleClick={onSend}
        gradientColors={theme.colors.primaryGradient}
      />
    </LoginLayout>
  );
};

export default ResetPassword;
