import React, {useCallback, useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import useStyles from './styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TransactionCard} from '../../components';
import {BaseLayout} from '../../layout';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {CALENDER_ICON_IMG} from '../../assets';
import {AppDispatch, getTransactionsAction} from '../../redux';
import {useDispatch, useSelector} from 'react-redux';
type TransactionsParamList = StackNavigationProp<
  PostLoginParamList,
  'Transactions'
>;

const Transactions = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<TransactionsParamList>();
  const {allTransactions} = useSelector((state: any) => state.booksReducer);
  const allTransactionsReversed = JSON.parse(JSON.stringify(allTransactions));
  const fetchInitialData = useCallback(async () => {
    await dispatch(
      getTransactionsAction(
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

  const renderItem = (item: any, index: number) => {
    const previousTransaction = allTransactionsReversed[index - 1];
    const itemDate = new Date(item.created_date);
    let prevtTransactionDate;
    const transactionDate = `${
      itemDate.getMonth() + 1
    }-${itemDate.getDate()}-${itemDate.getFullYear()}`;
    if (previousTransaction) {
      const prevItemDate = new Date(previousTransaction.created_date);
      prevtTransactionDate = `${
        prevItemDate.getMonth() + 1
      }-${prevItemDate.getDate()}-${prevItemDate.getFullYear()}`;
    }
    return (
      <View key={transactionDate}>
        {(!previousTransaction || transactionDate !== prevtTransactionDate) && (
          <Text style={styles.dateText}>{transactionDate}</Text>
        )}
        <TransactionCard
          logo={item.book.logo}
          amount={item.amount}
          heading={item.book.name}
        />
      </View>
    );
  };

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Transactions"
      actionImage={CALENDER_ICON_IMG}
      navigation={navigation}
      renderScrollview={false}>
      <>
        <FlatList
          style={styles.mt20}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return renderItem(item, index);
          }}
          data={allTransactionsReversed}
        />
      </>
    </BaseLayout>
  );
};

export default Transactions;
