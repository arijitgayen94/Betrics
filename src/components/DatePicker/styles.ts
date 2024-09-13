import {StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    labelText: {
      fontFamily: theme.fonts.poppingsNormal,
      fontWeight: '500',
      fontSize: 14,
      color: theme.colors.lightBlueBg,
      marginBottom: 7,
    },
    inputWrapper: {
      width: '100%',
      height: 35,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.colors.secondaryText,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 12,
      flexDirection: 'row',
      marginBottom: 16,
    },
    lowOpacity: {
      opacity: 0.3,
    },
    dateText: {
      fontFamily: theme.fonts.poppingsNormal,
      fontWeight: '400',
      fontSize: 13,
      color: theme.colors.drawerText,
    },
    modalInnerContainer: {
      maxHeight: '50%',
      minHeight: 400,
      marginTop: 'auto',
      backgroundColor: theme.colors.primaryText,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      padding: 20,
    },
    lightBlueBg: {
      backgroundColor: theme.colors.lightBlueBg,
      color: theme.colors.primaryText,
    },
  });
};

export default styles;
