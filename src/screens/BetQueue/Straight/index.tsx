import React, {useEffect, useState} from 'react';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {FlatList, Pressable, ScrollView, Text, View} from 'react-native';
import {
  BetQueueStraightCard,
  PrimaryButton,
  PrimaryModal,
  SecondaryButton,
} from '../../../components';
import {
  AppDispatch,
  Bet,
  getBetQueueAction,
  patchEditBetAction,
  PlaceBet,
  postClearBetQueueAction,
  postPlaceBetAction,
} from '../../../redux';
import PropType from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import toast from 'react-native-simple-toast';
import {SET_BET_QUEUE} from '../../../redux/actionTypes';
interface StraighProps {
  onAddToBetTracker: (
    amount: number,
    wager_type: any,
    index?: number,
    selectedBets?: Array<Bet>,
    teaser_points?: any,
  ) => void;
}

const Straight = (props: StraighProps) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const [showBookBalanceModal, setShowBokBlanaceModal] =
    useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [betsAmount, setBetsAmount] = useState<any>({}); // {uuid:{amount:number}}
  const [atRiskTotal, setAtRiskTotal] = useState<number>(0);
  const [payoutTotal, setPayoutTotal] = useState<number>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const bets: Array<Bet> = useSelector(
    (state: any) => state.betReducer.betQueue,
  );
  const subscribedSportsbook = useSelector(
    (state: any) => state.booksReducer.subscribedSportsbook,
  );

  useEffect(() => {
    if (
      Object.keys(betsAmount).length === 0 &&
      betsAmount.constructor === Object
    ) {
      setAtRiskTotal(bets.length * 100);
      let payout: number = 0;
      bets?.forEach((bet: Bet) => {
        let betAmount: any = 100;
        let payoutAmount: any = Number(betAmount) * bet.dec_odds;
        payout = payout + payoutAmount;
      });
      setPayoutTotal(payout);
    } else {
      let payout: number = 0;
      let riskAmount: number = 0;
      bets?.forEach((bet: Bet) => {
        let betUuid: any = bet.uuid;
        let betAmount: any = betsAmount[betUuid] || 100;
        let payoutAmount: any = Number(betAmount) * bet.dec_odds;
        riskAmount = riskAmount + Number(betAmount);
        payout = payout + payoutAmount;
      });
      setAtRiskTotal(riskAmount);
      setPayoutTotal(payout);
    }
  }, [betsAmount, bets]);

  const addAllToTracker = () => {
    let placeBets: Array<PlaceBet> = [];
    bets?.forEach((bet: Bet) => {
      let betUuid: any = bet.uuid;
      let betAmount: any = betsAmount[betUuid] || 100;
      placeBets.push({
        bet: [{...bet, bet_uuid: betUuid}],
        wager_type: 'Straight',
        at_risk: betAmount,
        book: bet.book,
      });
    });
    dispatch(
      postPlaceBetAction(
        placeBets,
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

  const onClearBetQueue = (betId: any = null) => {
    let betIds: Array<any> = [betId];
    if (!betId) {
      betIds = bets.map(x => x.uuid);
    }
    dispatch(
      postClearBetQueueAction(
        {bet_uuids: betIds},
        () => {
          dispatch(getBetQueueAction());
        },
        (error: Error) => {
          console.error(error);
        },
      ),
    );
  };

  const onChangeBetAmount = (obj: any) => {
    setBetsAmount({...betsAmount, ...obj});
  };

  const renderFooter = () => {
    return (
      <View style={styles.footerWrapper}>
        <View style={styles.topOptionView}>
          <SecondaryButton
            handleClick={() => setShowBokBlanaceModal(true)}
            text="Show Book Balance"
            style={styles.btnStyle}
            disabled={isEdit}
            textStyle={styles.btnTextStyle}
          />
          <SecondaryButton
            handleClick={() => onClearBetQueue(null)}
            text="clear bet queue"
            style={styles.btnStyle}
            disabled={isEdit}
            textStyle={styles.btnTextStyle}
          />
        </View>
        <View style={styles.footerSeparator} />
        <View style={styles.footerTextWrapper}>
          <Text style={styles.footerTextLeft}>At Risk:</Text>
          <Text style={styles.footerTextRight}>{atRiskTotal}</Text>
        </View>
        <View style={styles.footerTextWrapper}>
          <Text style={styles.footerTextLeft}>Potential Payout:</Text>
          <Text style={styles.footerTextRight}>
            {parseFloat(payoutTotal + '').toFixed(2)}
          </Text>
        </View>
        {!isEdit && (
          <PrimaryButton
            text="Add All To Bet Tracker"
            style={styles.btnAddToTracker}
            gradientStyle={styles.btnGradient}
            textStyle={styles.btnText}
            disabled={isEdit}
            handleClick={() => addAllToTracker()}
            gradientColors={
              isEdit
                ? theme.colors.disableGradient
                : theme.colors.secondaryGradient
            }
          />
        )}
      </View>
    );
  };

  const closeBookBalanceModal = () => {
    setShowBokBlanaceModal(false);
  };

  const renderItem = (item: any) => {
    return (
      <View style={styles.renderView}>
        <Text style={styles.filterHeadingText}>{item.book.name}</Text>
        <Text style={styles.filterHeadingText}>
          {parseFloat(item.balance).toFixed(2)}
        </Text>
      </View>
    );
  };

  const onChnageEditable = (isEditEnable: boolean) => {
    setIsEdit(isEditEnable);
  };

  const updateBetsValue = (body: any, uuid: string) => {
    dispatch(
      patchEditBetAction(body, uuid, data => {
        let oldBet = [...bets];
        const findIndex = oldBet.findIndex(x => x.uuid === data.uuid);
        oldBet[findIndex] = data;
        dispatch({type: SET_BET_QUEUE, payload: oldBet});
      }),
    );
  };

  return (
    <>
      <View
        style={
          isEdit ? styles.containerViewWithoutButton : styles.containerView
        }>
        <ScrollView
          style={styles.mainWrapper}
          showsVerticalScrollIndicator={false}>
          <View style={styles.filterContainer}>
            <Text style={styles.filterHeadingText}>Wager Type:</Text>
            <Pressable onPress={() => setSelectedFilter('All')}>
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === 'All' && styles.blueBorder,
                ]}>
                All
              </Text>
            </Pressable>
            <Pressable onPress={() => setSelectedFilter('Rated')}>
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === 'Rated' && styles.blueBorder,
                ]}>
                Rated
              </Text>
            </Pressable>
            <Pressable onPress={() => setSelectedFilter('Unrated')}>
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === 'Unrated' && styles.blueBorder,
                ]}>
                Unrated
              </Text>
            </Pressable>
          </View>
          {bets &&
            bets
              .filter(bet => {
                if (selectedFilter === 'All') {
                  return bet;
                }
                if (selectedFilter === 'Rated' && bet.rated) {
                  return bet;
                }
                if (selectedFilter === 'Unrated' && !bet.rated) {
                  return bet;
                }
              })
              .map((bet: Bet, index: number) => {
                return (
                  <BetQueueStraightCard
                    key={index + bet.am_odds}
                    bet={bet}
                    onAddToBetTracker={(amount: number, wager_type: any) => {
                      props?.onAddToBetTracker(
                        amount,
                        wager_type,
                        index,
                        [],
                        null,
                      );
                    }}
                    onRemoveBet={onClearBetQueue}
                    onChangeBetAmount={onChangeBetAmount}
                    onChangeEditable={onChnageEditable}
                    saveEditBet={(body: any, uuid: string) => {
                      updateBetsValue(body, uuid);
                    }}
                  />
                );
              })}

          <View style={styles.mv20} />
        </ScrollView>
      </View>
      {bets?.length > 0 ? renderFooter() : null}
      <PrimaryModal
        visible={showBookBalanceModal}
        headerTitle={'Book Balance'}
        width={'90%'}
        height={'60%'}
        handleClose={closeBookBalanceModal}>
        <View style={styles.listContainer}>
          <FlatList
            data={subscribedSportsbook}
            keyExtractor={(index: number) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => renderItem(item)}
          />
        </View>
      </PrimaryModal>
    </>
  );
};

Straight.propTypes = {
  onAddToBetTracker: PropType.func,
};

export default Straight;
