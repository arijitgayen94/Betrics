import {StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    containerView: {
      flex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    opacityView: {
      height: '100%',
      width: '100%',
      backgroundColor: theme.colors.primaryText,
      opacity: 0.7,
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    containView: {
      width: '80%',
      height: '80%',
      backgroundColor: theme.colors.primaryText,
      borderRadius: 10,
      padding: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 20,
    },
    premiumText: {
      width: '100%',
      textAlign: 'auto',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: theme.fonts.poppingsNormal,
    },
    btnSignup: {
      width: '100%',
      marginTop: 15,
    },
    btnGradient: {
      paddingVertical: 14,
      borderRadius: 8,
    },
    btnText: {
      textAlign: 'center',
      fontSize: 15,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.primaryText,
    },
    premiumBox: {
      width: '100%',
      borderRadius: 20,
      borderColor: theme.colors.secondaryText,
      borderWidth: 1,
      marginTop: 10,
      padding: 10,
    },
    premiumOptionView: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      width: '100%',
      justifyContent: 'space-evenly',
      marginVertical: 10,
    },
    premiumOptionText: {
      marginLeft: 10,
      width: '90%',
      fontSize: 15,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
    },
    whySubText: {
      width: '100%',
      fontSize: 15,
      fontFamily: theme.fonts.poppingsNormal,
      color: theme.colors.secondaryText,
      marginTop: 20,
    },
  });
};

export default styles;
