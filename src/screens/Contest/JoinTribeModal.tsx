import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {ActivityIndicator, Image, Text, TextInput, View} from 'react-native';
import useStyles from '../Tribe/stylesJoinTribe';
import {useSelector} from 'react-redux';
import {
  PrimaryButton,
  PrimaryInput,
  PrimaryModal,
  SecondaryButton,
} from '../../components';

interface JoinTribeModalProps {
  contest_uuid: string;
  navigation: any;
  createOwnTribe: () => void;
  showJoinTribeModal: boolean;
  closeJoinTribeModal: () => void;
  joinTribeHandler: (pass_code: string) => void;
  joinPrivateTribeHandler: (pass_code: string) => void;
}

const JoinTribeModal = (props: JoinTribeModalProps) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const [loading, setLoading] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [searchKeywords, setSearchKeywords] = useState<string>('');

  const tribeData = useSelector(
    (state: any) => state.contestReducer.tribeLeaders.results,
  );

  const publicTribeList = tribeData;
  const [duplicatePublicTribeList, setDuplicatePublicTribeList] = useState<any>(
    [],
  );

  useEffect(() => {
    setDuplicatePublicTribeList(publicTribeList);
  }, [publicTribeList]);

  // eslint-disable-next-line react/no-unstable-nested-components
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
        <View style={styles.width50}>
          <Text style={styles.tribeTitle}>{name}</Text>
          <Text style={styles.tribeText}>{captain}</Text>
          <Text style={styles.tribeText11}>
            Avg P/L : ${parseFloat(avgpl).toFixed(2)}
          </Text>
        </View>
        <View style={styles.flexCenterRight}>
          <SecondaryButton
            style={styles.secondaryButtonSmStyle}
            textStyle={styles.secondaryButtonTextSmStyle}
            handleClick={() => props.joinTribeHandler(pass_code)}
            isLoading={false}
            text="Join Tribe"
          />
        </View>
      </View>
    );
  };

  // eslint-disable-next-line react/no-unstable-nested-components
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

  const passCodeChangeHandler = (text: string) => {
    setPasscode(text);
  };

  const searchTribeHandler = (text: string) => {
    setSearchKeywords(text);
  };

  const searchFilterFunction = (text: string) => {
    // Check if searched text is not blank
    if (text) {
      const newData = publicTribeList.filter(function (item: any) {
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

  // eslint-disable-next-line react/no-unstable-nested-components
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
              handleClick={() => props.joinPrivateTribeHandler(passcode)}
              gradientColors={theme.colors.secondaryGradient}
            />
          </View>
        </View>
      </View>
    );
  };

  // eslint-disable-next-line react/no-unstable-nested-components
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
            // eslint-disable-next-line react-native/no-inline-styles
            containerStyle={[styles.inputStyle, {paddingHorizontal: 0}]}
          />
        </View>
      </View>
    );
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const PublicTribe = () => {
    return (
      <View style={styles.tribeCardPage}>
        {!loading &&
          duplicatePublicTribeList?.length > 0 &&
          duplicatePublicTribeList?.map((ptribe: any) => {
            return <TribeCard key={ptribe.uuid} data={ptribe} />;
          })}
        {!loading && duplicatePublicTribeList?.length === 0 && (
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

  return (
    <PrimaryModal
      visible={props.showJoinTribeModal}
      headerTitle={'Join Tribe'}
      width={'100%'}
      handleClose={props.closeJoinTribeModal}>
      <View style={styles.tribePageStyle}>
        {PrivateTribe()}
        {PublicTribeSearch()}
        {PublicTribe()}
        <View style={styles.createTribeBtn}>
          <PrimaryButton
            style={styles.primaryButton}
            text="Create a Tribe"
            gradientStyle={styles.primaryButtonGradient}
            textStyle={styles.btnTextStyle}
            handleClick={props.createOwnTribe}
            gradientColors={theme.colors.secondaryGradient}
          />
        </View>
      </View>
    </PrimaryModal>
  );
};

export default JoinTribeModal;
