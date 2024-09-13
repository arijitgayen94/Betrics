import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {BaseLayout} from '../../layout';
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useStyles from './stylesJoinTribe';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux';
import {
  createTribeAction,
  getTribeLeadersAction,
  joinContestAction,
  joinTribeAction,
} from '../../redux/actions/contestAction';
import toast from 'react-native-simple-toast';
import {
  PrimaryButton,
  PrimaryInput,
  PrimaryModal,
  SecondaryButton,
} from '../../components';
import {TRIBE} from '../../routes/const';
import {Switch} from 'react-native-switch';
import ImagePicker from 'react-native-image-crop-picker';

type ContestParamList = StackNavigationProp<PostLoginParamList, 'Comments'>;

const JoinTribe = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<ContestParamList>();
  const dispatch = useDispatch<AppDispatch>();
  const route: any = useRoute();

  const [loading, setLoading] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [searchKeywords, setSearchKeywords] = useState<string>('');
  const [newTribeData, setNewTribeData] = useState<any>({
    logo: '',
    name: '',
    is_public: false,
  });
  const [showCreateTribeModal, setShowCreateTribeModal] =
    useState<boolean>(false);

  const contest_uuid = route?.params?.uuid;

  const tribeData = useSelector(
    (state: any) => state.contestReducer.tribeLeaders,
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const publicTribeList = tribeData?.results ?? [];
  const [duplicatePublicTribeList, setDuplicatePublicTribeList] = useState<any>(
    [],
  );

  const loadTribeData = () => {
    setLoading(true);
    const params = {
      page: '1',
      public: true,
      name: '',
    };
    dispatch(getTribeLeadersAction(contest_uuid, params));
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    loadTribeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDuplicatePublicTribeList(publicTribeList);
  }, [publicTribeList]);

  const successJoin = () => {
    toast.show('Joined contest successfully.');
  };

  const failedJoin = () => {
    toast.show('Joined contest failed.');
  };

  if (route.params && route.params.termsandconditions === 'accepted') {
    dispatch(joinContestAction(route.params.uuid, successJoin, failedJoin));
  }

  const closeCreateTribeModal = () => {
    setShowCreateTribeModal(false);
  };

  const successTribeCreate = (data: any) => {
    setNewTribeData({
      logo: '',
      name: '',
      is_public: false,
    });
    setShowCreateTribeModal(false);
    toast.show('Tribe created successfully.');
    navigation.navigate(TRIBE, {uuid: data.uuid});
  };

  const failedTribeCreate = (error: any) => {
    setNewTribeData({
      logo: '',
      name: '',
      is_public: false,
    });
    toast.show(error?.[0]?.message, 2);
  };

  const createNewTribe = () => {
    if (newTribeData.name === '') {
      toast.show('Please Add Tribe Name.');
      return;
    }

    // const formData = new FormData();
    // if (newTribeData.logo) {
    // formData.append('logo', newTribeData.logo.data);
    // formdata.append("logo", fileInput.files[0], "Screenshot from 2022-08-31 13-24-08.png");
    // }
    // formData.append('name', newTribeData.name);
    // formData.append('is_public', newTribeData.is_public);

    const newData = {
      name: newTribeData.name,
      is_public: newTribeData.is_public,
    };

    dispatch(
      createTribeAction(
        contest_uuid,
        newData,
        successTribeCreate,
        failedTribeCreate,
      ),
    );
  };

  const TribeHeader = ({
    logo,
    pass_code,
    name,
    captain,
    avgpl,
  }: {
    logo: string;
    pass_code: string;
    name: string;
    captain: string;
    avgpl: string;
  }) => {
    return (
      <View style={styles.tribeCardBox}>
        <View style={styles.tribeHImage}>
          <Image
            style={styles.teamLogo}
            source={{
              uri: logo,
            }}
          />
        </View>
        <View>
          <Text style={styles.tribeTitle}>{name}</Text>
          <Text style={styles.tribeText}>{captain}</Text>
          <Text style={styles.tribeText11}>Avg P/L : ${avgpl}</Text>
        </View>
        <View style={styles.flexCenterRight}>
          <SecondaryButton
            style={styles.secondaryButtonSmStyle}
            textStyle={styles.secondaryButtonTextSmStyle}
            handleClick={() => joinTribeHandler(pass_code)}
            isLoading={false}
            text="Join Tribe"
          />
        </View>
      </View>
    );
  };

  const TribeCard = ({data}: any) => {
    return (
      <View style={styles.tribeCard}>
        <TribeHeader
          logo={data?.logo}
          pass_code={data?.pass_code}
          name={data?.name}
          captain={data?.captain_name}
          avgpl={data?.avg_profit_loss}
        />
      </View>
    );
  };

  const joinPrivateTribeHandler = () => {
    const params = {
      pass_code: passcode,
    };
    if (passcode !== '') {
      dispatch(
        joinTribeAction(contest_uuid, params, successCallback, errorCallback),
      );
    } else {
      toast.show('Please add pass code.');
    }
  };

  const successCallback = (data: any) => {
    toast.show('Tribe joined successfully.');
    navigation.navigate(TRIBE, {uuid: contest_uuid});
  };
  const errorCallback = (data: any) => {
    toast.show(data?.[0]?.message, 2);
  };

  const tribeJoinSuccess = (data: any) => {
    toast.show('Tribe joined successfully.');
    navigation.navigate(TRIBE, {uuid: contest_uuid});
  };

  const tribeJoinFailed = (data: any) => {
    toast.show(data?.[0]?.message);
  };

  const joinTribeHandler = (code: string) => {
    const params = {
      pass_code: code,
    };
    dispatch(
      joinTribeAction(contest_uuid, params, tribeJoinSuccess, tribeJoinFailed),
    );
  };

  const passCodeChangeHandler = (text: string) => {
    setPasscode(text);
  };

  const searchTribeHandler = (text: string) => {
    setSearchKeywords(text);
  };

  const createOwnTribe = () => {
    setShowCreateTribeModal(true);
  };

  const searchFilterFunction = (text: string) => {
    // Check if searched text is not blank
    if (text) {
      const newData = publicTribeList.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setDuplicatePublicTribeList(newData);
      searchTribeHandler(text);
    } else {
      setDuplicatePublicTribeList(publicTribeList);
      searchTribeHandler(text);
    }
  };

  const PrivateTribe = () => {
    return (
      <View style={styles.privateTribeWr}>
        <Text style={styles.privateTribeHeading}>Private Tribe</Text>
        <View style={styles.privateTribe}>
          <View style={styles.privateTribeView}>
            <View style={styles.inputStyleWr}>
              <TextInput
                placeholder="Pass Code"
                value={passcode}
                onChangeText={text => passCodeChangeHandler(text)}
                keyboardType="default"
                style={styles.inputStyle}
              />
            </View>
          </View>
          <View style={styles.privateTribeView}>
            <PrimaryButton
              style={styles.primaryButton}
              text="Join Private Tribe"
              gradientStyle={styles.primaryButtonGradient}
              textStyle={styles.btnTextStyle}
              handleClick={() => joinPrivateTribeHandler()}
              gradientColors={theme.colors.secondaryGradient}
            />
          </View>
        </View>
      </View>
    );
  };

  const PublicTribeSearch = () => {
    return (
      <View style={styles.publicSearchWr}>
        <View style={styles.publicSearchView}>
          <Text>Public Tribe</Text>
        </View>
        <View style={styles.publicSearchField}>
          <PrimaryInput
            placeholder="Search Tribe Name"
            value={searchKeywords}
            onChangeText={text => searchFilterFunction(text)}
            keyboardType="default"
            containerStyle={styles.inputStyle}
          />
        </View>
      </View>
    );
  };

  const PublicTribe = (props: any) => {
    return (
      <View style={styles.tribeCardPage}>
        {!loading &&
          props.data.length > 0 &&
          props.data.map((ptribe: any) => {
            return <TribeCard key={ptribe.uuid} data={ptribe} />;
          })}
        {!loading && props.data.length === 0 && (
          <View>
            <Text>No tribe found.</Text>
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

  const renderCreateTribeModal = () => {
    return (
      <PrimaryModal
        visible={showCreateTribeModal}
        headerTitle={'Create Tribe'}
        handleClose={() => {
          setShowCreateTribeModal(false);
        }}>
        <View style={styles.modalChildren}>
          {/* <View style={styles.modalContentWrapper}>
            <View style={styles.inputStyleWr}>
              <Text>Logo</Text>
              <TouchableOpacity
                onPress={() => {
                  ImagePicker.openPicker({
                    width: 100,
                    height: 100,
                    cropping: true,
                    includeBase64: true,
                    includeExif: true,
                  }).then(image => {
                    setNewTribeData({...newTribeData, logo: image});
                  });
                }}>
                <Text style={styles.fileUploadStyle}>
                  {newTribeData.logo ? newTribeData.logo.path : 'Browse Image'}
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}
          <View style={styles.modalContentWrapper}>
            <View style={styles.inputStyleWr}>
              <Text>Name</Text>
              <TextInput
                value={newTribeData.name}
                onChangeText={text =>
                  setNewTribeData({...newTribeData, name: text})
                }
                keyboardType="default"
                style={styles.inputStyle}
              />
            </View>
          </View>
          <View style={styles.modalContentWrapper}>
            <View style={[styles.inputStyleWr, styles.inlineStyleWr]}>
              <Text>Private</Text>
              <Switch
                value={newTribeData.is_public}
                onValueChange={isOn =>
                  setNewTribeData({...newTribeData, is_public: isOn})
                }
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
          </View>
          <View style={styles.modalFooterBtnWrapper}>
            <PrimaryButton
              style={styles.w40}
              text="Close"
              gradientStyle={styles.modalGradientBtn}
              textStyle={[styles.btnTextStyle, styles.ph15]}
              handleClick={closeCreateTribeModal}
              gradientColors={theme.colors.primaryGradient}
              isLoading={false}
            />
            <PrimaryButton
              style={[styles.w45, styles.ml15]}
              text="Save"
              gradientStyle={styles.modalGradientBtn}
              textStyle={[styles.btnTextStyle, styles.ph15]}
              handleClick={createNewTribe}
              gradientColors={theme.colors.secondaryGradient}
              isLoading={false}
            />
          </View>
        </View>
      </PrimaryModal>
    );
  };

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Join Tribe"
      navigation={navigation}
      renderScrollview={false}>
      <View style={styles.tribePageStyle}>
        {PrivateTribe()}
        <PublicTribeSearch />
        <PublicTribe data={duplicatePublicTribeList} />
        {renderCreateTribeModal()}
        <View style={styles.createTribeBtn}>
          <PrimaryButton
            style={styles.primaryButton}
            text="Create a Tribe"
            gradientStyle={styles.primaryButtonGradient}
            textStyle={styles.btnTextStyle}
            handleClick={() => createOwnTribe()}
            gradientColors={theme.colors.secondaryGradient}
          />
        </View>
      </View>
    </BaseLayout>
  );
};

export default JoinTribe;
