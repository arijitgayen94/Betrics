import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainWrapper: {
      backgroundColor: 'white',
      paddingHorizontal: 20,
      width: Dimensions.get('window').width,
      paddingTop: 20,
      flex: 1,
    },
    flex1: {
      flex: 1,
    },
    flexRow: {flexDirection: 'row', alignItems: 'center'},
    justifyBetween: {justifyContent: 'space-between'},
    alignCenter: {alignItems: 'center'},
    alignStart: {alignItems: 'flex-start'},
    mt13: {marginTop: 13},
    w90: {width: '90%'},
    headingText: {
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 14,
      fontWeight: '500',
      marginRight: 14,
      color: theme.colors.blackText,
    },
    activeEngineNameText: {
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 13,
      fontWeight: '400',
      textAlign: 'center',
      flex: 1,
      borderColor: theme.colors.lightBlueBg,
      borderWidth: 1,
      borderRadius: 4,
      paddingVertical: 5,
      color: theme.colors.drawerText,
    },
    cardWrapper: {
      backgroundColor: theme.colors.lightGrayBg,
      borderRadius: 8,
      width: '100%',
      shadowColor: theme.colors.primaryShadow,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.4,
      shadowRadius: 5,
      marginTop: 20,
      paddingHorizontal: 15,
      paddingVertical: 18,
    },

    cardHeadingText: {
      maxWidth: '85%',
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 15,
      fontWeight: '500',
      color: theme.colors.drawerText,
    },

    editIconWrapper: {
      backgroundColor: theme.colors.lightBlueBg,
      borderWidth: 1,
      borderColor: 'white',
      width: 20,
      height: 20,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      top: -5,
      right: -5,
    },

    listContainer: {flex: 1.5, height: '100%'},
    listItemWrapper: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 7,
    },
    bullet: {
      width: 8,
      height: 8,
      borderRadius: 50,
      backgroundColor: theme.colors.onlineGreen,
      marginRight: 5,
      marginTop: 4,
    },
    listItemText: {
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 12,
      fontWeight: '400',
      color: theme.colors.secondaryText,
      maxWidth: '92%',
    },
    notesContainer: {flex: 1, height: '100%'},
    textInputStyle: {
      backgroundColor: 'rgba(128, 128, 128,0.7)',
      height: 65,
      borderRadius: 4,
      padding: 10,
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 12,
      color: theme.colors.drawerText,
      fontWeight: '400',
    },
    btnStyle: {
      borderRadius: 4,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primaryBorder,
    },
    btnTextStyle: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
      fontSize: 12,
      fontWeight: '400',
      textAlign: 'center',
    },
    modalGradientBtn: {
      height: 35,
      borderRadius: 4,
      justifyContent: 'center',
    },
    mt20: {
      marginTop: 20,
    },
    w100: {
      width: '100%',
    },
    mb20: {
      marginBottom: 20,
    },
    ph15: {
      paddingHorizontal: 15,
    },
    w45: {
      width: '47%',
    },
    modalFooterBtnWrapper: {
      width: '85%',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginTop: 23,
    },
    modalInnerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
    },
    btnStyleReset: {
      borderRadius: 4,
      width: '47%',
      height: 35,
      backgroundColor: theme.colors.primaryBorder,
      justifyContent: 'center',
    },
    btnTextStyleReset: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
      fontSize: 12,
      fontWeight: '400',
      textAlign: 'center',
    },
    btnTextStyleSave: {
      fontFamily: theme.fonts.poppingsNormal,
      color: '#fff',
      fontSize: 14,
      fontWeight: '500',
      textAlign: 'center',
    },
    floatingBtn: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    floatingBtnGradient: {
      alignItems: 'center',
      borderRadius: 50,
      width: 45,
      height: 45,
      justifyContent: 'center',
    },
  });
};

export default styles;
