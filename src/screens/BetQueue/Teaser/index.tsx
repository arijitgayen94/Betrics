import React, {useState, useEffect} from 'react';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {
  CustomSelect,
  PrimaryButton,
  PrimaryInput,
  PrimaryModal,
  SecondaryButton,
  TeaserCard,
} from '../../../components';
import {
  AppDispatch,
  Bet,
  getBetQueueAction,
  patchEditBetAction,
  postClearBetQueueAction,
  Sportsbook,
} from '../../../redux';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {SET_BET_QUEUE} from '../../../redux/actionTypes';

interface TeaserProps {
  onAddToBetTracker: (
    amount: number,
    wager_type: any,
    index?: number,
    selectedBets?: Array<Bet>,
    teaser_points?: any,
  ) => void;
}

const Teaser = (props: TeaserProps) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const books: Array<Sportsbook> = useSelector(
    (state: any) => state.booksReducer.subscribedSportsbook,
  );
  const selectedBooks = useSelector(
    (state: any) => state.matchupReducer.selectedBook,
  );
  const [showBookBalanceModal, setShowBokBlanaceModal] =
    useState<boolean>(false);
  const [bookOption, setBookOptions] = useState<Array<any>>([]);
  const [points, setPoints] = useState<Array<any>>([
    {id: '6', display: '6', isSelected: true},
    {id: '6.5', display: '6.5', isSelected: false},
    {id: '7', display: '7', isSelected: false},
  ]);
  const [amount, setAmount] = useState<number>(100);
  const [amodds, setAmOdds] = useState<number>(0);
  const [decodds, setDecOdds] = useState<number>(0);
  const [teaserBets, setTeasetBets] = useState<Array<Bet>>([]);
  const [isEditEnabled, setIsEditEnabled] = useState<boolean>(false);
  const [localBets, setLocalBets] = useState<Array<Bet>>();

  const bets: Array<Bet> = useSelector(
    (state: any) => state.betReducer.betQueue,
  );
  const dispatch = useDispatch<AppDispatch>();
  const subscribedSportsbook = useSelector(
    (state: any) => state.booksReducer.subscribedSportsbook,
  );

  const amOddsTable: any = {
    '2': {
      '6': -120,
      '6.5': -130,
      '7': -140,
    },
    '3': {
      '6': 150,
      '6.5': 135,
      '7': 120,
    },
    '4': {
      '6': 260,
      '6.5': 225,
      '7': 200,
    },
    '5': {
      '6': 400,
      '6.5': 350,
      '7': 325,
    },
    '6': {
      '6': 600,
      '6.5': 500,
      '7': 450,
    },
    '7': {
      '6': 900,
      '6.5': 800,
      '7': 700,
    },
    '8': {
      '6': 1400,
      '6.5': 1100,
      '7': 900,
    },
    '9': {
      '6': 1900,
      '6.5': 1500,
      '7': 1200,
    },
    '10': {
      '6': 2500,
      '6.5': 2000,
      '7': 1500,
    },
  };

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

  useEffect(() => {
    setLocalBets(bets);
  }, [bets]);

  useEffect(() => {
    if (localBets) {
      let selectedPoint = points.find(point => point.isSelected);
      let tempbets = getFilterdBets(
        localBets.filter((bet: Bet) => {
          let selectedBook = bookOption.find(x => x.isSelected);
          return bet.book === selectedBook?.id;
        }),
      );
      setTeasetBets(tempbets);
      if (tempbets.length > 0 && amOddsTable[tempbets.length]) {
        let tempamodds = amOddsTable[tempbets.length][selectedPoint?.id];
        setAmOdds(tempamodds);
        if (tempamodds >= 100) {
          setDecOdds(1 + tempamodds / 100);
        } else if (tempamodds <= -100) {
          setDecOdds(1 - 100 / tempamodds);
        } else {
          setDecOdds(0);
        }
      } else {
        setDecOdds(0);
        setAmOdds(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localBets, points, bookOption]);

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
    let filter1 = _bets.filter((bet: Bet) => bet.bet_type !== 'Moneyline');
    let filter2 = filter1.filter((bet: Bet) => {
      let indx = filter1.findIndex(
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
            disabled={isEditEnabled}
            style={styles.btnStyle}
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
            ${parseFloat(amount * decodds + '').toFixed(2)}
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
                'Teaser',
                -1,
                bets
                  .filter((bet: Bet) => {
                    let selectedBook = bookOption.find(x => x.isSelected);
                    return (
                      bet.book === selectedBook?.id &&
                      bet.bet_type !== 'Moneyline'
                    );
                  })
                  .map((_bet: any) => {
                    return {..._bet, bet_uuid: _bet.uuid};
                  }),
                points.find(z => z.isSelected)?.id,
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

  const onChangeEdit = (isEdit: boolean) => {
    setIsEditEnabled(isEdit);
  };

  const changeValueLocalBets = () => {};
  const resetLocalBet = () => {
    if (localBets) {
      setLocalBets(bets);
    }
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
            ? [styles.mainContainer, styles.height65]
            : styles.mainContainer
        }>
        <ScrollView style={styles.mainWrapper}>
          {teaserBets.length >= 2 ? (
            <>
              {teaserBets.map((bet: Bet, index: number) => {
                return (
                  <TeaserCard
                    bet={bet}
                    onRemoveBet={onClearBetQueue}
                    index={index}
                    teaserPoint={points.find(point => point.isSelected)}
                    onChangeEdit={onChangeEdit}
                    changeDecValue={() => changeValueLocalBets()}
                    resetValue={() => resetLocalBet()}
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
            <Text style={styles.labelText}>Teaser</Text>
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
              <CustomSelect
                buttonStyle={styles.dropdownStyleSmall}
                options={points}
                selectedValue={points.find(x => x.isSelected)}
                onChange={value => {
                  setPoints(
                    points.map(point => {
                      if (point.id === value.id) {
                        point.isSelected = true;
                      } else {
                        point.isSelected = false;
                      }
                      return point;
                    }),
                  );
                }}
              />
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
            </View>
            <Text style={styles.amountTextBgDark}>
              Odds: <Text style={styles.fw700}>{amodds}</Text>
            </Text>
          </View>
        </ScrollView>
      </View>
      {teaserBets.length >= 2 && renderFooter()}
      <PrimaryModal
        visible={showBookBalanceModal}
        headerTitle={'Book Balance'}
        width={'90%'}
        height={'60%'}
        handleClose={closeBookBalanceModal}>
        <View style={styles.bookBalanceView}>
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

Teaser.prototype = {
  bets: PropTypes.array,
  onAddToBetTracker: PropTypes.func,
};

export default Teaser;
