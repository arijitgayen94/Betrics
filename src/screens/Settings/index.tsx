import React from 'react';
import useStyles from './styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BaseLayout} from '../../layout';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ARROW_DOWN, USER_SETTING_ICON} from '../../assets';
import {CHANGE_PASSWORD, DELETEACCOUNT, EDIT_PROFILE} from '../../routes/const';

type SettingsParamList = StackNavigationProp<PostLoginParamList, 'Settings'>;
const Settings = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<SettingsParamList>();

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Settings"
      navigation={navigation}
      renderScrollview={false}>
      <View style={styles.mainContainer}>
        <View style={[styles.flexRow, styles.alignCenter]}>
          <Image source={USER_SETTING_ICON} />
          <Text style={styles.headingText}>Account</Text>
        </View>
        <View style={styles.separator} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(EDIT_PROFILE);
          }}
          style={[
            styles.flexRow,
            styles.alignCenter,
            styles.justifyBetween,
            styles.mb20,
          ]}>
          <Text style={styles.itemText}>Edit Profile</Text>
          <Image style={styles.rotate} source={ARROW_DOWN} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(CHANGE_PASSWORD);
          }}
          style={[
            styles.flexRow,
            styles.alignCenter,
            styles.justifyBetween,
            styles.mb24,
          ]}>
          <Text style={styles.itemText}>Change Password</Text>
          <Image style={styles.rotate} source={ARROW_DOWN} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(DELETEACCOUNT)}
          style={[
            styles.flexRow,
            styles.alignCenter,
            styles.justifyBetween,
            styles.mb24,
          ]}>
          <Text style={[styles.itemText, styles.redText]}>Delete Account</Text>
          <Image style={styles.rotate} source={ARROW_DOWN} />
        </TouchableOpacity>
      </View>
    </BaseLayout>
  );
};

export default Settings;
