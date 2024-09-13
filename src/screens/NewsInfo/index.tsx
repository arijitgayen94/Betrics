import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useStyles from './styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  CALENDER_ICON_IMG,
  COMMENT_ICON_IMG,
  MORE_MENU_ICON_IMG,
  LIKED,
  LIKE,
} from '../../assets';
import {StackNavigationProp} from '@react-navigation/stack';
import {COMMENTS, CREATE_POST, USERPROFILE} from '../../routes/const';
import {BaseLayout} from '../../layout';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {
  AppDispatch,
  deletePostAction,
  getFeedsDetailsAction,
  postLikeUnlikeAction,
  updateFeeds,
} from '../../redux';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {SlidingModal} from '../../components';
import toast from 'react-native-simple-toast';
import {ViewProfilePicture} from '../../components/ViewProfilePicture';
import Hyperlink from 'react-native-hyperlink';

type NewsInfoParamList = StackNavigationProp<PostLoginParamList, 'NewsInfo'>;

const NewsInfo = ({route}: any) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<NewsInfoParamList>();
  const {postId} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const feed = useSelector((state: any) => state.feedReducer.feeds);
  const [postDetails, setPostDetails] = useState<any>({});
  const [images, setImages] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageName, setImageName] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (postId) {
        callpostDetails();
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, navigation]);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const callpostDetails = () => {
    dispatch(
      getFeedsDetailsAction(postId, data => {
        setPostDetails(data), setImages(data.images);
      }),
    );
  };

  const likeUnlikePost = () => {
    const body = postDetails.is_liked_by_user
      ? {feed_uuid: postId}
      : {feed_uuid: postId, emoji: 'LIKE'};
    dispatch(
      postLikeUnlikeAction(body, () => {
        callpostDetails();
      }),
    );
    updatePostLikeCount();
  };
  const updatePostLikeCount = () => {
    let postFeeds = [...feed];
    const postIndex = feed.findIndex((x: any) => x.uuid === postId);
    if (postIndex > -1) {
      let post = postFeeds[postIndex];
      if (!post.is_liked_by_user) {
        post.liked_emoji = 'LIKE';
        post.total_likes = post.total_likes + 1;
        post.is_liked_by_user = true;
      } else {
        post.liked_emoji = '';
        post.total_likes = post.total_likes - 1;
        post.is_liked_by_user = false;
      }
      postFeeds[postIndex] = post;
      dispatch(updateFeeds(postFeeds));
    }
  };

  const renderFooter = () => {
    return (
      <View style={styles.footerRow}>
        <TouchableOpacity style={styles.footerActionContainer}>
          <Image source={CALENDER_ICON_IMG} />
          <Text style={styles.footerActionText}>
            {moment(postDetails.created_at).format('MMM DD, YYYY')}
          </Text>
        </TouchableOpacity>
        <Pressable
          disabled={postDetails.disable_like}
          style={
            postDetails.disable_like
              ? [styles.flexD, styles.disableButton, {padding: 5}]
              : [styles.flexD, {padding: 5}]
          }
          onPress={() => likeUnlikePost()}>
          <Image
            source={postDetails.is_liked_by_user ? LIKED : LIKE}
            style={styles.likeImg}
          />
          <Text style={styles.footerActionText}>{postDetails.total_likes}</Text>
        </Pressable>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(COMMENTS, {postId});
          }}
          disabled={postDetails.disable_comment}
          style={
            postDetails.disable_comment
              ? [styles.footerActionContainer, styles.disableButton]
              : [styles.footerActionContainer]
          }>
          <Image source={COMMENT_ICON_IMG} />
          <Text style={styles.footerActionText}>
            {postDetails.total_comments}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={[styles.footerActionContainer, styles.ml17]}>
          <Image source={SHARE_ICON_IMG} />
          <Text style={styles.footerActionText}>Share</Text>
        </TouchableOpacity> */}
      </View>
    );
  };

  const renderRow = () => {
    return images.map((uri, i) => {
      const imageType =
        uri.height === uri.width
          ? 'square'
          : uri.height > uri.width
          ? 'portrait'
          : 'landscape';
      return (
        <Pressable
          onPress={() => {
            setImageName(uri.image), setModalVisible(true);
          }}>
          <Image
            style={[
              imageType === 'square'
                ? styles.squareImage
                : imageType === 'portrait'
                ? styles.protraitImage
                : styles.landscapeImage,
              {marginTop: i > 0 ? 10 : 0},
            ]}
            resizeMode="cover"
            source={{
              uri: uri.image,
            }}
          />
        </Pressable>
      );
    });
  };

  const deletePost = () => {
    dispatch(
      deletePostAction(postId, () => {
        toast.show('Post deleted successfully', 2);
        navigation.goBack();
      }),
    );
  };

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="View Feed"
      actionImage={MORE_MENU_ICON_IMG}
      footer={renderFooter()}
      showExtraMenu={postDetails.is_your_feed ? toggleModal : () => {}}
      navigation={navigation}>
      <View style={styles.userInfoRow}>
        <Pressable
          style={styles.usernameAndAvatar}
          onPress={() =>
            navigation.navigate(USERPROFILE, {userId: postDetails.user_uuid})
          }>
          <Image
            style={styles.avatar}
            source={{
              uri: postDetails.user_profile,
            }}
          />
          <View style={styles.username}>
            <Text style={styles.titleText}>{postDetails.name}</Text>
            <Text style={styles.nickNameText}>{postDetails.nickname}</Text>
          </View>
        </Pressable>
      </View>
      {postDetails.post?.length > 0 && (
        <View style={styles.feedInfoRow}>
          <Hyperlink
            onPress={url => Linking.openURL(url)}
            linkStyle={styles.linkColor}>
            <Text style={styles.descText}>{postDetails.post}</Text>
          </Hyperlink>
        </View>
      )}
      <View style={styles.feedImageRow}>{renderRow()}</View>
      <View style={styles.extraView} />

      <SlidingModal isModalVisible={isModalVisible} toggleModal={toggleModal}>
        <View style={styles.modalInnerContainer}>
          <View style={styles.handleBar} />
          <View style={styles.textWrapper}>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(!isModalVisible);
                navigation.navigate(CREATE_POST, {
                  mode: 'edit',
                  postDetails: postDetails,
                });
              }}>
              <Text style={styles.modalText}>Edit Post</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(!isModalVisible);
                deletePost();
              }}>
              <Text style={styles.modalText}>Delete Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SlidingModal>
      <ViewProfilePicture
        imageUrl={imageName}
        show={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </BaseLayout>
  );
};

export default NewsInfo;
