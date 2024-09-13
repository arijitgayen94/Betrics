import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Pressable, Text, View} from 'react-native';
import useStyles from './styles';
import {useTheme, useNavigation} from '@react-navigation/native';
import {BaseLayout} from '../../layout';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {NotificationCard} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  getAllNotificationAction,
  makeAllNotificationReadAction,
  makeNotificationReadAction,
} from '../../redux';
import {MODIFY_NOTIFICATIONS} from '../../redux/actionTypes';

type NotificationsParamList = StackNavigationProp<
  PostLoginParamList,
  'Notifications'
>;

const Notifications = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<NotificationsParamList>();
  const dispatch = useDispatch<AppDispatch>();
  const {notifications} = useSelector(
    (state: any) => state.notificationReducer,
  );
  const loading = useSelector((state: any) => state.loadingReducer.isLoading);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getAllNotificationAction(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (notifications?.pagination?.next) {
      setPage(notifications.pagination.page);
    }
  }, [notifications]);

  const makeAllNotificationRead = () => {
    dispatch(
      makeAllNotificationReadAction(response => {
        if (response) {
          setPage(1);
          dispatch(getAllNotificationAction(1));
        }
      }),
    );
  };

  const renderHeader = () => {
    return (
      <Pressable
        style={styles.headerView}
        onPress={() => makeAllNotificationRead()}>
        <Text style={[styles.actionText, styles.blueText]}>
          Mark as all read
        </Text>
      </Pressable>
    );
  };

  const fetchMoreData = () => {
    if (notifications?.pagination?.next) {
      dispatch(getAllNotificationAction(page));
    }
  };
  const markAsRead = (id: string) => {
    dispatch(
      makeNotificationReadAction(id, {is_read: true}, data =>
        makeNotificationRead(data),
      ),
    );
  };

  const makeNotificationRead = (data: any) => {
    let duplicateNotif = notifications;
    duplicateNotif.results.map((obj: any) => {
      if (obj.uuid === data.uuid) {
        obj.is_read = data.is_read;
      }
      return obj;
    });
    dispatch({type: MODIFY_NOTIFICATIONS, payload: duplicateNotif});
  };

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Notifications"
      navigation={navigation}
      renderScrollview={false}>
      {loading ? (
        <View>
          <ActivityIndicator size="large" color={theme.colors.lightBlueText} />
        </View>
      ) : (
        <>
          {notifications.results.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={notifications?.results}
              renderItem={({item}) => {
                return (
                  <NotificationCard
                    id={item?.uuid}
                    title={item?.title}
                    body={item?.body}
                    image={item?.image_url}
                    createdAt={item?.created_date}
                    isRead={item?.is_read}
                    onBtnClick={(id: string) => markAsRead(id)}
                  />
                );
              }}
              ListHeaderComponent={renderHeader}
              onEndReachedThreshold={0.2}
              onEndReached={fetchMoreData}
            />
          ) : (
            <Text style={styles.actionText}>No new notifications</Text>
          )}
        </>
      )}
    </BaseLayout>
  );
};

export default Notifications;
