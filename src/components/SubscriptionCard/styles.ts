import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    cardWrapper: {
      flexDirection: 'row',
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
    },
    cardImgWrapper: {
      height: 45,
      width: 45,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    textSectionWrapper: {marginLeft: 14, flex: 5},
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
      backgroundColor: 'rgba(119,194,33,0.3)',
      minWidth: 70,
      paddingVertical: 5,
      paddingHorizontal: 6,
    },
    statusText: {
      color: theme.colors.onlineGreen,
      fontSize: 10,
      fontWeight: '500',
      textAlign: 'center',
      fontFamily: theme.fonts.poppingsNormal,
    },
    subHeadingText: {
      fontSize: 12,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      color: '#19151F',
      marginTop: 3,
    },
    mw90: {
      maxWidth: '90%',
    },
    btnStyle: {
      borderRadius: 8,
      marginTop: 20,
      height: 36,
      width: 165,
      backgroundColor: theme.colors.primaryBorder,
      justifyContent: 'center',
    },
    btnTextStyle: {
      fontWeight: '500',
      fontSize: 12,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.drawerText,
      textAlign: 'center',
    },
    tomatoColor: {
      color: theme.colors.tomato,
    },
    tomatoBgColor: {
      backgroundColor: theme.colors.tomato,
    },
    tomatoBgColorLowOpacity: {
      backgroundColor: 'rgba(254,74,101,0.3)',
    },
    modalContainer: {
      padding: 15,
    },
    modalText: {
      fontSize: 16,
      fontWeight: '400',
      color: theme.colors.secondaryText,
      width: '60%',
      alignSelf: 'center',
      textAlign: 'center',
      fontFamily: theme.fonts.poppingsNormal,
    },
    modalBtnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '60%',
      alignSelf: 'center',
      marginTop: 25,
    },
    modalNoBtn: {
      backgroundColor: theme.colors.grayBg,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 30,
      paddingRight: 30,
      borderRadius: 8,
    },
    modalNoBtnText: {
      color: theme.colors.blackText,
      fontWeight: '600',
      fontFamily: theme.fonts.poppingsNormal,
    },
    modalYesBtn: {
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 30,
      paddingRight: 30,
      borderRadius: 8,
    },
    modalYesBtnText: {
      color: theme.colors.primaryText,
      fontWeight: '600',
      fontFamily: theme.fonts.poppingsNormal,
    },
  });
};

export default styles;
