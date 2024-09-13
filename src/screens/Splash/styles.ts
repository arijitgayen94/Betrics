import {StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: theme.colors.primaryBg,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export default styles;
