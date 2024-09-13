import {StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      height: '100%',
      width: '100%',
      paddingHorizontal: 26,
      paddingTop: 39,
    },
    flexRow: {flexDirection: 'row'},
    alignCenter: {alignItems: 'center'},
    justifyBetween: {justifyContent: 'space-between'},
    mb20: {
      marginBottom: 20,
    },
    mb24: {
      marginBottom: 24,
    },
    headingText: {
      fontWeight: '600',
      fontSize: 16,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.lightBlueBg,
      marginLeft: 6,
    },
    separator: {
      borderTopWidth: 2,
      borderTopColor: theme.colors.secondaryText,
      opacity: 0.2,
      height: 1,
      marginBottom: 24,
      marginTop: 15,
    },
    itemText: {
      fontWeight: '400',
      fontSize: 14,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.drawerText,
    },
    rotate: {transform: [{rotate: '270deg'}]},
    thumbStyle: {
      borderColor: '#009BDB',
      borderWidth: 2,
    },
    blueBg: {
      backgroundColor: theme.colors.lightBlueBg,
    },
    trackStyle: {
      borderColor: '#009BDB',
      borderWidth: 2,
      width: 43,
    },
    redText: {
      color: theme.colors.googleRedText,
    },
  });
};

export default styles;
