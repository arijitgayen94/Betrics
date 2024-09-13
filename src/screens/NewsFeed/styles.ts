import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: theme.colors.primaryBg,
      flex: 1,
      width: Dimensions.get('window').width,
      alignItems: 'center',
      position: 'relative',
    },
    flex1: {
      flex: 1,
    },
    floatingBtn: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    floatingBtnGradient: {
      alignItems: 'center',
      borderRadius: 50,
      width: 45,
      height: 45,
      justifyContent: 'center',
    },
    loaderView: {
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
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
    btnTextStyle: {
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 14,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
    },
    btnWrapper: {flexDirection: 'row', alignItems: 'center'},
    header: {
      height: 50,
      width: '100%',
      position: 'absolute',
      marginTop: -50,
      backgroundColor: theme.colors.primaryText,
    },
    searchContainer: {
      height: 50,
      width: '100%',
      position: 'absolute',
      padding: 10,
      paddingHorizontal: 20,
      overflow: 'hidden',
      backgroundColor: theme.colors.primaryText,
    },
    inputContainer: {
      width: '100%',
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export default styles;
