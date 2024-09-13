import {Dimensions, Platform, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    centeredView: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primaryText,
      marginLeft: -20,
    },
    topView: {
      height: 50,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'flex-start',
      position: 'absolute',
      top: Platform.OS === 'android' ? 0 : 30,
      zIndex: 1,
    },
    buttonStyle: {
      width: 30,
      height: 30,
    },
    modalView: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      marginLeft: 6,
      padding: 10,
    },
    imageStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').width,
    },
  });
};

export default styles;
