import React, {useState} from 'react';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Linking,
} from 'react-native';
import {
  MORE_MENU_ICON_IMG,
  CALENDER_ICON_IMG,
  COMMENT_ICON_IMG,
  HEART_FEED,
} from '../../assets';
import {SlidingModal} from '../SlidingModal';
import {
  COMMENTS,
  CREATE_POST,
  NEWS_INFO,
  REPORTPOST,
  USERPROFILE,
} from '../../routes/const';
import {any, string, bool, number} from 'prop-types';
import toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {AppDispatch, deletePostAction, postLikeUnlikeAction} from '../../redux';
import Hyperlink from 'react-native-hyperlink';
interface FeedCardProps {
  item: any;
  index: number;
  navigation: any;
  nickName: string;
  images: any;
  userProfile: string;
  name: string;
  userId: string;
  totalLikes: number;
  totalComments: number;
  isLikeByUser: boolean;
  likedEmoji: string;
  createdAt: string;
  post: string;
  postId: string;
  disableLike: boolean;
  disableComment: boolean;
  isYourFeed: boolean;
  disableShare: boolean;
  onShowDismissCard?: (e?: boolean) => void;
  isScrollEnable?: boolean;
  updateCount: (e: number) => void;
  updatePost: (e: number) => void;
  containerStyle?: any;
  fromUserDashboard?: boolean;
}

const FeedCard = (props: FeedCardProps) => {
  const {
    item,
    index,
    navigation,
    nickName,
    images,
    userProfile,
    name,
    totalLikes,
    totalComments,
    isLikeByUser,
    createdAt,
    isYourFeed,
    post,
    postId,
    disableComment,
    disableLike,
    updateCount,
    updatePost,
    fromUserDashboard,
  } = props;
  const theme = useTheme();
  const styles = useStyles(theme);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const renderRow = (image: any) => {
    return image.map((uri: any, i: number) => {
      return (
        <Image
          key={i}
          resizeMode="cover"
          style={[styles.feedImage, styles.w50]}
          source={{uri: uri.image}}
        />
      );
    });
  };

  const deletePost = () => {
    dispatch(
      deletePostAction(postId, () => {
        updatePost(index);
        toast.show('Post deleted successfully', 2);
      }),
    );
  };

  const likeUnlikePost = () => {
    const body = isLikeByUser
      ? {feed_uuid: postId}
      : {feed_uuid: postId, emoji: 'LIKE'};
    updateCount(index);
    dispatch(postLikeUnlikeAction(body, () => {}));
  };

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
    <>
      <View style={[styles.mainContainer, props.containerStyle]}>
        <View style={styles.userInfoRow}>
          <Pressable
            style={styles.usernameAndAvatar}
            onPress={() => {
              if (!fromUserDashboard) {
                navigation.navigate(USERPROFILE, {
                  userId: item.user_uuid,
                });
              }
            }}>
            <Image
              style={styles.avatar}
              source={{
                uri: userProfile,
              }}
            />
            <View style={styles.username}>
              <Text style={styles.titleText}>{name}</Text>
              <Text style={styles.nickNameText}>{nickName}</Text>
            </View>
          </Pressable>
          <TouchableOpacity onPress={toggleModal} style={[styles.threeDotBox]}>
            <Image source={MORE_MENU_ICON_IMG} />
          </TouchableOpacity>
        </View>
        {images.length > 0 && (
          <Pressable
            style={styles.feedImageRow}
            onPress={() => navigation.navigate(NEWS_INFO, {postId: postId})}>
            {images.length === 1 && (
              <Image
                style={styles.feedImage}
                resizeMode="cover"
                source={{
                  uri: images[0].image,
                }}
              />
            )}
            {images.length > 1 && (
              <View style={styles.rowImage}>
                {renderRow(images)}
                {images.length > 2 && (
                  <>
                    <View style={styles.opacityView} />
                    <View style={styles.extraImageView}>
                      <Text style={styles.extraImageText}>
                        +{images.length - 1}
                      </Text>
                    </View>
                  </>
                )}
              </View>
            )}
          </Pressable>
        )}
        {post.length > 0 && (
          <View style={styles.feedInfoRow}>
            <Hyperlink
              onPress={url => Linking.openURL(url)}
              linkStyle={styles.linkText}>
              <Text style={styles.descText} numberOfLines={2}>
                {post}
              </Text>
            </Hyperlink>
            {post.length > 70 && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(NEWS_INFO, {postId: postId});
                }}>
                <Text style={styles.moreText}>More..</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.footerRow}>
          <View style={styles.footerActionContainer}>
            <Image source={CALENDER_ICON_IMG} />
            <Text style={styles.footerActionText}>
              {timeDiffCalc(createdAt)}
            </Text>
          </View>
          <Pressable
            disabled={disableLike}
            style={
              disableLike
                ? [styles.flexD, styles.disableButton, {padding: 5}]
                : [styles.flexD, styles.extraHitBox]
            }
            onPress={() => likeUnlikePost()}>
            <Image
              source={HEART_FEED}
              style={[
                styles.iconSize,
                isLikeByUser ? styles.likedIconColor : styles.disLikeIconColor,
              ]}
            />
            <Text style={styles.footerActionText}>{totalLikes}</Text>
          </Pressable>
          {/* </Reaction> */}
          <TouchableOpacity
            disabled={disableComment}
            onPress={() => navigation.navigate(COMMENTS, {postId: postId})}
            style={
              disableComment
                ? [styles.footerActionContainer, styles.disableButton]
                : [styles.footerActionContainer, styles.extraHitBox]
            }>
            <Image source={COMMENT_ICON_IMG} style={styles.iconSize} />
            <Text style={styles.footerActionText}>{totalComments}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SlidingModal isModalVisible={isModalVisible} toggleModal={toggleModal}>
        <View style={styles.modalInnerContainer}>
          <View style={styles.handleBar} />
          <View style={styles.textWrapper}>
            {isYourFeed ? (
              <>
                {/* <TouchableOpacity onPress={toggleModal}>
                  <Text style={styles.modalText}>
                    Turn on Post Notifications
                  </Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => {
                    toggleModal(),
                      navigation.navigate(CREATE_POST, {
                        mode: 'edit',
                        postDetails: item,
                      });
                  }}>
                  <Text style={styles.modalText}>Edit post</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    toggleModal(), deletePost();
                  }}>
                  <Text style={styles.modalText}>Delete post</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(!isModalVisible);
                    navigation.navigate(REPORTPOST, {postId});
                  }}>
                  <Text style={styles.modalText}>Report</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </SlidingModal>
    </>
  );
};

FeedCard.propTypes = {
  item: any,
  index: number,
  navigation: any,
  images: any,
  userProfile: string,
  name: string,
  userId: string,
  totalLikes: number,
  totalComments: number,
  isLikeByUser: bool,
  likedEmoji: string,
  createdAt: string,
  post: string,
  postId: string,
  isYourFeed: bool,
  disableLike: bool,
  disableComment: bool,
  disableShare: bool,
  isScrollEnable: bool,
  updatePost: any,
};

export {FeedCard};
