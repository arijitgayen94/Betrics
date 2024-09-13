import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import {
  FeedCard,
  PrimaryButton,
  PrimaryInput,
  PrimaryModal,
} from '../../components';
import useStyles from './styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {PLUS_ICON_IMG, X_CIRCLE_DARK_IMG, X_CIRCLE_IMG} from '../../assets';
import {StackNavigationProp} from '@react-navigation/stack';
import {CREATE_POST} from '../../routes/const';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  checkSubscriptionAction,
  getFeedsAction,
  getNotificationCountAction,
  getUserDetailsAction,
  updateFeeds,
} from '../../redux';
import {RefreshControl} from 'react-native-gesture-handler';
import {requestEmailVerification} from '../../redux/apis';
import toast from 'react-native-simple-toast';

type NewsFeedParamList = StackNavigationProp<PostLoginParamList, 'CreatePost'>;

const headerHeight = 50;
let scrollValue = 0;
let headerVisible = true;
let focused = false;

const NewsFeed = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<NewsFeedParamList>();
  const dispatch = useDispatch<AppDispatch>();
  const feed = useSelector((state: any) => state.feedReducer.feeds);
  const {user} = useSelector((state: any) => state.authReducer);
  const loading = useSelector(
    (state: any) => state?.loadingReducer?.isLoadingFeed,
  );
  const [isScrollEnable, setIsScrollEnable] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pagination, setPagination] = useState<any>({});
  const [showVerifiedPopup, setShowVerifiedPopup] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const animation = useRef(new Animated.Value(1)).current;
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, headerHeight],
  });
  const inputTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [headerHeight, 0],
  });
  const opacity = animation;

  const onScroll = (e: any) => {
    if (focused) {
      return;
    }
    const y = e.nativeEvent.contentOffset.y;
    if (y > scrollValue && headerVisible && y > headerHeight / 2) {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
      headerVisible = false;
    }
    if (y < scrollValue && !headerVisible) {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
      headerVisible = true;
    }
    scrollValue = y;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getNotificationCountAction());
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    if (!user?.verified) {
      setShowVerifiedPopup(true);
    } else {
      dispatch(checkSubscriptionAction());
    }
    callFeeds(1, search, true);
    dispatch(
      getUserDetailsAction(
        () => {},
        () => {},
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callFeeds = (
    page: number,
    searchText: string,
    loader: boolean = true,
  ) => {
    dispatch(
      getFeedsAction(page, searchText, loader, data => setPagination(data)),
    );
  };

  const navigateToCreatePost = () => {
    navigation.navigate(CREATE_POST, {mode: 'add'});
  };

  const updatePostLikeCount = (e: number) => {
    let postFeeds = [...feed];
    let post = postFeeds[e];
    if (!post.is_liked_by_user) {
      post.liked_emoji = 'LIKE';
      post.total_likes = post.total_likes + 1;
      post.is_liked_by_user = true;
    } else {
      post.liked_emoji = '';
      post.total_likes = post.total_likes - 1;
      post.is_liked_by_user = false;
    }
    postFeeds[e] = post;
    dispatch(updateFeeds(postFeeds));
  };

  const fetchMoreData = () => {
    if (pagination.next) {
      callFeeds(pagination.page, search);
    }
  };

  const deletePost = (index: number) => {
    let postFeeds = [...feed];
    postFeeds.splice(index, 1);
    dispatch(updateFeeds(postFeeds));
  };

  const onRefresh = () => {
    callFeeds(1, search, false);
    setRefreshing(false);
  };

  const renderVerifyPopup = () => {
    return (
      <PrimaryModal
        visible={showVerifiedPopup}
        headerTitle={'Verify your email'}
        handleClose={() => {
          setShowVerifiedPopup(false);
        }}>
        <View style={styles.verifiedView}>
          <Text style={styles.messageText}>
            Verify your email by 12'O clock noon, otherwise account will be
            inactive!
          </Text>
          <View style={styles.btnWrapper}>
            <PrimaryButton
              style={[styles.w45, styles.ml15]}
              text="Resend link"
              gradientStyle={styles.modalGradientBtn}
              textStyle={[styles.btnTextStyle, styles.ph15]}
              handleClick={() => {
                requestEmailVerification(
                  {email: user.email},
                  () => {
                    setShowVerifiedPopup(false);
                  },
                  err => {
                    setShowVerifiedPopup(false);
                    toast.show(err?.[0]?.message, 2);
                  },
                );
              }}
              gradientColors={theme.colors.secondaryGradient}
            />
            <PrimaryButton
              style={[styles.w45, styles.ml15]}
              text="Close"
              gradientStyle={styles.modalGradientBtn}
              textStyle={[styles.btnTextStyle, styles.ph15]}
              handleClick={() => {
                setShowVerifiedPopup(false);
              }}
              gradientColors={theme.colors.grayGradient}
            />
          </View>
        </View>
      </PrimaryModal>
    );
  };
  return (
    <>
      <View style={styles.mainContainer}>
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={isScrollEnable}
            renderItem={({item, index}) => {
              return (
                <FeedCard
                  item={item}
                  index={index}
                  navigation={navigation}
                  images={item?.images}
                  userProfile={item?.user_profile}
                  name={item.name}
                  userId={item.user_uuid}
                  nickName={item.nickname}
                  totalLikes={item.total_likes}
                  totalComments={item.total_comments}
                  isLikeByUser={item.is_liked_by_user}
                  likedEmoji={item?.liked_emoji}
                  createdAt={item.created_at}
                  isYourFeed={item.is_your_feed}
                  post={item.post}
                  postId={item.uuid}
                  disableLike={item.disable_like}
                  disableComment={item.disable_comment}
                  disableShare={item.disable_share}
                  onShowDismissCard={(e?: boolean) => setIsScrollEnable(!e)}
                  isScrollEnable
                  updateCount={e => updatePostLikeCount(e)}
                  updatePost={e => deletePost(e)}
                />
              );
            }}
            data={feed}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[theme.colors.lightBlueText]}
              />
            }
            onEndReachedThreshold={0.5}
            onEndReached={fetchMoreData}
            contentContainerStyle={{paddingTop: headerHeight}}
            onScroll={onScroll}
          />
          <View style={[styles.header]}>
            <Animated.View
              style={[styles.searchContainer, {transform: [{translateY}]}]}>
              <Animated.View
                style={[
                  styles.inputContainer,
                  {opacity, transform: [{translateY: inputTranslateY}]},
                ]}>
                <PrimaryInput
                  icon={search.length > 0 ? X_CIRCLE_DARK_IMG : X_CIRCLE_IMG}
                  value={search}
                  placeholder="Search here"
                  keyboardType="default"
                  onChangeText={(value: string) => setSearch(value)}
                  containerStyle={styles.inputContainer}
                  onIconClick={() => {
                    search.length > 0 ? (setSearch(''), callFeeds(1, '')) : {};
                  }}
                  returnKeyType="search"
                  onEndEditing={() => callFeeds(1, search)}
                />
              </Animated.View>
            </Animated.View>
          </View>

          <TouchableOpacity
            onPress={navigateToCreatePost}
            style={styles.floatingBtn}>
            <LinearGradient
              colors={theme.colors.secondaryGradient}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}
              style={styles.floatingBtnGradient}>
              <Image source={PLUS_ICON_IMG} />
            </LinearGradient>
          </TouchableOpacity>
          {loading && (
            <View style={styles.loaderView}>
              <ActivityIndicator
                size="large"
                color={theme.colors.lightBlueText}
              />
            </View>
          )}
        </>
      </View>
      {renderVerifyPopup()}
    </>
  );
};

export default NewsFeed;
