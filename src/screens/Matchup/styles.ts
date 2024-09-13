import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: theme.colors.primaryBg,
    },
    mainContainer: {
      backgroundColor: theme.colors.primaryText,
      flex: 1,
    },
    gradientStyle: {
      width: Dimensions.get('window').width,
      height: 50,
      paddingHorizontal: 20,
      justifyContent: 'center',
    },
    separatorView: {width: 10},
    width75: {width: '75%'},
    gradientinnerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      height: 35,
      width: 35,
      borderRadius: 20,
    },
    teamName: {
      color: theme.colors.primaryText,
      fontWeight: '600',
      fontSize: 18,
      fontFamily: theme.fonts.poppingsNormal,
      marginLeft: 10,
      textTransform: 'uppercase',
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
    ml10: {
      marginLeft: 10,
    },
    mt14: {
      marginTop: 14,
    },
    mt10: {
      marginTop: 10,
    },
    blackText: {
      color: theme.colors.secondaryText,
      fontSize: 13,
      fontFamily: theme.fonts.poppingsNormal,
      fontWeight: '500',
    },
    whiteText: {
      color: theme.colors.primaryText,
      fontSize: 12,
      fontFamily: theme.fonts.poppingsNormal,
      fontWeight: '400',
    },
    blackBg: {
      backgroundColor: theme.colors.blackText,
    },
    whiteBg: {
      backgroundColor: theme.colors.primaryText,
    },
    dateCard: {
      padding: 10,
      paddingVertical: 5,
      borderRadius: 4,
      marginLeft: 10,
    },
    separator: {
      borderBottomColor: theme.colors.primaryBorder,
      borderBottomWidth: 2,
      width: '95%',
      marginTop: 10,
      marginBottom: 5,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    separatorDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.primaryBorder,
      position: 'absolute',
    },
    dropdownWrapperStyle: {
      flexDirection: 'row',
      marginLeft: 15,
      marginTop: 10,
    },
    dropdownLabelWrapper: {
      width: '50%',
    },
    flexRow: {
      flexDirection: 'row',
    },
    w100: {
      width: '100%',
    },
    w50: {
      width: '50%',
    },
    dropdownButtonStyle: {
      backgroundColor: theme.colors.primaryText,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.primaryBorder,
      width: '90%',
      height: 40,
    },
    dropdownOpened: {
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    dropdownButtonTextStyle: {
      textAlign: 'left',
      fontFamily: theme.fonts.poppingsNormal,
      fontWeight: '400',
      fontSize: 12,
      color: theme.colors.secondaryText,
    },
    tableHeaderGradientStyle: {
      width: Dimensions.get('window').width,
      height: 50,
      paddingHorizontal: 15,
      justifyContent: 'center',
    },
    headerText: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
      fontSize: 14,
      fontWeight: '500',
    },
    grayBg: {
      backgroundColor: theme.colors.lightGrayBg,
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
    footerLoaderView: {
      width: '100%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export default styles;
