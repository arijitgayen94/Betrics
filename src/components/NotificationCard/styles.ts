import {Dimensions, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainContainer: {
      width: Dimensions.get('window').width * 0.9,
      backgroundColor: theme.colors.lightGrayBg,
      borderRadius: 4,
      paddingHorizontal: 5,
      paddingVertical: 15,
      marginTop: 15,
    },
    infoWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 10,
    },
    usernameAndAvatar: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    imgWrapper: {
      shadowColor: theme.colors.primaryShadow,
      shadowOffset: {width: 2, height: 1},
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 4,
    },
    avatar: {
      height: 31,
      width: 31,
      borderRadius: 50,
    },
    username: {
      marginLeft: 10,
      width: '90%',
    },
    nameText: {
      fontSize: 13,
      color: theme.colors.drawerText,
      fontWeight: '500',
      fontFamily: theme.fonts.poppingsNormal,
    },
    commentText: {
      fontSize: 12,
      color: theme.colors.secondaryText,
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
    },
    durationText: {
      color: theme.colors.lightBlueText,
      fontSize: 10,
      fontWeight: '500',
      marginTop: -10,
      marginLeft: -10,
    },
    actionWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 15,
      marginTop: 20,
    },
    actionText: {
      fontWeight: '400',
      fontFamily: theme.fonts.poppingsNormal,
      fontSize: 10,
      color: theme.colors.secondaryText,
    },
    flexRow: {
      flexDirection: 'row',
    },
    ml40: {
      marginLeft: 40,
    },
    ml5: {
      marginLeft: 5,
    },
    blueText: {
      color: theme.colors.lightBlueText,
    },
    width90: {width: '90%'},
  });
};

export default styles;
