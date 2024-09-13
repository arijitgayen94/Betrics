import React, {useEffect, useState} from 'react';
import useStyles from '../styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import {View} from 'react-native';
import {Table, Rows} from 'react-native-table-component';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  postNbaSnapshotRankingAction,
  postSnapshotRankingAction,
} from '../../../redux';
import toast from 'react-native-simple-toast';
import {GetSubscription} from '../../GetSubscription';
import {SUBSCRIPTION} from '../../../routes/const';

const WrSnapshotRatingTable = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const matchup = props.matchup;
  const sportName = useSelector((state: any) => state.authReducer.sport);
  const {user} = useSelector((state: any) => state.authReducer);
  const isSubscribed = useSelector(
    (state: any) => state.subscriptionReducer.isSubscribed,
  );
  const team_away_id = matchup?.away?.sr_id;
  const team_home_id = matchup?.home?.sr_id;
  const [rowData, setRowData] = useState<any>([]);

  useEffect(() => {
    // if (isSubscribed || user.account_type !== 'Free') {
    if (sportName === 'nfl') {
      if (team_away_id && team_home_id) {
        const teamBody = {
          away_id: team_away_id,
          home_id: team_home_id,
        };
        dispatch(postSnapshotRankingAction(teamBody, onSuccess, onError));
      }
    } else {
      if (team_away_id && team_home_id) {
        const teamBody = {
          away_id: team_away_id,
          home_id: team_home_id,
        };
        dispatch(postNbaSnapshotRankingAction(teamBody, onSuccess, onError));
      }
    }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team_away_id, team_home_id]);

  const onSuccess = (data: any) => {
    let arr: any = [];
    if (Object.keys(data).length === 0) {
      return;
    }
    data.forEach((item: any, index: number) => {
      if (sportName === 'nfl') {
        if (index === 0) {
          const demoArr = [`${item?.overall}`, 'Overall'];
          const demoArr1 = [`${item?.offense}`, 'Offense'];
          const demoArr2 = [`${item?.defense}`, 'Defense'];
          const demoArr3 = [`${item?.st}`, 'ST'];
          arr.push(demoArr);
          arr.push(demoArr1);
          arr.push(demoArr2);
          arr.push(demoArr3);
        } else {
          arr[0].push(`${item?.overall}`);
          arr[1].push(`${item?.offense}`);
          arr[2].push(`${item?.defense}`);
          arr[3].push(`${item?.st}`);
        }
      } else {
        if (index === 0) {
          const demoArr = [`${item?.rating}`, 'Rating'];
          const demoArr1 = [`${item?.rating_fs_reg}`, 'Rating_fs_reg'];
          const demoArr2 = [`${item?.rating_fs_playoff}`, 'Rating_fs_playoff'];
          arr.push(demoArr);
          arr.push(demoArr1);
          arr.push(demoArr2);
        } else {
          arr[0].push(`${item?.rating}`);
          arr[1].push(`${item?.rating_fs_reg}`);
          arr[2].push(`${item?.rating_fs_playoff}`);
        }
      }
    });
    setRowData(arr);
  };

  const onError = (data: any) => {
    toast.show(data?.[0]?.message, 2);
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
      <Table borderStyle={styles.tableBorderStyle}>
        <Rows
          data={props.data ?? rowData}
          flexArr={[1, 2, 1]}
          textStyle={styles.tableBodyTextStyleCentered}
        />
      </Table>
      {/* )} */}
    </View>
  );
};

export default WrSnapshotRatingTable;
