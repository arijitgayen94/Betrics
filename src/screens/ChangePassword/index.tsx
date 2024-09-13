import React, {useState} from 'react';
import useStyles from './styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BaseLayout} from '../../layout';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {Text, View} from 'react-native';
import {PrimaryButton, PrimaryInput} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, changePasswordAction} from '../../redux';
import toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ChangePasswordParamList = StackNavigationProp<
  PostLoginParamList,
  'ChangePassword'
>;
type errorInterface = {
  currentPasswordError: string;
  newPasswordError: string;
  confirmNewPasswordError: string;
};
const ChangePassword = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<ChangePasswordParamList>();
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [errors, setErrors] = useState<errorInterface>({
    currentPasswordError: '',
    newPasswordError: '',
    confirmNewPasswordError: '',
  });
  const loading = useSelector((state: any) => state.loadingReducer.isLoading);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmitForm = () => {
    if (validate()) {
      dispatch(
        changePasswordAction(
          {
            current_password: currentPassword,
            password: newPassword,
            confirm_password: confirmNewPassword,
          },
          async (data: {token: string}) => {
            AsyncStorage.setItem('token', data.token);
          },
          (error: any) => {
            if (Array.isArray(error) && error?.length > 0) {
              toast.show(error?.[0]?.message, 2);
            }
          },
        ),
      );
    }
  };

  const validate = () => {
    let isValid = true;
    let _errors: errorInterface = {
      currentPasswordError: '',
      newPasswordError: '',
      confirmNewPasswordError: '',
    };

    if (currentPassword === '') {
      isValid = false;
      _errors = {..._errors, currentPasswordError: 'This field is required.'};
    } else if (currentPassword.length < 8) {
      isValid = false;
      _errors = {
        ..._errors,
        currentPasswordError: 'Password must contain atleast 8 characters',
      };
    }
    if (newPassword === '') {
      isValid = false;
      _errors = {..._errors, newPasswordError: 'This field is required.'};
    } else if (newPassword.length < 8) {
      isValid = false;
      _errors = {
        ..._errors,
        newPasswordError: 'Password must contain atleast 8 characters',
      };
    }
    if (confirmNewPassword === '') {
      isValid = false;
      _errors = {
        ..._errors,
        confirmNewPasswordError: 'This field is required.',
      };
    } else if (newPassword !== confirmNewPassword) {
      isValid = false;
      _errors = {
        ..._errors,
        confirmNewPasswordError: 'Password does not match.',
      };
    }
    setErrors(_errors);
    return isValid;
  };

  const handleCurrentPasswordChange = (text: string) => {
    setErrors({...errors, currentPasswordError: ''});
    setCurrentPassword(text);
  };
  const handleNewPasswordChange = (text: string) => {
    setErrors({...errors, newPasswordError: ''});
    setNewPassword(text);
  };
  const handleConfirmNewPasswordChange = (text: string) => {
    setErrors({...errors, confirmNewPasswordError: ''});
    setConfirmNewPassword(text);
  };

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Change Password"
      navigation={navigation}
      renderScrollview={true}>
      <View style={styles.mainContainer}>
        <PrimaryInput
          placeholder=""
          value={currentPassword}
          onChangeText={handleCurrentPasswordChange}
          keyboardType="default"
          labelStyle={styles.labelStyle}
          containerStyle={[styles.containerStyle]}
          inputStyle={styles.inputStyle}
          secureTextEntry={true}
          labelText={'Current Password'}
        />
        {errors.currentPasswordError !== '' && (
          <Text style={styles.errorText}>{errors.currentPasswordError}</Text>
        )}
        <PrimaryInput
          placeholder=""
          value={newPassword}
          onChangeText={handleNewPasswordChange}
          keyboardType="default"
          labelStyle={styles.labelStyle}
          containerStyle={styles.containerStyle}
          inputStyle={styles.inputStyle}
          secureTextEntry={true}
          labelText={'New Password'}
        />
        {errors.newPasswordError !== '' && (
          <Text style={styles.errorText}>{errors.newPasswordError}</Text>
        )}
        <PrimaryInput
          placeholder=""
          value={confirmNewPassword}
          onChangeText={handleConfirmNewPasswordChange}
          keyboardType="default"
          labelStyle={styles.labelStyle}
          containerStyle={styles.containerStyle}
          inputStyle={styles.inputStyle}
          secureTextEntry={true}
          labelText={'Confirm Password'}
        />
        {errors.confirmNewPasswordError !== '' && (
          <Text style={styles.errorText}>{errors.confirmNewPasswordError}</Text>
        )}
        <PrimaryButton
          style={styles.btnStyle}
          text="Save"
          isLoading={loading}
          gradientStyle={styles.gradientStyle}
          textStyle={styles.btnTextStyle}
          handleClick={onSubmitForm}
          gradientColors={theme.colors.secondaryGradient}
        />
      </View>
    </BaseLayout>
  );
};

export default ChangePassword;
