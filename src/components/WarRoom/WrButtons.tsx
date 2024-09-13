import React from 'react';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {Image, Platform, View} from 'react-native';
import {OutlineButton} from '../OutlineButton';

const WrButtons = (props: {
  matchup: any;
  onSelect: any;
  seletedTeam: string;
}) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);

  const matchup = props.matchup;

  const getIcon = (url: string) => {
    if (url && Platform.OS === 'android') {
      return <Image style={styles.teamAvatarRowIcon24} source={{uri: url}} />;
    }
    return '';
  };

  return (
    <View style={styles.WrGlCCard}>
      <View style={styles.WrMGVTeamButtons}>
        <OutlineButton
          icon={getIcon(matchup?.away?.icon)}
          style={
            props.seletedTeam === 'away'
              ? styles.primaryOutlineButtonStyle
              : styles.secondaryOutlineButtonStyle
          }
          onPress={() => props.onSelect && props.onSelect('away')}
          textStyle={styles.primaryOutlineTextStyle}
          text={matchup?.away?.abbreviation}
        />
        <OutlineButton
          icon={getIcon(matchup?.home?.icon)}
          style={
            props.seletedTeam === 'home'
              ? styles.primaryOutlineButtonStyle
              : styles.secondaryOutlineButtonStyle
          }
          onPress={() => props.onSelect && props.onSelect('home')}
          textStyle={styles.secondaryOutlineTextStyle}
          text={matchup?.home?.abbreviation}
        />
      </View>
    </View>
  );
};

export default WrButtons;
