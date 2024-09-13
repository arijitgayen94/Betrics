import {Dimensions, Platform, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    cardWrapper: {
      backgroundColor: theme.colors.lightGrayBg,
      paddingHorizontal: 16,
      paddingTop: 15,
      borderRadius: 8,
      width: Dimensions.get('window').width * 0.9,
      borderColor: theme.colors.primaryBorder,
      borderWidth: 1,
      shadowColor: theme.colors.primaryShadow,
      shadowOffset: {width: 2, height: 1},
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 4,
      marginTop: 20,
      position: 'relative',
    },
    cancelImg: {
      height: 30,
      width: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    editIconStyle: {
      tintColor: theme.colors.secondaryText,
      width: 15,
      height: 15,
    },
    flexRow: {flexDirection: 'row'},
    dateTimeWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '45%',
    },
    iconView: {
      justifyContent: 'flex-end',
    },
    mr5: {marginRight: 5},
    timetext: {
      fontWeight: '400',
      fontSize: 11,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
    },
    name: {
      fontWeight: '500',
      fontSize: 15,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.drawerText,
      marginTop: 15,
    },
    addRow: {
      flexDirection: 'row',
      width: '100%',
      marginVertical: 13,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    amountInputContainer: {
      width: 70,
    },
    oddsInputContainer: {
      width: '20%',
    },
    oddsTextBg: {
      fontFamily: theme.fonts.poppingsNormal,
      height: 28,
      width: '85%',
      borderRadius: 0,
      elevation: 0,
    },
    nonEditableView: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    nonEditableText: {
      color: theme.colors.primaryText,
    },
    betTypeInputContainer: {
      width: '80%',
    },
    textInputView: {width: '25%', flexDirection: 'row', alignItems: 'center'},
    betTypeTextBg: {
      fontFamily: theme.fonts.poppingsNormal,
      height: 20,
      width: '80%',
      borderRadius: 0,
      borderWidth: 0,
      backgroundColor: theme.colors.primaryText,
      paddingHorizontal: 0,
    },
    amountText: {
      fontWeight: '500',
      textAlign: 'center',
      fontSize: 14,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.lightBlueBg,
      width: 50,
      padding: 0,
    },
    amountTextBg: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
      height: 28,
      width: '100%',
      borderRadius: 0,
    },
    amountTextInput: {
      fontFamily: theme.fonts.poppingsNormal,
      width: 50,
      textAlign: 'center',
      lineHeight: 20,
      color: theme.colors.blackText,
      padding: 0,
    },
    btnStyle: {
      borderRadius: 4,
      paddingHorizontal: 11,
      paddingVertical: 4,
      marginLeft: 10,
      height: 28,
      backgroundColor: 'black',
      justifyContent: 'center',
    },
    btnTextStyle: {
      fontWeight: '400',
      fontSize: 12,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryBg,
    },
    tableHeaderGradientStyle: {
      width: Dimensions.get('window').width * 0.9,
      marginHorizontal: -17,
      height: 35,
      paddingHorizontal: 15,
      justifyContent: 'center',
    },
    gradientinnerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerText: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
      fontSize: 12,
      fontWeight: '400',
    },
    transparentText: {
      opacity: 0,
    },
    separator: {
      borderRightWidth: 1,
      borderRightColor: theme.colors.primaryBorder,
      width: 1,
      height: 16,
      opacity: 0.2,
    },
    amountWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 44,
    },
    amountTextDark: {
      fontWeight: '500',
      fontSize: 14,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.drawerText,
    },
    grayText: {
      color: theme.colors.secondaryText,
    },
    w25: {
      width: '25%',
    },
    w100: {
      width: '100%',
    },
    rowBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    saveIcon: {height: 20, width: 20},
  });
};

export default styles;
