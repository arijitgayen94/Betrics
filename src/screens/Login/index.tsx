import {useTheme, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import {LoginLayout} from '../../layout';
import useStyles from './styles';
import {MAIL_ICON_IMG, EYE_OFF_ICON, GOOGLE_PLUS_IMG} from '../../assets';
import {PrimaryInput} from '../../components';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {PrimaryButton} from '../../components';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/NavigationInnerContainer';
import {POST_LOGIN, RESEET_PASSWORD, SIGNUP} from '../../routes/const';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  checkEmailExistsAction,
  loginAction,
  loginWithGoogleAction,
  sendUserDeviceInfo,
  setNotificationToken,
  setSportName,
  setUserDetailsAction,
  signupWithGoogleAction,
} from '../../redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import DeviceInfo from 'react-native-device-info';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';

type LoginNavProp = StackNavigationProp<RootStackParamList, 'Login'>;
const width = Dimensions.get('window').width;

export const Login = () => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<LoginNavProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{
    emailError: string;
    passwordError: string;
  }>({emailError: '', passwordError: ''});
  const [showPassword, setShowPassword] = useState<boolean>(false);
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

  function bytesToSize(bytes) {
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
        loginAction(
          {email, password},
          async (res: any) => {
            if (res.status === 200) {
              await AsyncStorage.setItem('token', res.data.token);
              await AsyncStorage.setItem(
                'userDetails',
                JSON.stringify(res.data.user),
              );
              dispatch(setUserDetailsAction(res.data.user));
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
            }
          },
          (error: any) => {
            const {data} = error.response;
            const message = data.non_field_errors;
            Alert.alert(message[0]);
          },
        ),
      );
    }
  };

  const validate = () => {
    let isValid = true;
    let _errors: {emailError: string; passwordError: string} = {
      emailError: '',
      passwordError: '',
    };
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
    }
    setErrors(_errors);
    return isValid;
  };

  const handleEmailChange = (text: string) => {
    setErrors({...errors, emailError: ''});
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setErrors({...errors, passwordError: ''});
    setPassword(text);
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
      const jwtToken = await response?.user?.getIdToken();
      const userEmail = response.user.email;
      dispatch(
        checkEmailExistsAction(
          userEmail,
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
                  userEmail,
                  jwtToken,
                  provider_type,
                  onSuccess,
                  onError,
                ),
              );
            }
          },
          async () => {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            auth().signOut();
          },
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
        err => console.log('err', err),
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

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }
    const provider_type = 'Apple';

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
    <LoginLayout>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.desc}>Analytics Engine for Sports Bettors</Text>
      <PrimaryInput
        icon={MAIL_ICON_IMG}
        value={email}
        placeholder="Email Address"
        keyboardType="email-address"
        onChangeText={handleEmailChange}
        containerStyle={styles.emailInputContainer}
      />
      {errors.emailError !== '' && (
        <Text style={styles.errorText}>{errors.emailError}</Text>
      )}

      <PrimaryInput
        icon={EYE_OFF_ICON}
        value={password}
        placeholder="Password"
        keyboardType="default"
        onChangeText={handlePasswordChange}
        containerStyle={styles.passwordInputContainer}
        secureTextEntry={!showPassword}
        onIconClick={() => setShowPassword(!showPassword)}
      />
      {errors.passwordError !== '' && (
        <Text style={styles.errorText}>{errors.passwordError}</Text>
      )}
      <View style={styles.remberAndforgotContainer}>
        <BouncyCheckbox
          size={20}
          fillColor={theme.colors.lightBlueBg}
          unfillColor={theme.colors.primaryBg}
          textComponent={<Text style={styles.checkboxText}>Remember Me</Text>}
          iconStyle={styles.checkboxIcon}
        />
        <TouchableOpacity onPress={() => navigation.navigate(RESEET_PASSWORD)}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <PrimaryButton
        text="Login"
        style={styles.btnLogin}
        isLoading={loading}
        gradientStyle={styles.btnGradient}
        textStyle={styles.btnText}
        handleClick={onSubmitForm}
        gradientColors={theme.colors.primaryGradient}
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
            buttonType={AppleButton.Type.SIGN_IN}
            style={styles.appleButton}
            onPress={() => onAppleButtonPress()}
          />
        </View>
      )}
      <TouchableOpacity
        style={[styles.btnGoogle, styles.btnGradient]}
        onPress={() => onGoogleButtonPress()}>
        <Text style={styles.btnText}>Sign In with Google</Text>
        <Image source={GOOGLE_PLUS_IMG} style={styles.googleIcon} />
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.bottomLinkNewUser}>
          New User? <Text>Join Now</Text>
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate(SIGNUP)}>
          <Text style={styles.signUpText}> Sign Up Here</Text>
        </TouchableOpacity>
      </View>
    </LoginLayout>
  );
};

export default Login;
