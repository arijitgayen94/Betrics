import {StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    wagerActivityData: {
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.primaryBorder,
      backgroundColor: theme.colors.primaryText,
    },
    textLeft: {
      textAlign: 'left',
    },
    textCenter: {
      textAlign: 'center',
    },
    textRight: {
      textAlign: 'right',
    },
    pb0: {
      paddingBottom: 0,
    },
    flexRow: {flexDirection: 'row'},
    justifyBetween: {justifyContent: 'space-between'},
    wagerActivityHeadingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    statsCardInnerContainer: {
      paddingHorizontal: 14,
      overflow: 'hidden',
      backgroundColor: theme.colors.primaryText,
    },
    innerHeadingText: {
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 18,
      fontWeight: '500',
      color: theme.colors.drawerText,
    },
    wagerTextWrapper: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    wagerTextFirst: {
      marginBottom: 10,
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.drawerText,
      textAlign: 'left',
    },
    wagerTextSecond: {
      marginBottom: 8,
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 12,
      fontWeight: '500',
      color: theme.colors.secondaryText,
      textAlign: 'center',
    },
    lightGreenColor: {
      color: theme.colors.onlineGreen,
    },
    googleRedColor: {
      color: theme.colors.googleRedText,
    },
    blackTextColor: {
      color: theme.colors.blackText,
    },
    horizontalSeparator: {
      borderRightWidth: 2,
      borderRightColor: theme.colors.secondaryText,
      width: 1,
      height: 16,
      opacity: 0.2,
    },
    mt0: {
      marginTop: 0,
    },
    mt3: {
      marginTop: 3,
    },
    collapseRow: {
      backgroundColor: theme.colors.primaryBorder,
      height: 55,
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.primaryBg,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 14,
    },
    collapseRowLeft: {
      width: '75%',
      height: '100%',
      justifyContent: 'center',
    },
    collapseRowRight: {
      width: '20%',
      justifyContent: 'center',
      alignItems: 'flex-end',
      height: '100%',
    },
    collapseRowTextFirst: {
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.drawerText,
    },
    collapseRowTextSecond: {
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 12,
      fontWeight: '500',
      color: theme.colors.secondaryText,
    },
    width33: {
      width: '33%',
    },
    alignFlexStart: {alignItems: 'flex-start'},
    alignFlexCenter: {alignItems: 'center'},
    alignFlexEnd: {alignItems: 'flex-end'},
  });
};

export default styles;
