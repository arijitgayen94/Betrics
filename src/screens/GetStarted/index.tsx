import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, View, Text, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';
import {BETRICS_LOGO_MID_IMG, FOOTBALL_PLAYER_IMG} from '../../assets';
import {PrimaryButton} from '../../components';
import {AppDispatch, setSportName, setUserDetailsAction} from '../../redux';
import {LOGIN, POST_LOGIN, SIGNUP} from '../../routes/const';
import {RootStackParamList} from '../../routes/NavigationInnerContainer';
import useStyles from './styles';
import RNRestart from 'react-native-restart';
import {checkMaintenance} from '../../redux/apis';

type GetStartedhNavProp = StackNavigationProp<RootStackParamList, 'GetStarted'>;

export const GetStarted = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<GetStartedhNavProp>();
  const dispatch = useDispatch<AppDispatch>();

  const fetchTokenFromStorage = useCallback(async () => {
    let token = await AsyncStorage.getItem('token');
    const userDetails = await AsyncStorage.getItem('userDetails');
    if (userDetails) {
      dispatch(setUserDetailsAction(JSON.parse(userDetails)));
    }
    await checkMaintenance(
      data => {
        if (data === 200) {
          if (token) {
            navigation.reset({
              index: 0,
              routes: [{name: POST_LOGIN}],
            });
            SplashScreen.hide();
          } else {
            SplashScreen.hide();
          }
        }
      },
      data => {
        if (data === 503) {
          Alert.alert(
            'Under Maintanence',
            'App is currently under mantanence and will be back soon. For more details contact support@betrics.io',
            [
              {
                text: 'Reload',
                onPress: () => RNRestart.restart(),
                style: 'cancel',
              },
            ],
          );
        }
      },
    );
  }, [dispatch, navigation]);

  const checkSelectedSportName = async () => {
    const sport = await AsyncStorage.getItem('Sport');
    if (sport) {
      dispatch(setSportName(sport));
    } else {
      dispatch(setSportName('nfl'));
      AsyncStorage.setItem('Sport', 'nfl');
    }
  };

  useEffect(() => {
    checkSelectedSportName();
    fetchTokenFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.flex1}>
        <View style={styles.footbalImageContainer}>
          <Image
            source={FOOTBALL_PLAYER_IMG}
            resizeMode="contain"
            style={styles.flex1}
          />
          <Image source={BETRICS_LOGO_MID_IMG} style={styles.betricsMidLogo} />
        </View>
        <View style={styles.btnContainer}>
          <Text style={styles.getStartedHeading}>
            Analytics Engine for Sports Bettors
          </Text>
          <PrimaryButton
            text="Login"
            style={styles.btnLogin}
            gradientStyle={styles.btnGradient}
            textStyle={styles.btnText}
            handleClick={() => {
              navigation.navigate(LOGIN);
            }}
            gradientColors={theme.colors.primaryGradient}
          />
          <PrimaryButton
            text="Sign Up"
            style={styles.btnSignup}
            gradientStyle={styles.btnGradient}
            textStyle={styles.btnText}
            handleClick={() => {
              navigation.navigate(SIGNUP);
            }}
            gradientColors={theme.colors.secondaryGradient}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;
