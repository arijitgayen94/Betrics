import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    flex1: {
      flex: 1,
    },
    footerRow: {
      width: Dimensions.get('window').width,
      flexDirection: 'row',
      backgroundColor: theme.colors.lightGrayBg,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    imgWrapper: {
      shadowColor: theme.colors.primaryShadow,
      shadowOffset: {width: 2, height: 1},
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 4,
    },
    avatar: {
      height: 41,
      width: 41,
      borderRadius: 50,
    },
    commentInput: {
      backgroundColor: theme.colors.primaryText,
      borderRadius: 20,
      marginLeft: 10,
      fontSize: 12,
      height: 40,
      padding: 10,
      width: Dimensions.get('window').width * 0.65,
      fontFamily: theme.fonts.poppingsNormal,
    },
    postBtn: {
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 16,
      fontWeight: '400',
      color: theme.colors.drawerText,
      marginLeft: 10,
    },
    modalInnerContainer: {
      maxHeight: '50%',
      minHeight: 100,
      marginTop: 'auto',
      backgroundColor: theme.colors.primaryText,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      padding: 20,
    },
    handleBar: {
      backgroundColor: theme.colors.barColor,
      width: 80,
      height: 8,
      borderRadius: 30,
      alignSelf: 'center',
    },
    textWrapper: {marginTop: 23},
    modalText: {
      fontSize: 16,
      marginBottom: 15,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
      fontWeight: '400',
    },
    loaderView: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default styles;
