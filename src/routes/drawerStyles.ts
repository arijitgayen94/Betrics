import {Dimensions, Platform, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    itemListContainer: {
      flex: 1,
      paddingTop: 28,
    },
    itemWrapper: {
      flexDirection: 'row',
      marginBottom: 30,
    },
    drawerContainerStyles: {
      width: Dimensions.get('window').width * 0.8,
    },
    drawerItemIcon: {
      marginLeft: 32,
      height: 22,
      width: 22,
    },
    drawerLabelStyle: {
      marginLeft: 18,
      fontFamily: theme.fonts.poppingsNormal,
      fontWeight: '400',
      fontSize: 14,
      color: theme.colors.drawerText,
    },
    closeBtnWrapper: {
      position: 'absolute',
      top: Platform.select({ios: 70, android: 50}),
      right: -50,
    },
    closeBtn: {
      height: 25,
      width: 25,
    },
    headerContainer: {
      backgroundColor: theme.colors.lightGrayBg,
      height: 155,
      width: '100%',
      alignItems: 'center',
      paddingHorizontal: 27,
      flexDirection: 'row',
    },
    imageWrapper: {
      shadowColor: theme.colors.primaryShadow,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 4,
      position: 'relative',
      width: 65,
    },
    profileImage: {
      height: 65,
      width: 65,
      borderRadius: 5,
    },
    onlineDot: {
      backgroundColor: theme.colors.onlineGreen,
      borderWidth: 1,
      borderColor: 'white',
      width: 10,
      height: 10,
      borderRadius: 50,
      position: 'absolute',
      top: -4,
      right: -4,
    },
    nameContainer: {
      marginLeft: 17,
      width: '75%',
    },
    nameWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
      width: '100%',
    },
    nameText: {
      fontSize: 14,
      color: theme.colors.blackText,
      fontWeight: '600',
      fontFamily: theme.fonts.poppingsNormal,
    },
    emailText: {
      fontSize: 12,
      marginLeft: 6,
      color: theme.colors.secondaryText,
      fontWeight: '500',
      fontFamily: theme.fonts.poppingsNormal,
      width: '90%',
    },
    borderStyle: {
      borderColor: theme.colors.secondaryText,
      borderTopWidth: 1,
      width: '100%',
      opacity: 0.2,
      height: 2,
    },
    logoutSection: {
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: Platform.OS === 'ios' ? 0 : 10,
    },
    logoutText: {
      marginLeft: 20,
      color: theme.colors.drawerText,
    },
    drawerSection: {marginTop: -30},
    drawerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.lightGrayBg,
      paddingTop: 10,
    },
    drawerHeaderLeftIcon: {
      marginLeft: 20,
      marginBottom: 20,
    },
    logoImg: {
      marginBottom: 20,
    },
    drawerIcon: {width: 22, height: 17},
    btnWrapper: {flexDirection: 'row', alignItems: 'center'},
    drawerHeaderRightIcon: {
      marginRight: 20,
      marginBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    verifiedTick: {
      height: 15,
      width: 15,
    },
    notVerifiedTick: {
      height: 15,
      width: 15,
      tintColor: 'red',
    },
    verifiedView: {
      paddingVertical: 30,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    w45: {
      width: '45%',
      marginTop: 20,
    },
    ph15: {
      paddingHorizontal: 15,
    },
    ml15: {
      marginLeft: 15,
    },
    modalFooterBtnWrapper: {
      width: '70%',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      marginTop: 23,
    },
    modalGradientBtn: {
      paddingVertical: 14,
      borderRadius: 4,
      justifyContent: 'center',
    },
    btnTextStyle: {
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 14,
      padding: 0,
      lineHeight: 20,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
    },
    messageText: {
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 14,
      fontWeight: '400',
      textAlign: 'center',
    },
    padding10: {
      padding: 10,
    },
    countText: {
      textAlign: 'center',
      fontWeight: '400',
      fontSize: 10,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
    },
    redCircle: {
      width: 16,
      height: 16,
      borderRadius: 8,
      position: 'absolute',
      top: -6,
      right: -4,
      backgroundColor: 'red',
    },
  });
};

export default styles;
