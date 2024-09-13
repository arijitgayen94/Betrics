import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    cardWrapper: {
      backgroundColor: theme.colors.primaryText,
      paddingHorizontal: 16,
      paddingTop: 18,
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
    },
    cardHeaderWrapper: {flexDirection: 'row'},
    cardImg: {width: 62, height: 64, borderRadius: 8},
    descriptionWrapper: {marginLeft: 13, flex: 1},
    headingWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headingText: {
      fontSize: 18,
      fontWeight: '500',
      width: '85%',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.drawerText,
      lineHeight: 24,
    },
    descriptionText: {
      fontSize: 14,
      fontWeight: '400',
      width: '85%',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
      lineHeight: 20,
    },
    typeText: {
      fontSize: 14,
      fontWeight: '400',
      width: '85%',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.lightBlueText,
      lineHeight: 20,
    },
    infoText: {
      marginTop: 10,
      fontWeight: '400',
      fontSize: 12,
      color: '#19151F',
      fontFamily: theme.fonts.poppingsNormal,
    },
    actionsWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 15,
      paddingBottom: 10,
    },
    teamNames: {
      color: theme.colors.lightBlueText,
      fontSize: 13,
      fontWeight: '500',
      fontFamily: theme.fonts.poppingsNormal,
      textTransform: 'uppercase',
    },
    actionsInnerWrapper: {flexDirection: 'row'},
    btnStyle: {
      borderRadius: 8,
      paddingHorizontal: 11,
      paddingVertical: 4,
      marginLeft: 10,
    },
    btnTextStyle: {
      color: theme.colors.primaryText,
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 24,
      fontFamily: theme.fonts.poppingsNormal,
    },
    footerGradient: {
      backgroundColor: 'red',
      width: Dimensions.get('window').width * 0.9,
      marginHorizontal: -16,
      marginTop: 13,
      height: 40,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerTextWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ml5: {
      marginLeft: 5,
    },
    drawerColorText: {
      color: theme.colors.drawerText,
    },
    grayBg: {
      backgroundColor: theme.colors.primaryBorder,
    },
  });
};

export default styles;
