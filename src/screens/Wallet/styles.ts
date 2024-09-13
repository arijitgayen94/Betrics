import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainContainer: {flex: 1, backgroundColor: theme.colors.primaryBg},
    balanceContainer: {
      backgroundColor: theme.colors.lightGrayBg,
      width: Dimensions.get('window').width,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      paddingHorizontal: 20,
      paddingTop: 19,
      paddingBottom: 22,
    },
    availableBalanceText: {
      alignSelf: 'center',
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 15,
      fontWeight: '400',
      color: theme.colors.secondaryText,
    },
    balanceText: {
      alignSelf: 'center',
      marginTop: 12,
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 30,
      fontWeight: '500',
      color: theme.colors.drawerText,
    },
    optionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    optionsInnerRow: {flexDirection: 'row', alignItems: 'center'},
    shadowCircle: {
      height: 60,
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primaryBg,
      borderRadius: 50,
      shadowColor: theme.colors.primaryShadow,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.4,
      shadowRadius: 5,
      elevation: 4,
    },
    allTransactionsText: {
      alignSelf: 'center',
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 13,
      fontWeight: '500',
      color: theme.colors.drawerText,
      marginLeft: 10,
    },
    buttonStyle: {
      borderRadius: 8,
      paddingHorizontal: 11,
      paddingVertical: 4,
      backgroundColor: '#009BDB',
    },
    buttonTextStyle: {
      color: theme.colors.primaryText,
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 24,
      fontFamily: theme.fonts.poppingsNormal,
    },
    innerContainer: {flex: 1, paddingHorizontal: 19, marginTop: 15},
    booksBalanceHeading: {
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 20,
      fontWeight: '500',
      color: theme.colors.drawerText,
    },
    booksBalanceSubHeadingText: {
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 12,
      fontWeight: '400',
      color: theme.colors.secondaryText,
      marginBottom: 12,
    },
  });
};

export default styles;
