import React from 'react';
import {Image, Modal, Pressable, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {X_CIRCLE_IMG} from '../../assets';
import useStyles from './styles';

interface PrimaryModalProps {
  visible: boolean;
  children: any;
  headerTitle: string;
  width?: string;
  height?: string;
  handleClose: () => void;
}

const PrimaryModal = (props: PrimaryModalProps) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  return (
    <Modal visible={props?.visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View
          style={
            props.height
              ? [
                  styles.modalBody,
                  {
                    width: props.width ? props.width : '85%',
                    height: props.height,
                  },
                ]
              : [
                  styles.modalBody,
                  {
                    width: props.width ? props.width : '85%',
                  },
                ]
          }>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{props?.headerTitle}</Text>
            <Pressable style={styles.closeBtn} onPress={props?.handleClose}>
              <Image source={X_CIRCLE_IMG} />
            </Pressable>
          </View>
          {props?.children}
        </View>
      </View>
    </Modal>
  );
};

PrimaryModal.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node,
  headerTitle: PropTypes.string,
  handleClose: PropTypes.func,
};

export {PrimaryModal};
