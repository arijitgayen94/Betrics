import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {BaseLayout} from '../../layout';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import {CALENDAR_BLUE_ICON, LOGO_ICON} from '../../assets';
import {PrimaryButton, SecondaryButton} from '../../components';
import useStyles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux';
import {
  createTribeAction,
  getContestListAction,
  getTribeLeadersAction,
  joinContestAction,
  joinTribeAction,
} from '../../redux/actions/contestAction';
import {CONTEST, TERMS_AND_CONDITIONS, TRIBE} from '../../routes/const';
import toast from 'react-native-simple-toast';
import JoinTribe from './JoinTribeModal';
import CreateTribeModal from './CreateTribeModal';
import moment from 'moment';

type ContestParamList = StackNavigationProp<PostLoginParamList, 'Comments'>;

const Contest = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<ContestParamList>();
  const dispatch = useDispatch<AppDispatch>();
  const route: any = useRoute();

  const page = '1';
  const termsChanged = route.params
    ? route.params.termsandconditions
    : 'declined';

  // const [page, setPage] = useState<string>('1');
  const [loading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [showJoinTribe, setShowJoinTribe] = useState<boolean>(false);
  const [showCreateTribeModal, setShowCreateTribeModal] =
    useState<boolean>(false);
  const [uuid, setUuid] = useState<string>('');
  const contestData = useSelector(
    (state: any) => state.contestReducer.contestList.results,
  );

  const onRefresh = () => {
    setIsRefreshing(true);
    loadContestData();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const loadTribeData = () => {
    const params = {
      page: '1',
      public: true,
      name: '',
    };
    dispatch(getTribeLeadersAction(uuid, params));
  };

  const joinTribeHandler = (code: string) => {
    const params = {
      pass_code: code,
    };

    dispatch(joinTribeAction(uuid, params, tribeJoinSuccess, tribeJoinFailed));
  };

  const tribeJoinSuccess = () => {
    toast.show('Tribe joined successfully.');
    navigation.navigate(TRIBE, {uuid: uuid});
    closeJoinTribeModal();
  };

  const tribeJoinFailed = () => {};

  const joinPrivateTribeHandler = (passcode: string) => {
    const params = {
      pass_code: passcode,
    };
    const maindata = passcode.replace(/\s/g, '').length;
    if (maindata > 0) {
      dispatch(joinTribeAction(uuid, params, successCallback, errorCallback));
    } else {
      toast.show('Please add pass code.');
    }
  };

  const successCallback = () => {
    toast.show('Tribe joined successfully.');
    navigation.navigate(TRIBE, {uuid: uuid});
    closeJoinTribeModal();
  };
  const errorCallback = () => {};

  const loadContestData = () => {
    // if (contestData.length === 0) {
    dispatch(getContestListAction(page));
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    // }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadContestData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    if (route.params && termsChanged === 'accepted') {
      dispatch(joinContestAction(route.params.uuid, successJoin, failedJoin));
      navigation.navigate(CONTEST, {
        termsandconditions: false,
        uuid: route.params.uuid,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, termsChanged]);

  useEffect(() => {
    if (uuid) {
      // navigation.navigate(JOIN_TRIBE, {uuid: data.uuid});
      setShowJoinTribe(true);
      loadTribeData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  const successJoin = () => {
    toast.show('Joined contest successfully.');
  };

  const failedJoin = () => {
    toast.show('Joined contest failed.');
  };

  const handleJoinContest = (contest_uuid: string) => {
    if (contest_uuid) {
      navigation.navigate(TERMS_AND_CONDITIONS, {uuid: contest_uuid});
    }
  };

  const handleViewContest = (data: any) => {
    if (data.is_joined_tribe) {
      navigation.navigate(TRIBE, {uuid: data.uuid});
    } else {
      setUuid(data.uuid);
    }
  };

  const getStatusStyle = (status: string) => {
    if (status === 'Closed') {
      return styles.contestStatusClosed;
    } else if (status === 'Upcoming') {
      return styles.contestStatusUpcoming;
    } else {
      return styles.contestStatus;
    }
  };

  const DateCard = ({date, type}: {date: string; type: string}) => {
    return (
      <View style={styles.dateCard}>
        <View style={styles.dateCardImage}>
          <Image style={styles.dateCardImageImg} source={CALENDAR_BLUE_ICON} />
        </View>
        <View>
          <Text style={styles.dateCardText}>{type}</Text>
          <Text style={styles.dateCardText}>
            {moment(date).format('MM-DD-YY hh:MM A')}
          </Text>
        </View>
      </View>
    );
  };

  const DateCardRow = ({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) => {
    return (
      <View style={styles.dateCardRow}>
        <DateCard date={startDate} type={'Start on :'} />
        <Text style={styles.dateCardTo}>To</Text>
        <DateCard date={endDate} type={'End on :'} />
      </View>
    );
  };

  const ContestHeader = ({title, status}: {title: string; status: string}) => {
    const statusStyle = getStatusStyle(status);
    return (
      <View style={styles.contestHeader}>
        <View style={styles.contestHImage}>
          <Image source={LOGO_ICON} style={styles.contestLogo} />
        </View>
        <Text style={styles.contestTitle}>{title}</Text>
        <View style={statusStyle}>
          {status !== 'Closed' ? (
            <Text style={styles.contestStatusText}>{status}</Text>
          ) : (
            <Text style={styles.contestStatusTextWhite}>{status}</Text>
          )}
        </View>
      </View>
    );
  };

  const ContestPrices = ({
    price,
    maxTribeSize,
  }: {
    price: string;
    maxTribeSize: string;
  }) => {
    return (
      <View style={styles.contestPrices}>
        <View style={styles.contestPrice}>
          <Text style={styles.contestPriceText}>Prize Pool : {price}</Text>
        </View>
        <View style={styles.contestPrice}>
          <Text style={styles.contestPriceText}>
            Max tribe size {maxTribeSize}
          </Text>
        </View>
      </View>
    );
  };

  const ContestCard = ({data}: any) => {
    return (
      <View style={styles.contestCard}>
        <DateCardRow startDate={data?.start_time} endDate={data?.end_time} />
        <ContestHeader title={data?.name} status={data?.status} />
        <ContestPrices
          price={`$ ${data?.prize_pool}`}
          maxTribeSize={data?.max_tribe_size}
        />
        <View>
          {!data.is_joined ? (
            <PrimaryButton
              style={styles.primaryButton}
              text="Join Contest"
              gradientStyle={styles.primaryButtonGradient}
              textStyle={styles.btnTextStyle}
              handleClick={() => handleJoinContest(data?.uuid)}
              gradientColors={
                data.status === 'Closed'
                  ? theme.colors.disableGradient
                  : theme.colors.secondaryGradient
              }
              disabled={data?.status === 'Closed' ? true : false}
            />
          ) : (
            <SecondaryButton
              style={styles.secondaryButtonStyle}
              handleClick={() => handleViewContest(data)}
              textStyle={styles.secondaryButtonTextStyle}
              text="View Contest"
            />
          )}
        </View>
      </View>
    );
  };

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.contestCardPage}>
        {!loading && contestData.length > 0 ? (
          <ContestCard key={item.uuid} data={item} />
        ) : null}
        {!loading && contestData.length === 0 && (
          <View>
            <Text>No contest found.</Text>
          </View>
        )}
        {loading && (
          <View>
            <ActivityIndicator
              size="large"
              color={theme.colors.lightBlueText}
            />
          </View>
        )}
      </View>
    );
  };

  const closeJoinTribeModal = () => {
    setShowJoinTribe(false);
    setUuid('');
  };

  const createOwnTribe = () => {
    setShowJoinTribe(false);
    setTimeout(() => {
      setShowCreateTribeModal(true);
    }, 800);
  };

  const closeOwnTribe = () => {
    setShowCreateTribeModal(false);
    setTimeout(() => {
      setShowJoinTribe(true);
    }, 800);
  };

  const createNewTribe = (data: any) => {
    if (data.name === '') {
      toast.show('Please Add Tribe Name.');
      return;
    }

    const newData = {
      name: data.name,
      is_public: data.is_public,
    };

    dispatch(
      createTribeAction(uuid, newData, successTribeCreate, failedTribeCreate),
    );
  };

  const successTribeCreate = () => {
    setShowCreateTribeModal(false);
    toast.show('Tribe created successfully.');
    navigation.navigate(TRIBE, {uuid: uuid});
    setShowJoinTribe(false);
  };

  const failedTribeCreate = (error: any) => {
    // setShowCreateTribeModal(false);
    toast.show(error[0].message, 2);
  };

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Contest"
      navigation={navigation}
      renderScrollview={false}>
      <FlatList
        data={contestData}
        renderItem={renderItem}
        keyExtractor={item => item.uuid}
        onRefresh={() => onRefresh()}
        showsVerticalScrollIndicator={false}
        refreshing={isRefreshing}
      />
      {showJoinTribe && (
        <JoinTribe
          contest_uuid={uuid}
          navigation={navigation}
          showJoinTribeModal={showJoinTribe}
          joinPrivateTribeHandler={code => joinPrivateTribeHandler(code)}
          closeJoinTribeModal={() => closeJoinTribeModal()}
          createOwnTribe={() => createOwnTribe()}
          joinTribeHandler={e => joinTribeHandler(e)}
        />
      )}
      {showCreateTribeModal && (
        <CreateTribeModal
          closeCreateTribeModal={() => closeOwnTribe()}
          createNewTribe={e => createNewTribe(e)}
          showCreateTribeModal={showCreateTribeModal}
        />
      )}
    </BaseLayout>
  );
};

export default Contest;
