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
      flexDirection: 'row',
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
    emailInputContainer: {
      marginTop: 26,
    },
    flex1: {
      flex: 1,
    },
    btnSend: {
      width: '85%',
      marginTop: 30,
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
    footer: {
      flexDirection: 'row',
      marginTop: 48,
    },
  });
};

export default styles;
