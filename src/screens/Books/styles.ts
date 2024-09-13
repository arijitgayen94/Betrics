import {StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    btnGreen: {
      backgroundColor: theme.colors.onlineGreen,
    },
    btnTomato: {
      backgroundColor: theme.colors.tomato,
    },
  });
};

export default styles;
