import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {BaseLayout} from '../../layout';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import useStyles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, ContestWagerFilters} from '../../redux';
import {
  getIndividualLeadersAction,
  getTribeAction,
  getTribeLeadersAction,
  getWagerAction,
  patchUpdateTribe,
  reteriveContestDetailAction,
} from '../../redux/actions/contestAction';
import LinearGradient from 'react-native-linear-gradient';
import {Switch} from 'react-native-switch';
import {CustomSelect, WagerActivityInnerCard} from '../../components';
import {Row, Rows, Table} from 'react-native-table-component';
import {CROWN_ICON, EDIT_ICON} from '../../assets';
import {
  captureImage,
  chooseFile,
  requestCameraPermission,
  requestExternalWritePermission,
} from '../../service/imagePickerService';
import moment from 'moment';
import {SET_WAGER} from '../../redux/actionTypes';
import toast from 'react-native-simple-toast';
import {ViewProfilePicture} from '../../components/ViewProfilePicture';

type ContestParamList = StackNavigationProp<PostLoginParamList, 'Comments'>;

const Tribe = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<ContestParamList>();
  const dispatch = useDispatch<AppDispatch>();
  const route: any = useRoute();

  const contest_uuid = route?.params?.uuid;

  const contestDetails = useSelector(
    (state: any) => state.contestReducer.contestDetails,
  );

  const tribeWagarData = useSelector(
    (state: any) => state.contestReducer.wager,
  );
  const {initialFilters} = useSelector((state: any) => state.betTrackerReducer);

  const [tribeLeadersData, setTribeLeadersData] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImgPath, setProfileImgPath] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedStat, setSelectedStat] = useState<string>('pending');

  const tribeTabs = [
    {
      name: 'home',
      label: 'Home',
    },
    {
      name: 'rules',
      label: 'Rules',
    },
    {
      name: 'leaders',
      label: 'Leaders',
    },
    {
      name: 'wager',
      label: 'Wager',
    },
  ];
  const [selectedMainTab, setSelectedMainTab] = useState('home');
  const [leadersType, setLeadersType] = useState({
    id: 'tribe',
    display: 'Tribe',
  });
  const [pagination, setPagination] = useState({
    next: false,
    page: null,
  });

  const tribeData = useSelector((state: any) => state.contestReducer.tribe);
  const {user} = useSelector((state: any) => state.authReducer);

  const loadTribeData = () => {
    setLoading(true);
    dispatch(getTribeAction(contest_uuid));
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (tribeData.uuid) {
      loadTribeWagerData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tribeData, initialFilters]);

  const loadTribeLeadersData = () => {
    const params: any = {
      page: pagination.next ? pagination.page : '1',
      public: '',
      name: '',
    };
    dispatch(
      getTribeLeadersAction(
        contest_uuid,
        params,
        successCallbackLeader,
        errorCallback,
      ),
    );
  };

  const successCallbackLeader = (data: any) => {
    setTribeLeadersData((preData: any) => [...preData, ...data.results]);
    setPagination(data.pagination);
    setLoading(false);
  };

  const successCallbackIndLeader = (data: any) => {
    setTribeLeadersData((preData: any) => [...preData, ...data.results]);
    setPagination(data.pagination);
    setLoading(false);
  };

  const errorCallback = (data: any) => {
    toast.show(data?.[0]?.message, 2);
  };

  const loadTribeIndividualLeadersData = () => {
    const params = {
      page: pagination.next ? pagination.page : '1',
      public: true,
      name: '',
    };
    dispatch(
      getIndividualLeadersAction(
        contest_uuid,
        params,
        successCallbackIndLeader,
        errorCallback,
      ),
    );
  };

  const loadTribeWagerData = () => {
    const _startDate: string = initialFilters.date_range.find(
      (element: any) => element.type === 'startDate',
    )?.value;
    const _endDate: string = initialFilters.date_range.find(
      (element: any) => element.type === 'endDate',
    )?.value;
    let filters: ContestWagerFilters = {
      wager_status: initialFilters.wager_status
        .filter((item: any) => item.isChecked)
        .map((_item: any) => _item.name),
      wager_types: initialFilters.wager_types
        .filter((item: any) => item.isChecked)
        .map((_item: any) => _item.name),
      date_range: [],
      uuid: tribeData.uuid,
    };
    if (_startDate && _endDate) {
      filters.date_range = [
        moment(_startDate).format('YYYY-MM-DD'),
        moment(_endDate).format('YYYY-MM-DD'),
      ];
    }
    dispatch(getWagerAction(1, contest_uuid, filters));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadTribeData();
      if (route.params && route.params.uuid) {
        dispatch(reteriveContestDetailAction(contest_uuid));
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    setTribeLeadersData([]);
    setLoading(true);
    if (leadersType.id === 'tribe') {
      loadTribeLeadersData();
    } else {
      loadTribeIndividualLeadersData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadersType]);

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
          uploadprofileImage(res);
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
        uploadprofileImage(res);
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
          uploadprofileImage(res);
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
        uploadprofileImage(res);
      }
    }
  };

  const uploadprofileImage = (image: object) => {
    if (tribeData.uuid) {
      const formData = new FormData();
      formData.append('is_public', tribeData?.is_public);
      formData.append('logo', image);
      dispatch(
        patchUpdateTribe(
          contest_uuid,
          tribeData.uuid,
          formData,
          () => {
            dispatch(getTribeAction(contest_uuid));
          },
          response => toast.show(response[0].message, 2),
        ),
      );
    }
  };

  const changeTribeStatus = (isPublic: boolean) => {
    if (tribeData.uuid) {
      const formData = new FormData();
      formData.append('is_public', isPublic);
      dispatch(
        patchUpdateTribe(
          contest_uuid,
          tribeData.uuid,
          formData,
          () => {
            dispatch(getTribeAction(contest_uuid));
          },
          response => toast.show(response[0].message, 2),
        ),
      );
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

  const LeadersSelect = () => {
    return (
      <View style={styles.lineViewSelect}>
        <CustomSelect
          options={[
            {id: 'tribe', display: 'Tribe'},
            {id: 'individual', display: 'Individual'},
          ]}
          selectedValue={leadersType}
          onChange={e => setLeadersType(e)}
        />
      </View>
    );
  };

  const TribeCard = ({data}: any) => {
    return (
      <>
        <View style={styles.tribeFullCard}>
          <View style={styles.tribeCard}>
            <View style={styles.tribeCardHeader}>
              <View style={styles.tribeHImage}>
                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible),
                      setProfileImgPath(data?.logo);
                  }}>
                  <Image
                    style={styles.tribeLogo}
                    source={{
                      uri: data?.logo,
                    }}
                  />
                </Pressable>
                {data.captain_name ===
                  `${user.first_name} ${user.last_name}` && (
                  <Pressable
                    style={styles.editIconWrapper}
                    onPress={showImagePickerOption}>
                    <Image source={EDIT_ICON} />
                  </Pressable>
                )}
              </View>
              <View style={styles.tribeDetail1}>
                <Text style={styles.tribeTitle}>{data?.name}</Text>
                <Text style={styles.tribeText}>{data?.captain_name}</Text>
              </View>
            </View>
            <View style={styles.tribeInfoRow}>
              <Text style={styles.tribeInfoText}>
                Avg BankRoll Balance : $
                {data?.avg_bankroll_balance
                  ? parseFloat(data?.avg_bankroll_balance + '').toFixed(2)
                  : 0}
              </Text>
              <Text style={styles.tribeInfoText}>
                Passcode: {data?.pass_code}
              </Text>
            </View>
            <View style={styles.tribeInfoRow}>
              <Text style={styles.tribeInfoText}>
                Avg Pending : ${data?.avg_pending_wager}
              </Text>
              <Text style={styles.tribeInfoText}>
                Avg P/L : ${parseFloat(data?.avg_profit_loss + '').toFixed(2)}
              </Text>
            </View>
          </View>
          <TribeMembers />
          <TribeSwitch />
        </View>
      </>
    );
  };

  const TribeLeaders = () => {
    return (
      <View style={styles.tribeMembers}>
        {tribeLeadersData &&
          tribeLeadersData.length > 0 &&
          tribeLeadersData.map((member: any, idx: any) => {
            return (
              <View key={idx} style={styles.tribeMember}>
                <Pressable
                  style={styles.tribeMemberLogoWr}
                  onPress={() => {
                    setModalVisible(!modalVisible),
                      setProfileImgPath(member?.logo);
                  }}>
                  <Image
                    source={{uri: member?.logo}}
                    style={styles.tribeMemberLogo}
                  />
                </Pressable>
                <View style={styles.tribeMemberInfo}>
                  <Text style={styles.tribeMemberTitle}>{member?.name}</Text>
                  <View style={styles.tribeInfoRow}>
                    <Text style={styles.tribeInfoTextBlue}>
                      Avg Bankroll:{' '}
                      {parseFloat(member?.avg_bankroll_balance + '').toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.tribeInfoRow}>
                    <Text style={styles.tribeInfoText}>
                      {member?.members_count} Members
                    </Text>
                    <Text style={styles.tribeInfoText}>
                      Avg P/L: ${' '}
                      {parseFloat(member?.avg_profit_loss + '').toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.tribeInfoRow}>
                    <Text style={styles.tribeInfoText}>
                      Avg Pending: ${' '}
                      {parseFloat(member?.avg_pending_wager + '').toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
      </View>
    );
  };

  const TribeIndividualLeaders = () => {
    return (
      <View style={styles.tribeMembers}>
        {tribeLeadersData &&
          tribeLeadersData.length > 0 &&
          tribeLeadersData.map((member: any, idx: any) => {
            return (
              <View key={idx} style={styles.tribeMember}>
                <Pressable
                  style={styles.tribeMemberLogoWr}
                  onPress={() => {
                    setModalVisible(!modalVisible),
                      setProfileImgPath(member?.profile);
                  }}>
                  <Image
                    source={{uri: member?.profile}}
                    style={styles.tribeMemberLogo}
                  />
                </Pressable>
                <View style={styles.tribeMemberInfo}>
                  <Text style={styles.tribeMemberTitle}>
                    {member?.first_name} {member?.last_name}
                  </Text>
                  <View style={styles.tribeInfoRow}>
                    <Text style={styles.tribeInfoTextBlue}>
                      Bankroll:{' '}
                      {parseFloat(member?.bankroll_balance + '').toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.tribeInfoRow}>
                    <Text style={styles.tribeInfoText}>
                      Profit/Loss:{' '}
                      {`${parseFloat(member?.profit_loss + '').toFixed(2)}`}
                    </Text>
                    <Text style={styles.tribeInfoText}>
                      W/L/P: {member?.wager_count?.win}-
                      {member?.wager_count?.loss}-{member?.wager_count?.pending}
                    </Text>
                  </View>
                  <View style={styles.tribeInfoRow}>
                    <Text style={styles.tribeInfoText}>
                      Pending: ${' '}
                      {parseFloat(member?.pending_wager + '').toFixed(2)}
                    </Text>
                    <Text style={styles.tribeInfoText}>
                      Tribe: {member?.tribe_name}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
      </View>
    );
  };

  const TribeLeadersCard = () => {
    return (
      <>
        <View style={styles.tribeFullCard}>
          <View style={styles.tribeCard}>
            <View style={styles.tribeInfoRow}>
              <Text style={styles.tribeInfoText}>
                Tribes: {contestDetails?.total_active_tribes}
              </Text>
              <Text style={styles.tribeInfoText}>
                Contest Entries: {contestDetails?.contest_entries}
              </Text>
            </View>
            <View style={styles.tribeInfoRow}>
              <Text style={styles.tribeInfoText}>
                Prize Pool: ${contestDetails?.prize_pool}
              </Text>
              <Text style={styles.tribeInfoText}>
                Invite friends to increase the Price Pool!
              </Text>
            </View>
            {/* <Text style={styles.tribeInfoTextSmall}>See prize payouts</Text> */}
          </View>
          <LeadersSelect />
          {leadersType.id === 'tribe' ? (
            <TribeLeaders />
          ) : (
            <TribeIndividualLeaders />
          )}
        </View>
      </>
    );
  };

  const TribeSwitch = () => {
    return (
      <View style={styles.inlineSwitchRow}>
        <Text style={styles.textDark}>Private</Text>
        <Switch
          value={!tribeData.is_public}
          onValueChange={isOn => {
            changeTribeStatus(!isOn);
          }}
          disabled={false}
          activeText={'ON'}
          barHeight={30}
          circleBorderWidth={1}
          inActiveText={'OFF'}
          backgroundActive={'#009BDB'}
          backgroundInactive={'#E3E3E3'}
          circleActiveColor={'#ffffff'}
          circleInActiveColor={'#ffffff'}
          switchWidthMultiplier={3}
        />
      </View>
    );
  };

  const TribeTabs = () => {
    return (
      <LinearGradient
        colors={theme.colors.primaryGradient}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={styles.tableHeaderGradientStyle}>
        {tribeTabs.map((tab: any) => (
          <Text
            key={tab.name}
            onPress={() => setSelectedMainTab(tab.name)}
            style={
              selectedMainTab === tab.name
                ? styles.tabViewTextActive
                : styles.tabViewText
            }>
            {tab.label}
          </Text>
        ))}
      </LinearGradient>
    );
  };

  const TribeMembers = () => {
    return (
      <View style={styles.tribeMembers}>
        {tribeData.members &&
          tribeData.members.length > 0 &&
          tribeData.members.map((member: any, idx: any) => {
            return (
              <View key={idx} style={styles.tribeMember}>
                <View style={styles.tribeMemberLogoWr}>
                  <Pressable
                    onPress={() => {
                      setModalVisible(!modalVisible),
                        setProfileImgPath(member?.profile);
                    }}>
                    <Image
                      source={{uri: member?.profile}}
                      style={styles.tribeMemberLogo}
                    />
                  </Pressable>
                  {member.is_captain && (
                    <View style={styles.memberCrownIcon}>
                      <Image source={CROWN_ICON} />
                    </View>
                  )}
                </View>
                <View style={styles.tribeMemberInfo}>
                  <Text style={styles.tribeMemberTitle}>
                    {member?.first_name} {member?.last_name}
                  </Text>
                  <View style={styles.tribeInfoRow}>
                    <Text style={styles.tribeInfoText}>
                      PL: ${parseFloat(member?.profit_loss + '').toFixed(2)}
                    </Text>
                    <Text style={styles.tribeInfoText}>
                      Bank Roll Balance : $
                      {parseFloat(member?.bankroll_balance + '').toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.tribeInfoRow}>
                    <Text style={styles.tribeInfoText}>
                      Pending: ${member?.pending_wager}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
      </View>
    );
  };

  const HomeContent = () => {
    return (
      <ScrollView style={styles.width100}>
        <View style={styles.tribeCardPage}>
          {!loading && <TribeCard data={tribeData} />}
          {!loading && Object.keys(tribeData).length === 0 && (
            <View>
              <Text>No records found.</Text>
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
      </ScrollView>
    );
  };

  const RulesContent = () => {
    return (
      <ScrollView style={styles.contentPage}>
        <Text style={styles.contentPageSubHeading}>Tribe Name</Text>
        <Text style={styles.contentPageText}>{tribeData?.name}</Text>
        <Text style={styles.contentPageSubHeading}>Contest Rules</Text>
        <Text style={styles.contentPageText}>{contestDetails?.rules}</Text>
      </ScrollView>
    );
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const LeadersContent = () => {
    return (
      <ScrollView
        style={styles.tribeCardPage}
        onMomentumScrollEnd={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            if (pagination.next) {
              if (leadersType.id === 'tribe') {
                loadTribeLeadersData();
              } else {
                loadTribeIndividualLeadersData();
              }
            }
          }
        }}
        scrollEventThrottle={400}>
        {!loading && <TribeLeadersCard />}
        {!loading && Object.keys(tribeLeadersData).length === 0 && (
          <View>
            <Text>No records found.</Text>
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
      </ScrollView>
    );
  };

  const renderPeddingtable = () => {
    let rows: any = [];
    let totalBetsCount = 0;
    let totalAtRiscCount = 0;
    let totalToWinCount: any = 0;
    let pending_wagers: any =
      tribeWagarData?.performance_state?.pending_wagers || {};
    Object.keys(pending_wagers).forEach((key: string) => {
      if (key === 'straight') {
        return;
      }
      totalBetsCount = totalBetsCount + +pending_wagers[key].wager_type__count;
      totalAtRiscCount = totalAtRiscCount + +pending_wagers[key].at_risk__sum;
      totalToWinCount = totalToWinCount + +pending_wagers[key].payout__sum;
      let arr: any = [
        key,
        pending_wagers[key].wager_type__count,
        pending_wagers[key].at_risk__sum,
        pending_wagers[key].payout__sum?.toFixed(2),
      ];
      rows.push(arr);
    });
    return (
      <Table borderStyle={styles.tableBorderStyle}>
        <Row
          data={['Bet Type', 'Bets', 'At Risk', 'To Win']}
          style={styles.tableHeaderRowStyle}
          textStyle={styles.tableHeaderTextStyle}
          flexArr={[1, 0.5, 0.8, 1]}
        />
        <Rows
          data={rows}
          textStyle={styles.tableBodyTextStyle}
          flexArr={[1, 0.5, 0.8, 1]}
        />
        <Row
          data={[
            'All Wagers',
            totalBetsCount,
            `$${totalAtRiscCount}`,
            `$${parseFloat(totalToWinCount + '').toFixed(2)}`,
          ]}
          style={styles.tableFooterRowStyle}
          textStyle={styles.tableFooterTextStyle}
          flexArr={[1, 0.5, 0.8, 1]}
        />
      </Table>
    );
  };

  const renderCompletedTable = () => {
    let rows: any = [];
    let totalBetsCount = 0;
    let totalAtRiscCount = 0;
    let totalWinSum = 0;
    let totalLossSum = 0;
    let totalTossSum = 0;
    let totalProfitLossSum = 0;
    let completed_wagers: any =
      tribeWagarData?.performance_state?.completed_wagers || {};

    Object.keys(completed_wagers).forEach((key: string) => {
      if (key === 'straight') {
        return;
      }
      totalBetsCount =
        totalBetsCount + +completed_wagers[key].wager_type__count;
      totalAtRiscCount = totalAtRiscCount + completed_wagers[key].at_risk__sum;
      totalProfitLossSum =
        totalProfitLossSum + +completed_wagers[key].profit_loss_sum;
      totalWinSum = totalWinSum + +completed_wagers[key].win__count;
      totalLossSum = totalLossSum + +completed_wagers[key].loss__count;
      totalTossSum = totalTossSum + +completed_wagers[key].push__count;
      let arr: any = [
        key,
        completed_wagers[key].wager_type__count,
        completed_wagers[key].at_risk__sum,
        `${completed_wagers[key].win__count}-${completed_wagers[key].loss__count}-${completed_wagers[key].push__count}`,
        `$${parseFloat(completed_wagers[key].profit_loss_sum + '').toFixed(2)}`,
      ];
      rows.push(arr);
    });
    return (
      <Table borderStyle={styles.tableBorderStyle}>
        <Row
          data={['Bet Type', 'Bets', 'At Risk', 'W-L-T', 'PL']}
          style={styles.tableHeaderRowStyle}
          textStyle={styles.tableHeaderTextStyle}
          flexArr={[1, 0.6, 0.7, 1]}
        />
        <Rows
          data={rows}
          textStyle={styles.tableBodyTextStyle}
          flexArr={[1, 0.6, 0.7, 1]}
        />
        <Row
          data={[
            'All Wagers',
            totalBetsCount,
            `$${totalAtRiscCount}`,
            `${totalWinSum}-${totalLossSum}-${totalTossSum}`,
            `$${parseFloat(totalProfitLossSum + '').toFixed(2)}`,
          ]}
          style={styles.tableFooterRowStyle}
          textStyle={styles.tableFooterTextStyle}
          flexArr={[1, 0.6, 0.7, 1]}
        />
      </Table>
    );
  };

  const isScrollviewCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    const paddingToBottom = 0;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const loadMoreData = () => {
    if (tribeWagarData?.pagination?.next === true) {
      const _startDate: string = initialFilters.date_range.find(
        (element: any) => element.type === 'startDate',
      )?.value;
      const _endDate: string = initialFilters.date_range.find(
        (element: any) => element.type === 'endDate',
      )?.value;
      let filters: ContestWagerFilters = {
        wager_status: initialFilters.wager_status
          .filter((item: any) => item.isChecked)
          .map((_item: any) => _item.name),
        wager_types: initialFilters.wager_types
          .filter((item: any) => item.isChecked)
          .map((_item: any) => _item.name),
        date_range: [],
        uuid: tribeData.uuid,
      };
      if (_startDate && _endDate) {
        filters.date_range = [
          moment(_startDate).format('YYYY-MM-DD'),
          moment(_endDate).format('YYYY-MM-DD'),
        ];
      }

      dispatch(
        getWagerAction(
          tribeWagarData?.pagination?.page,
          contest_uuid,
          filters,
          (successData: any) => {
            let wagerData = tribeWagarData;
            wagerData.pagination = successData.pagination;
            wagerData.result = [...wagerData.result, ...successData.result];
            dispatch({type: SET_WAGER, payload: wagerData});
          },
          errorCallback,
        ),
      );
    }
  };

  const WagerPage = () => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.filterRowContainer}>
          <Pressable
            onPress={() => navigation.navigate('Filters', {from: 'tribe'})}
            style={styles.filterItem}>
            <Text style={styles.filterItemText}>Filter</Text>
          </Pressable>
        </View>
        <View style={styles.statsCard}>
          <LinearGradient
            colors={theme.colors.primaryGradient}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={styles.statsCardHeader}>
            <Text style={styles.statsCardHeading}>Performance Stats</Text>
          </LinearGradient>
          <View style={styles.statsCardInnerContainer}>
            <View style={styles.statsCardTabContainer}>
              <Pressable
                onPress={() => setSelectedStat('pending')}
                style={[
                  styles.statsCardTab,
                  selectedStat === 'pending' && styles.statsCardTabSelected,
                ]}>
                <Text
                  style={[
                    styles.statsCardTabText,
                    selectedStat === 'pending' && styles.blueText,
                  ]}>
                  Pending Wagers
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setSelectedStat('completed')}
                style={[
                  styles.statsCardTab,
                  selectedStat === 'completed' && styles.statsCardTabSelected,
                ]}>
                <Text
                  style={[
                    styles.statsCardTabText,
                    selectedStat === 'completed' && styles.blueText,
                  ]}>
                  Completed Wagers
                </Text>
              </Pressable>
            </View>
            {tribeWagarData && (
              <View style={styles.tableWrapper}>
                {selectedStat === 'pending'
                  ? renderPeddingtable()
                  : renderCompletedTable()}
              </View>
            )}
          </View>
        </View>
        {/* wager activity card starts here */}
        <View style={styles.statsCard}>
          <LinearGradient
            colors={theme.colors.primaryGradient}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={styles.statsCardHeader}>
            <Text style={styles.statsCardHeading}>Wager Activity</Text>
          </LinearGradient>
          {tribeWagarData?.results?.map((item: any, index: any) => {
            return <WagerActivityInnerCard key={index} wagerActivity={item} />;
          })}
        </View>
      </View>
    );
  };

  const WagerContent = () => {
    return (
      <ScrollView
        style={styles.tribeWagerPage}
        onMomentumScrollEnd={event => {
          if (isScrollviewCloseToBottom(event.nativeEvent)) {
            loadMoreData();
          }
        }}>
        {!loading && <WagerPage />}
        {!loading && Object.keys(tribeData).length === 0 && (
          <View>
            <Text>No records found.</Text>
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
      </ScrollView>
    );
  };

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText={contestDetails?.name ? contestDetails.name : 'Tribe'}
      navigation={navigation}
      renderScrollview={false}>
      <TribeTabs />
      {selectedMainTab === 'home' && <HomeContent />}
      {selectedMainTab === 'rules' && <RulesContent />}
      {selectedMainTab === 'leaders' && <LeadersContent />}
      {selectedMainTab === 'wager' && <WagerContent />}
      <ViewProfilePicture
        show={modalVisible}
        imageUrl={profileImgPath}
        onClose={() => setModalVisible(!modalVisible)}
      />
    </BaseLayout>
  );
};

export default Tribe;
