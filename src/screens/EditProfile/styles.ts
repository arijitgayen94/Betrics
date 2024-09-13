import {Dimensions, Platform, StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      height: '100%',
      width: '100%',
      paddingHorizontal: 26,
      paddingTop: 32,
    },
    imageWrapper: {
      shadowColor: theme.colors.primaryShadow,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 4,
      position: 'relative',
      width: 65,
      alignSelf: 'center',
    },
    profileImage: {
      height: 65,
      width: 65,
      borderRadius: 5,
    },
    editIconWrapper: {
      backgroundColor: theme.colors.lightBlueBg,
      borderWidth: 1,
      borderColor: 'white',
      width: 20,
      height: 20,
      borderRadius: 50,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: -8,
      right: -8,
    },
    containerStyle: {marginTop: 20, width: '100%'},
    mt40: {marginTop: 41},
    labelStyle: {
      fontWeight: '500',
      fontSize: 13,
      fontFamily: theme.fonts.poppingsNormal,
      color: '#19151F',
      marginBottom: 10,
    },
    inputStyle: {width: '100%'},
    btnStyle: {width: '100%', marginTop: 30},
    gradientStyle: {
      paddingVertical: 14,
      borderRadius: 4,
      justifyContent: 'center',
    },
    btnTextStyle: {
      fontWeight: '500',
      fontSize: 18,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
      textAlign: 'center',
    },
    inputContainer: {
      marginTop: 20,
      width: '100%',
    },
    phoneNumberLable: {
      fontWeight: '500',
      fontSize: 13,
      fontFamily: theme.fonts.poppingsNormal,
      color: '#19151F',
      marginTop: 20,
      marginBottom: -10,
    },
    genderLabel: {
      fontWeight: '500',
      fontSize: 13,
      fontFamily: theme.fonts.poppingsNormal,
      color: '#19151F',
      marginTop: 20,
      marginBottom: 10,
    },
    width100: {width: '100%'},
    buttonStyle: {
      width: 30,
      height: 30,
    },
    height50: {height: 50},
    button: {
      marginTop: Platform.OS === 'ios' ? 10 : 0,
      padding: 10,
      position: 'absolute',
    },
    imageStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      marginTop: (Dimensions.get('window').height * -1) / 10,
    },
    modalScreen: {
      flex: 1,
      marginLeft: -20,
    },
    birthdateView: {
      width: '100%',
      height: 50,
      borderColor: theme.colors.grayBg,
      borderWidth: 1,
      borderRadius: 10,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
  });
};

export default styles;
