import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import useStyles from './styles';
import {useTheme, useNavigation} from '@react-navigation/native';
import {BaseLayout} from '../../layout';
import {MORE_MENU_ICON_IMG} from '../../assets';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {BookBalanceCard} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  getSubscribedSportsBookAction,
  updateSportBookBalanceAction,
} from '../../redux';
import {currencyFormat} from '../../service/showCurrency';

type WalletParamList = StackNavigationProp<PostLoginParamList, 'Wallet'>;
const Wallet = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<WalletParamList>();
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const {subscribedSportsbook} = useSelector(
    (state: any) => state.booksReducer,
  );

  useEffect(() => {
    let _walletBalance = 0;
    subscribedSportsbook.forEach((item: {book: object; balance: number}) => {
      _walletBalance = _walletBalance + item.balance;
    });
    setWalletBalance(_walletBalance);
  }, [subscribedSportsbook]);
  const fetchInitialData = useCallback(async () => {
    await dispatch(
      getSubscribedSportsBookAction(
        () => {},
        () => {},
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBalanceChange = useCallback(
    (book_id: string, balance: number) => {
      dispatch(
        updateSportBookBalanceAction(
          {book_id, balance},
          () => {
            fetchInitialData();
          },
          () => {},
        ),
      );
    },
    [dispatch, fetchInitialData],
  );
  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Wallet"
      actionImage={MORE_MENU_ICON_IMG}
      navigation={navigation}
      renderScrollview={false}>
      <View style={styles.mainContainer}>
        <View style={styles.balanceContainer}>
          <Text style={styles.availableBalanceText}>Available balance</Text>
          <Text style={styles.balanceText}>
            {currencyFormat(walletBalance)}
          </Text>
          {/* <View style={styles.optionsRow}>
            <View style={styles.optionsInnerRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate(TRANSACTIONS)}
                style={styles.shadowCircle}>
                <Image source={LIST_ICON} />
              </TouchableOpacity>
              <Text style={styles.allTransactionsText}>All Transactions</Text>
            </View>
            <SecondaryButton
              style={styles.buttonStyle}
              textStyle={styles.buttonTextStyle}
              handleClick={() => {}}
              text={'Your Wallet'}
            />
          </View> */}
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.booksBalanceHeading}>Books Balance</Text>
          <Text style={styles.booksBalanceSubHeadingText}>
            Adjust your Book Balance here
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.book.book_id}
            removeClippedSubviews={false}
            renderItem={({item}) => {
              return (
                <BookBalanceCard
                  rated={item.book.rated}
                  onChange={handleBalanceChange}
                  logo={item.book.logo}
                  bookId={item.book.book_id}
                  heading={item.book.name}
                  balance={item.balance + ''}
                />
              );
            }}
            data={subscribedSportsbook}
          />
        </View>
      </View>
    </BaseLayout>
  );
};

export default Wallet;
