import React from 'react';
import useStyles from './styles';
import {useTheme, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {Image, Platform, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {PrimaryButton} from '../../components';
import {BET_QUEUE} from '../../routes/const';
import {useSelector} from 'react-redux';
import toast from 'react-native-simple-toast';

type WarRoomParamList = StackNavigationProp<PostLoginParamList, 'Comments'>;

interface MyProps {
  teamName: string;
  teamLogo: any;
}

const WrHeader = (props: MyProps) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<WarRoomParamList>();
  const betQueueCount = useSelector((state: any) => state.betReducer.count);

  const handleBetButtonClick = () => {
    if (betQueueCount > 0) {
      navigation.navigate(BET_QUEUE);
    } else {
      toast.show('Please add any bet', 2);
    }
  };

  return (
    <LinearGradient
      colors={theme.colors.primaryGradient}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 1}}
      style={styles.gradientStyle}>
      <View style={styles.gradientinnerWrapper}>
        <View style={styles.btnWrapper}>
          {Platform.OS === 'android' && (
            <Image style={styles.teamLogo} source={props.teamLogo} />
          )}
          <Text style={styles.teamName}>{props?.teamName}</Text>
        </View>
        <View style={styles.btnWrapper}>
          <PrimaryButton
            text={`${betQueueCount} Bet`}
            style={styles.btnStyle}
            gradientStyle={styles.btnGradientStyle}
            textStyle={styles.btnTextStyle}
            handleClick={() => handleBetButtonClick()}
            gradientColors={theme.colors.secondaryGradient}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default WrHeader;
