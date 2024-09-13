import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    tabContainer: {
      backgroundColor: theme.colors.primaryBorder,
      height: 45,
      width: Dimensions.get('window').width,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    textWrapper: {
      height: '100%',
      justifyContent: 'center',
      paddingHorizontal: 30,
    },
    blueBorderBottom: {
      borderBottomWidth: 3,
      borderBottomColor: theme.colors.lightBlueBg,
    },
    text: {
      fontSize: 15,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.drawerText,
    },
    blueText: {
      color: theme.colors.lightBlueBg,
    },
    flex1: {flex: 1, width: '100%'},
  });
};

export default styles;
