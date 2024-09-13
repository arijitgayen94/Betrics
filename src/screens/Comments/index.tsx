import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useStyles from './styles';
import {useTheme, useNavigation} from '@react-navigation/native';
import CommentCard from '../../components/CommentCard';
import {BaseLayout} from '../../layout';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  deleteCommentAction,
  editCommentAction,
  getCommentsAction,
  postCommentAction,
  updateFeeds,
} from '../../redux';
import {SlidingModal} from '../../components';
import {REPORTPOST} from '../../routes/const';

type CommentsParamList = StackNavigationProp<PostLoginParamList, 'Comments'>;

const Comments = ({route}: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<CommentsParamList>();
  const {postId} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelector((state: any) => state.authReducer);
  const feed = useSelector((state: any) => state.feedReducer.feeds);
  const [allComments, setAllComments] = useState<any>([]);
  const [pagination, setPagination] = useState<any>({});
  const [comment, setComment] = useState<string>('');
  const [commentId, setCommentId] = useState<string>('');
  const loading = useSelector((state: any) => state?.loadingReducer?.isLoading);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditComment, setIsEditComment] = useState<boolean>(false);
  const [editPosComment, setEditPostCommet] = useState<string>('');

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (postId) {
      getAllComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const getAllComments = (page = 1) => {
    dispatch(
      getCommentsAction(postId, page, data => {
        if (page === 1) {
          setAllComments(data.results), setPagination(data.pagination);
        } else {
          let arr = [...data.results, ...allComments];
          setAllComments(arr);
          setPagination(data.pagination);
        }
      }),
    );
  };

  const updatePostLikeCount = (increment: boolean) => {
    let postFeeds = [...feed];
    const postIndex = feed.findIndex((x: any) => x.uuid === postId);
    if (postIndex > -1) {
      let post = postFeeds[postIndex];
      if (increment) {
        post.total_comments = post.total_comments + 1;
      } else {
        post.total_comments = post.total_comments - 1;
      }
      postFeeds[postIndex] = post;
      dispatch(updateFeeds(postFeeds));
    }
  };

  const fetchMoreData = () => {
    if (pagination.next) {
      getAllComments(pagination.page);
    }
  };

  useEffect(() => {
    if (commentId) {
      const obj = allComments.find((item: any) => item.uuid === commentId);
      if (obj.is_your_comment) {
        setIsEditComment(true);
        setEditPostCommet(obj.text);
      } else {
        setIsEditComment(false);
      }
      toggleModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentId]);

  const postAComment = () => {
    if (comment.length > 0) {
      const body = {
        text: comment,
      };
      dispatch(
        postCommentAction(
          postId,
          body,
          () => (setComment(''), getAllComments(), updatePostLikeCount(true)),
        ),
      );
    }
  };

  const deleteComment = () => {
    const body = {
      text: editPosComment,
    };
    dispatch(
      deleteCommentAction(postId, commentId, body, () => {
        getAllComments();
        updatePostLikeCount(false);
        setIsEditComment(false);
        setEditPostCommet('');
        setCommentId('');
      }),
    );
  };

  const editMyComment = () => {
    const body = {
      text: comment,
    };
    dispatch(
      editCommentAction(postId, commentId, body, () => {
        getAllComments();
        setComment('');
        setIsEditComment(false);
        setEditPostCommet('');
        setCommentId('');
      }),
    );
  };
  const renderFooter = () => {
    return (
      <View style={styles.footerRow}>
        <View style={styles.imgWrapper}>
          <Image
            style={styles.avatar}
            source={{
              uri: user.profile,
            }}
          />
        </View>
        <TextInput
          style={styles.commentInput}
          placeholderTextColor={theme.colors.secondaryText}
          placeholder="Enter Comment here..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity
          onPress={() => {
            if (isEditComment) {
              editMyComment(), Keyboard.dismiss();
            } else {
              postAComment(), Keyboard.dismiss();
            }
          }}>
          <Text style={styles.postBtn}>{isEditComment ? 'Edit' : 'Post'}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Comments"
      navigation={navigation}
      renderScrollview={false}
      footer={renderFooter()}>
      <>
        {loading && (
          <View style={styles.loaderView}>
            <ActivityIndicator
              size="large"
              color={theme.colors.lightBlueText}
            />
          </View>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={allComments}
          renderItem={({item}) => {
            return (
              <CommentCard
                navigation={navigation}
                userImage={item?.user_profile}
                userId={item.user_uuid}
                name={item.name}
                commentId={item?.uuid}
                text={item.text}
                isYourComment={item.is_your_comment}
                createdAt={item.created_at}
                showModal={e => {
                  setCommentId(e);
                }}
              />
            );
          }}
          onEndReachedThreshold={0.5}
          onEndReached={fetchMoreData}
        />
        <SlidingModal isModalVisible={isModalVisible} toggleModal={toggleModal}>
          <View style={styles.modalInnerContainer}>
            <View style={styles.handleBar} />
            {isEditComment ? (
              <>
                <View style={styles.textWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsModalVisible(!isModalVisible);
                      setComment(editPosComment);
                    }}>
                    <Text style={styles.modalText}>Edit</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.textWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsModalVisible(!isModalVisible);
                      deleteComment();
                    }}>
                    <Text style={styles.modalText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.textWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(!isModalVisible);
                    navigation.navigate(REPORTPOST, {postId, commentId});
                  }}>
                  <Text style={styles.modalText}>Report</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </SlidingModal>
      </>
    </BaseLayout>
  );
};

export default Comments;
