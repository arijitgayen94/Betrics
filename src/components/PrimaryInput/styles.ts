import {StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    container: {
      width: '85%',
    },
    inputContainer: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.primaryBorder,
      shadowColor: theme.colors.primaryShadow,
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
      height: 45,
      backgroundColor: theme.colors.primaryBg,
      borderRadius: 8,
      flexDirection: 'row',
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputStyle: {
      fontSize: 14,
      fontWeight: '400',
      width: '93%',
      height: '100%',
      color: theme.colors.blackText,
      fontFamily: theme.fonts.poppingsNormal,
    },
    label: {
      fontSize: 12,
      fontWeight: '400',
      marginBottom: 5,
    },
    btnStyle: {
      borderLeftWidth: 0.5,
      paddingLeft: 10,
    },
    btnTextStyle: {
      color: theme.colors.blackText,
      fontFamily: theme.fonts.poppingsNormal,
    },
  });
};

export default styles;
