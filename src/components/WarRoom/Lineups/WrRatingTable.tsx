import React, {useEffect, useState} from 'react';
import useStyles from '../styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Table, Row, Rows, TableWrapper} from 'react-native-table-component';
import WrButtons from '../WrButtons';
import {FIVETHIRTYEIGHT, MADDEN22, SORT_ICON} from '../../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, postLineupPlayerRankingAction} from '../../../redux';
import toast from 'react-native-simple-toast';
import {GetSubscription} from '../../GetSubscription';
import {SUBSCRIPTION} from '../../../routes/const';

const WrLineupsRating = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const matchup = props.matchup;
  const [selectedTeam, setSelectedTeam] = useState<string>('away');
  const [rowData, setRowData] = useState<any>([]);
  const [dataSortBy, setDataSortBy] = useState<number>(1);
  const [ascDesc, setAscDesc] = useState<number>(0);
  const sportName = useSelector((state: any) => state.authReducer.sport);
  const isSubscribed = useSelector(
    (state: any) => state.subscriptionReducer.isSubscribed,
  );
  const {user} = useSelector((state: any) => state.authReducer);
  const width = (Dimensions.get('window').width - 35) / 3;
  useEffect(() => {
    // if (isSubscribed || user.account_type !== 'Free') {
    if (selectedTeam === 'away') {
      dispatch(
        postLineupPlayerRankingAction(
          {
            team_id: matchup?.away?.sr_id,
          },
          sportName,
          onSuccess,
          onError,
        ),
      );
    } else {
      dispatch(
        postLineupPlayerRankingAction(
          {
            team_id: matchup?.home?.sr_id,
          },
          sportName,
          onSuccess,
          onError,
        ),
      );
    }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubscribed, selectedTeam]);

  const sortRowData = (sortId: number, data: any, order: number) => {
    if (data.length > 0) {
      const newData = data.sort((item1: any, item2: any) => {
        if (order === 0) {
          return item1[sortId] > item2[sortId] ? 1 : -1;
        } else {
          return item1[sortId] < item2[sortId] ? 1 : -1;
        }
      });
      setRowData(newData);
    } else {
      const newData = data.sort((item1: any, item2: any) => {
        if (order === 0) {
          return item1[sortId] > item2[sortId] ? 1 : -1;
        } else {
          return item1[sortId] < item2[sortId] ? 1 : -1;
        }
      });
      setRowData(newData);
    }
  };

  const elementButton = (value: string) => (
    <TouchableOpacity onPress={() => fetchKeyIndex(value)}>
      <View style={styles.flexRow}>
        <Text style={styles.tableHeaderTextStyle}>{value}</Text>
        <Image source={SORT_ICON} style={styles.sortIcon} />
      </View>
    </TouchableOpacity>
  );

  const headData =
    sportName === 'nfl'
      ? ['Player Name', elementButton('Rating'), elementButton('Position')]
      : [
          'Player Name',
          elementButton('Raptor'),
          elementButton('Raptor_d'),
          elementButton('Raptor_o'),
          elementButton('War'),
          elementButton('Position'),
        ];

  const onSuccess = (data: any) => {
    let arr: any = [];
    if (sportName === 'nfl') {
      data.map((item: any) => {
        const demoArr = [
          item?.name,
          item?.overall_rating,
          item?.position_madden,
        ];
        arr.push(demoArr);
      });
    } else {
      data.map((item: any) => {
        const demoArr = [
          item?.name,
          item?.raptor,
          item?.raptor_d,
          item?.raptor_o,
          item?.war,
          item?.position,
        ];
        arr.push(demoArr);
      });
    }
    sortRowData(1, arr, ascDesc);
  };
  const onError = (data: any) => {
    toast.show(data?.[0]?.message, 2);
  };

  const fetchKeyIndex = (val: string) => {
    if (sportName === 'nfl') {
      if (val === 'Rating') {
        if (dataSortBy === 1) {
          if (ascDesc === 1) {
            setAscDesc(0);
            sortRowData(1, rowData, 0);
          } else {
            setAscDesc(1);
            sortRowData(1, rowData, 1);
          }
        } else {
          setAscDesc(0);
          setDataSortBy(1);
          sortRowData(1, rowData, 0);
        }
      } else {
        if (dataSortBy === 2) {
          if (ascDesc === 1) {
            setAscDesc(0);
            sortRowData(2, rowData, 0);
          } else {
            setAscDesc(1);
            sortRowData(2, rowData, 1);
          }
        } else {
          setAscDesc(0);
          setDataSortBy(2);
          sortRowData(2, rowData, 0);
        }
      }
    } else {
      if (val === 'Raptor') {
        if (dataSortBy === 1) {
          if (ascDesc === 1) {
            setAscDesc(0);
            sortRowData(1, rowData, 0);
          } else {
            setAscDesc(1);
            sortRowData(1, rowData, 1);
          }
        } else {
          setAscDesc(0);
          setDataSortBy(1);
          sortRowData(1, rowData, 0);
        }
      } else if (val === 'Raptor_d') {
        if (dataSortBy === 2) {
          if (ascDesc === 1) {
            setAscDesc(0);
            sortRowData(2, rowData, 0);
          } else {
            setAscDesc(1);
            sortRowData(2, rowData, 1);
          }
        } else {
          setAscDesc(0);
          setDataSortBy(2);
          sortRowData(2, rowData, 0);
        }
      } else if (val === 'Raptor_o') {
        if (dataSortBy === 3) {
          if (ascDesc === 1) {
            setAscDesc(0);
            sortRowData(3, rowData, 0);
          } else {
            setAscDesc(1);
            sortRowData(3, rowData, 1);
          }
        } else {
          setAscDesc(0);
          setDataSortBy(3);
          sortRowData(3, rowData, 0);
        }
      } else if (val === 'War') {
        if (dataSortBy === 4) {
          if (ascDesc === 1) {
            setAscDesc(0);
            sortRowData(4, rowData, 0);
          } else {
            setAscDesc(1);
            sortRowData(4, rowData, 1);
          }
        } else {
          setAscDesc(0);
          setDataSortBy(4);
          sortRowData(4, rowData, 0);
        }
      } else {
        if (dataSortBy === 5) {
          if (ascDesc === 1) {
            setAscDesc(0);
            sortRowData(5, rowData, 0);
          } else {
            setAscDesc(1);
            sortRowData(5, rowData, 1);
          }
        } else {
          setAscDesc(0);
          setDataSortBy(5);
          sortRowData(5, rowData, 0);
        }
      }
    }
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
          onSelect={setSelectedTeam}
        />
        <View style={[styles.inlineTextImage, styles.pb20]}>
          <Text style={styles.inlineTextImageText}>Ratings courtesy of</Text>
          <Image
            style={styles.inlineTextImageImage}
            source={sportName === 'nfl' ? MADDEN22 : FIVETHIRTYEIGHT}
          />
        </View>

        <View style={styles.tableContainer}>
          <ScrollView horizontal={true} bounces={false} nestedScrollEnabled>
            <Table borderStyle={styles.tableBorderStyle}>
              {/* Table Header */}
              <TableWrapper>
                {sportName === 'nfl' ? (
                  <Row
                    data={headData}
                    style={styles.tableHeaderRowStyle}
                    widthArr={[width, width, width]}
                    textStyle={styles.tableHeaderTextStyle}
                  />
                ) : (
                  <Row
                    data={headData}
                    style={styles.tableHeaderRowStyle}
                    widthArr={[100, 100, 100, 100, 100, 100]}
                    textStyle={styles.tableHeaderTextStyle}
                  />
                )}
              </TableWrapper>

              {/* Table Rows */}
              {sportName === 'nfl' ? (
                <Rows
                  data={rowData}
                  widthArr={[width, width, width]}
                  textStyle={styles.tableBodyTextStyleAutoHeight}
                />
              ) : (
                <Rows
                  data={rowData}
                  widthArr={[100, 100, 100, 100, 100, 100]}
                  textStyle={styles.tableBodyTextStyleAutoHeight}
                />
              )}
            </Table>
          </ScrollView>
        </View>
      </>
      {/* )} */}
    </>
  );
};

export default WrLineupsRating;
