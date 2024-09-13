import React from 'react';
import useStyles from './styles';
// import {useTheme} from '@react-navigation/native';
import Modal from 'react-native-modal';

interface SlidingModal {
  isModalVisible: boolean;
  toggleModal: () => void;
  children: any;
}

const SlidingModal = (props: SlidingModal) => {
  // const theme = useTheme();
  const styles = useStyles();
  const {isModalVisible, toggleModal, children} = props;

  return (
    <Modal
      onBackdropPress={toggleModal}
      style={styles.modalWrapper}
      animationIn="slideInUp"
      animationOut={'slideOutDown'}
      isVisible={isModalVisible}>
      {children}
    </Modal>
  );
};

SlidingModal.propTypes = {};

export {SlidingModal};
