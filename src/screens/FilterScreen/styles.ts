import {StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    flexRow: {flexDirection: 'row'},
    flex1: {flex: 1},
    leftContainer: {
      backgroundColor: theme.colors.lightGrayBg,
      height: '100%',
      width: 130,
    },
    leftContainerItem: {
      backgroundColor: theme.colors.lightGrayBg,
      height: 50,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.primaryText,
      width: '100%',
      justifyContent: 'center',
      paddingLeft: 10,
    },
    leftContainerItemText: {
      color: theme.colors.blackText,
      fontSize: 14,
      fontWeight: '500',
      fontFamily: theme.fonts.poppingsNormal,
    },
    blueBackground: {
      backgroundColor: theme.colors.lightBlueBg,
    },
    whiteText: {
      color: theme.colors.primaryText,
    },
    rightSection: {
      backgroundColor: theme.colors.primaryText,
      height: '100%',
      flex: 1,
      paddingHorizontal: 30,
      paddingVertical: 20,
    },
    mb26: {marginBottom: 26},
    checkboxIcon: {
      borderColor: theme.colors.primaryBorder,
      borderRadius: 0,
    },
    checkboxIconSelected: {
      borderColor: theme.colors.lightBlueBg,
      borderRadius: 0,
    },
    checkboxText: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.drawerText,
      marginLeft: 10,
      fontSize: 14,
      fontWeight: '500',
    },
    clearFilterText: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
      fontSize: 15,
      fontWeight: '500',
    },
    modalGradientBtn: {
      paddingVertical: 10,
      borderRadius: 4,
      justifyContent: 'center',
      marginLeft: 24,
    },
    footerWrapper: {
      height: 70,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnTextStyle: {
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 14,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
      paddingHorizontal: 34,
    },
  });
};

export default styles;
