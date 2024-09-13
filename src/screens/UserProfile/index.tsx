import React, {useEffect, useState} from 'react';
import useStyles from './styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BaseLayout} from '../../layout';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  getOtherUserDetailsAction,
  getUserDashboardAction,
  getUserDetailsAction,
  getUserFollowersAction,
  getUserFollowingAction,
  postFollowUserAction,
  postRemoveFolloweAction,
  postUnfollowAction,
} from '../../redux';
import {GRID, USER_SETTING_ICON} from '../../assets';
import {FeedCard, PrimaryButton} from '../../components';
import {EDIT_PROFILE} from '../../routes/const';
import {UserFollowerCard} from './UserFollowerCard';

type UserProfileParamList = StackNavigationProp<
  PostLoginParamList,
  'UserProfile'
>;

const UserProfile = ({route}: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<UserProfileParamList>();
  const {user} = useSelector((state: any) => state.authReducer);
  const paramsUuid = route.params.userId;
  const dispatch = useDispatch<AppDispatch>();
  const [pagination, setPagination] = useState<any>({});
  const [dataSource, setDataSource] = useState<any>([]);
  const [userFollowerList, setUserFollowerList] = useState<any>([]);
  const [userFollowerPagination, setUserFollowerPagination] = useState<any>({});
  const [userFollowingList, setUserFollowingList] = useState<any>([]);
  const [userFollowingPagination, setUserFollowingPagination] = useState<any>(
    {},
  );
  const [isScrollEnable, setIsScrollEnable] = useState(true);
  const [initialOption, setInitialOption] = useState<number>(0);
  const [userOption, setUserOption] = useState<number>(0);
  const [userDetails, setUserDetails] = useState<any>({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (user.uuid === paramsUuid) {
        getOwnFeeds(1);
        dispatch(
          getUserDetailsAction(
            () => {},
            () => {},
          ),
        );
        getUserFollower(1);
        getUserFollowing(1);
      } else {
        getUserDetails();
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    if (user.uuid === paramsUuid) {
      setUserDetails(user);
    } else {
      getUserDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, paramsUuid]);

  const updatePostLikeCount = (e: number) => {
    let postFeeds = [...dataSource];
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
    setDataSource(postFeeds);
  };

  const deletePost = (index: number) => {
    let postFeeds = [...dataSource];
    postFeeds.splice(index, 1);
    setDataSource(postFeeds);
    dispatch(
      getUserDetailsAction(
        () => {},
        () => {},
      ),
    );
  };

  const getOwnFeeds = (page: number) => {
    dispatch(
      getUserDashboardAction(page, (data: any) => {
        if (page === 1) {
          setDataSource(data.results);
        } else {
          let results = [...dataSource, ...data.results];
          setDataSource(results);
        }
        setPagination(data.pagination);
      }),
    );
  };

  const getUserDetails = () => {
    dispatch(
      getOtherUserDetailsAction(
        route.params.userId,
        data => {
          setUserDetails(data);
        },
        () => {},
      ),
    );
  };

  const getUserFollower = (page: number) => {
    dispatch(
      getUserFollowersAction(
        userDetails.uuid,
        page,
        data => {
          setUserFollowerList(data.results);
          setUserFollowerPagination(data.pagination);
        },
        () => {},
      ),
    );
  };

  const getUserFollowing = (page: number) => {
    dispatch(
      getUserFollowingAction(
        userDetails.uuid,
        page,
        data => {
          setUserFollowingList(data.results);
          setUserFollowingPagination(data.pagination);
        },
        () => {},
      ),
    );
  };

  const fetchMoreData = () => {
    if (pagination.next) {
      getOwnFeeds(pagination.page);
    }
  };

  const fetchMoreFollowersData = () => {
    if (userFollowerPagination.next) {
      getUserFollower(userFollowerPagination.page);
    }
  };

  const fetchMoreFollowingData = () => {
    if (userFollowingPagination.next) {
      getUserFollower(userFollowingPagination.page);
    }
  };

  const unfollowUser = (uuid: string) => {
    dispatch(
      postUnfollowAction(
        {user_uuid: uuid},
        () => {
          dispatch(
            getUserDetailsAction(
              () => {},
              () => {},
            ),
          );
          if (user.uuid === route.params?.userId) {
            getUserFollowing(1);
          } else {
            getUserDetails();
          }
        },
        () => {},
      ),
    );
  };

  const removeFollower = (uuid: string) => {
    dispatch(
      postRemoveFolloweAction(
        {user_uuid: uuid},
        () => {
          getUserFollower(1);
          dispatch(
            getUserDetailsAction(
              () => {},
              () => {},
            ),
          );
        },
        () => {},
      ),
    );
  };

  const userPosts = () => (
    <View style={styles.flex1}>
      <FlatList
        data={dataSource}
        style={styles.containerStyle}
        showsVerticalScrollIndicator={false}
        scrollEnabled={isScrollEnable}
        renderItem={({item, index}) => {
          return (
            <FeedCard
              item={item}
              index={index}
              navigation={navigation}
              images={item?.images}
              userProfile={
                item?.user_profile ? item.user_profile : user?.profile
              }
              name={
                item?.name
                  ? item.name
                  : `${user?.first_name} ${user?.last_name}`
              }
              nickName={user.nickname}
              userId={item.user_uuid}
              totalLikes={item.total_likes}
              totalComments={item.total_comments}
              isLikeByUser={item.is_liked_by_user}
              likedEmoji={item?.liked_emoji}
              createdAt={item.created_at}
              isYourFeed={true}
              post={item.post}
              postId={item.uuid}
              disableLike={item.disable_like}
              disableComment={item.disable_comment}
              disableShare={item.disable_share}
              onShowDismissCard={(e?: boolean) => setIsScrollEnable(!e)}
              isScrollEnable
              updateCount={e => updatePostLikeCount(e)}
              updatePost={e => deletePost(e)}
              containerStyle={styles.containerStyle}
              fromUserDashboard={true}
            />
          );
        }}
        //Setting the number of column
        keyExtractor={(item, index) => '' + index}
        onEndReachedThreshold={0.5}
        onEndReached={fetchMoreData}
        ListFooterComponent={renderFooter}
      />
    </View>
  );

  const renderFooter = () => <View style={styles.footerView} />;

  const userFollowers = () => {
    return (
      <View style={styles.flexCenter}>
        <View style={styles.headerFollow}>
          <Pressable
            style={
              initialOption === 0
                ? styles.activateOption
                : styles.deactivateOption
            }
            onPress={() => setInitialOption(0)}>
            <Text
              style={
                initialOption === 0
                  ? styles.activateOptionText
                  : styles.deactivateOptionText
              }>
              {user.total_followers} Followers
            </Text>
          </Pressable>
          <Pressable
            style={
              initialOption === 1
                ? styles.activateOption
                : styles.deactivateOption
            }
            onPress={() => setInitialOption(1)}>
            <Text
              style={
                initialOption === 1
                  ? styles.activateOptionText
                  : styles.deactivateOptionText
              }>
              {user.total_following} Following
            </Text>
          </Pressable>
        </View>
        <FlatList
          data={initialOption === 0 ? userFollowerList : userFollowingList}
          style={styles.containerStyle}
          showsVerticalScrollIndicator={false}
          scrollEnabled={isScrollEnable}
          keyExtractor={(item, index) => '' + index}
          onEndReachedThreshold={0.5}
          onEndReached={
            initialOption === 0
              ? fetchMoreFollowersData
              : fetchMoreFollowingData
          }
          ListFooterComponent={renderFooter}
          renderItem={({item, index}) => {
            return (
              <UserFollowerCard
                item={item}
                type={initialOption}
                index={index}
                onPressBtn={() =>
                  initialOption === 0
                    ? removeFollower(item.uuid)
                    : unfollowUser(item.uuid)
                }
              />
            );
          }}
        />
      </View>
    );
  };

  const userOptions = () => {
    return (
      <View style={styles.flexCenter}>
        <View style={styles.headerOption}>
          <Pressable
            style={
              userOption === 0 ? styles.activateOption : styles.deactivateOption
            }
            onPress={() => setUserOption(0)}>
            <Image
              source={GRID}
              style={
                userOption === 0
                  ? styles.firstIndexTintColor
                  : styles.secondIndexTintColor
              }
            />
          </Pressable>
          <Pressable
            style={
              userOption === 1 ? styles.activateOption : styles.deactivateOption
            }
            onPress={() => setUserOption(1)}>
            <Image
              source={USER_SETTING_ICON}
              style={
                userOption === 0
                  ? styles.firstIndexTintColor
                  : styles.secondIndexTintColor
              }
            />
          </Pressable>
        </View>
        {user.uuid === route.params?.userId ? (
          <>{userOption === 0 ? userPosts() : userFollowers()}</>
        ) : (
          <View style={styles.privateAccountView}>
            <Text style={styles.nameText}>This account is private</Text>
          </View>
        )}
      </View>
    );
  };

  const followBtnPressed = () => {
    dispatch(
      postFollowUserAction(
        {user_uuid: userDetails.uuid},
        () => {
          let details = userDetails;
          details.is_your_following = true;
          details.total_followers = details.total_followers + 1;
          setUserDetails(details);
          dispatch(
            getUserDetailsAction(
              () => {},
              () => {},
            ),
          );
        },
        () => {},
      ),
    );
  };

  const renderHeader = () => {
    return (
      <>
        <View style={styles.headerView}>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.profileImage}
              source={{
                uri: userDetails?.profile,
              }}
              resizeMode="cover"
            />
            <View style={styles.onlineDot} />
          </View>
          <View style={styles.userInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>
                {userDetails?.first_name} {userDetails?.last_name}
              </Text>
              <Text numberOfLines={1} style={styles.userNameText}>
                {userDetails?.nickname}
              </Text>
              <Text numberOfLines={1} style={styles.userNameText}>
                {userDetails?.betting_knowledge} |{' '}
                {userDetails.betting_experience} years
              </Text>
            </View>
            <View style={[styles.nameWrapper, styles.extraDetails]}>
              <View>
                <Text style={styles.followCount}>
                  {userDetails?.total_post}
                </Text>
                <Text style={styles.followText}>Posts</Text>
              </View>
              <View>
                <Text style={styles.followCount}>
                  {userDetails?.total_followers}
                </Text>
                <Text style={styles.followText}>Followers</Text>
              </View>
              <View>
                <Text style={styles.followCount}>
                  {userDetails?.total_following}
                </Text>
                <Text style={styles.followText}>Following</Text>
              </View>
            </View>
          </View>
        </View>
        {user.uuid === route.params?.userId ? (
          <View style={[styles.headerButtonView, styles.otherUserFollow]}>
            <PrimaryButton
              text="Edit Profile"
              style={styles.btnFollow}
              gradientStyle={styles.btnGradient}
              textStyle={styles.btnText}
              handleClick={() => navigation.navigate(EDIT_PROFILE)}
              gradientColors={theme.colors.secondaryGradient}
            />
            {/* <PrimaryButton
              text="Invite"
              style={styles.btnSignup}
              gradientStyle={styles.btnGradient}
              textStyle={styles.btnText}
              handleClick={() => {}}
              gradientColors={theme.colors.secondaryGradient}
            /> */}
          </View>
        ) : (
          <View style={[styles.headerButtonView, styles.otherUserFollow]}>
            <PrimaryButton
              text={userDetails?.is_your_following ? 'Following' : 'Follow'}
              style={styles.btnFollow}
              gradientStyle={styles.btnGradient}
              textStyle={styles.btnText}
              handleClick={() =>
                userDetails?.is_your_following
                  ? unfollowUser(userDetails.uuid)
                  : followBtnPressed()
              }
              gradientColors={
                userDetails?.is_your_following
                  ? theme.colors.grayGradient
                  : theme.colors.secondaryGradient
              }
            />
            {/* <PrimaryButton
              text="Message"
              style={styles.btnSignup}
              gradientStyle={styles.btnGradient}
              textStyle={styles.btnText}
              handleClick={() => {}}
              gradientColors={theme.colors.secondaryGradient}
            /> */}
          </View>
        )}
        <View style={styles.optionsView}>{userOptions()}</View>
      </>
    );
  };

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Profile"
      navigation={navigation}
      renderScrollview={false}>
      <View style={styles.gridView}>{renderHeader()}</View>
    </BaseLayout>
  );
};

export default UserProfile;
