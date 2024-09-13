import {StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: '600',
      fontFamily: theme.fonts.poppingsNormal,
      width: '85%',
      marginTop: 44,
      color: theme.colors.blackText,
    },
    descContainer: {
      width: '85%',
      marginTop: 9,
    },
    desc: {
      fontSize: 16,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
    },
    emailText: {
      color: theme.colors.lightBlueText,
      fontSize: 16,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
    },
    resendContainer: {
      width: '85%',
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    btnConfirm: {
      width: '85%',
      marginTop: 27,
    },
    btnContinue: {
      width: '85%',
      marginTop: 20,
      alignSelf: 'center',
      marginBottom: 35,
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
    otpInputContainer: {
      width: '85%',
      marginTop: 30,
      height: 45,
    },
    otpInputField: {
      borderColor: theme.colors.lightBlueBg,
      color: theme.colors.secondaryText,
      borderRadius: 8,
      shadowColor: theme.colors.primaryShadow,
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.1,
      shadowRadius: 6,
      fontFamily: theme.fonts.poppingsNormal,
      backgroundColor: theme.colors.primaryBg,
      elevation: 4,
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
  });
};

export default styles;
