import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainWrapper: {
      backgroundColor: 'white',
      flex: 1,
      width: '90%',
      // paddingHorizontal: 20,
    },
    containerView: {
      height: '60%',
      width: '100%',
      alignItems: 'center',
    },
    containerViewWithoutButton: {
      height: '70%',
      width: '100%',
      alignItems: 'center',
    },
    filterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
      width: '100%',
    },
    filterHeadingText: {
      // marginRight: 10,
      fontWeight: '500',
      fontSize: 14,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.blackText,
    },
    filterText: {
      borderWidth: 1,
      borderColor: theme.colors.secondaryText,
      borderRadius: 4,
      paddingHorizontal: 15,
      paddingVertical: 5,
      fontSize: 13,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.drawerText,
    },
    blueBorder: {
      borderColor: theme.colors.lightBlueBg,
    },
    mv20: {marginVertical: 20},
    btnStyle: {
      borderRadius: 4,
      paddingHorizontal: 11,
      paddingVertical: 4,
      height: 28,
      backgroundColor: theme.colors.primaryBorder,
      justifyContent: 'center',
      width: 150,
      alignSelf: 'flex-end',
    },
    btnTextStyle: {
      color: theme.colors.secondaryText,
      fontSize: 12,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      textAlign: 'center',
    },
    footerWrapper: {
      width: Dimensions.get('window').width,
      minHeight: 50,
      alignItems: 'center',
      paddingBottom: 0,
    },
    footerSeparator: {
      borderTopWidth: 1,
      borderTopColor: theme.colors.secondaryText,
      width: Dimensions.get('window').width * 0.9,
      opacity: 0.1,
      height: 1,
      marginBottom: 17,
    },
    footerTextWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: Dimensions.get('window').width * 0.9,
      marginBottom: 10,
    },
    footerTextLeft: {
      fontSize: 18,
      fontWeight: '600',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.drawerText,
    },
    footerTextRight: {
      fontSize: 18,
      fontWeight: '500',
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
    },
    btnAddToTracker: {
      width: '85%',
      marginTop: 15,
    },
    btnGradient: {
      paddingVertical: 10,
      borderRadius: 8,
    },
    btnText: {
      textAlign: 'center',
      fontSize: 18,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
    },
    footerRiskView: {
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    renderView: {
      width: '100%',
      height: 40,
      marginVertical: 8,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    topOptionView: {
      width: '90%',
      paddingVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    listContainer: {
      height: '90%',
      padding: 10,
    },
  });
};

export default styles;
