import React, {useEffect} from 'react';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {BaseLayout} from '../../layout';
import {Text, View} from 'react-native';
import {PrimaryButton, SecondaryButton} from '../../components';
import useStyles from './styles';
import {CONTEST} from '../../routes/const';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux';
import {reteriveContestDetailAction} from '../../redux/actions/contestAction';

type ContestParamList = StackNavigationProp<PostLoginParamList, 'Comments'>;

const TermsAndConditions = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<ContestParamList>();
  const route: any = useRoute();
  const dispatch = useDispatch<AppDispatch>();
  const contestDetails = useSelector(
    (state: any) => state.contestReducer.contestDetails,
  );

  const contestNavigator = (value: string) => {
    navigation.navigate(CONTEST, {
      termsandconditions: value,
      uuid: route.params.uuid,
    });
  };

  const tandchandler = (value: string) => {
    try {
      if (value === 'accepted') {
        contestNavigator(value);
      } else {
        contestNavigator(value);
      }
    } catch (error) {
      console.log('error in saving async storage');
    }
  };

  useEffect(() => {
    if (route.params && route.params.uuid) {
      dispatch(reteriveContestDetailAction(route.params.uuid));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Contest"
      navigation={navigation}
      renderScrollview={true}>
      <View style={styles.contentPage}>
        <Text style={styles.contentPageHeading}>1. Terms and Condition</Text>

        <Text style={styles.contentPageSubHeading}>1.1 Description</Text>
        <Text style={styles.contentPageText}>
          {contestDetails?.description}
        </Text>

        <Text style={styles.contentPageSubHeading}>1.2 Rules</Text>
        <Text style={styles.contentPageText}>{contestDetails?.rules}</Text>

        <Text style={styles.contentPageSubHeading}>1.3 Prize Description</Text>
        <Text style={styles.contentPageText}>
          {contestDetails?.prize_description}
        </Text>

        <Text style={styles.contentPageSubHeading}>1.4 Summary</Text>
        <Text style={styles.contentPageText}>{contestDetails?.summery}</Text>
      </View>
      <View style={styles.contentPageActions}>
        <View style={styles.contentPageActionsView}>
          <SecondaryButton
            style={styles.secondaryButtonStyle}
            handleClick={() => tandchandler('declined')}
            textStyle={styles.secondaryButtonTextStyle}
            text="I Decline"
          />
        </View>
        <View style={styles.contentPageActionsView}>
          <PrimaryButton
            style={styles.primaryButton}
            text="I accept"
            gradientStyle={styles.primaryButtonGradient}
            textStyle={styles.btnTextStyle}
            handleClick={() => tandchandler('accepted')}
            gradientColors={theme.colors.secondaryGradient}
          />
        </View>
      </View>
    </BaseLayout>
  );
};

export default TermsAndConditions;
