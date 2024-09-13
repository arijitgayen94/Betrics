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
    desc: {
      fontSize: 16,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      width: '85%',
      marginTop: 9,
      color: theme.colors.secondaryText,
    },
    passwordInputContainer: {
      marginTop: 20,
    },
    inputField: {
      width: '100%',
    },
    btnLogin: {
      width: '85%',
      marginTop: 45,
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
    errorText: {
      width: '85%',
      color: 'red',
    },
  });
};

export default styles;
