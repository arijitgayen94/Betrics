import {useTheme, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect} from 'react';
import {View, Image} from 'react-native';
import {BETRICS_LOGO_IMG} from '../../assets';
import useStyles from './styles';
import {GET_STARTED, POST_LOGIN} from '../../routes/const';
import {RootStackParamList} from '../../routes/NavigationInnerContainer';
// import {useDispatch} from 'react-redux';
// import {AppDispatch} from '../../redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {AppDispatch, setUserDetailsAction} from '../../redux';

type SplashNavProp = StackNavigationProp<RootStackParamList, 'Splash'>;

export const Splash = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<SplashNavProp>();
  const dispatch = useDispatch<AppDispatch>();

  const fetchTokenFromStorage = useCallback(async () => {
    let token = await AsyncStorage.getItem('token');
    const userDetails = await AsyncStorage.getItem('userDetails');
    if (userDetails) {
      dispatch(setUserDetailsAction(JSON.parse(userDetails)));
    }
    if (token) {
      navigation.reset({
        index: 0,
        routes: [{name: POST_LOGIN}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: GET_STARTED}],
      });
    }
  }, [dispatch, navigation]);

  useEffect(() => {
    setTimeout(() => {
      fetchTokenFromStorage();
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Image source={BETRICS_LOGO_IMG} />
    </View>
  );
};

export default Splash;
