import React, {useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {BaseLayout} from '../../layout';
import {Alert, Text, View} from 'react-native';
import {SecondaryButton} from '../../components';
import useStyles from './styles';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  deactivateAccountAction,
  deleteAccountAction,
} from '../../redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {LOGIN} from '../../routes/const';

type DeleteAccount = StackNavigationProp<PostLoginParamList, 'DeleteAccount'>;

const DeleteAccount = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<DeleteAccount>();
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelector((state: any) => state.authReducer);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const deactivateButtonPressed = () => {
    Alert.alert('Are you sure you want to deactivate account?', '', [
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(deactivateAccountAction(user.uuid, onSuccess, onError));
        },
      },
    ]);
  };
  const deleteButtonPressed = async () => {
    Alert.alert('Are you sure you want to delete account?', '', [
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(deleteAccountAction(user.uuid, onSuccess, onError));
        },
      },
    ]);
  };
  const onSuccess = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        auth().signOut();
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userDetails');
        navigation.reset({
          index: 0,
          routes: [{name: LOGIN}],
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userDetails');
      navigation.reset({
        index: 0,
        routes: [{name: LOGIN}],
      });
    }
  };
  const onError = () => {};

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Delete Account"
      navigation={navigation}
      renderScrollview={true}>
      <View style={styles.contentPage}>
        <Text style={styles.contentPageText}>
          Betrics Co. is not happy, to see you leaving us. If is there any
          feature and functionality are missing please tell us, we will improve,
          You can reach us by writing email on support@betrics.io .
        </Text>

        <Text style={styles.contentPageSubHeading}>Deactivate account :</Text>
        <Text style={styles.contentPageText}>
          {
            '\u2022 If you deactivate your account then we will automatic cancel you existing subscription.'
          }
        </Text>
        <Text style={styles.contentPageText}>
          {'\u2022 No refund will be credit.'}
        </Text>
        <Text style={styles.contentPageText}>
          {'\u2022 You cannot re-login in your account.'}
        </Text>
        <Text style={styles.contentPageText}>
          {
            '\u2022 If in future you want to come again, then you can contact with our support team.'
          }
        </Text>
        <Text style={styles.contentPageText}>
          {'\u2022 No any existing data will remove from your account.'}
        </Text>
        <Text style={styles.contentPageText}>
          {'\u2022 We will not sell and share your any kind of  data.'}
        </Text>

        <Text style={styles.contentPageSubHeading}>Delete Account :</Text>
        <Text style={styles.contentPageText}>
          {'\u2022 Once you deleted your account, then you cannot recover it.'}
        </Text>
        <Text style={styles.contentPageText}>
          {'\u2022 All data will be erased from database.'}
        </Text>
        <Text style={styles.contentPageText}>
          {'\u2022 Any current active subscription will be cancelled.'}
        </Text>
        <Text style={styles.contentPageText}>
          {'\u2022 No refund will be credit.'}
        </Text>
      </View>
      <View style={styles.contentPage}>
        <BouncyCheckbox
          size={20}
          fillColor={theme.colors.lightBlueBg}
          unfillColor={theme.colors.primaryBg}
          textComponent={
            <Text style={styles.checkboxText}>
              Yes, I want to deactivate / delete my account
            </Text>
          }
          iconStyle={styles.checkboxIcon}
          isChecked={isChecked}
          onPress={() => setIsChecked(!isChecked)}
        />
      </View>
      <View style={styles.contentPageActions}>
        <View style={styles.contentPageActionsView}>
          <SecondaryButton
            style={styles.secondaryButtonStyle}
            handleClick={() => deactivateButtonPressed()}
            textStyle={styles.secondaryButtonTextStyle}
            text="Deactivate Account"
            disabled={!isChecked}
          />
        </View>
        <View style={styles.contentPageActionsView}>
          <SecondaryButton
            style={styles.primaryButton}
            text="Delete Account"
            handleClick={() => deleteButtonPressed()}
            textStyle={styles.secondaryButtonTextStyle}
            disabled={!isChecked}
          />
        </View>
      </View>
    </BaseLayout>
  );
};

export default DeleteAccount;
