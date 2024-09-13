import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DRAWER,
  NEWS_INFO,
  COMMENTS,
  CREATE_POST,
  BOOKS,
  LOGIN,
  MARKET_PLACE,
  WALLET,
  TRANSACTIONS,
  BET_QUEUE,
  FILTERS,
  SETTINGS,
  EDIT_PROFILE,
  CHANGE_PASSWORD,
  WAR_ROOM,
  SUBSCRIPTION,
  CONTEST,
  TERMS_AND_CONDITIONS,
  JOIN_TRIBE,
  TRIBE,
  CHECKOUT,
  DELETEACCOUNT,
  SIGNUP_TERMS_AND_CONDITIONS,
  NOTIFICATIONS,
  REPORTPOST,
  USERPROFILE,
} from './const';
import {
  NewsInfo,
  Comments,
  CreatePost,
  Books,
  MarketPlace,
  Wallet,
  Transactions,
  BetQueue,
  Filters,
  Settings,
  EditProfile,
  ChangePassword,
  WarRoom,
  Subscription,
  Contest,
  TermsAndConditions,
  Tribe,
  JoinTribe,
  Checkout,
  DeleteAccount,
  Notifications,
  ReportPost,
  UserProfile,
} from '../screens';
import {DrawerContainer} from './DrawerContainer';
import SignupTermsAndConditions from '../screens/SignupTermsAndConditions';

export type PostLoginParamList = {
  [DRAWER]: undefined;
  [NEWS_INFO]: undefined;
  [COMMENTS]: undefined;
  [CREATE_POST]: undefined;
  [BOOKS]: undefined;
  [LOGIN]: undefined;
  [MARKET_PLACE]: undefined;
  [WALLET]: undefined;
  [TRANSACTIONS]: undefined;
  [BET_QUEUE]: undefined;
  [FILTERS]: undefined;
  [SETTINGS]: undefined;
  [EDIT_PROFILE]: undefined;
  [CHANGE_PASSWORD]: undefined;
  [WAR_ROOM]: any;
  [CONTEST]: any;
  [TERMS_AND_CONDITIONS]: any;
  [JOIN_TRIBE]: any;
  [TRIBE]: any;
  [SUBSCRIPTION]: undefined;
  [CHECKOUT]: any;
  [DELETEACCOUNT]: any;
  [SIGNUP_TERMS_AND_CONDITIONS]: any;
  [NOTIFICATIONS]: any;
  [REPORTPOST]: any;
  [USERPROFILE]: any;
};

const PostLoginStack = () => {
  const Stack = createNativeStackNavigator<PostLoginParamList>();
  return (
    <Stack.Navigator initialRouteName={DRAWER}>
      <Stack.Screen
        options={{headerShown: false}}
        name={DRAWER}
        component={DrawerContainer}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={NEWS_INFO}
        component={NewsInfo}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={COMMENTS}
        component={Comments}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={CREATE_POST}
        component={CreatePost}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={BOOKS}
        component={Books}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={MARKET_PLACE}
        component={MarketPlace}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={WALLET}
        component={Wallet}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={TRANSACTIONS}
        component={Transactions}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={BET_QUEUE}
        component={BetQueue}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={FILTERS}
        component={Filters}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={SETTINGS}
        component={Settings}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={EDIT_PROFILE}
        component={EditProfile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={CHANGE_PASSWORD}
        component={ChangePassword}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={WAR_ROOM}
        component={WarRoom}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={SUBSCRIPTION}
        component={Subscription}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={CONTEST}
        component={Contest}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={TERMS_AND_CONDITIONS}
        component={TermsAndConditions}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={TRIBE}
        component={Tribe}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={JOIN_TRIBE}
        component={JoinTribe}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={CHECKOUT}
        component={Checkout}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={DELETEACCOUNT}
        component={DeleteAccount}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={SIGNUP_TERMS_AND_CONDITIONS}
        component={SignupTermsAndConditions}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={NOTIFICATIONS}
        component={Notifications}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={REPORTPOST}
        component={ReportPost}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={USERPROFILE}
        component={UserProfile}
      />
    </Stack.Navigator>
  );
};

export default PostLoginStack;
