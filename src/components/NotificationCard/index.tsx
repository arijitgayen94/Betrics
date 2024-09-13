import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Image, Text, View} from 'react-native';
import useStyles from './styles';
import PropTypes from 'prop-types';
interface NotificationCardProps {
  id: string;
  title: string;
  body: string;
  image: string;
  createdAt: string;
  isRead: boolean;
  onBtnClick?: (id: string) => void;
}

const NotificationCard = (props: NotificationCardProps) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const timeDiffCalc = (date: any) => {
    let diffTime = Math.abs(new Date().valueOf() - new Date(date).valueOf());
    let years = diffTime / (365 * 24 * 60 * 60 * 1000);
    let months = (years % 1) * 12;
    let weeks = (months % 1) * 4;
    let days = (weeks % 1) * 7;
    let hours = (days % 1) * 24;
    let minutes = (hours % 1) * 60;
    let secs = (minutes % 1) * 60;
    [years, months, weeks, days, hours, minutes, secs] = [
      Math.floor(years),
      Math.floor(months),
      Math.floor(weeks),
      Math.floor(days),
      Math.floor(hours),
      Math.floor(minutes),
      Math.floor(secs),
    ];

    if (years > 0) {
      return years + ' y';
    } else if (months > 0) {
      return months + ' m';
    } else if (weeks > 0) {
      return weeks + ' w';
    } else if (days > 0) {
      return days + ' d';
    } else if (hours > 0) {
      return hours + ' h';
    } else if (minutes > 0) {
      return minutes + ' min';
    } else {
      return secs + ' s';
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.infoWrapper}>
        <View style={styles.width90}>
          <View style={styles.usernameAndAvatar}>
            <View style={styles.imgWrapper}>
              <Image
                style={styles.avatar}
                source={{
                  uri: props.image,
                }}
              />
            </View>
            <View style={styles.username}>
              <Text style={styles.nameText}>{props.title}</Text>
              <Text style={styles.commentText}>{props.body}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.durationText}>{timeDiffCalc(props.createdAt)}</Text>
      </View>
      {!props.isRead && props.id && (
        <View style={styles.actionWrapper}>
          <View style={styles.flexRow}>
            <Text
              style={[styles.actionText, styles.blueText]}
              onPress={() => props.onBtnClick(props.id)}>
              Mark as read
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
NotificationCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  image: PropTypes.string,
  createdAt: PropTypes.string,
  isRead: PropTypes.bool,
  onBtnClick: PropTypes.func,
};

export {NotificationCard};
