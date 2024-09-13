import {StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mt20: {
      marginTop: 20,
    },
    dateText: {
      marginBottom: 5,
      fontSize: 15,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
    },
  });
};

export default styles;
