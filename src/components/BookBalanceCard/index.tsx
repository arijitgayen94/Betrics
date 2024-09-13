import React, {useState} from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';

interface BookBalanceCardProps {
  heading: string;
  logo: string;
  balance: string;
  bookId: string;
  rated: boolean;
  onChange: (bookId: string, balance: number) => void;
}

const BookBalanceCard = (props: BookBalanceCardProps) => {
  const {heading, logo, balance, bookId, rated, onChange} = props;
  const [value, setValue] = useState<string>(
    parseFloat(balance).toFixed(2) || '',
  );
  const theme: any = useTheme();
  const styles = useStyles(theme);
  return (
    <View style={styles.cardWrapper}>
      <Image
        style={styles.cardImg}
        source={{
          uri: logo,
        }}
      />
      <View style={styles.descriptionWrapper}>
        <Text numberOfLines={1} style={styles.headingText}>
          {heading}
        </Text>
        <TextInput
          placeholder={'$ 0'}
          keyboardType={'number-pad'}
          style={styles.inputStyle}
          value={value}
          editable={!rated}
          onBlur={() => {
            onChange(bookId, +value);
          }}
          onChangeText={(text: string) => {
            const validated = text.match(/^(\d*\.{0,1}\d{0,2}$)/);
            if (validated) {
              setValue(text);
            }
          }}
          placeholderTextColor={'#808080'}
        />
      </View>
    </View>
  );
};

BookBalanceCard.propTypes = {
  heading: PropTypes.string,
};

export {BookBalanceCard};
