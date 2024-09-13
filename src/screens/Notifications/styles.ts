import {StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    headerView: {
      width: '100%',
      alignItems: 'flex-end',
      marginTop: 10,
    },
    actionText: {
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 12,
      color: theme.colors.secondaryText,
    },
    blueText: {
      color: theme.colors.lightBlueText,
    },
  });
};

export default styles;
