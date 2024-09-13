import React, {useEffect, useRef, useState} from 'react';
import useStyles from '../styles';
import {useTheme} from '@react-navigation/native';
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
import WrInlineDropdown from '../WrInlineDropdown';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  getLineupsStatsAction,
  getNbaLineupsStatsAction,
} from '../../../redux';
import {headingJson} from '../headingJson';

const WrLineupsStats = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const leftRef = useRef<ScrollView>(null);

  const sportName = useSelector((state: any) => state.authReducer.sport);
  const matchup = props.matchup;
  const team_away_id = matchup?.away?.sr_id;
  const team_home_id = matchup?.home?.sr_id;

  const [selectedTeam, setSelectedTeam] = useState<string>('away');
  const [teamAwayInjuryData, setTeamAwayInjuryData] = useState<any>([]);
  const [teamHomeInjuryData, setTeamHomeInjuryData] = useState<any>([]);

  const [slideState, setSlideState] = useState(0);
  const [statType, setStatType] = useState({id: 'season', display: 'Total'});
  const [sliderData, setSliderData] = useState<any>({});
  const [slideData, setSlideData] = useState<any>({});
  const [slideKey, setSlideKey] = useState<string>('');
  const [dataSortBy, setDataSortBy] = useState<number>(1);
  const [ascDesc, setAscDesc] = useState<number>(0);

  const statTypeChange = (e: {id: string; display: string}) => {
    setStatType(e);
    setSlideState(0);
    setDataSortBy(0);

    const teamData =
      selectedTeam === 'away'
        ? teamAwayInjuryData['0']
        : teamHomeInjuryData['0'];

    loadDefaultData(teamData, e.id, e.display);
  };

  const loadDefaultData = (data: any, id: string, display: string) => {
    // Default Slider Data
    const dSliderData =
      sportName === 'nfl' ? data[id] : data[display.toLowerCase()];

    setSliderData(dSliderData);

    // Default Slide Data
    changeSlideData(dSliderData);
  };

  const changeSlideData = (data: any, key = 0) => {
    const dSlideKey = Object.keys(data)[key];
    const dSlideData = data[dSlideKey];

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
              return key;
            }),
          ]
        : [
            ...Object.keys(sliderData).map(key => {
              const headString: any = headingJson;

              if (headString[key]) {
                return headString[key];
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

  const handleAwayTeamData = (data: any) => {
    setTeamAwayInjuryData(data);
    loadDefaultData(data['0'], statType.id, statType.display);
  };

  const handleHomeTeamData = (data: any) => {
    setTeamHomeInjuryData(data);
    loadDefaultData(data['0'], statType.id, statType.display);
  };

  const getLineupsStatsView = (team = selectedTeam) => {
    console.log(team_away_id);

    if (team === 'away' && team_away_id && teamAwayInjuryData.length === 0) {
      dispatch(
        getLineupsStatsAction(
          {team_id: team_away_id},
          sportName,
          handleAwayTeamData,
        ),
      );
    }
    if (team === 'home' && team_home_id && teamHomeInjuryData.length === 0) {
      dispatch(
        getLineupsStatsAction(
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
    setSlideState(0);
    setDataSortBy(1);
    // getLineupsStatsView(team);
  };

  useEffect(() => {
    getLineupsStatsView(selectedTeam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeam]);

  let awayRowData = [];
  if (teamAwayInjuryData && teamAwayInjuryData.length > 0) {
    awayRowData = teamAwayInjuryData.map((data: any) => {
      if (statType.id && slideKey) {
        const restValues =
          sportName === 'nfl'
            ? Object.values(data[statType.id][slideKey])
            : Object.values(data[statType.display.toLocaleLowerCase()]);

        const isAllZero = restValues.every(item => item === 0);
        if (!isAllZero) {
          if (sportName === 'nba') {
            return [
              ...[
                `${data?.full_name} \n${
                  data?.jersey ? data.jersey : data.jersey_number
                } | ${data?.position}`,
              ],
              ...restValues,
            ];
          } else {
            return [
              ...[
                `${data?.abbr_name} \n${
                  data?.jersey ? data.jersey : data.jersey_number
                } | ${data?.position}`,
              ],
              ...restValues,
            ];
          }
        }
      }
      return;
    });
  }

  let homeRowData = [];
  if (teamHomeInjuryData && teamHomeInjuryData.length > 0) {
    homeRowData = teamHomeInjuryData.map((data: any) => {
      if (statType.id && slideKey) {
        const restValues =
          sportName === 'nfl'
            ? Object.values(data[statType.id][slideKey])
            : Object.values(data[statType.display.toLocaleLowerCase()]);
        const isAllZero = restValues.every(item => item === 0);
        if (!isAllZero) {
          if (sportName === 'nba') {
            return [
              ...[
                `${data?.full_name} \n${
                  data?.jersey ? data.jersey : data.jersey_number
                } | ${data?.position}`,
              ],
              ...restValues,
            ];
          } else {
            return [
              ...[
                `${data?.abbr_name} \n${
                  data?.jersey ? data.jersey : data.jersey_number
                } | ${data?.position}`,
              ],
              ...restValues,
            ];
          }
        }
      }
      return;
    });
  }

  let rowData = selectedTeam === 'away' ? awayRowData : homeRowData;

  // Sorting Logic
  if (rowData && rowData.length > 0) {
    rowData.sort((item1: any, item2: any) => {
      if (ascDesc === 0) {
        return +item1[dataSortBy] < +item2[dataSortBy] ? 1 : -1;
      } else {
        return +item1[dataSortBy] > +item2[dataSortBy] ? 1 : -1;
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

  const widthArrData =
    sportName === 'nfl'
      ? [110, 110, 110, 110, 110, 110, 110]
      : statType.display === 'Average'
      ? [
          70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70,
          70, 70, 70, 70, 70,
        ]
      : [
          70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70,
          70, 70, 70, 70, 70, 70,
        ];

  const slideStatesData = Object.keys(sliderData);

  const prevHander = () => {
    if (slideState > 0) {
      setSlideState(state => state - 1);
      changeSlideData(sliderData, slideState - 1);
      setDataSortBy(1);
    }
  };

  const nextHander = () => {
    if (slideState < slideStatesData.length - 1) {
      setSlideState(state => state + 1);
      changeSlideData(sliderData, slideState + 1);
      setDataSortBy(1);
    }
  };

  return (
    <>
      <WrButtons
        matchup={matchup}
        seletedTeam={selectedTeam}
        onSelect={handleSelectTeam}
      />
      <View style={styles.inlineTextImage}>
        <Text style={styles.inlineTextImageText}>Injuries and Stats</Text>
        <Image style={styles.inlineTextImageImage} source={ROTOWIRE} />
      </View>
      {teamAwayInjuryData.length !== 0 || teamHomeInjuryData.length !== 0 ? (
        <WrInlineDropdown
          label="Stat Type"
          options={[
            {id: 'season', display: 'Total'},
            {id: 'per_game', display: 'Average'},
          ]}
          selected={statType}
          onChange={(e: any) => statTypeChange(e)}
        />
      ) : null}
      {(teamAwayInjuryData || teamHomeInjuryData) &&
        sliderData &&
        sportName === 'nfl' &&
        Object.values(sliderData).length > 0 && (
          <View style={styles.inlineArrows}>
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
          <View style={styles.flexRowOnly}>
            {/* Left Column */}
            <View style={styles.leftColumnBorders}>
              {/* Blank Cell */}
              <View style={styles.blankView}>
                <Text style={styles.tableHeaderTextStyle}>Player</Text>
              </View>
              {/* Left Container : scroll synced */}
              <ScrollView
                ref={leftRef}
                style={styles.scrollView}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}>
                <Table borderStyle={styles.tableBorderStyle}>
                  {firstTableRowData && firstTableRowData.length > 0 ? (
                    <>
                      {firstTableRowData.map(
                        (firstData: any, index: number) => (
                          <Row
                            key={index}
                            style={styles.statsRow}
                            data={firstData}
                            widthArr={[120]}
                            textStyle={[
                              styles.tableBodyTextStyleAutoHeight,
                              styles.customTextStyle,
                            ]}
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
              <ScrollView horizontal={true} bounces={false}>
                <Table borderStyle={[styles.tableBorderStyle]}>
                  {/* Table Header */}
                  <TableWrapper>
                    <Row
                      data={headData}
                      style={styles.tableHeaderRowStyle}
                      textStyle={styles.tableHeaderTextStyle}
                      widthArr={widthArrData}
                    />
                  </TableWrapper>

                  {/* Table Rows */}
                  {secondTableRowData && secondTableRowData.length > 0 ? (
                    <>
                      <Rows
                        data={secondTableRowData}
                        style={styles.tableRowStyle}
                        widthArr={widthArrData}
                        textStyle={styles.tableBodyTextStyleAutoHeight}
                      />
                    </>
                  ) : (
                    <Rows
                      data={[[]]}
                      widthArr={widthArrData}
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
  );
};

export default WrLineupsStats;
