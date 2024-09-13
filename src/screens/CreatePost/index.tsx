import React, {useEffect, useState} from 'react';
import useStyles from './styles';
import {useTheme, useNavigation} from '@react-navigation/native';
import {BaseLayout} from '../../layout';
import {IMG_ICON, MORE_MENU_ICON_IMG, RED_CROSS_CIRCLE} from '../../assets';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
// import SelectDropdown from 'react-native-select-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  createNewPostAction,
  editPostAction,
  updateFeeds,
} from '../../redux';
import toast from 'react-native-simple-toast';
import {
  captureImage,
  chooseFile,
  requestCameraPermission,
  requestExternalWritePermission,
} from '../../service/imagePickerService';

type CreatePostParamsList = StackNavigationProp<
  PostLoginParamList,
  'CreatePost'
>;

const CreatePost = ({route}: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<CreatePostParamsList>();
  const {mode, postDetails} = route.params;
  const {user} = useSelector((state: any) => state.authReducer);
  const feed = useSelector((state: any) => state.feedReducer.feeds);
  const [images, setImages] = useState<any>([]);
  const [postText, setPostText] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [postDisable, setPostDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);

  useEffect(() => {
    if (mode === 'edit' && postDetails) {
      setImages(postDetails.images);
      setPostText(postDetails.post);
      setIsEnabled(postDetails.disable_like);
      setIsEnabled1(postDetails.disable_comment);
    }
  }, [postDetails, mode]);

  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderLinearGradiant = ({imageName}: {imageName: any}) => {
    return (
      <TouchableOpacity onPress={() => showImagePickerOption()}>
        <LinearGradient
          style={styles.linearGradiantBtn}
          colors={theme.colors.secondaryGradient}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}>
          <Image source={imageName} />
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const takePhoto = async () => {
    if (Platform.OS === 'android') {
      const premission = await requestCameraPermission();
      if (premission) {
        const response: any = await captureImage('photo');
        if (response?.error) {
          Alert.alert('Something went wrong');
        } else if (response.fileSize > 20000000) {
          Alert.alert('Img size should be below 20 mb');
        } else {
          const res: any = {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          };
          setImages((pre: any) => [res, ...pre]);
        }
      }
    } else {
      const response: any = await captureImage('photo');
      if (response?.error) {
        Alert.alert('Something went wrong');
      } else if (response.fileSize > 20000000) {
        Alert.alert('Img size should be below 20 mb');
      } else {
        const res: any = {
          uri: response.uri,
          name: response.fileName,
          type: response.type,
        };
        setImages((pre: any) => [res, ...pre]);
      }
    }
  };
  const choosePhoto = async () => {
    if (Platform.OS === 'android') {
      const premission = await requestExternalWritePermission();
      if (premission) {
        const response: any = await chooseFile('photo');
        if (response?.error) {
          Alert.alert('Something went wrong');
        } else if (response.fileSize > 20000000) {
          Alert.alert('Img size should be below 20 mb');
        } else {
          const res: any = {
            uri: response.uri,
            name: response.name,
            type: response.type,
          };
          setImages((pre: any) => [res, ...pre]);
        }
      }
    } else {
      const response: any = await chooseFile('photo');
      if (response?.error) {
        Alert.alert('Something went wrong');
      } else if (response.fileSize > 20000000) {
        Alert.alert('Img size should be below 20 mb');
      } else {
        const res: any = {
          uri: response.uri,
          name: response.name,
          type: response.type,
        };
        setImages((pre: any) => [res, ...pre]);
      }
    }
  };

  const showImagePickerOption = () => {
    if (Platform.OS === 'ios') {
      Alert.alert('Select Image', '', [
        {
          text: 'Take Photo...',
          onPress: () => takePhoto(),
        },
        {
          text: 'Choose from library',
          onPress: () => choosePhoto(),
          style: 'cancel',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
      ]);
    } else {
      Alert.alert('Select Image', '', [
        {
          text: 'Cancel',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
        {
          text: 'Choose from library',
          onPress: () => choosePhoto(),
          style: 'cancel',
        },
        {
          text: 'Take Photo...',
          onPress: () => takePhoto(),
        },
      ]);
    }
  };

  const createPost = () => {
    if (postText.length > 0 || images.length > 0) {
      setPostDisable(true);
      setLoading(true);
      const formData = new FormData();
      formData.append('post', postText);
      for (let id in images) {
        formData.append('images', images[id]);
      }
      if (isEnabled) {
        formData.append('disable_like', isEnabled);
      }
      if (isEnabled1) {
        formData.append('disable_comment', isEnabled1);
      }
      dispatch(
        createNewPostAction(
          formData,
          response => {
            setLoading(false);
            toast.show('New post created successfully', 2);
            updatePostList(response);
            navigation.goBack();
            setPostDisable(false);
          },
          response => (
            toast.show(response[0].message, 2),
            setLoading(false),
            setPostDisable(false)
          ),
        ),
      );
    }
  };

  const updatePostList = (newPost: any) => {
    let newPostData = newPost;
    newPostData.user_profile = user.profile;
    newPostData.name = `${user.first_name} ${user.last_name}`;
    newPostData.is_your_feed = true;
    newPostData.user_uuid = user.uuid;
    newPostData.nickname = user.nickname;
    const postFeeds = [newPostData, ...feed];
    dispatch(updateFeeds(postFeeds));
  };

  const updateAPostDetails = (updatedPost: any) => {
    let postFeeds = [...feed];
    const index = postFeeds.findIndex(item => item.uuid === updatedPost.uuid);
    let post = postFeeds[index];
    post.post = updatedPost.post;
    postFeeds[index] = post;
    dispatch(updateFeeds(postFeeds));
  };

  const editPost = () => {
    if (postText.length > 0 || images.length > 0) {
      setPostDisable(true);
      setLoading(true);
      const body = {
        disable_like: isEnabled,
        disable_comment: isEnabled1,
        post: postText,
      };
      dispatch(
        editPostAction(
          postDetails.uuid,
          body,
          (response: any) => {
            toast.show('Post edited successfully', 2);
            updateAPostDetails(response);
            navigation.goBack();
            setLoading(false);
            setPostDisable(false);
          },
          response => (
            toast.show(response?.data[0]?.message, 2),
            setLoading(false),
            setPostDisable(false)
          ),
        ),
      );
    }
  };

  const renderFooter = () => {
    return (
      <View style={styles.footerWrapper}>
        <RenderLinearGradiant imageName={IMG_ICON} />
        {/* <RenderLinearGradiant imageName={UPLOAD_VIDEO_ICON} />
        <RenderLinearGradiant imageName={SMILE_ICON} /> */}
      </View>
    );
  };
  const renderPostButton = () => {
    return (
      <TouchableOpacity
        style={
          postText.length > 0 || images.length > 0
            ? styles.activePostBtn
            : styles.postBtnWrapper
        }
        disabled={postDisable}
        onPress={() => {
          mode === 'add' ? createPost() : editPost();
        }}>
        <Text style={styles.postBtnText}>Post</Text>
      </TouchableOpacity>
    );
  };

  const removeSelectedImage = (i: number) => {
    let arr = [...images];
    if (i > -1) {
      arr.splice(i, 1);
    }
    setImages(arr);
  };

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText={mode === 'edit' ? 'Edit post' : 'Add New Feeds'}
      actionImage={MORE_MENU_ICON_IMG}
      navigation={navigation}
      renderScrollview={true}
      hasCustomAction={true}
      renderCustomAction={renderPostButton()}
      footer={mode === 'add' && renderFooter()}>
      <>
        <View style={styles.userInfoRow}>
          <Image
            style={styles.avatar}
            source={{
              uri: user.profile,
            }}
          />
          <View style={styles.userView}>
            <View style={styles.username}>
              <Text style={styles.titleText}>
                {`${user.first_name} ${user.last_name}`}{' '}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Image source={MORE_MENU_ICON_IMG} />
            </TouchableOpacity>
            {modalVisible && (
              <Modal
                isVisible={modalVisible}
                backdropOpacity={0}
                animationIn="fadeIn"
                onBackdropPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.modalView}>
                  <View style={styles.flexRow}>
                    <Text style={styles.popupText}>Disable Like</Text>
                    <Switch
                      trackColor={{
                        false: theme.colors.secondaryText,
                        true: theme.colors.lightBlueText,
                      }}
                      thumbColor={
                        !isEnabled
                          ? theme.colors.primaryText
                          : theme.colors.primaryText
                      }
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                  <View style={styles.flexRow}>
                    <Text style={styles.popupText}>Disable Comment</Text>
                    <Switch
                      trackColor={{
                        false: theme.colors.secondaryText,
                        true: theme.colors.lightBlueText,
                      }}
                      thumbColor={
                        !isEnabled
                          ? theme.colors.primaryText
                          : theme.colors.primaryText
                      }
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch1}
                      value={isEnabled1}
                    />
                  </View>
                </View>
              </Modal>
            )}
          </View>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            selectionColor={theme.colors.secondaryText}
            placeholder="What’s on your mind?"
            returnKeyLabel="Done"
            returnKeyType="done"
            placeholderTextColor={theme.colors.secondaryText}
            style={styles.inputField}
            multiline={true}
            numberOfLines={5}
            value={postText}
            onChangeText={setPostText}
          />
        </View>
        <View style={styles.inputWrapper}>
          {images.map((item, i) => (
            <View>
              <Image
                source={{uri: mode === 'edit' ? item.image : item.uri}}
                style={styles.imageSize}
              />
              {mode === 'add' && (
                <Pressable
                  style={styles.crossIcon}
                  onPress={() => removeSelectedImage(i)}>
                  <Image source={RED_CROSS_CIRCLE} />
                </Pressable>
              )}
            </View>
          ))}
        </View>
        {loading && (
          <View style={styles.loaderView}>
            <ActivityIndicator
              size={'large'}
              color={theme.colors.lightBlueText}
            />
          </View>
        )}
      </>
    </BaseLayout>
  );
};

export default CreatePost;
