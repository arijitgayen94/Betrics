import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    flexRow: {
      flexDirection: 'row',
    },
    justifyBetween: {
      justifyContent: 'space-between',
    },
    mt15: {
      marginTop: 15,
    },
    gradientStyle: {
      width: Dimensions.get('window').width,
      height: 60,
      paddingHorizontal: 20,
      justifyContent: 'center',
    },
    btnWrapper: {flexDirection: 'row', alignItems: 'center'},
    btnGradientStyle: {
      borderRadius: 4,
      height: 30,
      justifyContent: 'center',
    },
    btnTextStyle: {
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 14,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
    },
    ml10: {
      marginLeft: 10,
    },
    ph15: {
      paddingHorizontal: 15,
    },
    cardWrapper: {
      paddingVertical: 23,
      paddingHorizontal: 15,
    },
    cardDetailsWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    teamIconSmall: {width: 24, height: 24, borderRadius: 50},
    teamNameCard: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.drawerText,
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 2,
    },
    teamScore: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
      fontSize: 13,
      fontWeight: '400',
    },
    spreadSectionWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '55%',
    },
    spreadCard: {
      backgroundColor: theme.colors.drawerText,
      width: 54,
      height: 60,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    height90: {
      height: 90,
    },
    height60: {
      height: 60,
    },
    finalScoreWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 16,
    },
    finalScoreText: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.blackText,
      fontSize: 11,
      fontWeight: '500',
    },
    spreadTopText: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
      fontSize: 12,
      fontWeight: '400',
    },
    spreadBottomText: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
      fontSize: 13,
      fontWeight: '500',
    },
    spreadBottomGreenText: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.onlineGreen,
      fontSize: 13,
      fontWeight: '500',
    },
    spreadBottomRedText: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.googleRed,
      fontSize: 13,
      fontWeight: '500',
    },
    grayBg: {
      backgroundColor: theme.colors.lightGrayBg,
    },
    modalContentWrapper: {
      flexDirection: 'row',
      marginTop: 20,
      justifyContent: 'space-between',
      width: '70%',
    },
    modalChildren: {
      paddingBottom: 20,
      alignItems: 'center',
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
    w40: {
      width: '40%',
    },
    w45: {
      width: '45%',
    },
    ml15: {
      marginLeft: 15,
    },
    selectedBetBg: {
      backgroundColor: '#009BDB',
    },
    matchupBetCountContainer: {
      backgroundColor: theme.colors.primaryBg,
      borderColor: theme.colors.primaryBorder,
      borderWidth: 1,
      paddingHorizontal: 10,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    matchupBetCount: {
      fontSize: 14,
      fontFamily: theme.fonts.poppingsNormal,
    },
    betOptionView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
    },
    betNameCard: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.drawerText,
      fontSize: 14,
      fontWeight: '500',
    },
    newImage: {height: 25, width: '100%'},
    height100: {
      height: '100%',
    },
    containerWidth: {width: '60%'},
    extraView: {width: '100%', height: 20},
  });
};

export default styles;
