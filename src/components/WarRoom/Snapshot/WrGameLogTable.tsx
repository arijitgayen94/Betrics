import React, {useEffect, useState} from 'react';
import useStyles from '../styles';
import {useTheme} from '@react-navigation/native';
import {Image, Platform, Text, View} from 'react-native';
import {Table, Row, TableWrapper, Cell} from 'react-native-table-component';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {DOWN_ARROW, UP_ARROW} from '../../../assets';

const WrGameLogTable = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const gameLogData = useSelector(
    (state: any) => state.warRoomReducer.gameLogData,
  );
  const sportName = useSelector((state: any) => state.authReducer.sport);

  const [rowData, setRowData] = useState<any>([]);

  const headData =
    sportName === 'nfl'
      ? ['Week', 'Date', 'Opp', 'Result', 'Spread', 'Total']
      : ['Date', 'Opp', 'Result', 'Spread', 'Total'];

  useEffect(() => {
    if (gameLogData.length > 0) {
      let arr: any = [];
      gameLogData.map((item: any) => {
        const spread =
          item.team_spread > 0 ? `+${item.team_spread}` : item.team_spread;
        const opponentLogo =
          Platform.OS === 'android'
            ? item.is_opponent_away
              ? `@${item.opponent_logo}`
              : item.opponent_logo
            : item.is_opponent_away
            ? `@${item.opponent_alias}`
            : item.opponent_alias;
        const rowDataValue =
          sportName === 'nfl'
            ? [
                item.week,
                item.scheduled,
                opponentLogo,
                `${item.team_score}-${item.opponent_score}`,
                spread,
                item.total,
              ]
            : [
                item.scheduled,
                opponentLogo,
                `${item.team_score}-${item.opponent_score}`,
                spread,
                item.total,
              ];
        arr.push(rowDataValue);
      });
      setRowData(arr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameLogData]);

  const elementOne = (data: any) => (
    <View>
      <View style={styles.btn}>
        <Text style={styles.btnText}>
          {moment.utc(data).local().format('MM/DD')}
        </Text>
      </View>
    </View>
  );

  const elementTwo = (data: any) => {
    let imageUrl: string = '';
    let isAway: boolean = false;
    if (data.charAt(0) === '@') {
      imageUrl = data.substring(1);
      isAway = true;
    } else {
      imageUrl = data;
    }
    return (
      <View>
        <View style={[styles.btn, styles.btnView]}>
          {isAway && <Text style={styles.btnText}>@</Text>}
          {Platform.OS === 'android' ? (
            <Image source={{uri: imageUrl}} style={styles.imageView} />
          ) : (
            <Text style={styles.btnText}>{imageUrl}</Text>
          )}
        </View>
      </View>
    );
  };

  const elementThree = (data: any) => {
    const str = data.split('-');
    return (
      <View>
        <View style={styles.elementThree}>
          <Text
            style={[
              styles.btnText,
              {
                color:
                  Number(str[0]) > Number(str[1])
                    ? theme.colors.onlineGreen
                    : theme.colors.googleRedText,
              },
            ]}>
            {data}{' '}
          </Text>
        </View>
      </View>
    );
  };
  const elementFive = (data: any, result: string) => {
    const str = result.split('-');
    const totalValue = Number(str[0]) + Number(str[1]);
    return (
      <View>
        <View style={styles.elementThree}>
          <Text style={styles.btnText}>{data} </Text>
          {totalValue > Number(data) ? (
            <Image source={UP_ARROW} style={styles.imageIcon} />
          ) : (
            <Image source={DOWN_ARROW} style={styles.imageIcon} />
          )}
        </View>
      </View>
    );
  };
  const elementFour = (data: any, result: string) => {
    const str = result.split('-');
    const totalSpread = Number(str[0]) + Number(data);
    const opponentScore = Number(str[1]);

    return (
      <View>
        <View style={styles.elementThree}>
          <Text
            style={[
              styles.btnText,
              {
                color:
                  totalSpread > opponentScore
                    ? theme.colors.onlineGreen
                    : theme.colors.googleRedText,
              },
            ]}>
            {data}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.tableContainer}>
      <Table borderStyle={styles.tableBorderStyle}>
        {/* Table Header */}
        <Row
          data={headData}
          style={styles.tableHeaderRowStyle}
          textStyle={styles.tableHeaderTextStyle}
          flexArr={sportName === 'nfl' ? [1, 1, 1, 1, 1, 1] : [1, 1, 1, 1, 1]}
        />

        {/* Table Rows */}
        {rowData.map((rowDataValue: any, index: number) => (
          <TableWrapper key={index} style={styles.row}>
            {rowDataValue.map((cellData: any, cellIndex: number) => {
              const result = rowDataValue[3];
              const nbaResult = rowDataValue[2];
              if (sportName === 'nfl') {
                if (cellIndex === 1) {
                  //Date
                  return (
                    <Cell
                      key={cellIndex}
                      data={elementOne(cellData)}
                      textStyle={styles.text}
                    />
                  );
                } else if (cellIndex === 2) {
                  // Opp
                  return (
                    <Cell
                      key={cellIndex}
                      data={elementTwo(cellData)}
                      textStyle={styles.text}
                    />
                  );
                } else if (cellIndex === 3) {
                  // result
                  return (
                    <Cell
                      key={cellIndex}
                      data={elementThree(cellData)}
                      textStyle={styles.text}
                    />
                  );
                } else if (cellIndex === 5) {
                  // total
                  return (
                    <Cell
                      key={cellIndex}
                      data={elementFive(cellData, result)}
                      textStyle={styles.text}
                    />
                  );
                } else if (cellIndex === 4) {
                  return (
                    <Cell
                      key={cellIndex}
                      data={elementFour(cellData, result)}
                      textStyle={styles.text}
                    />
                  );
                } else {
                  return (
                    <Cell
                      key={cellIndex}
                      data={cellData}
                      textStyle={styles.text}
                    />
                  );
                }
              } else {
                if (cellIndex === 0) {
                  //Date
                  return (
                    <Cell
                      key={cellIndex}
                      data={elementOne(cellData)}
                      textStyle={styles.text}
                    />
                  );
                } else if (cellIndex === 1) {
                  // Opp
                  return (
                    <Cell
                      key={cellIndex}
                      data={elementTwo(cellData)}
                      textStyle={styles.text}
                    />
                  );
                } else if (cellIndex === 2) {
                  // result
                  return (
                    <Cell
                      key={cellIndex}
                      data={elementThree(cellData)}
                      textStyle={styles.text}
                    />
                  );
                } else if (cellIndex === 4) {
                  // total
                  return (
                    <Cell
                      key={cellIndex}
                      data={elementFive(cellData, nbaResult)}
                      textStyle={styles.text}
                    />
                  );
                } else if (cellIndex === 3) {
                  return (
                    <Cell
                      key={cellIndex}
                      data={elementFour(cellData, nbaResult)}
                      textStyle={styles.text}
                    />
                  );
                }
              }
            })}
          </TableWrapper>
        ))}
      </Table>
    </View>
  );
};

export default WrGameLogTable;
