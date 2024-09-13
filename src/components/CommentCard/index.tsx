import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
// import {HEART_ICON_BLUE} from '../../assets';
import useStyles from './styles';
import {any, string, bool} from 'prop-types';

interface CommentCardProps {
  navigation: any;
  userImage: string;
  userId: string;
  name: string;
  commentId: string;
  text: string;
  isYourComment: boolean;
  createdAt: string;
  showModal: (e: string) => void;
}

const CommentCard = (props: CommentCardProps) => {
  const {
    commentId,
    createdAt,
    // userId,
    userImage,
    name,
    text,
    showModal,
  } = props;
  const theme = useTheme();
  const styles = useStyles(theme);

  const timeDiffCalc = (date: any) => {
    let diffTime = Math.abs(new Date().valueOf() - new Date(date).valueOf());
    let days = diffTime / (24 * 60 * 60 * 1000);
    let hours = (days % 1) * 24;
    let minutes = (hours % 1) * 60;
    let secs = (minutes % 1) * 60;
    [days, hours, minutes, secs] = [
      Math.floor(days),
      Math.floor(hours),
      Math.floor(minutes),
      Math.floor(secs),
    ];
    if (days > 0) {
      return days + 'd';
    } else if (hours > 0) {
      return hours + 'h';
    } else if (minutes > 0) {
      return minutes + 'm';
    } else {
      return secs + 's';
    }
  };
  return (
    <Pressable
      style={styles.mainContainer}
      onLongPress={() => showModal(commentId)}>
      <View style={styles.infoWrapper}>
        <View>
          <View style={styles.usernameAndAvatar}>
            <View style={styles.imgWrapper}>
              <Image
                style={styles.avatar}
                source={{
                  uri: userImage,
                }}
              />
            </View>
            <View style={styles.username}>
              <Text style={styles.nameText}>{name}</Text>
              <Text style={styles.commentText}>{text}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.durationText}>{timeDiffCalc(createdAt)}</Text>
      </View>
      {/* <View style={styles.actionWrapper}>
        <View style={styles.flexRow}>
          <Text style={[styles.actionText, styles.blueText]}>
            View 2 replies
          </Text>
          <Text style={[styles.actionText, styles.ml40]}>Reply</Text>
        </View>
        <View style={styles.flexRow}>
          <Image source={HEART_ICON_BLUE} />
          <Text style={[styles.actionText, styles.ml5]}>1331 likes</Text>
        </View>
      </View> */}
    </Pressable>
  );
};

CommentCard.propTypes = {
  navigation: any,
  userImage: string,
  userId: string,
  name: string,
  commentId: string,
  text: string,
  isYourComment: bool,
  createdAt: string,
  showModal: any,
};

export default CommentCard;
