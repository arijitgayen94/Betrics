import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Platform,
  Dimensions,
  Pressable,
} from 'react-native';
import useStyles from './styles';
import {useTheme, useNavigation} from '@react-navigation/native';
import {
  BETRICS_LOGO_SMALL_IMG,
  MAIL_ICON_IMG,
  EYE_OFF_ICON,
  GOOGLE_PLUS_IMG,
} from '../../assets';
import {
  PhoneNumberInput,
  PrimaryButton,
  PrimaryInput,
  PrimaryModal,
} from '../../components';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/NavigationInnerContainer';
import {BaseLayout} from '../../layout';
import {LOGIN, POST_LOGIN} from '../../routes/const';
import {
  AppDispatch,
  checkEmailExistsAction,
  createUserAccountAction,
  loginWithGoogleAction,
  sendUserDeviceInfo,
  setNotificationToken,
  setSportName,
  setUserDetailsAction,
  signupWithGoogleAction,
} from '../../redux';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import DeviceInfo from 'react-native-device-info';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import toast from 'react-native-simple-toast';

type SignupnNavProp = StackNavigationProp<RootStackParamList, 'Signup'>;
type errorInterface = {
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  phoneError: string;
  passwordError: string;
  confirmPasswordError: string;
  isChecked: boolean;
};
const width = Dimensions.get('window').width;
const SignupScreen = () => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<SignupnNavProp>();

  const [isResendModal, setResendModal] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>('US');
  const [errors, setErrors] = useState<errorInterface>({
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    phoneError: '',
    passwordError: '',
    confirmPasswordError: '',
    isChecked: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: any) => state.loadingReducer.isLoading);
  const [userInfo, setUserInfo] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const info = {
        public_meta: {
          supportAbis: await DeviceInfo.supportedAbis(),
          isTablet: await DeviceInfo.isTablet(),
          isPinOrFingerprintset: await DeviceInfo.isPinOrFingerprintSet(),
          isLocationEnabled: await DeviceInfo.isLocationEnabled(),
          isEmulator: await DeviceInfo.isEmulator(),
          getTotalMemory: await DeviceInfo.getTotalMemory().then(
            totalmemory => {
              return bytesToSize(totalmemory);
            },
          ),
          getSystemVersion: await DeviceInfo.getSystemVersion(),
          getFingerprint: await DeviceInfo.getFingerprint(),
          getDeviceName: await DeviceInfo.getDeviceName(),
          getBrand: await DeviceInfo.getBrand(),
          getAvailableLocationProviders:
            await DeviceInfo.getAvailableLocationProviders(),
          getBuildId: await DeviceInfo.getBuildId(),
          getBatteryLevel: await DeviceInfo.getBatteryLevel(),
          getCarrier: await DeviceInfo.getCarrier(),
          getDeviceType: await DeviceInfo.getDeviceType(),
          getFreeDiskStorage: await DeviceInfo.getFreeDiskStorage().then(
            totalmemory => {
              return bytesToSize(totalmemory);
            },
          ),
          getIpAddress: await DeviceInfo.getIpAddress(),
          getMacAddress: await DeviceInfo.getMacAddress(),
          getManufacturer: await DeviceInfo.getManufacturer(),
          getModel: await DeviceInfo.getModel(),
          getPowerState: await DeviceInfo.getPowerState(),
          getSystemName: await DeviceInfo.getSystemName(),
          getTotalDiskCapacity: await DeviceInfo.getTotalDiskCapacity().then(
            totalmemory => {
              return bytesToSize(totalmemory);
            },
          ),
          getUsedMemory: await DeviceInfo.getUsedMemory().then(totalmemory => {
            return bytesToSize(totalmemory);
          }),
        },
      };

      setUserInfo(info);
    };
    fetchData();
    checkSelectedSportName();
  }, []);
  function bytesToSize(bytes: any) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return 'n/a';
    }
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) {
      return `${bytes} ${sizes[i]})`;
    }
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  }

  const onSubmitForm = () => {
    if (validate()) {
      dispatch(
        createUserAccountAction(
          {
            first_name: firstName,
            last_name: lastName,
            password: password,
            confirm_password: confirmPassword,
            email: email,
            phone_number: phoneNumber,
            country: countryCode,
          },
          data => {
            onSuccess(data.data);
          },
          (error: any) => {
            console.error(error);
          },
        ),
      );
    }
  };

  const validate = () => {
    let isValid = true;
    let _errors: errorInterface = {
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      phoneError: '',
      passwordError: '',
      confirmPasswordError: '',
      isChecked: false,
    };
    if (firstName === '') {
      isValid = false;
      _errors = {..._errors, firstNameError: 'This field is required.'};
    } else if (firstName.length < 3) {
      isValid = false;
      _errors = {..._errors, firstNameError: 'Please enter valid name'};
    }
    if (lastName === '') {
      isValid = false;
      _errors = {..._errors, lastNameError: 'This field is required.'};
    } else if (lastName.length < 3) {
      isValid = false;
      _errors = {..._errors, lastNameError: 'Please enter valid name'};
    }
    if (email === '') {
      isValid = false;
      _errors = {..._errors, emailError: 'This field is required.'};
    } else if (!validRegex.test(email)) {
      isValid = false;
      _errors = {..._errors, emailError: 'Please enter a valid email address.'};
    }

    if (password === '') {
      isValid = false;
      _errors = {..._errors, passwordError: 'This field is required.'};
    } else if (password.length < 8) {
      isValid = false;
      _errors = {
        ..._errors,
        passwordError: 'Password must contain atleast 8 characters',
      };
    }
    if (confirmPassword === '') {
      isValid = false;
      _errors = {..._errors, confirmPasswordError: 'This field is required.'};
    } else if (password !== confirmPassword) {
      isValid = false;
      _errors = {..._errors, confirmPasswordError: 'Password does not match.'};
    }
    if (!isChecked) {
      isValid = false;
      toast.show('Please check the terms and confitions', 2);
    }
    setErrors(_errors);
    return isValid;
  };

  const handleFirstNameChange = (text: string) => {
    setErrors({...errors, firstNameError: ''});
    setFirstName(text);
  };

  const handleLastNameChange = (text: string) => {
    setErrors({...errors, lastNameError: ''});
    setLastName(text);
  };

  const handleEmailChange = (text: string) => {
    setErrors({...errors, emailError: ''});
    setEmail(text);
  };

  const handlePhoneChange = (text: string) => {
    setErrors({...errors, phoneError: ''});
    setPhoneNumber(text);
  };

  const handlePasswordChange = (text: string) => {
    setErrors({...errors, passwordError: ''});
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setErrors({...errors, confirmPasswordError: ''});
    setConfirmPassword(text);
  };

  const handleCountryCodeChange = (country: any) => {
    setCountryCode(country?.cca2);
  };

  const renderRenderModal = () => {
    const handleModalClose = () => {
      setResendModal(false);
    };
    return (
      <PrimaryModal
        headerTitle="Verify your email"
        visible={isResendModal}
        handleClose={handleModalClose}>
        <View style={styles.modalContentContainer}>
          <Text style={styles.modalText}>
            Please check your mail to verify email address !
          </Text>
          <PrimaryButton
            text="Resend"
            style={styles.btnResend}
            gradientStyle={styles.btnGradient}
            textStyle={styles.btnText}
            handleClick={() => {
              setResendModal(false);
            }}
            gradientColors={theme.colors.secondaryGradient}
          />
        </View>
      </PrimaryModal>
    );
  };

  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const userData = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(
      userData.idToken,
    );
    const provider_type = 'Google';
    // Sign-in the user with the credential
    const userSignIn = auth().signInWithCredential(googleCredential);
    userSignIn.then(async response => {
      const jwtToken = await response.user?.getIdToken();
      dispatch(
        checkEmailExistsAction(
          response.user?.email,
          data => {
            if (!data.is_exists) {
              dispatch(
                signupWithGoogleAction(
                  data?.email,
                  jwtToken,
                  onSuccess,
                  onError,
                ),
              );
            } else {
              dispatch(
                loginWithGoogleAction(
                  response.user?.email,
                  jwtToken,
                  provider_type,
                  onSuccess,
                  onError,
                ),
              );
            }
          },
          () => {},
        ),
      );
    });
  };

  const onSuccess = async (data: any) => {
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('userDetails', JSON.stringify(data.user));
    dispatch(setUserDetailsAction(data.user));
    dispatch(
      sendUserDeviceInfo(
        userInfo,
        () => {},
        () => {},
      ),
    );
    sendNotificationToken();
    navigation.reset({
      index: 0,
      routes: [{name: POST_LOGIN}],
    });
  };
  const onError = async () => {
    await GoogleSignin.revokeAccess();
  };

  const checkSelectedSportName = async () => {
    const sport = await AsyncStorage.getItem('Sport');
    if (sport) {
      dispatch(setSportName(sport));
    } else {
      dispatch(setSportName('nfl'));
      AsyncStorage.setItem('Sport', 'nfl');
    }
  };

  const sendNotificationToken = async () => {
    const token = await AsyncStorage.getItem('FCM_Token');
    if (token) {
      const deviceId = await DeviceInfo.getUniqueId();
      const device =
        Platform.OS === 'android'
          ? 'Android'
          : Platform.OS === 'ios'
          ? 'iOS'
          : 'Other';
      const body = {
        device_token: token,
        device_id: deviceId,
        device_type: device,
      };
      dispatch(
        setNotificationToken(
          body,
          () => {},
          () => {},
        ),
      );
    }
  };

  const onAppleButtonPress = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const provider_type = 'Apple';
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    // Sign the user in with the credential
    const userSignIn = auth().signInWithCredential(appleCredential);
    userSignIn.then(async response => {
      const jwtToken = await response.user?.getIdToken();
      dispatch(
        checkEmailExistsAction(
          response.user?.email,
          data => {
            if (!data.is_exists) {
              dispatch(
                signupWithGoogleAction(
                  data?.email,
                  jwtToken,
                  onSuccess,
                  onError,
                ),
              );
            } else {
              dispatch(
                loginWithGoogleAction(
                  response.user?.email,
                  jwtToken,
                  provider_type,
                  onSuccess,
                  onError,
                ),
              );
            }
          },
          () => {},
        ),
      );
    });
  };

  return (
    <BaseLayout
      navigation={navigation}
      back={true}
      titleType="image"
      titleImage={BETRICS_LOGO_SMALL_IMG}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.desc}>Analytics Engine for Sports Bettors</Text>
      <View style={styles.nameInputsContainer}>
        <View style={styles.w50}>
          <PrimaryInput
            placeholder="First Name"
            value={firstName}
            onChangeText={handleFirstNameChange}
            keyboardType="default"
            containerStyle={styles.nameInputs}
          />
          {errors.firstNameError !== '' && (
            <Text style={styles.errorText}>{errors.firstNameError}</Text>
          )}
        </View>
        <View style={[styles.w50, styles.alignFlexEnd]}>
          <PrimaryInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={handleLastNameChange}
            keyboardType="default"
            containerStyle={styles.nameInputs}
          />
          {errors.lastNameError !== '' && (
            <Text style={styles.errorText}>{errors.lastNameError}</Text>
          )}
        </View>
      </View>
      <PrimaryInput
        icon={MAIL_ICON_IMG}
        value={email}
        onChangeText={handleEmailChange}
        placeholder="Email Address"
        keyboardType="email-address"
        containerStyle={styles.inputContainer}
      />
      {errors.emailError !== '' && (
        <Text style={styles.errorText}>{errors.emailError}</Text>
      )}
      <PhoneNumberInput
        value={phoneNumber}
        onChangeFormattedText={handlePhoneChange}
        containerStyle={[styles.inputContainer, styles.w85]}
        onChangeCountry={handleCountryCodeChange}
      />
      {errors.phoneError !== '' && (
        <Text style={styles.errorText}>{errors.phoneError}</Text>
      )}
      <PrimaryInput
        icon={EYE_OFF_ICON}
        value={password}
        onChangeText={handlePasswordChange}
        placeholder="Password"
        keyboardType="default"
        containerStyle={styles.inputContainer}
        secureTextEntry={!showPassword}
        onIconClick={() => setShowPassword(!showPassword)}
      />
      {errors.passwordError !== '' && (
        <Text style={styles.errorText}>{errors.passwordError}</Text>
      )}
      <PrimaryInput
        icon={EYE_OFF_ICON}
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
        placeholder="Cofirm Password"
        keyboardType="default"
        containerStyle={styles.inputContainer}
        secureTextEntry={!showConfirmPassword}
        onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
      />
      {errors.confirmPasswordError !== '' && (
        <Text style={styles.errorText}>{errors.confirmPasswordError}</Text>
      )}
      <View style={[styles.checkbox, {flexDirection: 'row'}]}>
        <BouncyCheckbox
          style={{}}
          size={20}
          isChecked={isChecked}
          onPress={() => {
            setIsChecked(!isChecked);
          }}
          fillColor={theme.colors.lightBlueBg}
          unfillColor={theme.colors.primaryBg}
          iconStyle={styles.checkboxIcon}
        />
        <Text style={styles.checkboxLabel}>
          By signing up you agree to our
          <Pressable
            onPress={() => navigation.navigate('SignupTermsAndConditions')}>
            <Text style={styles.checkboxDarkLabel}>
              &nbsp;terms & conditions
            </Text>
          </Pressable>
          &nbsp; and &nbsp;
          <Text style={styles.checkboxDarkLabel}>privacy policy</Text>
        </Text>
      </View>
      <PrimaryButton
        text="Sign Up"
        style={styles.btnSignup}
        gradientStyle={styles.btnGradient}
        textStyle={styles.btnText}
        isLoading={loading}
        handleClick={() => onSubmitForm()}
        gradientColors={theme.colors.secondaryGradient}
      />
      <View style={styles.containueWithCotainer}>
        <View style={styles.hairLine} />
        <Text style={styles.continueWithText}> Or continue with </Text>
        <View style={styles.hairLine} />
      </View>
      {Platform.OS === 'ios' && (
        <View style={styles.btnApple}>
          <AppleButton
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_UP}
            style={styles.applePayBtn}
            onPress={() => onAppleButtonPress()}
          />
        </View>
      )}
      <TouchableOpacity
        style={[styles.btnGoogle, styles.btnGradient]}
        onPress={() => onGoogleButtonPress()}>
        <Text style={styles.btnText}>Sign Up with Google</Text>
        <Image source={GOOGLE_PLUS_IMG} style={styles.googleIcon} />
      </TouchableOpacity>
      {renderRenderModal()}
      <View style={styles.footer}>
        <Text style={styles.bottomLinkNewUser}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(LOGIN);
          }}>
          <Text style={styles.LoginText}> Login</Text>
        </TouchableOpacity>
      </View>
    </BaseLayout>
  );
};

SignupScreen.propTypes = {
  showBack: PropTypes.bool,
  back: PropTypes.bool,
  onBack: PropTypes.func,
  children: PropTypes.node,
};

export default SignupScreen;
