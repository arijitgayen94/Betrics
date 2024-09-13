import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
const styles = (theme: any) => {
  return StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: '600',
      fontFamily: theme.fonts.poppingsNormal,
      width: '85%',
      marginTop: 33,
      color: theme.colors.blackText,
    },
    desc: {
      fontSize: 16,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      width: '85%',
      marginTop: 9,
      color: theme.colors.secondaryText,
    },
    emailInputContainer: {
      marginTop: 26,
    },
    passwordInputContainer: {
      marginTop: 20,
    },
    remberAndforgotContainer: {
      marginTop: 22,
      flexDirection: 'row',
      width: '85%',
      justifyContent: 'space-between',
    },
    checkboxIcon: {
      borderColor: theme.colors.primaryBorder,
      borderRadius: 0,
    },
    checkboxText: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
      marginLeft: 10,
      fontSize: 12,
      fontWeight: '400',
    },
    forgotPassword: {
      fontSize: 12,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.lightBlueText,
    },
    flex1: {
      flex: 1,
    },
    btnLogin: {
      width: '85%',
      marginTop: 25,
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
    containueWithCotainer: {
      width: '80%',
      marginTop: 13,
      flexDirection: 'row',
      alignItems: 'center',
    },
    hairLine: {
      borderBottomColor: theme.colors.primaryBorder,
      borderBottomWidth: 1,
      flex: 1,
    },
    appleButton: {
      width: width - 60,
      height: 53,
    },
    continueWithText: {
      fontSize: 12,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
      // flex: 1,
    },
    googleIcon: {
      position: 'absolute',
      left: 33,
      top: 17,
    },
    btnGoogle: {
      width: '85%',
      marginTop: 15,
      backgroundColor: theme.colors.googleRed,
    },
    btnApple: {
      width: '85%',
      marginTop: 15,
    },
    footer: {
      flexDirection: 'row',
      marginTop: 20,
      paddingBottom: 20,
    },
    bottomLinkNewUser: {
      fontSize: 12,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.blackText,
    },
    signUpText: {
      color: theme.colors.lightBlueText,
      fontSize: 12,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
    },
    errorText: {
      textAlign: 'left',
      width: '85%',
      marginTop: 2,
      paddingLeft: 5,
      fontSize: 12,
      color: 'red',
      fontFamily: theme.fonts.poppingsNormal,
    },
  });
};

export default styles;
