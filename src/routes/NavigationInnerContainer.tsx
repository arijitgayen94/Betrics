import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DRAWER,
  SPLASH,
  GET_STARTED,
  LOGIN,
  RESEET_PASSWORD,
  VERIFY_OTP,
  CREATE_NEW_PASSWORD,
  SIGNUP,
  POST_LOGIN,
  SIGNUP_TERMS_AND_CONDITIONS,
} from './const';
import {
  GetStarted,
  Login,
  ResetPassword,
  VerifyOtp,
  CreateNewPassword,
  SignupScreen,
} from '../screens';
import PostLoginStack from './PostLoginContainer';
import SignupTermsAndConditions from '../screens/SignupTermsAndConditions';

export type RootStackParamList = {
  [SPLASH]: any;
  [GET_STARTED]: any;
  [LOGIN]: any;
  [DRAWER]: any;
  [RESEET_PASSWORD]: any;
  [VERIFY_OTP]: any;
  [CREATE_NEW_PASSWORD]: any;
  [SIGNUP]: any;
  [POST_LOGIN]: any;
  [SIGNUP_TERMS_AND_CONDITIONS]: any;
};

const NavigationInnerContainer = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator initialRouteName={GET_STARTED}>
      <Stack.Screen
        options={{headerShown: false}}
        name={GET_STARTED}
        component={GetStarted}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={LOGIN}
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RESEET_PASSWORD}
        component={ResetPassword}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={VERIFY_OTP}
        component={VerifyOtp}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={CREATE_NEW_PASSWORD}
        component={CreateNewPassword}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={SIGNUP}
        component={SignupScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={SIGNUP_TERMS_AND_CONDITIONS}
        component={SignupTermsAndConditions}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={POST_LOGIN}
        component={PostLoginStack}
      />
    </Stack.Navigator>
  );
};

export default NavigationInnerContainer;
