import React, {useEffect} from 'react';
import useStyles from '../styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {Table, TableWrapper, Cell} from 'react-native-table-component';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, getSnapshotProjectionAction} from '../../../redux';
import {GetSubscription} from '../../GetSubscription';
import {SUBSCRIPTION} from '../../../routes/const';

const WrSnapshotProjectionTable = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const selectedBook = useSelector(
    (state: any) => state.matchupReducer.selectedBook,
  );
  const isSubscribed = useSelector(
    (state: any) => state.subscriptionReducer.isSubscribed,
  );
  const {user} = useSelector((state: any) => state.authReducer);
  const navigation = useNavigation();
  const sportName = useSelector((state: any) => state.authReducer.sport);
  const projections = useSelector(
    (state: any) => state.warRoomReducer.projections,
  );

  const charAtFirstUppercase = (text: string) => {
    if (text.length > 0) {
      return text
        .toLowerCase()
        .split(' ')
        .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
    }
    return text;
  };

  let rowData: any = [];

  if (props.activeButton === 'spread' && projections.length > 0) {
    rowData = projections.map((projection: any) => [
      projection?.away_spread,
      charAtFirstUppercase(projection?.betrics_name),
      projection?.home_spread,
    ]);
  }

  if (props.activeButton === 'moneyline') {
    rowData = projections.map((projection: any) => [
      projection?.away_moneyline,
      charAtFirstUppercase(projection?.betrics_name),
      projection?.home_moneyline,
    ]);
  }

  if (props.activeButton === 'total') {
    rowData = projections.map((projection: any) => [
      projection?.over_total,
      charAtFirstUppercase(projection?.betrics_name),
      projection?.under_total,
    ]);
  }

  const loadSnapshotProjection = () => {
    const reqData =
      sportName === 'nfl'
        ? {
            match_id: props?.matchup?.match_id,
            book_id: selectedBook?.book_id,
            away_id: props?.matchup?.away?.sr_id,
            home_id: props?.matchup?.home?.sr_id,
            week: props?.week_id,
          }
        : {
            match_id: props?.matchup?.match_id,
            book_id: selectedBook?.book_id,
            away_id: props?.matchup?.away?.sr_id,
            home_id: props?.matchup?.home?.sr_id,
          };

    dispatch(getSnapshotProjectionAction(reqData, sportName));
  };

  useEffect(() => {
    // if (isSubscribed || user.account_type !== 'Free') {
    loadSnapshotProjection();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubscribed, selectedBook]);

  const progressFunc = (str: string) => {
    let number = str.replace('%', '');
    let percentageIndex = Number(number) / 10;
    if (Number(percentageIndex) > 0) {
      return percentageIndex;
    } else {
      return 0;
    }
  };

  const progressFirstColoums = (index: number) => {
    let final = 0;
    if (props.activeButton === 'spread' && projections.length > 0) {
      let str = projections[index]?.EV?.away_spread;
      final = progressFunc(str);
      return final;
    } else if (props.activeButton === 'moneyline') {
      let str = projections[index]?.EV?.away_moneyline;
      final = progressFunc(str);
      return final;
    } else if (props.activeButton === 'total') {
      let str = projections[index]?.EV?.over_total;
      final = progressFunc(str);
      return final;
    }
  };
  const progressLastColoums = (index: number) => {
    let final = 0;
    if (props.activeButton === 'spread' && projections.length > 0) {
      let str = projections[index]?.EV?.home_spread;
      final = progressFunc(str);
      return final;
    } else if (props.activeButton === 'moneyline') {
      let str = projections[index]?.EV?.home_moneyline;
      final = progressFunc(str);
      return final;
    } else if (props.activeButton === 'total') {
      let str = projections[index]?.EV?.under_total;
      final = progressFunc(str);
      return final;
    }
  };

  const elementOne = (data: any, index: number) => {
    const percentage: any = progressFirstColoums(index);
    const width = `${percentage * 100}%`;
    return (
      <View style={styles.evProgressBar}>
        <Text style={styles.cellStyle}>{data}</Text>
        <View style={styles.elementOneBar}>
          <View style={styles.coloredBGBar}>
            <View style={[styles.barView, {width}]} />
          </View>
        </View>
      </View>
    );
  };

  const elementTwo = (data: any, index: number) => {
    const percentage: any = progressLastColoums(index);
    const width = `${percentage * 100}%`;
    return (
      <View style={styles.evProgressBar}>
        <Text style={styles.cellStyle}>{data}</Text>
        <View style={styles.elementTwoBar}>
          <View style={[styles.coloredBGBar, {alignItems: 'flex-start'}]}>
            <View style={[styles.barView, {width}]} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.WrGlCCard}>
      {/* {!isSubscribed ? (
        <View style={styles.subscriptionView}>
          <GetSubscription
            onSubscribe={() => navigation.navigate(SUBSCRIPTION)}
          />
        </View>
      ) : ( */}
      <>
        {rowData && rowData.length > 0 ? (
          <Table borderStyle={styles.tableBorderStyle}>
            {rowData.map((row: any, index: any) => (
              <TableWrapper key={index} style={styles.row}>
                {row.map((cellData: any, cellIndex: any) => (
                  <Cell
                    key={cellIndex}
                    data={
                      cellIndex === 0
                        ? elementOne(cellData, index)
                        : cellIndex === 2
                        ? elementTwo(cellData, index)
                        : cellData
                    }
                    textStyle={styles.textStyle}
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>
        ) : (
          <Text>No records found.</Text>
        )}
      </>
      {/* )} */}
    </View>
  );
};

export default WrSnapshotProjectionTable;
