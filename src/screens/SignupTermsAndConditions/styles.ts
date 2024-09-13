import {StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    primaryButton: {
      padding: 0,
      width: '100%',
      height: 45,
      flex: 1,
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
    },

    contentPageActionsView: {
      width: '48%',
      marginBottom: 15,
      display: 'flex',
    },
  });
};

export default styles;
