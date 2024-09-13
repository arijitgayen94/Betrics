import {useNavigation, useTheme} from '@react-navigation/native';
import useStyles from './drawerStyles';
import React, {useState} from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ACCOUNT_WALLET_BALANCE,
  BOOK_ICON,
  LOGOUT_ICON,
  MAIL_ICON_IMG,
  X_CIRCLE_IMG,
  MARKETPLACE_ICON,
  SETTINGS_ICON,
  CONTESTS_ICON,
  COPYRIGHT,
  SUBSCRIPTION_ICON,
} from '../assets';
import {useDrawerStatus} from '@react-navigation/drawer';
import {ScrollView} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostLoginParamList} from './PostLoginContainer';
import {
  BOOKS,
  CONTEST,
  LOGIN,
  MARKET_PLACE,
  SETTINGS,
  SIGNUP_TERMS_AND_CONDITIONS,
  SUBSCRIPTION,
  USERPROFILE,
  // SUBSCRIPTION,
  WALLET,
} from './const';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {X_CIRCLE_DARK_IMG} from '../assets';
import {CHECK_CIRCLE} from '../assets';
import {PrimaryButton, PrimaryModal} from '../components';
import {requestEmailVerification} from '../redux/apis';
import toast from 'react-native-simple-toast';
import {
  AppDispatch,
  resetAuthAction,
  resetBetAction,
  resetBooksAction,
  resetEngineAction,
  resetFeedsAction,
  resetMarketPlaceAction,
  resetMatchUpAction,
  resetNotificationAction,
  resetSubscriptionAction,
  resetWarRoomAction,
} from '../redux';
import {SET_SUBSCRIPTION} from '../redux/actionTypes';
import {resetContestAction} from '../redux/actions/contestAction';

type NewsFeedParamList = StackNavigationProp<PostLoginParamList, 'Drawer'>;

const CustomDrawer = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<NewsFeedParamList>();
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelector((state: any) => state.authReducer);
  const drawerListItems = [
    {label: 'Wallet', icon: ACCOUNT_WALLET_BALANCE, routeName: WALLET},
    {label: 'Books', icon: BOOK_ICON, routeName: BOOKS},
    {label: 'Contests', icon: CONTESTS_ICON, routeName: CONTEST},
    {label: 'Marketplace', icon: MARKETPLACE_ICON, routeName: MARKET_PLACE},
    // {label: 'Subscription', icon: SUBSCRIPTION_ICON, routeName: SUBSCRIPTION},
    {label: 'Settings', icon: SETTINGS_ICON, routeName: SETTINGS},
    {
      label: 'Terms & Conditions',
      icon: COPYRIGHT,
      routeName: SIGNUP_TERMS_AND_CONDITIONS,
    },
    // {label: 'Help', icon: HELP_ICON, routeName: BOOKS},
    // {label: 'Refer & Earn', icon: ANNOUNCEMENT_LOGO, routeName: BOOKS},
  ];
  const [showVerifiedModal, setShowVerifiedModal] = useState<boolean>(false);

  const navigateToScreen = (screenName: any) => {
    props.navigation.toggleDrawer();
    navigation.navigate(screenName);
  };
  const isDrawerOpen = useDrawerStatus() === 'open';

  const renderVerifyPopup = () => {
    return (
      <PrimaryModal
        visible={showVerifiedModal}
        headerTitle={'Verify your email'}
        handleClose={() => {
          setShowVerifiedModal(false);
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
              handleClick={() =>
                requestEmailVerification(
                  {email: user.email},
                  () => {
                    setShowVerifiedModal(false);
                  },
                  err => {
                    setShowVerifiedModal(false);
                    toast.show(err.data?.[0]?.message, 2);
                  },
                )
              }
              gradientColors={theme.colors.secondaryGradient}
            />
            <PrimaryButton
              style={[styles.w45, styles.ml15]}
              text="Close"
              gradientStyle={styles.modalGradientBtn}
              textStyle={[styles.btnTextStyle, styles.ph15]}
              handleClick={() => {
                setShowVerifiedModal(false);
              }}
              gradientColors={theme.colors.grayGradient}
            />
          </View>
        </View>
      </PrimaryModal>
    );
  };

  const resetStore = () => {
    dispatch(resetAuthAction());
    dispatch(resetBetAction());
    dispatch(resetBooksAction());
    dispatch(resetContestAction());
    dispatch(resetFeedsAction());
    dispatch(resetEngineAction());
    dispatch(resetMarketPlaceAction());
    dispatch(resetMatchUpAction());
    dispatch(resetNotificationAction());
    dispatch(resetSubscriptionAction());
    dispatch(resetWarRoomAction());
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      {isDrawerOpen && (
        <TouchableOpacity
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
          style={styles.closeBtnWrapper}>
          <Image style={styles.closeBtn} source={X_CIRCLE_IMG} />
        </TouchableOpacity>
      )}
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Pressable
            style={styles.imageWrapper}
            onPress={() =>
              navigation.navigate(USERPROFILE, {userId: user.uuid})
            }>
            <Image
              style={styles.profileImage}
              source={{
                uri: user.profile,
              }}
            />
            <View style={styles.onlineDot} />
          </Pressable>
          <View style={styles.nameContainer}>
            <View style={styles.nameWrapper}>
              <Text
                style={styles.nameText}
                onPress={() =>
                  navigation.navigate(USERPROFILE, {userId: user.uuid})
                }>
                {user?.first_name} {user?.last_name}
              </Text>
              <Pressable
                style={styles.padding10}
                onPress={() =>
                  user?.verified ? {} : setShowVerifiedModal(true)
                }>
                <Image
                  style={
                    user?.verified
                      ? styles.verifiedTick
                      : styles.notVerifiedTick
                  }
                  source={user?.verified ? CHECK_CIRCLE : X_CIRCLE_DARK_IMG}
                />
              </Pressable>
            </View>
            <View style={styles.nameWrapper}>
              <Image source={MAIL_ICON_IMG} />
              <Text numberOfLines={1} style={styles.emailText}>
                {user?.email}
              </Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.itemListContainer}>
          {drawerListItems.map(
            (item: {label: string; icon: any; routeName: any}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigateToScreen(item.routeName)}
                  key={item.label}
                  style={styles.itemWrapper}>
                  <Image
                    style={styles.drawerItemIcon}
                    source={item.icon}
                    resizeMode="contain"
                  />
                  <Text style={styles.drawerLabelStyle}>{item.label}</Text>
                </TouchableOpacity>
              );
            },
          )}
        </ScrollView>
        <View style={styles.borderStyle} />
        <TouchableOpacity
          style={styles.logoutSection}
          onPress={async () => {
            const isSignedIn = await GoogleSignin.isSignedIn();
            if (isSignedIn) {
              try {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
                auth().signOut();
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('userDetails');
                navigation.reset({
                  index: 0,
                  routes: [{name: LOGIN}],
                });
                resetStore();
              } catch (e) {
                console.log(e);
              }
            } else {
              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('userDetails');
              navigation.reset({
                index: 0,
                routes: [{name: LOGIN}],
              });
              resetStore();
            }
          }}>
          <Image source={LOGOUT_ICON} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        {renderVerifyPopup()}
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;
