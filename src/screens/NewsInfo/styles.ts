import {Dimensions, StyleSheet, Platform} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: theme.colors.primaryBg,
      flex: 1,
      width: Dimensions.get('window').width,
      alignItems: 'center',
    },
    flex1: {
      flex: 1,
    },
    userInfoRow: {
      flexDirection: 'row',
      width: Dimensions.get('window').width * 0.9,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(128, 128, 128, 0.2)',
      paddingHorizontal: 16,
      paddingVertical: 13,
      borderRadius: 8,
      marginTop: 20,
    },
    usernameAndAvatar: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      height: 46,
      width: 46,
      borderRadius: 50,
    },
    username: {
      marginLeft: 14,
    },
    titleText: {
      fontSize: 15,
      color: theme.colors.drawerText,
      fontWeight: '500',
      fontFamily: theme.fonts.poppingsNormal,
    },
    nickNameText: {
      fontSize: 12,
      color: theme.colors.secondaryText,
      fontWeight: '500',
      fontFamily: theme.fonts.poppingsNormal,
    },
    nameText: {
      fontSize: 12,
      color: theme.colors.secondaryText,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
    },
    feedImageRow: {
      width: Dimensions.get('window').width * 0.9,
      marginTop: 20,
      borderRadius: 4,
      overflow: 'hidden',
    },
    feedImage: {
      height: 140,
    },
    extraView: {width: '100%', height: 80},
    squareImage: {
      width: Dimensions.get('window').width * 0.9,
      height: Dimensions.get('window').width * 0.8,
      borderWidth: 1,
      borderColor: theme.colors.secondaryText,
    },
    protraitImage: {
      width: Dimensions.get('window').width * 0.9,
      height: Dimensions.get('window').width * 1.6,
      borderWidth: 1,
      borderColor: theme.colors.secondaryText,
    },
    landscapeImage: {
      width: Dimensions.get('window').width * 0.9,
      height: Dimensions.get('window').width * 0.45,
      borderWidth: 1,
      borderColor: theme.colors.secondaryText,
    },
    feedInfoRow: {
      marginTop: 20,
      width: '90%',
      marginBottom: 70,
    },
    descText: {
      fontSize: 14,
      color: theme.colors.secondaryText,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      marginTop: 8,
      width: Dimensions.get('window').width * 0.9,
    },
    linkColor: {color: '#2980b9'},
    footerRow: {
      marginTop: 20,
      width: Dimensions.get('window').width,
      flexDirection: 'row',
      backgroundColor: theme.colors.lightGrayBg,
      justifyContent: 'space-between',
      paddingVertical: 20,
      paddingHorizontal: 20,
      position: 'absolute',
      alignSelf: 'flex-end',
      bottom: 0,
    },
    footerActionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    footerActionText: {
      color: theme.colors.secondaryText,
      fontSize: 10,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      marginLeft: 7,
    },
    likeImg: {width: 20, height: 20},
    flexD: {
      flexDirection: 'row',
    },
    ml17: {
      marginLeft: 17,
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
    disableButton: {
      opacity: 0.5,
    },
    topView: {
      height: 100,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginTop: -30,
      marginLeft: -10,
    },
    buttonStyle: {
      width: 30,
      height: 30,
    },
    modalView: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      marginLeft: -15,
      marginTop: Platform.OS === 'ios' ? 10 : 0,
      padding: 10,
    },
    imageStyle: {
      width: '100%',
      height: '90%',
    },
    modalScreen: {
      flex: 1,
    },
  });
};

export default styles;
