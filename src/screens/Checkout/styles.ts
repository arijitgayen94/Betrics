import {StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainContainer: {
      alignItems: 'center',
      width: '100%',
    },
    productSummaryContainer: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.primaryBorder,
      shadowColor: theme.colors.primaryShadow,
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
      backgroundColor: theme.colors.primaryBg,
      borderRadius: 8,
      width: '85%',
      flexDirection: 'row',
      padding: 15,
    },
    purchaseType: {
      fontSize: 12,
      fontWeight: '500',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.blackText,
    },
    price: {
      fontSize: 16,
      fontWeight: '800',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.blackText,
    },
    pricePeriodicity: {
      fontSize: 10,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.blackText,
    },
    bedge: {
      backgroundColor: theme.colors.yellow,
      height: 30,
      justifyContent: 'center',
      paddingHorizontal: 10,
      borderRadius: 8,
    },
    heading: {
      fontSize: 18,
      fontWeight: '700',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.blackText,
      width: '85%',
      marginTop: 15,
    },
    inputLableStyle: {
      fontSize: 15,
      fontWeight: '600',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.blackText,
    },
    note: {
      width: '85%',
    },
    mt20: {
      marginTop: 20,
    },
    mt30: {
      marginTop: 30,
    },
    ml20: {
      marginLeft: 20,
    },
    w48: {
      width: '48%',
    },
    w100: {
      width: '100%',
    },
    btn: {
      width: '85%',
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
    expiryDateContainer: {
      flexDirection: 'row',
      width: '85%',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    errorText: {
      color: theme.colors.googleRed,
      textAlign: 'left',
      width: '85%',
    },
    separatorText: {
      fontSize: 12,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.blackText,
    },
    applePayBtn: {
      width: '85%',
      height: 50,
      marginTop: 10,
    },
    separateContainer: {
      width: '85%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 15,
    },
    lineView: {
      height: 1,
      width: '30%',
      backgroundColor: theme.colors.secondaryText,
    },
  });
};

export default styles;
