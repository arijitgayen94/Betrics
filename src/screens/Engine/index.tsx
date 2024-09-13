import React, {useEffect, useState} from 'react';
import useStyles from './styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import {FlatList, Image, Platform, Pressable, Text, View} from 'react-native';
import EditWidgets from './EditWeights';
import SelectEngine from './SelectEngine';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  getAllEnginesAction,
  getNotificationCountAction,
  resetEngineAction,
} from '../../redux';
import LinearGradient from 'react-native-linear-gradient';
import sportsArray from '../../service/Sports.json';
import {NBA, NFL_IMG} from '../../assets';
import {GetSubscription} from '../../components';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {SUBSCRIPTION} from '../../routes/const';
type EngineList = StackNavigationProp<PostLoginParamList, 'Drawer'>;
const Engine = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<EngineList>();
  const [activeTab, setActiveTab] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoadingSport, setIsLoadingSport] = useState<boolean>(false);
  const [sportName, setSportName] = useState<string>('nfl');
  const isSubscribed = useSelector(
    (state: any) => state.subscriptionReducer.isSubscribed,
  );
  const {user} = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // if (isSubscribed || user.account_type !== 'Free') {
      dispatch(getAllEnginesAction());
      // }
      dispatch(getNotificationCountAction());
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, isSubscribed]);

  const setGlobalSports = (name: string) => {
    setSportName(name);
    setIsLoadingSport(false);
  };

  const renderItem = ({item, index}: any) => {
    return (
      <Pressable
        style={styles.btnWrapper}
        disabled={isLoadingSport}
        onPress={() => {
          setIsLoadingSport(true), setGlobalSports(item.name);
        }}>
        {Platform.OS === 'android' && (
          <Image style={styles.logo} source={index === 0 ? NBA : NFL_IMG} />
        )}
        <Text
          style={[
            styles.teamName,
            {
              color:
                sportName === item.name
                  ? theme.colors.secondaryGradient[0]
                  : theme.colors.primaryText,
            },
          ]}>
          {Platform.OS === 'ios'
            ? item.name === 'nfl'
              ? 'PRO FB'
              : 'PRO BB'
            : item.name}
          {/* {item.name} */}
        </Text>
      </Pressable>
    );
  };
  const sportSeparator = () => {
    return <View style={styles.separator} />;
  };

  const renderHead = () => {
    return (
      <LinearGradient
        colors={theme.colors.primaryGradient}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={styles.gradientStyle}>
        <View style={styles.gradientinnerWrapper}>
          <FlatList
            horizontal
            bounces={false}
            data={sportsArray}
            renderItem={renderItem}
            ItemSeparatorComponent={sportSeparator}
          />
        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={styles.flex1}>
      {renderHead()}
      <View style={styles.tabContainer}>
        <Pressable
          onPress={() => setActiveTab(0)}
          style={[
            styles.textWrapper,
            activeTab === 0 && styles.blueBorderBottom,
          ]}>
          <Text style={[styles.text, activeTab === 0 && styles.blueText]}>
            Edit Weights
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab(1)}
          style={[
            styles.textWrapper,
            activeTab === 1 && styles.blueBorderBottom,
          ]}>
          <Text style={[styles.text, activeTab === 1 && styles.blueText]}>
            Select Engine
          </Text>
        </Pressable>
      </View>
      {activeTab === 0 && <EditWidgets sportName={sportName} />}
      {activeTab === 1 && <SelectEngine sportName={sportName} />}
      {/* {!isSubscribed && (
        <GetSubscription
          onSubscribe={() => navigation.navigate(SUBSCRIPTION)}
        />
      )} */}
    </View>
  );
};

export default Engine;
