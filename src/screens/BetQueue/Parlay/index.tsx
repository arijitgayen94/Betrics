import React, {useEffect, useState} from 'react';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {ScrollView, Text, View} from 'react-native';
import {
  CustomSelect,
  ParlayCard,
  PrimaryButton,
  PrimaryInput,
  PrimaryModal,
  SecondaryButton,
} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  Bet,
  getBetQueueAction,
  patchEditBetAction,
  postClearBetQueueAction,
  Sportsbook,
} from '../../../redux';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native-gesture-handler';
import {SET_BET_QUEUE} from '../../../redux/actionTypes';

interface ParlayProps {
  onAddToBetTracker: (
    amount: number,
    wager_type: any,
    index?: number,
    selectedBets?: Array<Bet>,
    teaser_points?: any,
  ) => void;
}

const Parlay = (props: ParlayProps) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const books: Array<Sportsbook> = useSelector(
    (state: any) => state.booksReducer.subscribedSportsbook,
  );
  const selectedBooks = useSelector(
    (state: any) => state.matchupReducer.selectedBook,
  );
  const [bookOption, setBookOptions] = useState<Array<any>>([]);
  const [amount, setAmount] = useState<number>(100);
  const [odds, setOdds] = useState<number>(0);
  const [amodds, setAmOdds] = useState<number>(0);
  const [parlayBets, setParlayBets] = useState<Array<Bet>>([]);
  const [isEditEnabled, setIsEditEnabled] = useState<boolean>(false);
  const [showBookBalanceModal, setShowBokBlanaceModal] =
    useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const bets: Array<Bet> = useSelector(
    (state: any) => state.betReducer.betQueue,
  );
  const subscribedSportsbook = useSelector(
    (state: any) => state.booksReducer.subscribedSportsbook,
  );
  const [localBets, setLocalBets] = useState<Array<Bet>>();

  useEffect(() => {
    if (bookOption || bets) {
      setLocalBets(bets);
    }
  }, [bets, bookOption]);

  useEffect(() => {
    if (localBets) {
      let odd: any = 0;
      let selectedBook = bookOption.find(x => x.isSelected);
      let tempbets = getFilterdBets(
        localBets.filter((bet: Bet) => {
          return bet.book === selectedBook?.id;
        }),
      );
      tempbets.forEach((element: Bet) => {
        if (odd === 0) {
          odd = 1 * element.dec_odds;
        } else {
          odd = odd * element.dec_odds;
        }
      });
      odd = parseFloat(odd + '').toFixed(2);
      setOdds(odd);
      if (odd >= 2.0) {
        setAmOdds(100 * (odd - 1));
      } else if (odd < 2.0 && odd - 1) {
        setAmOdds(100 / (1 - odd));
      } else {
        setAmOdds(0);
      }

      setParlayBets(tempbets);
    }
  }, [localBets, bookOption]);

  useEffect(() => {
    let arr: any = [];
    books.forEach((item: any) => {
      let obj = {
        id: item.book.book_id,
        display: item.book.name,
        isSelected: item.book.book_id === selectedBooks.book_id,
      };
      if (item.book?.book_id !== 'bet:book:bestline') {
        arr.push(obj);
      }
    });
    setBookOptions(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books]);

  const resetLocalBet = (e: number) => {
    if (localBets) {
      setLocalBets(bets);
    }
  };

  const onClearBetQueue = (betId: any = null) => {
    let betIds: Array<any> = [betId];
    if (!betId) {
      betIds = [];
      let selectedBook = bookOption.find(x => x.isSelected);
      for (let index = 0; index < bets.length; index++) {
        const element = bets[index];
        if (element.book === selectedBook.id) {
          betIds.push(element.uuid);
        }
      }
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

  const getFilterdBets = (_bets: Array<Bet>) => {
    let filter1 = _bets.filter((bet: Bet) => {
      let indx = _bets.findIndex(
        (b: Bet) =>
          b.book === bet.book &&
          b.match_id === bet.match_id &&
          b.uuid !== bet.uuid &&
          bet.bet_type === b.bet_type,
      );
      if (indx === -1) {
        return bet;
      }
    });
    let filter2 = filter1.filter((bet: Bet) => {
      let indx = filter1.findIndex(
        (b: Bet) =>
          b.book === bet.book &&
          b.match_id === bet.match_id &&
          b.bet_type === 'Spread',
      );
      if (indx > -1 && bet.bet_type !== 'Moneyline') {
        return bet;
      } else if (indx === -1) {
        return bet;
      }
    });

    return filter2.length >= 2 ? filter2 : [];
  };

  const renderFooter = () => {
    return (
      <View style={styles.footerWrapper}>
        <View style={styles.topOptionView}>
          <SecondaryButton
            handleClick={() => setShowBokBlanaceModal(true)}
            text="Show Book Balance"
            style={styles.btnStyle}
            disabled={isEditEnabled}
            textStyle={styles.btnTextStyle}
          />
          <SecondaryButton
            handleClick={() => onClearBetQueue(null)}
            text="clear bet queue"
            style={styles.btnStyle}
            disabled={isEditEnabled}
            textStyle={styles.btnTextStyle}
          />
        </View>
        <View style={styles.footerSeparator} />
        <View style={styles.footerTextWrapper}>
          <Text style={styles.footerTextLeft}>At Risk:</Text>
          <Text style={styles.footerTextRight}>${amount}</Text>
        </View>
        <View style={styles.footerTextWrapper}>
          <Text style={styles.footerTextLeft}>Potential Payout:</Text>
          <Text style={styles.footerTextRight}>
            ${parseFloat(amount * odds + '').toFixed(2)}
          </Text>
        </View>
        {!isEditEnabled && (
          <PrimaryButton
            text="Add To Bet Tracker"
            style={styles.btnAddToTracker}
            gradientStyle={styles.btnGradient}
            textStyle={styles.btnText}
            disabled={isEditEnabled}
            handleClick={() => {
              props?.onAddToBetTracker(
                amount,
                'Parlay',
                -1,
                bets
                  .filter((bet: Bet) => {
                    let selectedBook = bookOption.find(x => x.isSelected);
                    return bet.book === selectedBook?.id;
                  })
                  .map((_bet: any) => {
                    return {..._bet, bet_uuid: _bet.uuid};
                  }),
                null,
              );
            }}
            gradientColors={
              isEditEnabled
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

  const onChangeEdit = (isEdit: boolean) => {
    setIsEditEnabled(isEdit);
  };

  const changeValueLocalBets = (val: number, e: number) => {
    if (localBets) {
      let betArr = [...localBets];
      betArr[e].dec_odds = val;
      setLocalBets(betArr);
    }
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
          isEditEnabled
            ? [styles.mainContainer, styles.height70]
            : styles.mainContainer
        }>
        <ScrollView style={styles.mainWrapper}>
          {parlayBets?.length >= 2 ? (
            <>
              {parlayBets.map((bet: Bet, index: number) => {
                return (
                  <ParlayCard
                    onRemoveBet={onClearBetQueue}
                    bet={bet}
                    index={index}
                    onChangeEdit={onChangeEdit}
                    changeDecValue={(val: number, e: number) =>
                      changeValueLocalBets(val, e)
                    }
                    resetValue={(e: number) => resetLocalBet(e)}
                    saveEditBet={(body: any, uuid: string) =>
                      updateBetsValue(body, uuid)
                    }
                  />
                );
              })}
            </>
          ) : (
            <View style={styles.noBetContainer}>
              <Text>No Bet Available</Text>
            </View>
          )}
          <View>
            <Text style={styles.labelText}>Parlay</Text>
            <View style={[styles.flexRow, styles.justifyBetween]}>
              <CustomSelect
                buttonStyle={styles.dropdownStyle}
                options={bookOption}
                selectedValue={bookOption.find(x => x.isSelected)}
                onChange={value => {
                  setBookOptions(
                    bookOption.map(book => {
                      if (book.id === value.id) {
                        book.isSelected = true;
                      } else {
                        book.isSelected = false;
                      }
                      return book;
                    }),
                  );
                }}
              />
              {parlayBets?.length >= 2 && (
                <View style={styles.flexRow}>
                  <PrimaryInput
                    containerStyle={styles.amountInputContainer}
                    inputContainerStyle={styles.amountTextBg}
                    inputStyle={styles.amountTextInput}
                    onChangeText={(value: any) => {
                      setAmount(value);
                    }}
                    keyboardType={'decimal-pad'}
                    placeholder=""
                    value={amount + ''}
                  />
                  <Text style={styles.amountTextBgDark}>
                    Odds:{' '}
                    <Text style={styles.fw700}>
                      {parseFloat(amodds + '').toFixed(2)}
                    </Text>
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      {parlayBets?.length >= 2 && renderFooter()}
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

Parlay.prototype = {
  onAddToBetTracker: PropTypes.func,
};

export default Parlay;
