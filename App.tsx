import React, {useCallback, useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import Routes from './src/routes';
import {
  checkNoticationPermission,
  createNotificationChanel,
  getFCMToken,
  onFCMMessage,
  onNotificationOpened,
  requestNotificationPermission,
  setBackgroundMessageHandler,
} from './src/service/notificationService';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert, Linking, Platform} from 'react-native';
import {google_webClientId_Apple, google_webClientId_Android} from '@env';
import {NoInternetModal} from './src/components/NetInfoModal/NetInfoModal';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InAppUpdate from './src/service/InAppUpdate';
import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://7dc32247f26dba4b5a2876eb68dc3db9@o4505990076694528.ingest.sentry.io/4506570227843072',
});

const App = () => {
  const [isOffline, setOfflineStatus] = useState(false);
  const processFCM = useCallback(async () => {
    const permission: any = await checkNoticationPermission();
    if (permission < 1) {
      const isGranted = await requestNotificationPermission();
      if (isGranted) {
        getFCMToken();
      } else {
        console.log('is Granted ', isGranted);
      }
    } else {
      console.log('fcm token ==> ', await getFCMToken());
    }
  }, []);

  useEffect(() => {
    processFCM();
    createNotificationChanel();
    setBackgroundMessageHandler();
    const unsubscribe = onFCMMessage();
    onNotificationOpened();
    return unsubscribe;
  }, [processFCM]);

  if (Platform.OS === 'ios') {
    GoogleSignin.configure({
      webClientId: google_webClientId_Apple,
    });
  } else {
    GoogleSignin.configure({
      webClientId: google_webClientId_Android,
    });
  }
  useEffect(() => {
    if (Platform.OS === 'android') {
      InAppUpdate.checkUpdate();
    } else {
      checkIfUpdateAvailable();
    }
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !state.isConnected;
      AsyncStorage.setItem('Offline', `${offline}`);
      setOfflineStatus(offline);
    });
    return () => removeNetInfoSubscription();
  }, []);

  const checkIfUpdateAvailable = async () => {
    const users = await firestore().collection('versions').get();
    const currentAppVersion = DeviceInfo.getVersion();
    if (currentAppVersion < users.docs[0]._data.version) {
      Alert.alert(
        'Update available',
        'Betrics recomends that you update to the latest version for better app experience',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Update',
            onPress: () => {
              Linking.openURL(
                'https://apps.apple.com/in/app/betrics-betting-analytics/id1622382839',
              );
            },
          },
        ],
      );
    }
  };
  return (
    <Provider store={store}>
      <NoInternetModal show={isOffline} />
      <Routes />
    </Provider>
  );
};

// export default App;
export default Sentry.wrap(App);
