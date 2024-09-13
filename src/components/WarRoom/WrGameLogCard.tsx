import React, {useEffect, useState} from 'react';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {Image, Platform, View} from 'react-native';
import {OutlineButton} from '../OutlineButton';

const WrGameLogCard = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);

  const [selectedButton, setSelectedButton] = useState('away');

  const matchup = props.matchup;

  const getIcon = (url: string) => {
    if (url && Platform.OS === 'android') {
      return <Image style={styles.teamAvatarRowIcon24} source={{uri: url}} />;
    }
    return '';
  };
  useEffect(() => {
    props.changeTeam(selectedButton);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedButton]);

  return (
    <View style={styles.WrGlCCard}>
      <View style={styles.WrMGVTeamButtons}>
        <OutlineButton
          icon={getIcon(matchup?.away?.icon)}
          style={
            selectedButton === 'away'
              ? styles.primaryOutlineButtonStyle
              : styles.secondaryOutlineButtonStyle
          }
          onPress={() => setSelectedButton('away')}
          textStyle={styles.primaryOutlineTextStyle}
          text={matchup?.away?.abbreviation}
        />
        <OutlineButton
          icon={getIcon(matchup?.home?.icon)}
          style={
            selectedButton === 'home'
              ? styles.primaryOutlineButtonStyle
              : styles.secondaryOutlineButtonStyle
          }
          onPress={() => setSelectedButton('home')}
          textStyle={styles.secondaryOutlineTextStyle}
          text={matchup?.home?.abbreviation}
        />
      </View>
    </View>
  );
};

export default WrGameLogCard;
