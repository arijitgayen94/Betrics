import {StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mt20: {
      marginTop: 20,
    },
    modalFooterBtnWrapper: {
      width: '70%',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      marginTop: 23,
    },
    modalGradientBtn: {
      paddingVertical: 14,
      borderRadius: 4,
      justifyContent: 'center',
    },
    messageText: {
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 14,
      fontWeight: '400',
      textAlign: 'center',
    },
    padding10: {
      padding: 10,
    },
    verifiedView: {
      paddingVertical: 30,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    btnWrapper: {flexDirection: 'row', alignItems: 'center'},
    btnStyle: {width: 70},
    btnGradientStyle: {
      borderRadius: 4,
      height: 25,
      justifyContent: 'center',
    },
    btnTextStyle: {
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 14,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
    },
    labelText: {
      fontFamily: theme.fonts.poppingsNormal,
      fontWeight: '400',
      fontSize: 13,
      color: theme.colors.drawerText,
      marginBottom: 5,
    },
    ml15: {
      marginLeft: 15,
    },
    mt50: {
      marginTop: 50,
    },
    mt30: {
      marginVertical: 30,
    },
    noMatchFound: {
      textAlign: 'center',
      marginTop: 50,
    },
    w45: {
      width: '45%',
      marginTop: 20,
    },
    ph15: {
      paddingHorizontal: 15,
    },
  });
};

export default styles;
