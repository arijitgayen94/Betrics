import React from 'react';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {Image} from 'react-native';
import {TEAM_AVATAR_ICON} from '../../assets';

const WrTeamAvatar = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);

  return (
    <Image
      style={styles.teamAvatarIcon24}
      source={props.src ? props.src : TEAM_AVATAR_ICON}
    />
  );
};

export default WrTeamAvatar;
