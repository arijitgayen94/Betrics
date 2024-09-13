import {StatusBar, StyleSheet} from 'react-native';

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
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      backgroundColor: theme.colors.lightGrayBg,
    },
    flex1: {
      flex: 1,
    },
    alignCenter: {
      alignItems: 'center',
    },
    back: {
      position: 'absolute',
      top: '30%',
      left: 20,
    },
    titleText: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.blackText,
    },
    titleImage: {},
    actionImage: {
      position: 'absolute',
      top: '30%',
      right: 20,
    },
  });
};

export default styles;
