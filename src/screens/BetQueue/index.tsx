import React, {useState, useEffect} from 'react';
import useStyles from './styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BaseLayout} from '../../layout';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {Pressable, Text, View} from 'react-native';
import Straight from './Straight';
import Parlay from './Parlay';
import Teaser from './Teaser';
import {
  AppDispatch,
  Bet,
  getBetQueueAction,
  PlaceBet,
  postPlaceBetAction,
} from '../../redux';
import {useDispatch, useSelector} from 'react-redux';
import toast from 'react-native-simple-toast';

type BetQueueParamList = StackNavigationProp<PostLoginParamList, 'BetQueue'>;

const BetQueue = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const [activeTab, setActiveTab] = useState<number>(0);
  const navigation = useNavigation<BetQueueParamList>();
  const dispatch = useDispatch<AppDispatch>();
  const bets: Array<Bet> = useSelector(
    (state: any) => state.betReducer.betQueue,
  );

  useEffect(() => {
    dispatch(getBetQueueAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddToBetTracker = (
    amount: number,
    wager_type: any,
    index: number = -1,
    selectedBets: Array<Bet> = [],
    teaser_points: any = 6,
  ) => {
    let placeBet: PlaceBet = {
      bet:
        selectedBets.length === 0
          ? [{...bets[index], bet_uuid: bets[index].uuid}]
          : selectedBets,
      wager_type,
      at_risk: amount,
      book:
        selectedBets.length === 0 ? bets[index].book : selectedBets[0]?.book,
    };
    if (wager_type === 'Teaser') {
      placeBet.teaser_points = teaser_points;
    }
    dispatch(
      postPlaceBetAction(
        [placeBet],
        async () => {
          toast.show('Added to Bet Tracker', 2);
          dispatch(getBetQueueAction());
        },
        error => {
          console.error(error);
        },
      ),
    );
  };

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Bet Queue"
      navigation={navigation}
      renderScrollview={false}>
      <View style={styles.flex1}>
        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => setActiveTab(0)}
            style={[
              styles.textWrapper,
              activeTab === 0 && styles.blueBorderBottom,
            ]}>
            <Text style={[styles.text, activeTab === 0 && styles.blueText]}>
              Straight
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab(1)}
            style={[
              styles.textWrapper,
              activeTab === 1 && styles.blueBorderBottom,
            ]}>
            <Text style={[styles.text, activeTab === 1 && styles.blueText]}>
              Parlay
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab(2)}
            style={[
              styles.textWrapper,
              activeTab === 2 && styles.blueBorderBottom,
            ]}>
            <Text style={[styles.text, activeTab === 2 && styles.blueText]}>
              Teaser
            </Text>
          </Pressable>
        </View>
        {activeTab === 0 && <Straight onAddToBetTracker={onAddToBetTracker} />}
        {activeTab === 1 && <Parlay onAddToBetTracker={onAddToBetTracker} />}
        {activeTab === 2 && <Teaser onAddToBetTracker={onAddToBetTracker} />}
      </View>
    </BaseLayout>
  );
};

export default BetQueue;
