import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    cardWrapper: {
      flexDirection: 'row',
      backgroundColor: theme.colors.primaryText,
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderRadius: 8,
      width: Dimensions.get('window').width * 0.9,
      borderColor: theme.colors.primaryBorder,
      borderWidth: 1,
      shadowColor: theme.colors.primaryShadow,
      shadowOffset: {width: 2, height: 1},
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 4,
      marginBottom: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardInnerWrapper: {alignItems: 'center', flexDirection: 'row'},
    cardImg: {width: 50, height: 52, borderRadius: 8},
    headingText: {
      fontSize: 15,
      fontWeight: '500',
      marginLeft: 11,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.drawerText,
      lineHeight: 24,
    },
    amountText: {
      fontSize: 15,
      fontWeight: '500',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.lightBlueText,
      lineHeight: 24,
    },
    amountGreenText: {
      fontSize: 15,
      fontWeight: '500',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.onlineGreen,
      lineHeight: 24,
    },
    amountRedText: {
      fontSize: 15,
      fontWeight: '500',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.googleRed,
      lineHeight: 24,
    },
  });
};

export default styles;
