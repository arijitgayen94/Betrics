import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainContainer: {
      width: Dimensions.get('window').width * 0.9,
      borderColor: theme.colors.primaryBorder,
      borderWidth: 1,
      backgroundColor: 'white',
      borderRadius: 4,
      alignItems: 'center',
      paddingTop: 15,
      paddingBottom: 18,
      marginTop: 7,
      marginBottom: 7,
    },
    userInfoRow: {
      flexDirection: 'row',
      width: '90%',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      fontSize: 14,
      color: theme.colors.blackText,
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
      width: '90%',
      height: Dimensions.get('window').width - 80,
      marginTop: 15,
      borderRadius: 4,
      overflow: 'hidden',
    },
    feedImage: {
      height: '100%',
      width: '100%',
    },
    w50: {
      width: '50%',
    },
    feedActionIcon: {
      position: 'absolute',
      right: 8,
      top: 8,
    },
    feedInfoRow: {
      marginTop: 10,
      width: '90%',
    },
    descText: {
      fontSize: 12,
      color: theme.colors.secondaryText,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      marginTop: 8,
      width: '100%',
    },
    moreText: {
      color: theme.colors.lightBlueBg,
      alignSelf: 'flex-end',
      fontSize: 10,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
    },
    footerRow: {
      marginTop: 10,
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
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
    flexD: {
      flexDirection: 'row',
      alignItems: 'center',
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
    rowImage: {
      height: Dimensions.get('window').width - 80,
      width: '100%',
      flexDirection: 'row',
    },
    opacityView: {
      width: '50%',
      height: '100%',
      backgroundColor: '#000',
      position: 'absolute',
      right: 0,
      opacity: 0.5,
    },
    extraImageView: {
      width: '50%',
      height: '100%',
      position: 'absolute',
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    extraImageText: {
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
      fontSize: 25,
    },
    disableButton: {
      opacity: 0.5,
    },
    extraHitBox: {
      width: 60,
      padding: 5,
      justifyContent: 'center',
    },
    threeDotBox: {
      height: 30,
      width: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    linkText: {
      color: '#2980b9',
    },
    iconSize: {width: 20, height: 20},
    likedIconColor: {
      tintColor: theme.colors.lightBlueText,
    },
    disLikeIconColor: {
      tintColor: theme.colors.blacktext,
    },
  });
};

export default styles;
