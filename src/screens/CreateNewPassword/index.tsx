import {useTheme, useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text} from 'react-native';
import {LoginLayout} from '../../layout';
import useStyles from './styles';
import {PrimaryInput} from '../../components';
import {PrimaryButton} from '../../components';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/NavigationInnerContainer';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, resetPasswordAction} from '../../redux';
import {LOGIN} from '../../routes/const';
import {EYE_OFF_ICON} from '../../assets';

type CreateNewPasswordNavProp = StackNavigationProp<
  RootStackParamList,
  'CreateNewPassword'
>;

export const CreateNewPassword = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<CreateNewPasswordNavProp>();
  const route: any = useRoute();
  const dispatch = useDispatch<AppDispatch>();
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [submit, setSubmit] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const loading = useSelector((state: any) => state?.loadingReducer?.isLoading);

  const onResetPassword = () => {
    setSubmit(true);
    if (
      !newPassword ||
      newPassword?.length < 8 ||
      confirmPassword !== newPassword
    ) {
      return;
    }
    dispatch(
      resetPasswordAction(
        {
          email: route?.params?.email,
          password: newPassword,
          confirm_password: confirmPassword,
        },
        () => {
          navigation.navigate(LOGIN);
        },
      ),
    );
  };

  return (
    <LoginLayout>
      <Text style={styles.title}>Create New Password</Text>
      <Text style={styles.desc}>
        Your New Password Must be Different from Previously Used Password.
      </Text>
      <PrimaryInput
        icon={EYE_OFF_ICON}
        onIconClick={() => setShowPassword(!showPassword)}
        placeholder="New Password"
        keyboardType="default"
        containerStyle={styles.passwordInputContainer}
        inputStyle={styles.inputField}
        secureTextEntry={!showPassword}
        labelText={'New Password'}
        value={newPassword}
        onChangeText={setNewPassword}
      />
      {submit && (!newPassword || newPassword.length < 8) ? (
        <Text style={styles.errorText}>
          New Password must be at least 8 characters
        </Text>
      ) : null}
      <PrimaryInput
        icon={EYE_OFF_ICON}
        onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
        placeholder="Confirm Password"
        keyboardType="default"
        containerStyle={styles.passwordInputContainer}
        inputStyle={styles.inputField}
        secureTextEntry={!showConfirmPassword}
        labelText={'Confirm Password'}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {submit && (!confirmPassword || confirmPassword !== newPassword) ? (
        <Text style={styles.errorText}>Confirm Password must New Password</Text>
      ) : null}
      <PrimaryButton
        text="Reset Password"
        style={styles.btnLogin}
        gradientStyle={styles.btnGradient}
        textStyle={styles.btnText}
        handleClick={onResetPassword}
        gradientColors={theme.colors.primaryGradient}
        isLoading={loading}
      />
    </LoginLayout>
  );
};

export default CreateNewPassword;
