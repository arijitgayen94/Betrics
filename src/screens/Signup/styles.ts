import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
const styles = (theme: any) => {
  return StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: '600',
      fontFamily: theme.fonts.poppingsNormal,
      width: '85%',
      marginTop: 20,
      color: theme.colors.blackText,
    },
    w50: {
      width: '50%',
    },
    w85: {
      width: '85%',
    },
    alignFlexEnd: {alignItems: 'flex-end'},
    desc: {
      fontSize: 16,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      width: '85%',
      marginTop: 9,
      color: theme.colors.secondaryText,
    },
    nameInputsContainer: {
      width: '85%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 18,
    },
    nameInputs: {
      width: '96%',
    },
    inputContainer: {
      marginTop: 20,
    },
    checkbox: {
      width: '85%',
      marginTop: 18,
    },
    checkboxIcon: {
      borderColor: theme.colors.primaryBorder,
      borderRadius: 0,
      marginTop: -15,
    },
    checkboxLabel: {
      marginLeft: 0,
      lineHeight: 24,
      fontSize: 12,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
      width: '90%',
      textAlign: 'left',
    },
    checkboxDarkLabel: {
      color: theme.colors.blackText,
    },
    btnSignup: {
      width: '85%',
      marginTop: 15,
    },
    btnResend: {
      width: '85%',
      marginTop: 20,
      alignSelf: 'center',
      marginBottom: 35,
    },
    btnGoogle: {
      width: '85%',
      marginTop: 15,
      backgroundColor: theme.colors.googleRed,
    },
    btnGradient: {
      paddingVertical: 14,
      borderRadius: 8,
    },
    applePayBtn: {
      width: width - 60,
      height: 53,
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
    footer: {
      flexDirection: 'row',
      marginTop: 13,
      marginBottom: 20,
    },
    bottomLinkNewUser: {
      fontSize: 12,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.blackText,
    },
    LoginText: {
      color: theme.colors.lightBlueText,
      fontSize: 12,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
    },
    modalContentContainer: {
      width: '85%',
      borderBottomEndRadius: 8,
      alignSelf: 'center',
    },
    modalText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 14,
      fontWeight: '400',
      color: theme.colors.secondaryText,
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
    btnApple: {
      width: '85%',
      marginTop: 15,
    },
  });
};

export default styles;
