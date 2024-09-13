import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: theme.colors.primaryBg,
      flex: 1,
      width: Dimensions.get('window').width,
      alignItems: 'center',
    },
    pageWidth: {
      width: '85%',
      height: '100%',
    },
    flexRow: {
      flexDirection: 'row',
    },
    checkbox: {
      width: '100%',
      marginTop: 18,
      alignItems: 'center',
    },
    checkboxIcon: {
      borderColor: theme.colors.primaryBorder,
      borderRadius: 0,
      marginTop: 0,
    },
    checkboxLabel: {
      marginLeft: 10,
      fontSize: 12,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
      width: '90%',
      textAlign: 'left',
    },
    contentPageHeading: {
      fontSize: 16,
      lineHeight: 20,
      marginTop: 10,
      fontWeight: '500',
      color: theme.colors.drawerText,
      fontFamily: theme.fonts.poppingsNormal,
    },
    marginTop: {
      marginTop: 30,
    },
    inputWrapper: {
      width: '100%',
    },
    inputField: {
      fontWeight: '400',
      fontSize: 16,
      marginTop: 10,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
      textAlignVertical: 'top',
      minHeight: Dimensions.get('window').height * 0.23,
    },
    btnSignup: {
      width: '100%',
      marginTop: 15,
    },
    btnGradient: {
      paddingVertical: 14,
      borderRadius: 8,
    },
    btnText: {
      textAlign: 'center',
      fontSize: 18,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
    },
    radioButton: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderColor: theme.colors.drawerText,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkRadioButton: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: theme.colors.lightBlueBg,
    },
  });
};

export default styles;
