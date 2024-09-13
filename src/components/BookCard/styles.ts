import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    cardWrapper: {
      flexDirection: 'row',
      backgroundColor: theme.colors.primaryText,
      paddingHorizontal: 16,
      paddingVertical: 18,
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
    cardImg: {width: 62, height: 64, borderRadius: 8},
    balanceText: {
      textAlign: 'center',
      marginTop: 10,
      fontSize: 14,
      fontWeight: '500',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.lightBlueBg,
    },
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
    ratingsWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5,
    },
    btnStyle: {
      borderRadius: 8,
      paddingHorizontal: 11,
      paddingVertical: 4,
      minWidth: 110,
      height: 32,
    },
    btnTextStyle: {
      color: theme.colors.primaryText,
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 24,
      fontFamily: theme.fonts.poppingsNormal,
      textAlign: 'center',
    },
    editIconStyle: {
      tintColor: theme.colors.secondaryText,
      width: 15,
      height: 15,
    },
    marginR10: {marginRight: 10},
  });
};

export default styles;
