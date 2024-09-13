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
    flex1: {
      flex: 1,
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
    btnWrapper: {flexDirection: 'row', alignItems: 'center'},
    logo: {
      height: 35,
      width: 35,
      borderRadius: 20,
    },
    teamName: {
      color: theme.colors.primaryText,
      fontWeight: '600',
      fontSize: 18,
      fontFamily: theme.fonts.poppingsNormal,
      marginLeft: 10,
      textTransform: 'uppercase',
    },
    gradientStyle: {
      width: Dimensions.get('window').width,
      height: 50,
      paddingHorizontal: 20,
      justifyContent: 'center',
    },
    gradientinnerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    separator: {width: 10},
  });
};

export default styles;
