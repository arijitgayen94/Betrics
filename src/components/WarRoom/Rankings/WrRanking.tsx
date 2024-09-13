import React, {useEffect, useState} from 'react';
import useStyles from '../styles';
import {useTheme} from '@react-navigation/native';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {PrimaryButton} from '../../PrimaryButton';
import {SecondaryButton} from '../../SecondaryButton';
import {HELP_CIRCLE, TEAM_AVATAR_ICON} from '../../../assets';
import {useDispatch, useSelector} from 'react-redux';
import toast from 'react-native-simple-toast';
import {
  AppDispatch,
  getPowerRankingAction,
  putPowerRankingAction,
  resetRankingAction,
} from '../../../redux';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PrimaryModal} from '../../PrimaryModal';

const WrRankingTable = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const rankingMainData = useSelector(
    (state: any) => state.warRoomReducer.rankingData,
  );
  const sportName = useSelector((state: any) => state.authReducer.sport);

  const [rankingData, setRankingData] = useState<any>([]);
  const [reorderData, setReorderData] = useState<any>([]);
  const [saveLoader, setSaveLoader] = useState<boolean>(false);
  const [resetLoader, setResetLoader] = useState<boolean>(false);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);

  useEffect(() => {
    getPowerRanking(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRankingOrderObjects = (data: any) => {
    if (data && data.length > 0) {
      return data.map((ranking: any) => {
        if (sportName === 'nfl') {
          return {
            nfl_team_sr_id: ranking.sr_id,
          };
        } else {
          return {
            nba_team_sr_id: ranking.sr_id,
          };
        }
      });
    }
    return [];
  };

  const headData =
    Platform.OS === 'android'
      ? ['Rank', 'Team', 'Name', 'Record']
      : ['Rank', 'Team Name', 'Record'];

  const renderItem = ({item, drag, isActive}: any) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          style={[styles.dragableRow]}
          onLongPress={drag}
          disabled={isActive}>
          <View
            style={
              isActive
                ? [styles.firstCellActive, {width: '25%'}]
                : [
                    styles.firstCell,
                    {width: Platform.OS === 'android' ? '19%' : '24%'},
                  ]
            }>
            <Text style={styles.font12}>{item.rank}</Text>
          </View>
          {Platform.OS === 'android' && (
            <View
              style={
                isActive
                  ? [styles.otherCellActive, {width: '10%'}]
                  : [styles.otherCell, {width: '18.8%'}]
              }>
              <Image source={{uri: item.logo}} style={styles.tableTeamLogo} />
            </View>
          )}

          <View
            style={
              isActive
                ? [styles.otherCellActive, {width: '35%'}]
                : [
                    styles.otherCell,
                    {width: Platform.OS === 'android' ? '37%' : '45%'},
                  ]
            }>
            <Text style={styles.font12}>{item.name}</Text>
          </View>

          <View
            style={
              isActive
                ? [styles.otherCellActive, {width: '25%'}]
                : [
                    styles.otherCell,
                    {width: Platform.OS === 'android' ? '25%' : '31%'},
                  ]
            }>
            <Text style={styles.font12}>{item.record}</Text>
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  const nameWithLogo = (logo: any, name: string) => {
    return (
      <Text style={styles.cellflexRow}>
        {logo && <Image source={{uri: logo}} style={styles.tableTeamLogo} />}
        {name}
      </Text>
    );
  };

  const handleRowData = (teamData: any) => {
    let row = [
      ['2', nameWithLogo(TEAM_AVATAR_ICON, 'LA'), 'Buccaneers', '16-5-0'],
    ];

    if (teamData && teamData.length > 0) {
      row = teamData.map((data: any) => {
        return [
          data.rank,
          nameWithLogo(data.logo, data.alias),
          data.name,
          data.record,
        ];
      });
    }

    return row;
  };

  const handleOnDragEnd = (data: any) => {
    setRankingData(data);
    const reorderArr = getRankingOrderObjects(data);
    setReorderData(reorderArr);
  };

  const handleLineUpCallback = (res: any) => {
    setRankingData(res?.teams);
    handleRowData(res?.teams);
    const reorderInitData = getRankingOrderObjects(res?.teams);
    setReorderData(reorderInitData);
  };

  const getPowerRanking = (update = false) => {
    if (rankingData.length === 0 || update) {
      dispatch(getPowerRankingAction(sportName, handleLineUpCallback));
    }
  };

  const saveRanking = () => {
    setSaveLoader(true);
    dispatch(
      putPowerRankingAction(
        rankingMainData.uuid,
        reorderData,
        sportName,
        response => {
          if (response) {
            getPowerRanking(true);
            setSaveLoader(false);
          }
        },
      ),
    );

    setTimeout(() => {
      setSaveLoader(false);
    }, 5000);
  };

  const resetRanking = () => {
    setResetLoader(true);
    dispatch(
      resetRankingAction(sportName, response => {
        if (response) {
          getPowerRanking(true);
          toast.show('Ranking reset successfully.');
          setResetLoader(false);
        }
      }),
    );
    setTimeout(() => {
      setResetLoader(false);
    }, 5000);
  };

  const renderPopUpModal = () => {
    return (
      <PrimaryModal
        visible={showPopUp}
        headerTitle={'MY Power Rankings'}
        handleClose={() => {
          setShowPopUp(false);
        }}>
        <View style={styles.modalChildren}>
          <View style={styles.modalView}>
            <Text style={styles.popupText}>
              To update your power rankings. press and hold an a row until it
              truns blue, then drag the row to the position you want. Be sure to
              hit “SAVE” when you are finished updating your rankings!
            </Text>
            <PrimaryButton
              text={'Okay'}
              style={styles.okayButton}
              gradientStyle={styles.btnGradientStyle55}
              textStyle={styles.okayTextStyle}
              handleClick={() => setShowPopUp(false)}
              gradientColors={theme.colors.secondaryGradient}
            />
          </View>
        </View>
      </PrimaryModal>
    );
  };

  return (
    <View
      style={[styles.tableContainer, styles.pt20, styles.pb20, styles.mb20]}>
      <View>
        {rankingData && rankingData.length > 0 && (
          <Table borderStyle={styles.tableBorderStyle}>
            <Row
              data={headData}
              style={styles.tableHeaderRowStyle}
              textStyle={{...styles.tableHeaderTextStyle, ...styles.centerMr0}}
              flexArr={
                Platform.OS === 'android'
                  ? [0.6, 0.6, 1.18, 0.78]
                  : [0.6, 1.18, 0.78]
              }
            />
          </Table>
        )}

        <GestureHandlerRootView style={styles.dragableTable}>
          <DraggableFlatList
            data={rankingData}
            onDragEnd={({data}) => handleOnDragEnd(data)}
            keyExtractor={(item: any) => item?.uuid}
            renderItem={renderItem}
          />
        </GestureHandlerRootView>
      </View>

      <View style={[styles.flexRow, styles.rankingButtonPosition, styles.mb20]}>
        <Pressable style={styles.flexCol} onPress={() => setShowPopUp(true)}>
          <Image source={HELP_CIRCLE} />
        </Pressable>
        <View style={styles.flexCol8}>
          <SecondaryButton
            style={styles.secondaryButtonStyleLight}
            handleClick={() => resetRanking()}
            isLoading={resetLoader}
            textStyle={styles.secondaryButtonTextStyleLight}
            text="Reset"
          />
        </View>
        <View style={styles.flexCol8}>
          <PrimaryButton
            text={'Save'}
            isLoading={saveLoader}
            style={styles.primaryButtonGradient}
            gradientStyle={styles.btnGradientStyle35}
            textStyle={styles.btnTextStyle}
            handleClick={() => saveRanking()}
            gradientColors={theme.colors.secondaryGradient}
          />
        </View>
      </View>
      {renderPopUpModal()}
    </View>
  );
};

export default WrRankingTable;
