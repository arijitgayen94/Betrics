import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme.colors.primaryText,
    },
    lightBlueText: {
      color: theme.colors.lightBlueText,
    },
    lightBlueBorder: {
      borderColor: theme.colors.lightBlueText,
    },
    filterWrapper: {
      width: Dimensions.get('window').width,
      paddingLeft: 21,
      paddingVertical: 10,
    },
    filterItemWrapper: {
      shadowColor: theme.colors.primaryBorder,
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 4,
      paddingVertical: 10,
    },
    filterItem: {
      flexDirection: 'row',
      borderWidth: 1,
      paddingVertical: 8,
      paddingHorizontal: 13,
      borderRadius: 8,
      borderColor: theme.colors.primaryBorder,
      alignItems: 'center',
      marginRight: 10,
      backgroundColor: theme.colors.primaryText,
    },
    filterItemCircle: {
      height: 16,
      width: 16,
      borderColor: theme.colors.primaryBorder,
      borderWidth: 2,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterItemInnerCircle: {
      backgroundColor: theme.colors.lightBlueText,
      height: 8,
      width: 8,
      borderRadius: 50,
    },
    filterItemLabel: {
      marginLeft: 3,
      color: theme.colors.secondaryText,
      fontWeight: '400',
      fontSize: 14,
      fontFamily: theme.fonts.poppingsNormal,
    },
    mainSectionWrapper: {flex: 1, alignItems: 'center'},
    btnGreen: {
      backgroundColor: theme.colors.onlineGreen,
    },
    btnTomato: {
      backgroundColor: theme.colors.tomato,
    },
  });
};

export default styles;
