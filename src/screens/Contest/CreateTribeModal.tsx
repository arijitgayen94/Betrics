import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {Text, TextInput, View} from 'react-native';
import useStyles from '../Tribe/stylesJoinTribe';
import {PrimaryButton, PrimaryModal} from '../../components';
import {Switch} from 'react-native-switch';

interface JoinTribeModalProps {
  showCreateTribeModal: boolean;
  closeCreateTribeModal: () => void;
  createNewTribe: ({
    name,
    is_public,
  }: {
    name: string;
    is_public: boolean;
  }) => void;
}

const CreateTribeModal = (props: JoinTribeModalProps) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const [newTribeData, setNewTribeData] = useState<any>({
    logo: '',
    name: '',
    is_public: false,
  });

  return (
    <PrimaryModal
      visible={props.showCreateTribeModal}
      headerTitle={'Create Tribe'}
      handleClose={props.closeCreateTribeModal}>
      <View style={styles.modalChildren}>
        <View style={styles.modalContentWrapper}>
          <View style={styles.inputStyleWr}>
            <Text>Name</Text>
            <TextInput
              value={newTribeData.name}
              onChangeText={text =>
                setNewTribeData({...newTribeData, name: text})
              }
              keyboardType="default"
              style={styles.inputStyle}
            />
          </View>
        </View>
        <View style={styles.modalContentWrapper}>
          <View style={[styles.inputStyleWr, styles.inlineStyleWr]}>
            <Text>Private</Text>
            <Switch
              value={newTribeData.is_public}
              onValueChange={isOn =>
                setNewTribeData({...newTribeData, is_public: isOn})
              }
              disabled={false}
              activeText={'ON'}
              barHeight={30}
              circleBorderWidth={1}
              inActiveText={'OFF'}
              backgroundActive={'#009BDB'}
              backgroundInactive={'#E3E3E3'}
              circleActiveColor={'#ffffff'}
              circleInActiveColor={'#ffffff'}
              switchWidthMultiplier={3}
            />
          </View>
        </View>
        <View style={styles.modalFooterBtnWrapper}>
          <PrimaryButton
            style={styles.w40}
            text="Close"
            gradientStyle={styles.modalGradientBtn}
            textStyle={[styles.btnTextStyle, styles.ph15]}
            handleClick={props.closeCreateTribeModal}
            gradientColors={theme.colors.primaryGradient}
            isLoading={false}
          />
          <PrimaryButton
            style={[styles.w45, styles.ml15]}
            text="Save"
            gradientStyle={styles.modalGradientBtn}
            textStyle={[styles.btnTextStyle, styles.ph15]}
            handleClick={() =>
              props.createNewTribe({
                name: newTribeData.name,
                is_public: newTribeData.is_public,
              })
            }
            gradientColors={theme.colors.secondaryGradient}
            isLoading={false}
          />
        </View>
      </View>
    </PrimaryModal>
  );
};

export default CreateTribeModal;
