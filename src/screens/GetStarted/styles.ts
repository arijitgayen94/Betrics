import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: theme.colors.primaryBg,
      flex: 1,
    },
    footbalImageContainer: {
      marginTop: 50,
      justifyContent: 'flex-end',
      alignItems: 'center',
      flex: 1,
    },
    betricsMidLogo: {
      position: 'absolute',
      alignSelf: 'flex-start',
      marginLeft: 27,
    },
    btnContainer: {
      alignItems: 'center',
      paddingVertical: 20,
    },
    getStartedHeading: {
      fontSize: 28,
      fontWeight: '600',
      fontFamily: theme.fonts.poppingsNormal,
      width: '85%',
      color: theme.colors.blackText,
    },
    btnLogin: {
      width: '85%',
      marginTop: 30,
    },
    btnSignup: {
      width: '85%',
      marginTop: 20,
    },
    btnGradient: {
      paddingVertical: 14,
      borderRadius: 8,
    },
    btnText: {
      textAlign: 'center',
      fontSize: 18,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
    },
    flex1: {
      flex: 1,
    },
    splashScreen: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      resizeMode: 'center',
    },
  });
};

export default styles;
