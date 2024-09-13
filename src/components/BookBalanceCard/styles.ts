import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    cardWrapper: {
      flexDirection: 'row',
      backgroundColor: theme.colors.primaryText,
      paddingHorizontal: 16,
      paddingVertical: 18,
      borderRadius: 8,
      width: Dimensions.get('window').width * 0.89,
      borderColor: theme.colors.primaryBorder,
      borderWidth: 1,
      shadowColor: theme.colors.primaryShadow,
      shadowOffset: {width: 2, height: 1},
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 4,
      marginBottom: 20,
    },
    cardImg: {width: 62, height: 64, borderRadius: 8},
    descriptionWrapper: {marginLeft: 13, flex: 1},
    headingText: {
      fontSize: 18,
      fontWeight: '500',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.drawerText,
      lineHeight: 24,
    },
    inputStyle: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.primaryBorder,
      paddingBottom: 7,
      marginTop: 5,
      fontSize: 18,
      fontWeight: '500',
      fontFamily: theme.fonts.poppingsNormal,
    },
  });
};

export default styles;
