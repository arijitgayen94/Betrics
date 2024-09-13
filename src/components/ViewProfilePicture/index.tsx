import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {ARROW_LEFT_IMG} from '../../assets';

interface ViewProfilePictureProps {
  imageUrl: string;
  show: boolean;
  onClose: () => void;
}

const ViewProfilePicture = (props: ViewProfilePictureProps) => {
  const {imageUrl, show, onClose} = props;
  const theme: any = useTheme();
  const styles = useStyles(theme);

  return (
    <Modal isVisible={show} onBackButtonPress={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            source={{
              uri: imageUrl,
            }}
            style={styles.imageStyle}
            resizeMode="cover"
          />
        </View>
        <View style={styles.topView}>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Image source={ARROW_LEFT_IMG} style={styles.buttonStyle} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

ViewProfilePicture.propTypes = {
  imageUrl: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export {ViewProfilePicture};
