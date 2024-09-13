import {StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      height: '100%',
      width: '100%',
      paddingHorizontal: 26,
      paddingTop: 12,
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
    errorText: {
      textAlign: 'left',
      width: '85%',
      marginTop: 2,
      paddingLeft: 5,
      fontSize: 12,
      color: 'red',
      fontFamily: theme.fonts.poppingsNormal,
    },
  });
};

export default styles;
