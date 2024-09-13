import {Dimensions, StatusBar, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: theme.colors.primaryBg,
      flex: 1,
    },
    formContainer: {
      flex: 1,
    },
    statusBarStyle: {
      backgroundColor: theme.colors.lightGrayBg,
      height: StatusBar.currentHeight,
    },
    headContainer: {
      height: Dimensions.get('window').height / 4,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    flex1: {
      flex: 1,
    },
    alignCenter: {
      alignItems: 'center',
      width: '100%',
    },
    back: {
      position: 'absolute',
      top: 24,
      left: 18,
    },
  });
};

export default styles;
