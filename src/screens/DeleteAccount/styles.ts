import {StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    primaryButton: {
      height: 45,
      borderRadius: 4,
      padding: 9,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.googleRedText,
    },
    primaryButtonGradient: {
      height: 45,
      padding: 0,
      borderRadius: 4,
      justifyContent: 'center',
      width: '100%',
    },
    secondaryButtonStyle: {
      height: 45,
      backgroundColor: '#808080',
      borderRadius: 4,
      padding: 9,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    secondaryButtonTextStyle: {
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 14,
      padding: 0,
      lineHeight: 18,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
    },
    btnTextStyle: {
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 14,
      padding: 0,
      lineHeight: 20,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
    },
    contentPage: {
      padding: 15,
      flex: 1,
      width: '100%',
    },
    contentPageHeading: {
      fontSize: 16,
      lineHeight: 20,
      marginBottom: 15,
      marginTop: 10,
      fontWeight: '500',
      color: theme.colors.drawerText,
      fontFamily: theme.fonts.poppingsNormal,
    },
    contentPageSubHeading: {
      fontSize: 14,
      lineHeight: 18,
      marginBottom: 10,
      marginTop: 10,
      fontWeight: '500',
      color: theme.colors.drawerText,
      fontFamily: theme.fonts.poppingsNormal,
    },
    contentPageText: {
      fontSize: 14,
      lineHeight: 22,
      marginBottom: 15,
      fontWeight: '500',
      color: '#808080',
      fontFamily: theme.fonts.poppingsNormal,
    },
    contentPageActions: {
      flexDirection: 'row',
      paddingHorizontal: 15,
      justifyContent: 'space-between',
      width: '100%',
      paddingBottom: 20,
    },

    contentPageActionsView: {
      width: '48%',
      marginBottom: 15,
      display: 'flex',
    },
    checkboxIcon: {
      borderColor: theme.colors.primaryBorder,
      borderRadius: 0,
    },
    checkboxText: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
      marginLeft: 10,
      fontSize: 12,
      fontWeight: '400',
    },
  });
};

export default styles;
