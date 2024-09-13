import axios from 'axios';
import {base_url} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import moments from 'moment-timezone';
console.log(base_url);

let axiosInstance = axios.create({
  baseURL: base_url,
});

axiosInstance.interceptors.request.use(async (config: any) => {
  const time = moment().format();
  const timeZone = moments.tz.guess();
  let token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `token ${token}`;
    config.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    config.headers.put.Accept = 'application/json';
    config.headers['User-Date-Time'] = time;
    config.headers['User-Timezone'] = timeZone;
  }
  return config;
});

let axiosInstance2 = axios.create({
  baseURL: base_url,
});

axiosInstance2.interceptors.request.use(async (config: any) => {
  let token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `token ${token}`;
    config.headers.put['Content-Type'] = 'multipart/form-data';
  }
  return config;
});

let axiosInstance3 = axios.create({
  baseURL: 'https://prod03012024.betrics.io',
});

axiosInstance3.interceptors.request.use(async (config: any) => {
  return config;
});

export {axiosInstance, axiosInstance2, axiosInstance3};
