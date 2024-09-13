import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: theme.colors.primaryBg,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginTop: 10,
      paddingHorizontal: 20,
    },
    headerButtonView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
      paddingHorizontal: 15,
    },
    otherUserFollow: {
      justifyContent: 'flex-end',
    },
    userInfo: {
      width: '75%',
      alignItems: 'center',
      justifyContent: 'center',
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
      width: '100%',
    },
    nameWrapper: {
      flexDirection: 'row',
      marginTop: 5,
      width: '100%',
    },
    extraDetails: {
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    nameText: {
      fontSize: 14,
      color: theme.colors.blackText,
      fontWeight: '600',
      fontFamily: theme.fonts.poppingsNormal,
    },
    followCount: {
      fontSize: 12,
      color: theme.colors.blackText,
      fontWeight: '600',
      fontFamily: theme.fonts.poppingsNormal,
    },
    userNameText: {
      fontSize: 12,
      color: theme.colors.secondaryText,
      fontWeight: '500',
      fontFamily: theme.fonts.poppingsNormal,
    },
    followText: {
      fontSize: 12,
      color: theme.colors.secondaryText,
      fontWeight: '500',
      fontFamily: theme.fonts.poppingsNormal,
    },
    borderStyle: {
      borderColor: theme.colors.secondaryText,
      borderTopWidth: 1,
      width: '100%',
      opacity: 0.2,
      height: 2,
    },
    btnSignup: {
      width: '45%',
    },
    btnFollow: {
      width: '75%',
    },
    btnGradient: {
      paddingVertical: 10,
      borderRadius: 8,
    },
    btnText: {
      textAlign: 'center',
      fontSize: 14,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
    },
    optionView: {
      width: '100%',
      backgroundColor: theme.colors.grayBg,
      alignItems: 'center',
      marginTop: 20,
      paddingVertical: 10,
    },
    gridView: {
      backgroundColor: theme.colors.primaryBg,
      flex: 1,
      width: Dimensions.get('window').width,
      alignItems: 'center',
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: Dimensions.get('window').width / 3,
    },
    imageView: {
      flex: 1,
      flexDirection: 'column',
      margin: 1,
    },
    containerStyle: {
      width: Dimensions.get('window').width,
    },
    headerFollow: {
      width: '100%',
      height: 35,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    flex1: {flex: 1},
    headerOption: {
      width: '100%',
      height: 45,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      backgroundColor: theme.colors.grayBg,
    },
    deactivateOption: {
      width: '50%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: theme.colors.grayBg,
      borderBottomWidth: 1,
    },
    activateOption: {
      width: '50%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: theme.colors.lightBlueBg,
      borderBottomWidth: 1,
    },
    activateOptionText: {
      fontSize: 16,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.lightBlueBg,
    },
    deactivateOptionText: {
      fontSize: 16,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
    },
    flexCenter: {
      flex: 1,
      alignItems: 'center',
    },
    followContainer: {width: '100%', paddingHorizontal: 15, marginTop: 20},
    mainView: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    followImage: {height: 40, width: 40, borderRadius: 20},
    followNameView: {width: '60%'},
    followBtn: {
      width: '20%',
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      backgroundColor: '#808080',
    },
    followBtnText: {
      color: '#fff',
      fontSize: 12,
      fontFamily: theme.fonts.poppingsNormal,
    },
    followNameText: {
      fontSize: 12,
      fontFamily: theme.fonts.poppingsNormal,
      fontWeight: '500',
    },
    followNameText2: {
      fontSize: 10,
      fontFamily: theme.fonts.poppingsNormal,
      fontWeight: '400',
      color: theme.colors.secondaryText,
    },
    privateAccountView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerView: {
      width: '100%',
      height: 30,
    },
    optionsView: {
      width: '100%',
      height: '78%',
      marginTop: 10,
    },
    firstIndexTintColor: {
      tintColor: theme.colors.lightBlueBg,
    },
    secondIndexTintColor: {
      tintColor: theme.colors.drawerText,
    },
  });
};

export default styles;
