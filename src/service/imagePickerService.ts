import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true;
  }
};
export const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Gallery Permission',
          message: 'App needs to access gallery permission to upload image',
        },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      Alert.alert('Write permission err', err);
    }
    return false;
  } else {
    return true;
  }
};
export const captureImage = async (type: string) => {
  let options: any = {
    mediaType: type,
    quality: 1,
    saveToPhotos: false,
  };
  const response: any = await launchCamera(options);
  if (response?.error) {
    Alert.alert('Something went wrong');
  } else {
    return {
      uri: response.assets[0].uri,
      name: response.assets[0].fileName,
      type: response.assets[0].type,
      fileSize: response.assets[0].fileSize,
    };
  }
};

export const chooseFile = async (type: string) => {
  let options: any = {
    mediaType: type,
    quality: 1,
    saveToPhotos: false,
  };
  const response: any = await launchImageLibrary(options);
  if (response?.error) {
    Alert.alert('Something went wrong');
  } else {
    return {
      uri: response.assets[0].uri,
      name: response.assets[0].fileName,
      type: response.assets[0].type,
      fileSize: response.assets[0].fileSize,
    };
  }
};
