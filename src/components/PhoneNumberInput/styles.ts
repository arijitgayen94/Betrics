import {StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    inputContainer: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.primaryBorder,
      shadowColor: theme.colors.primaryShadow,
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
      backgroundColor: theme.colors.primaryBg,
      borderRadius: 8,
      padding: 0,
      height: 45,
    },
    textContainerStyle: {
      backgroundColor: 'transparent',
      fontSize: 14,
      color: theme.colors.blackText,
      fontFamily: theme.fonts.poppingsNormal,
    },
    textInputStyle: {
      height: 45,
    },
  });
};

export default styles;
