import React, {useEffect, useState} from 'react';
import useStyles from '../styles';
import {useTheme} from '@react-navigation/native';
import {Image, Text, View} from 'react-native';
import {Table, TableWrapper, Row, Rows} from 'react-native-table-component';
import WrButtons from '../WrButtons';
import {ROTOWIRE} from '../../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, postLineupsInjuriesAction} from '../../../redux';

const WrInjuryTable = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const dispatch = useDispatch<AppDispatch>();

  const matchup = props.matchup;
  // Note: uuid replaced with id (ssr id)
  // const team_away_id = matchup?.away?.uuid;
  // const team_home_id = matchup?.home?.uuid;
  const sportName = useSelector((state: any) => state.authReducer.sport);

  const team_away_id = matchup?.away?.sr_id;
  const team_home_id = matchup?.home?.sr_id;

  const [selectedTeam, setSelectedTeam] = useState<string>('away');
  const [teamAwayInjuryData, setTeamAwayInjuryData] = useState<any>([]);
  const [teamHomeInjuryData, setTeamHomeInjuryData] = useState<any>([]);

  const injuryPlayer = (name: string, position: string) => {
    return `${name}\n${position}`;
  };

  const headData = ['Player', 'Status', 'Return Date'];

  let awayRowData = [['No Records', '']];
  if (teamAwayInjuryData && teamAwayInjuryData.length > 0) {
    awayRowData = teamAwayInjuryData.map((data: any) => {
      return [
        injuryPlayer(data?.abbr_name, data?.position),
        `${data?.injury_status}\n${data?.injury_detail}`,
        data?.return_date,
      ];
    });
  }

  let homeRowData = [['No Records', '', '']];
  if (teamHomeInjuryData && teamHomeInjuryData.length > 0) {
    homeRowData = teamHomeInjuryData.map((data: any) => {
      return [
        injuryPlayer(data?.abbr_name, data?.position),
        `${data?.injury_status}\n${data?.injury_detail}`,
        data?.return_date,
      ];
    });
  }

  let rowData = selectedTeam === 'away' ? awayRowData : homeRowData;

  const handleTeamAwayCb = (data: any) => {
    setTeamAwayInjuryData(data);
  };

  const handleTeamHomeCb = (data: any) => {
    setTeamHomeInjuryData(data);
  };

  const getLineupsInjueryView = (team = selectedTeam) => {
    if (team === 'away' && team_away_id && teamAwayInjuryData.length === 0) {
      dispatch(
        postLineupsInjuriesAction(
          sportName,
          {team_id: team_away_id},
          handleTeamAwayCb,
        ),
      );
    }
    if (team === 'home' && team_home_id && teamHomeInjuryData.length === 0) {
      dispatch(
        postLineupsInjuriesAction(
          sportName,
          {team_id: team_home_id},
          handleTeamHomeCb,
        ),
      );
    }
  };

  const handleSelectTeam = (team: string) => {
    setSelectedTeam(team);
    getLineupsInjueryView(team);
  };

  useEffect(() => {
    getLineupsInjueryView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <WrButtons
        matchup={matchup}
        seletedTeam={selectedTeam}
        onSelect={handleSelectTeam}
      />
      <View style={[styles.inlineTextImage, styles.pb20]}>
        <Text style={styles.inlineTextImageText}>Injuries and Stats</Text>
        <Image style={styles.inlineTextImageImage} source={ROTOWIRE} />
      </View>
      <View style={styles.tableContainer}>
        <Table borderStyle={styles.tableBorderStyle}>
          {/* Table Header */}
          <TableWrapper style={styles.customTableHeaderRowStyle}>
            <Row
              data={headData}
              style={styles.customTableHeaderCellStyle2}
              flexArr={[1, 1, 1]}
              textStyle={styles.tableHeaderTextStyle}
            />
          </TableWrapper>
          <Rows
            data={rowData}
            flexArr={[1, 1, 1]}
            textStyle={styles.tableBodyTextStyleAutoHeight}
          />
        </Table>
      </View>
    </>
  );
};

export default WrInjuryTable;
