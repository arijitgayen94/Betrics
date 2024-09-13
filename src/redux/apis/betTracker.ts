import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../helpers';
import {BetTrackerFilters} from '../modals';

const getBetTrackerAPi = async (
  page: number = 1,
  filter: BetTrackerFilters,
  successCallback: (data: any) => void,
  errorCallback: (data: any) => void,
) => {
  const isConnected = await AsyncStorage.getItem('Offline');
  if (isConnected === 'false') {
    axiosInstance
      .post('/bet/bet_tracker?page=' + page, filter)
      .then(response => {
        successCallback(response);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
};

export {getBetTrackerAPi};
