import React, {useCallback, useEffect, useState} from 'react';
import useStyles from './styles';
import {useTheme, useNavigation} from '@react-navigation/native';
import {BaseLayout} from '../../layout';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import {MarketPlaceCard} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  MarketplaceItem,
  getAllMarketplaceAction,
  subscribeMarketplaceAction,
  unsubscribeMarketplaceAction,
} from '../../redux';
import toast from 'react-native-simple-toast';

type MarketPlaceParamList = StackNavigationProp<
  PostLoginParamList,
  'MarketPlace'
>;

const MarketPlace = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<MarketPlaceParamList>();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [mergedMarketplace, setMergetMarketplace] = useState<MarketplaceItem[]>(
    [],
  );
  const {allMarketplace} = useSelector(
    (state: any) => state.marketplaceReducer,
  );
  const mergeData = useCallback(() => {
    let allMarketplaceItem = allMarketplace.map((x: any) => {
      x.buttonText = x.is_subscribed ? 'UnSubscribe' : 'Subscribe';
      return x;
    });

    setMergetMarketplace([...allMarketplaceItem]);
  }, [allMarketplace]);

  useEffect(() => {
    mergeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMarketplace]);

  const fetchInitialData = useCallback(async () => {
    await dispatch(
      getAllMarketplaceAction(
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

  const onSubscribe = (uuid: string) => {
    dispatch(
      subscribeMarketplaceAction(
        uuid,
        (data: any) => {
          if (data) {
            toast.show('Subscribed', 2);
            fetchInitialData();
          }
        },
        (error: Error) => {
          console.error(error);
        },
      ),
    );
  };

  const onUnSubscribe = (uuid: string) => {
    dispatch(
      unsubscribeMarketplaceAction(
        uuid,
        (data: any) => {
          if (data) {
            toast.show('Unsubscribed', 2);
            fetchInitialData();
          }
        },
        (error: Error) => {
          console.error(error);
        },
      ),
    );
  };

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Marketplace"
      navigation={navigation}
      renderScrollview={false}>
      <View style={styles.mainContainer}>
        {/* filter section starts here */}
        <View style={styles.filterWrapper}>
          <FlatList
            data={['All', 'Projection', 'Player rating', 'Team rating']}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View style={styles.filterItemWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedFilter(item);
                    }}
                    key={item}
                    style={[
                      styles.filterItem,
                      item === selectedFilter && styles.lightBlueBorder,
                    ]}>
                    <View
                      style={[
                        styles.filterItemCircle,
                        item === selectedFilter && styles.lightBlueBorder,
                      ]}>
                      {item === selectedFilter && (
                        <View style={styles.filterItemInnerCircle} />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.filterItemLabel,
                        item === selectedFilter && styles.lightBlueText,
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        {/* main section starts here */}
        <View style={styles.mainSectionWrapper}>
          <FlatList
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <MarketPlaceCard
                  logo={item.logo}
                  heading={item.dip_name}
                  description={item.betrics_name}
                  buttonText={item.buttonText}
                  isChecked={true}
                  betricsType={item.betrics_type}
                  info={item.description}
                  serviceType={item.service_type}
                  buttonStyle={
                    item.buttonText === 'Subscribe'
                      ? styles.btnGreen
                      : styles.btnTomato
                  }
                  sport_support={item.sport_support || []}
                  onSubscribe={onSubscribe}
                  onUnSubscribe={onUnSubscribe}
                  uuid={item.uuid}
                />
              );
            }}
            data={mergedMarketplace.filter(x => {
              if (selectedFilter === 'All') {
                return x;
              } else if (x.betrics_type === selectedFilter) {
                return x;
              }
            })}
          />
        </View>
      </View>
    </BaseLayout>
  );
};

export default MarketPlace;
