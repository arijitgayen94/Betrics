import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    cardWrapper: {
      backgroundColor: theme.colors.primaryText,
      paddingHorizontal: 11,
      paddingVertical: 19,
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
      alignItems: 'center',
    },
    cardImgWrapper: {
      backgroundColor: theme.colors.onlineGreen,
      height: 45,
      width: 45,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    flexRow: {flexDirection: 'row'},
    justifyBetween: {justifyContent: 'space-between'},
    alignCenter: {alignItems: 'center'},
    headingText: {
      fontSize: 14,
      fontWeight: '500',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.drawerText,
      maxWidth: '70%',
    },
    statusWrapper: {
      borderRadius: 4,
      backgroundColor: 'rgba(254,208,8,0.3)',
      minWidth: 70,
      paddingVertical: 5,
      paddingHorizontal: 6,
      marginTop: 12,
    },
    statusText: {
      color: theme.colors.drawerText,
      fontSize: 10,
      fontWeight: '500',
      textAlign: 'center',
      fontFamily: theme.fonts.poppingsNormal,
    },
    subscriptionNameText: {
      marginTop: 7,
      color: theme.colors.drawerText,
      fontSize: 14,
      fontWeight: '500',
      textAlign: 'center',
      fontFamily: theme.fonts.poppingsNormal,
    },
    priceText: {
      marginTop: 10,
      color: '#19151F',
      fontSize: 20,
      fontWeight: '800',
      textAlign: 'center',
      fontFamily: theme.fonts.poppingsNormal,
    },
    durationText: {
      color: theme.colors.secondaryText,
      fontSize: 12,
      fontWeight: '400',
      textAlign: 'center',
      fontFamily: theme.fonts.poppingsNormal,
    },
    btnStyle: {
      borderRadius: 8,
      minHeight: 35,
      marginTop: 25,
      minWidth: 165,
    },
    modalGradientBtn: {
      paddingVertical: 14,
      borderRadius: 4,
      justifyContent: 'center',
    },
    btnTextStyle: {
      fontWeight: '500',
      fontSize: 12,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryBg,
      textAlign: 'center',
    },
    ph15: {
      paddingHorizontal: 15,
    },
    cardImg: {height: 50, width: 50, borderRadius: 8},
  });
};

export default styles;
