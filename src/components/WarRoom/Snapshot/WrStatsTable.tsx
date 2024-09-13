import React, {useState} from 'react';
import useStyles from '../styles';
import {useTheme} from '@react-navigation/native';
import {View} from 'react-native';
import {Table, Rows} from 'react-native-table-component';
import WrSnapshotStatsSwitches from './WrStatsSwitches';
import {useSelector} from 'react-redux';

const WrSnapshotStatsTable = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);

  const teamStats1 = props.snapshotstats1;
  const teamStats2 = props.snapshotstats2;
  const sportName = useSelector((state: any) => state.authReducer.sport);
  const [switch1Status, setSwitch1Status] = useState(false);
  const [switch2Status, setSwitch2Status] = useState(false);

  const changeSwitch1 = (e: boolean) => {
    setSwitch1Status(e);
  };

  const changeSwitch2 = (e: boolean) => {
    setSwitch2Status(e);
  };

  const getTeamData = (type: boolean, team: any) => {
    if (type) {
      return team?.def_per_game;
    } else {
      return team?.offense_per_game;
    }
  };

  const team1Data = getTeamData(switch1Status, teamStats1);
  const team2Data = getTeamData(switch2Status, teamStats2);

  let rowData: any = [];
  if (sportName === 'nfl') {
    rowData = [
      [team1Data?.points, 'Pts/Gm', team2Data?.points],
      [team1Data?.total_yards, 'Yds/Gm', team2Data?.total_yards],
      [team1Data?.yards_pt, 'Yards/pt', team2Data?.yards_pt],
      [team1Data?.pass_yards, 'Pass Yds/Gm', team2Data?.pass_yards],
      [team1Data?.pass_ypa, 'Pass Yds/Att', team2Data?.pass_ypa],
      [team1Data?.net_ypa, 'Net Pass Yds/Att', team2Data?.net_ypa],
      [team1Data?.rush_yards, 'Rush Yds', team2Data?.rush_yards],
      [team1Data?.rush_ypa, 'Rush Yds/Att', team2Data?.rush_ypa],
    ];
  } else {
    rowData = [
      [team1Data?.PTS, 'PTS', team2Data?.PTS],
      [team1Data?.FGM, 'FGM', team2Data?.FGM],
      [team1Data?.FGA, 'FGA', team2Data?.FGA],
      [team1Data?.FTM, 'FTM', team2Data?.FTM],
      [team1Data?.FTA, 'FTA', team2Data?.FTA],
      [team1Data?.OREB, 'OREB', team2Data?.OREB],
      [team1Data?.DREB, 'DREB', team2Data?.DREB],
      [team1Data?.REB, 'REB', team2Data?.REB],
      [team1Data?.AST, 'AST', team2Data?.AST],
      [team1Data?.STL, 'STL', team2Data?.STL],
      [team1Data?.BLK, 'BLK', team2Data?.BLK],
      [team1Data?.TO, 'TO', team2Data?.TO],
      [team1Data?.PF, 'PF', team2Data?.PF],
      [team1Data?.EFF, 'EFF', team2Data?.EFF],
      [team1Data?.['FG%'], 'FG%', team2Data?.['FG%']],
      [team1Data?.['3PM'], '3PM', team2Data?.['3PM']],
      [team1Data?.['3PA'], '3PA', team2Data?.['3PA']],
      [team1Data?.['3P%'], '3P%', team2Data?.['3P%']],
      [team1Data?.['FT%'], 'FT%', team2Data?.['FT%']],
    ];
  }

  return (
    <>
      <WrSnapshotStatsSwitches
        switch1Status={switch1Status}
        switch1={(e: boolean) => changeSwitch1(e)}
        switch2Status={switch2Status}
        switch2={(e: boolean) => changeSwitch2(e)}
      />
      <View style={styles.tableContainer}>
        <Table borderStyle={styles.tableBorderStyle}>
          <Rows
            data={props.data ?? rowData}
            flexArr={[1, 2, 1]}
            textStyle={styles.tableBodyTextStyleCentered}
          />
        </Table>
      </View>
    </>
  );
};

export default WrSnapshotStatsTable;
