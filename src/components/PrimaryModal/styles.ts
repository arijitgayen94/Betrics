import {StyleSheet} from 'react-native';

const styles = (theme: any) => {
  return StyleSheet.create({
    modalContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalBody: {
      width: '85%',
      backgroundColor: 'white',
      shadowColor: theme.colors.primaryShadow,
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
      borderTopEndRadius: 8,
      borderTopStartRadius: 8,
      marginTop: 5,
    },
    modalHeader: {
      width: '100%',
      height: 50,
      backgroundColor: '#00316B',
      borderTopStartRadius: 8,
      borderTopEndRadius: 8,
      justifyContent: 'center',
    },
    modalTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: 'white',
      marginLeft: 15,
    },
    closeBtn: {
      position: 'absolute',
      right: 5,
      top: 5,
    },
  });
};

export default styles;
