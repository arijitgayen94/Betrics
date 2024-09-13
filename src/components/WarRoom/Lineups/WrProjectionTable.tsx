import React, {useEffect, useRef, useState} from 'react';
import useStyles from '../styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Table, Row, Rows, TableWrapper} from 'react-native-table-component';
import WrButtons from '../WrButtons';
import {
  BLUE_LEFT_ARROW,
  BLUE_RIGHT_ARROW,
  GRAY_LEFT_ARROW,
  GRAY_RIGHT_ARROW,
  ROTOWIRE,
  SORT_ICON,
} from '../../../assets';
import {headingJson} from '../headingJson';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, getProjectionAction} from '../../../redux';
import {GetSubscription} from '../../GetSubscription';
import {SUBSCRIPTION} from '../../../routes/const';

const WrLineupsProjections = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const leftRef = useRef<ScrollView>(null);
  const rightScrollView = useRef<ScrollView>(null);

  const matchup = props.matchup;
  const sportName = useSelector((state: any) => state.authReducer.sport);
  const isSubscribed = useSelector(
    (state: any) => state.subscriptionReducer.isSubscribed,
  );
  const {user} = useSelector((state: any) => state.authReducer);
  const team_away_id = matchup?.away?.sr_id;
  const team_home_id = matchup?.home?.sr_id;
  const [selectedTeam, setSelectedTeam] = useState<string>('away');
  const [teamAwayInjuryData, setTeamAwayInjuryData] = useState<any>([]);
  const [teamHomeInjuryData, setTeamHomeInjuryData] = useState<any>([]);

  const [slideState, setSlideState] = useState(0);
  const [sliderData, setSliderData] = useState<any>({});
  const [slideData, setSlideData] = useState<any>({});
  const [slideKey, setSlideKey] = useState<string>('');
  const [dataSortBy, setDataSortBy] = useState<number>(0);
  const [ascDesc, setAscDesc] = useState<number>(0);
  const slideStatesData = ['passing', 'rushing', 'receiving', 'defense'];

  const loadDefaultData = (data: any) => {
    // Default Slider Data
    const dSliderData = sportName === 'nfl' ? data : data[0].projection;
    setSliderData(dSliderData);

    // Default Slide Data
    changeSlideData(dSliderData);
  };

  const changeSlideData = (data: any, key = 0) => {
    let dSlideKey;
    let dSlideData;
    if (sportName === 'nfl') {
      dSlideKey = slideStatesData[key];
      dSlideData = data[0][dSlideKey];
    } else {
      dSlideKey = Object.keys(data)[key];
      dSlideData = data[dSlideKey];
    }

    setSlideKey(dSlideKey);
    setSlideData(dSlideData);
  };

  const elementButton = (value: string) => (
    <TouchableOpacity onPress={() => fetchKeyIndex(value)}>
      <View style={styles.flexRow}>
        <Text style={styles.tableHeaderTextStyle}>{value}</Text>
        <Image source={SORT_ICON} style={styles.sortIcon} />
      </View>
    </TouchableOpacity>
  );

  const headReadableName = (key: string) => {
    const headString: any = headingJson;

    if (headString[key]) {
      return elementButton(headString[key]);
    }
    return elementButton(key);
  };

  const headData =
    sportName === 'nfl'
      ? [...Object.keys(slideData).map(key => headReadableName(key))]
      : [...Object.keys(sliderData).map(key => headReadableName(key))];

  const fetchKeyIndex = (val: string) => {
    const arr =
      sportName === 'nfl'
        ? [
            ...Object.keys(slideData).map(key => {
              const headString: any = headingJson;

              if (headString[key]) {
                return headString[key];
              }
              if (typeof headString[key] !== 'undefined') {
                return;
              }
              return key;
            }),
          ]
        : [
            ...Object.keys(sliderData).map(key => {
              const headString: any = headingJson;

              if (headString[key]) {
                return headString[key];
              }
              if (typeof headString[key] !== 'undefined') {
                return;
              }
              return key;
            }),
          ];
    if (arr.includes(val)) {
      const index = arr.indexOf(val);
      if (dataSortBy === index + 1) {
        if (ascDesc === 1) {
          setAscDesc(0);
        } else {
          setAscDesc(1);
        }
      } else {
        setAscDesc(0);
        setDataSortBy(index + 1);
      }
    }
  };

  let awayRowData = [];
  if (teamAwayInjuryData && teamAwayInjuryData.length > 0) {
    awayRowData = teamAwayInjuryData.map((data: any) => {
      if (sportName === 'nfl') {
        if (slideKey && data !== undefined) {
          const restValues = Object.values(data[slideKey]);
          return [
            ...[`${data?.first_name} \n${data?.last_name} | ${data?.position}`],
            ...restValues,
          ];
        }
      } else {
        if (slideKey && data.projection !== undefined) {
          delete data.projection.GP;
          const restValues = Object.values(data.projection);
          return [
            ...[
              `${data?.abbr_name} \n${data?.jersey_number} | ${data?.position}`,
            ],
            ...restValues,
          ];
        }
      }
      return;
    });
  }

  let homeRowData = [];
  if (teamHomeInjuryData && teamHomeInjuryData.length > 0) {
    homeRowData = teamHomeInjuryData.map((data: any) => {
      if (sportName === 'nfl') {
        if (slideKey && data !== undefined) {
          const restValues = Object.values(data[slideKey]);
          return [
            ...[`${data?.first_name} \n${data?.last_name} | ${data?.position}`],
            ...restValues,
          ];
        }
      } else {
        if (slideKey && data.projection !== undefined) {
          delete data.projection.GP;
          const restValues = Object.values(data.projection);
          return [
            ...[
              `${data?.abbr_name} \n${data?.jersey_number} | ${data?.position}`,
            ],
            ...restValues,
          ];
        }
      }
      return;
    });
  }

  let rowData = selectedTeam === 'away' ? awayRowData : homeRowData;

  // Sorting Logic
  if (rowData && rowData.length > 0) {
    rowData.sort((item1: any, item2: any) => {
      if (dataSortBy > 0) {
        if (ascDesc === 0) {
          return item1[dataSortBy] > item2[dataSortBy] ? 1 : -1;
        } else {
          return item1[dataSortBy] < item2[dataSortBy] ? 1 : -1;
        }
      } else {
        return +item1['1'] < +item2['1'] ? 1 : -1;
      }
    });
  }

  let firstTableRowData: any = [];
  let secondTableRowData: any = [];
  if (rowData && rowData.length > 0) {
    const duplicateData: any = rowData;
    duplicateData.map((dupItem: any) => {
      if (typeof dupItem !== 'undefined') {
        let dupArr = dupItem;
        let arr1 = dupItem.splice(1);
        dupArr.length = 1;
        firstTableRowData.push(dupArr);
        secondTableRowData.push(arr1);
      }
    });
  }

  const prevHander = () => {
    if (slideState > 0) {
      setSlideState(state => state - 1);
      changeSlideData(sliderData, slideState - 1);
      setDataSortBy(0);
      rightScrollView?.current?.scrollTo({x: 0, y: 0, animated: true});
    }
  };

  const nextHander = () => {
    if (slideState < slideStatesData.length - 1) {
      setSlideState(state => state + 1);
      changeSlideData(sliderData, slideState + 1);
      setDataSortBy(0);
      rightScrollView?.current?.scrollTo({x: 0, y: 0, animated: true});
    }
  };

  const handleAwayTeamData = (data: any) => {
    setTeamAwayInjuryData(data);
    loadDefaultData(data);
  };

  const handleHomeTeamData = (data: any) => {
    setTeamHomeInjuryData(data);
    loadDefaultData(data);
  };

  const getLineupsStatsView = (team = selectedTeam) => {
    if (team === 'away' && team_away_id && teamAwayInjuryData.length === 0) {
      dispatch(
        getProjectionAction(
          {team_id: team_away_id},
          sportName,
          handleAwayTeamData,
        ),
      );
    }
    if (team === 'home' && team_home_id && teamHomeInjuryData.length === 0) {
      dispatch(
        getProjectionAction(
          {team_id: team_home_id},
          sportName,
          handleHomeTeamData,
        ),
      );
    }
  };

  const handleSelectTeam = (team: string) => {
    setSelectedTeam(team);
    setTeamAwayInjuryData([]);
    setTeamHomeInjuryData([]);
    setDataSortBy(0);
  };

  useEffect(() => {
    // if (isSubscribed || user.account_type !== 'Free') {
    getLineupsStatsView(selectedTeam);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubscribed, selectedTeam]);

  const createWidthArrData = () => {
    let arr = [];
    for (let data in headData) {
      arr.push(120);
    }
    return arr;
  };

  return (
    <>
      {/* {!isSubscribed ? (
        <View style={styles.subscriptionView}>
          <GetSubscription
            onSubscribe={() => navigation.navigate(SUBSCRIPTION)}
          />
        </View>
      ) : ( */}
      <>
        <WrButtons
          matchup={matchup}
          seletedTeam={selectedTeam}
          onSelect={handleSelectTeam}
        />
        <View style={styles.inlineTextImage}>
          <Text style={styles.inlineTextImageText}>Projections Powered by</Text>
          <Image style={styles.inlineTextImageImage} source={ROTOWIRE} />
        </View>
        {(teamAwayInjuryData || teamHomeInjuryData) &&
          sliderData &&
          sportName === 'nfl' &&
          Object.values(sliderData).length > 0 && (
            <View style={[styles.inlineArrows, styles.pt20]}>
              <TouchableOpacity
                disabled={slideState < 1}
                onPress={() => prevHander()}>
                <Image
                  source={slideState < 1 ? GRAY_LEFT_ARROW : BLUE_LEFT_ARROW}
                />
              </TouchableOpacity>
              <Text style={styles.inlineArrowsText}>
                {slideStatesData[slideState]}
              </Text>
              <TouchableOpacity
                disabled={slideState === slideStatesData.length - 1}
                onPress={() => nextHander()}>
                <Image
                  source={
                    slideState < slideStatesData.length - 1
                      ? BLUE_RIGHT_ARROW
                      : GRAY_RIGHT_ARROW
                  }
                />
              </TouchableOpacity>
            </View>
          )}

        <View style={styles.tableContainer}>
          {/* <ScrollView horizontal={true}> */}
          {(teamAwayInjuryData && teamAwayInjuryData.length > 0) ||
          (teamHomeInjuryData && teamHomeInjuryData.length > 0) ? (
            <View style={styles.flex1}>
              {/* Left Column */}
              <View style={styles.width100}>
                {/* Blank Cell */}
                <View style={styles.blankCellView}>
                  <Text style={styles.tableHeaderTextStyle}>Player</Text>
                </View>
                {/* Left Container : scroll synced */}
                <ScrollView
                  ref={leftRef}
                  style={styles.flexWhite}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}>
                  <Table borderStyle={styles.tableBorderStyle}>
                    {firstTableRowData && firstTableRowData.length > 0 ? (
                      <>
                        {firstTableRowData.map(
                          (firstData: any, index: number) => (
                            <Row
                              key={index}
                              data={firstData}
                              widthArr={[90]}
                              style={styles.h50}
                              textStyle={styles.tableBodyTextStyleAutoHeight}
                            />
                          ),
                        )}
                      </>
                    ) : (
                      <Row
                        data={[[]]}
                        widthArr={[100]}
                        textStyle={styles.tableBodyTextStyleAutoHeight}
                      />
                    )}
                  </Table>
                </ScrollView>
              </View>
              {/* Right Column */}
              <View style={styles.flexWhite}>
                <ScrollView
                  horizontal={true}
                  bounces={false}
                  ref={rightScrollView}>
                  <Table borderStyle={styles.tableBorderStyle}>
                    {/* Table Header */}
                    <TableWrapper>
                      <Row
                        data={headData}
                        style={styles.tableHeaderRowStyle}
                        textStyle={styles.tableHeaderTextStyle}
                        widthArr={createWidthArrData()}
                      />
                    </TableWrapper>

                    {/* Table Rows */}
                    {secondTableRowData && secondTableRowData.length > 0 ? (
                      <Rows
                        data={secondTableRowData}
                        style={styles.h50}
                        widthArr={createWidthArrData()}
                        textStyle={styles.tableBodyTextStyleAutoHeight}
                      />
                    ) : (
                      <Rows
                        data={[[]]}
                        widthArr={createWidthArrData()}
                        textStyle={styles.tableBodyTextStyleAutoHeight}
                      />
                    )}
                  </Table>
                </ScrollView>
              </View>
            </View>
          ) : (
            <Text>No records found.</Text>
          )}
          {/* </ScrollView> */}
        </View>
      </>
      {/* )} */}
    </>
  );
};

export default WrLineupsProjections;
