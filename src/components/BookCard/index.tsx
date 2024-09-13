import React, {useCallback} from 'react';
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {useNavigation, useTheme} from '@react-navigation/native';
import {EDIT_ICON, GLOBE_ICON} from '../../assets';
import useStyles from './styles';
import {Rating} from 'react-native-ratings';
import {SecondaryButton} from '../SecondaryButton';
import {AppDispatch, updateSportBookRatingAction} from '../../redux';
import {useDispatch} from 'react-redux';
import {currencyFormat} from '../../service/showCurrency';
import {WALLET} from '../../routes/const';
interface BookCardProps {
  websiteUrl: string;
  isButtonVisible: boolean;
  heading: string;
  description: string;
  buttonText?: string;
  buttonStyle?: object;
  rating: number;
  logo: string;
  bookId: string;
  onButtonPress: (book_id: string) => {};
  balance: number | undefined;
  isSubscribed?: boolean;
}

const BookCard = (props: BookCardProps) => {
  const {
    websiteUrl,
    isButtonVisible,
    heading,
    description,
    buttonText = '',
    buttonStyle,
    rating,
    logo,
    bookId,
    onButtonPress,
    balance,
    isSubscribed,
  } = props;
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const handleRatingsChange = useCallback(
    (book_id: string, _rating: number) => {
      dispatch(
        updateSportBookRatingAction(
          {book_id, rating: _rating},
          () => {},
          () => {},
        ),
      );
    },
    [dispatch],
  );

  return (
    <View style={styles.cardWrapper}>
      <View>
        <Image
          style={styles.cardImg}
          source={{
            uri: logo,
          }}
        />
        {!!balance && (
          <Text style={styles.balanceText}>{`${currencyFormat(balance)}`}</Text>
        )}
      </View>
      <View style={styles.descriptionWrapper}>
        <View style={styles.headingWrapper}>
          <Text numberOfLines={2} style={styles.headingText}>
            {heading}
          </Text>
          {isButtonVisible && isSubscribed && (
            <TouchableOpacity
              style={styles.marginR10}
              onPress={() => navigation.navigate(WALLET)}>
              <Image source={EDIT_ICON} style={styles.editIconStyle} />
            </TouchableOpacity>
          )}
          {!!websiteUrl && (
            <TouchableOpacity onPress={() => Linking.openURL(websiteUrl)}>
              <Image source={GLOBE_ICON} />
            </TouchableOpacity>
          )}
        </View>
        <Text numberOfLines={2} style={styles.descriptionText}>
          {description}
        </Text>
        <View style={styles.ratingsWrapper}>
          <Rating
            readonly={!isSubscribed}
            startingValue={!isSubscribed ? 0 : rating}
            onFinishRating={(_rating: number) => {
              handleRatingsChange(bookId, _rating);
            }}
            imageSize={18}
            jumpValue={0}
            fractions={0}
          />
          {isButtonVisible && (
            <SecondaryButton
              style={[styles.btnStyle, buttonStyle]}
              textStyle={styles.btnTextStyle}
              handleClick={() => onButtonPress(bookId)}
              isLoading={false}
              text={buttonText}
            />
          )}
        </View>
      </View>
    </View>
  );
};

BookCard.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node,
  headerTitle: PropTypes.string,
  buttonText: PropTypes.string,
  handleClose: PropTypes.func,
  buttonStyle: PropTypes.any,
  balance: PropTypes.number,
  isSubscribed: PropTypes.bool,
};

export {BookCard};
