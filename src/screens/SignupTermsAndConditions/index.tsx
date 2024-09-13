import React, {useEffect} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BaseLayout} from '../../layout';
import {Text, View} from 'react-native';
import useStyles from './styles';
import {RootStackParamList} from '../../routes/NavigationInnerContainer';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, getTermsAndConditions} from '../../redux';
import moment from 'moment';


type SignupTearmsandConditionParamList = StackNavigationProp<
  RootStackParamList,
  'SignupTermsAndConditions'
>;

const SignupTermsAndConditions = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<SignupTearmsandConditionParamList>();
  const dispatch = useDispatch<AppDispatch>();
  const {termsAndCondition} = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    dispatch(
      getTermsAndConditions(
        () => {},
        () => {},
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Terms and Condition"
      navigation={navigation}
      renderScrollview={true}>
      {termsAndCondition?.data && (
        <View style={styles.contentPage}>
          <Text style={styles.contentPageText}>{termsAndCondition.data}</Text>
          <Text style={styles.contentPageText}>
            Effective Date:{' '}
            {moment(termsAndCondition.created_at).format('YYYY-MM-DD')}
          </Text>
          <Text style={styles.contentPageText}>
            Last Updated:{' '}
            {moment(termsAndCondition.updated_at).format('YYYY-MM-DD')}
          </Text>
        </View>
      )}
    </BaseLayout>
  );
};

export default SignupTermsAndConditions;
