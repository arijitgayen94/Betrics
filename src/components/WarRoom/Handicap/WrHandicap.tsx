import React, {useEffect, useState} from 'react';
import useStyles from '../styles';
import {useTheme} from '@react-navigation/native';
import {Platform, Text, View} from 'react-native';
// import {Table, Row, Rows} from 'react-native-table-component';
import {PrimaryButton} from '../../PrimaryButton';
import {SecondaryButton} from '../../SecondaryButton';
// import {HELP_CIRCLE, TEAM_AVATAR_ICON} from '../../../assets';
import WrTeamAvatar from '../WrTeamAvatar';
import {PrimaryInput} from '../../PrimaryInput';
import {useDispatch, useSelector} from 'react-redux';
import {capitalizeFirstLetter} from '../../../service/helperFunction';
import {
  AppDispatch,
  getHandicapAction,
  patchHandicapAction,
  resetHandicapAction,
} from '../../../redux';
import toast from 'react-native-simple-toast';

const WrHandiCap = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const sportName = useSelector((state: any) => state.authReducer.sport);
  const matchup = props.matchup;

  const match_id = matchup?.match_id;
  const book = matchup?.book_id;

  const [handicapData, setHandicapData] = useState<any>({});
  const [change, setChange] = useState<boolean>(false);
  const [saveLoader, setSaveLoader] = useState<boolean>(false);
  const [resetLoader, setResetLoader] = useState<boolean>(false);

  const getHandicapCb = (data: any) => {
    setHandicapData(data);
  };

  const loadHandicapData = () => {
    if (match_id && book && sportName && !change) {
      dispatch(
        getHandicapAction(
          {
            match_id: match_id,
            book: book,
            sport_type: capitalizeFirstLetter(sportName),
          },
          sportName,
          getHandicapCb,
        ),
      );
    }
  };

  const handleOnChange = (key: string, value: string) => {
    const updatedHandicapData = {...handicapData, [key]: value};
    setHandicapData(updatedHandicapData);
    setChange(true);
  };

  const saveHandicap = () => {
    const reqData = {
      home_score: +handicapData.home_score,
      away_score: +handicapData.away_score,
    };
    setSaveLoader(true);
    dispatch(
      patchHandicapAction(handicapData.uuid, reqData, sportName, response => {
        if (response) {
          toast.show('Handicap updated successfully');
          setChange(false);
          setSaveLoader(false);
        }
      }),
    );
    setTimeout(() => {
      setSaveLoader(false);
    }, 5000);
  };

  const resetHandicap = () => {
    setResetLoader(true);
    dispatch(
      resetHandicapAction(handicapData.uuid, sportName, response => {
        if (response) {
          toast.show('Handicap reset successfully');
          setHandicapData(response);
          setChange(false);
          setResetLoader(false);
        }
      }),
    );
    setTimeout(() => {
      setResetLoader(false);
    }, 5000);
  };

  useEffect(() => {
    loadHandicapData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={styles.teamsCardsFull}>
        <View style={styles.teamCardFull}>
          {Platform.OS === 'android' && (
            <WrTeamAvatar
              src={{
                uri: matchup?.away?.icon,
              }}
            />
          )}
          <Text style={styles.teamHeadingStyle18}>
            {matchup?.away?.abbreviation}
          </Text>
          <Text style={styles.subHeadingStyle15}>{matchup?.away?.record}</Text>
        </View>
        <View>
          <PrimaryInput
            value={
              handicapData.away_score
                ? handicapData?.away_score?.toString()
                : ''
            }
            onChangeText={text => handleOnChange('away_score', text)}
            placeholder={
              handicapData.away_score
                ? handicapData?.away_score?.toString()
                : '0'
            }
            keyboardType="default"
            inputContainerStyle={styles.handicapCountInputCon}
            inputStyle={styles.handicapCountInput}
          />
        </View>
      </View>
      <View style={styles.teamsCardsFull}>
        <View style={styles.teamCardFull}>
          {Platform.OS === 'android' && (
            <WrTeamAvatar
              src={{
                uri: matchup?.home?.icon,
              }}
            />
          )}
          <Text style={styles.teamHeadingStyle18}>
            {matchup?.home?.abbreviation}
          </Text>
          <Text style={styles.subHeadingStyle15}>{matchup?.home?.record}</Text>
        </View>
        <View>
          <PrimaryInput
            value={
              handicapData.home_score
                ? handicapData?.home_score?.toString()
                : ''
            }
            onChangeText={text => handleOnChange('home_score', text)}
            placeholder={
              handicapData.home_score
                ? handicapData?.home_score?.toString()
                : '0'
            }
            keyboardType="default"
            inputContainerStyle={styles.handicapCountInputCon}
            inputStyle={styles.handicapCountInput}
          />
        </View>
      </View>

      <View style={styles.flexRow}>
        <View style={styles.flexCol}>
          <SecondaryButton
            style={styles.secondaryButtonStyleLight}
            handleClick={() => resetHandicap()}
            isLoading={resetLoader}
            textStyle={styles.secondaryButtonTextStyleLight}
            text="Reset"
          />
        </View>
        <View style={styles.flexCol}>
          <PrimaryButton
            text={'Save'}
            isLoading={saveLoader}
            style={styles.primaryButtonGradient}
            gradientStyle={styles.btnGradientStyle35}
            textStyle={styles.btnTextStyle}
            handleClick={() => saveHandicap()}
            gradientColors={theme.colors.secondaryGradient}
          />
        </View>
      </View>
    </>
  );
};

export default WrHandiCap;
