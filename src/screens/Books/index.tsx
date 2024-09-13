import React, {useCallback, useEffect, useState} from 'react';
import useStyles from './styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BookCard} from '../../components';
import {BaseLayout} from '../../layout';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  getAllSportsBookAction,
  getSubscribedSportsBookAction,
  subscribeSportsBookAction,
  unsubscribeSportsBookAction,
} from '../../redux';
type BooksParamList = StackNavigationProp<PostLoginParamList, 'Books'>;
type bookType = {
  book_id: string;
  description: string;
  isSubscribed: boolean;
  name: string;
  pre_subscribed: boolean;
  rated: boolean;
  rating: number;
  subscribed: boolean;
  website: string;
  logo: string;
  balance?: number;
  user_rating?: number;
};
const Books = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const {allSportsbook, subscribedSportsbook} = useSelector(
    (state: any) => state.booksReducer,
  );

  const [mergedSportsBook, setMergedSportsBook] = useState<bookType[]>([]);
  const mergeData = useCallback(() => {
    const subscribedSportsBookUpdated = subscribedSportsbook
      .map((_book: {book: bookType; balance: number; user_rating: number}) => {
        return {
          ..._book.book,
          balance: _book.balance,
          user_rating: _book.user_rating,
        };
      })
      .sort(
        (prevBook: bookType, currentBook: bookType) =>
          Number(currentBook.pre_subscribed) - Number(prevBook.pre_subscribed),
      );
    setMergedSportsBook([...subscribedSportsBookUpdated, ...allSportsbook]);
  }, [allSportsbook, subscribedSportsbook]);

  useEffect(() => {
    mergeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSportsbook, subscribedSportsbook]);

  const navigation = useNavigation<BooksParamList>();

  const dispatch = useDispatch<AppDispatch>();
  const fetchInitialData = useCallback(async () => {
    await dispatch(
      getAllSportsBookAction(
        () => {},
        () => {},
      ),
    );
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

  const onSubscribe = (book_id: string) => {
    dispatch(
      subscribeSportsBookAction(
        book_id,
        (data: any) => {
          if (data?.status === 200) {
            fetchInitialData();
          }
        },
        () => {},
      ),
    );
  };

  const onUnsubscribe = (book_id: string) => {
    dispatch(
      unsubscribeSportsBookAction(
        book_id,
        (data: any) => {
          if (data?.status === 200) {
            fetchInitialData();
          }
        },
        () => {},
      ),
    );
  };

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Books"
      navigation={navigation}
      renderScrollview={true}>
      <>
        {mergedSportsBook.map((item: bookType, index: number) => {
          return (
            <BookCard
              key={index}
              heading={item.name}
              description={item.description}
              isButtonVisible={!item.pre_subscribed}
              buttonText={item.subscribed ? 'Unsubscribe' : 'Subscribe'}
              websiteUrl={item.website}
              rating={item.subscribed ? item.user_rating || 0 : 0}
              logo={item.logo}
              bookId={item.book_id}
              onButtonPress={item.subscribed ? onUnsubscribe : onSubscribe}
              buttonStyle={item.subscribed ? styles.btnTomato : styles.btnGreen}
              isSubscribed={item.subscribed}
              balance={item?.balance}
            />
          );
        })}
      </>
    </BaseLayout>
  );
};

export default Books;
