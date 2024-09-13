import React from 'react';
import useStyles from './styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Text, View, Image, Pressable} from 'react-native';
import {any, number} from 'prop-types';
import {USERPROFILE} from '../../routes/const';

interface UserFollowerCardProps {
  item: any;
  type: number;
  index: number;
  onPressBtn: () => void;
}

const UserFollowerCard = (props: UserFollowerCardProps) => {
  const {item, type, onPressBtn} = props;
  const theme = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation();

  return (
    <View style={styles.followContainer}>
      <View style={styles.mainView}>
        <Image
          source={{
            uri: item.profile,
          }}
          style={styles.followImage}
          resizeMode="cover"
        />
        <Pressable
          style={styles.followNameView}
          onPress={() => navigation.navigate(USERPROFILE, {userId: item.uuid})}>
          <Text style={styles.followNameText}>
            {item.first_name} {item.last_name}
          </Text>
          <Text style={styles.followNameText2}>{item.nickname}</Text>
        </Pressable>
        <Pressable style={styles.followBtn} onPress={onPressBtn}>
          <Text style={styles.followBtnText}>
            {type === 0 ? 'Remove' : 'Following'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

UserFollowerCard.propTypes = {
  item: any,
  type: number,
  index: number,
};

export {UserFollowerCard};
