import {Platform, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    dropdownButtonStyle: {
      backgroundColor: theme.colors.primaryText,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.primaryBorder,
      width: '90%',
      height: 40,
    },
    dropdownStyle: {
      marginTop: Platform.OS === 'android' ? -25 : 0,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      borderColor: theme.colors.primaryBorder,
      borderLeftWidth: 1,
      borderRightWidth: 1,
    },
    dropdownOpened: {
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    dropdownButtonTextStyle: {
      textAlign: 'left',
      fontFamily: theme.fonts.poppingsNormal,
      fontWeight: '400',
      fontSize: 12,
      color: theme.colors.secondaryText,
    },
    rowStyle: {
      height: 40,
      backgroundColor: theme.colors.primaryText,
      borderColor: theme.colors.primaryBorder,
      borderWidth: 1,
      borderTopWidth: 0,
    },
    ml15: {
      marginLeft: 15,
    },
  });
};

export default styles;
