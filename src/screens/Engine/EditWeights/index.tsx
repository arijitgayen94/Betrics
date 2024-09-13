import React, {useEffect, useState} from 'react';
import useStyles from './styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  Image,
  ScrollView,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  PLUS_ICON_IMG,
  POWER_GREY_ICON_IMG,
  POWER_ICON_IMG,
} from '../../../assets';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import LinearGradient from 'react-native-linear-gradient';
import {PrimaryButton, SecondaryButton} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  Engine,
  getAllEnginesAction,
  setActiveEngineAction,
  SubscribedMarketPlace,
  UpdateEngineConfiguration,
  updateEngineConfigurationAction,
} from '../../../redux';
import {capitalizeFirstLetter} from '../../../service/helperFunction';
import {CREATE_POST} from '../../../routes/const';

interface EditWidgetsProps {
  sportName: string;
}

const EditWidgets = (props: EditWidgetsProps) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: any) => state.loadingReducer.isLoading);
  const [subcribedMarketPlace, setSubscribedMarketPlace] = useState<
    Array<SubscribedMarketPlace>
  >([]);
  const [total, setTotal] = useState<number>(0);
  const engines: Array<Engine> = useSelector(
    (state: any) => state.engineReducer.engines,
  );
  const activeEngine: Engine = useSelector(
    (state: any) => state.engineReducer.activeEngine,
  );

  useEffect(() => {
    if (engines) {
      let localEngines: Array<Engine> = JSON.parse(JSON.stringify(engines));
      let sportEngines = localEngines.filter(
        item => item.sport === capitalizeFirstLetter(props.sportName),
      );
      let ae: any = sportEngines.find(engine => engine.is_active);
      dispatch(setActiveEngineAction(ae));
      setSubscribedMarketPlace(ae?.subscribed_market_place || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engines, props.sportName]);

  useEffect(() => {
    if (subcribedMarketPlace?.length > 0) {
      let tempTotal = 0;
      for (let index = 0; index < subcribedMarketPlace.length; index++) {
        if (subcribedMarketPlace[index].is_active) {
          tempTotal = +tempTotal + +subcribedMarketPlace[index].weight;
        }
      }
      setTotal(tempTotal);
    }
  }, [subcribedMarketPlace]);

  const onScaleTo100 = () => {
    if (subcribedMarketPlace?.length > 0) {
      let testSubcribedMarket = [...subcribedMarketPlace];
      const activeArr = subcribedMarketPlace.filter(
        item => item.is_active === true,
      );

      subcribedMarketPlace.forEach((item, index) => {
        if (item.is_active) {
          let equalShare;
          if (total === 0) {
            equalShare = 100 / activeArr.length;
          } else {
            equalShare = (item.weight / total) * 100;
          }
          const float = Number.isNaN(equalShare) ? 0 : equalShare;

          testSubcribedMarket[index].weight = float;
        }
      });

      // let equalShare: any =
      //   100 / subcribedMarketPlace.filter(item => item.is_active).length;
      // let tempSubscribedMarketplace = [...subcribedMarketPlace];
      // tempSubscribedMarketplace.map(item => {
      //   if (item.is_active) {
      //     item.weight = equalShare;
      //   }
      // });
      setSubscribedMarketPlace(testSubcribedMarket);
    }
  };

  const onReset = () => {
    if (engines) {
      let localEngines: Array<Engine> = JSON.parse(JSON.stringify(engines));
      let sportEngines = localEngines.filter(
        item => item.sport === capitalizeFirstLetter(props.sportName),
      );
      let ae: any = sportEngines.find(engine => engine.is_active);
      setSubscribedMarketPlace(ae?.subscribed_market_place || []);
    }
  };

  const onSave = () => {
    let obj: Array<UpdateEngineConfiguration> = [
      ...subcribedMarketPlace.map(x => {
        return {
          weight: x.weight,
          is_active: x.is_active,
          subscribed_market_place_uuid: x.uuid,
        };
      }),
    ];
    dispatch(
      updateEngineConfigurationAction(activeEngine.uuid, obj, () => {
        dispatch(getAllEnginesAction());
      }),
    );
  };

  function isFloat(n: any) {
    return Number(n) === n && n % 1 !== 0;
  }

  const setWeightValue = (value: string, index: number) => {
    let int: any;
    if (isFloat(value)) {
      const floatData = parseFloat(value + '').toFixed(1);
      int = Number(floatData);
    } else {
      if (value.includes('.')) {
        int = value;
      } else {
        int = parseInt(value, 10);
      }
    }
    if (int) {
      if (int >= 0 && int <= 100) {
        let temp = [...subcribedMarketPlace];
        temp[index].weight = int;
        setSubscribedMarketPlace(temp);
      }
    } else {
      let temp = [...subcribedMarketPlace];
      temp[index].weight = 0;
      setSubscribedMarketPlace(temp);
    }
  };

  const navigateToCreatePost = () => {
    navigation.navigate(CREATE_POST, {mode: 'add'});
  };

  const renderSubscribedMarkerplaceCard = (
    item: SubscribedMarketPlace,
    index: number,
  ) => {
    return (
      <View key={item.uuid}>
        <Text style={styles.cardItemHeading}>{item.betrics_type}</Text>
        <View style={[styles.flexRow, styles.cardSliderRow]}>
          <View style={[styles.flexRow, styles.w40]}>
            <Pressable
              onPress={() => {
                let temp = [...subcribedMarketPlace];
                temp[index].is_active = !temp[index].is_active;
                setSubscribedMarketPlace(temp);
              }}>
              <Image
                source={item.is_active ? POWER_ICON_IMG : POWER_GREY_ICON_IMG}
              />
            </Pressable>
            <Text numberOfLines={2} style={styles.cardItemNameText}>
              {item.betrics_name}
            </Text>
          </View>
          <MultiSlider
            trackStyle={styles.h2}
            enabledOne={item.is_active}
            selectedStyle={item.is_active ? styles.bgBlue : styles.bgGrey}
            sliderLength={100}
            max={100}
            values={
              item?.weight.toString().includes('.') ||
              item?.weight.toString().includes('.0')
                ? [parseInt(item?.weight)]
                : [item.weight]
            }
            onValuesChange={values => {
              let temp = [...subcribedMarketPlace];
              temp[index].weight = values[0];
              setSubscribedMarketPlace(temp);
            }}
            customMarker={() => {
              return (
                <LinearGradient
                  colors={
                    item.is_active
                      ? theme.colors.secondaryGradient
                      : [theme.colors.secondaryText, theme.colors.secondaryText]
                  }
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 1}}
                  style={styles.thumbStyle}
                />
              );
            }}
          />
          <View style={[styles.flexRow, {justifyContent: 'center'}]}>
            <TextInput
              value={
                isFloat(item.weight)
                  ? parseFloat(item.weight + '').toFixed(1)
                  : `${item.weight}`
              }
              onChangeText={e => setWeightValue(e, index)}
              keyboardType="number-pad"
              style={styles.percentTextInput}
              maxLength={4}
              onEndEditing={() =>
                item.weight ? null : setWeightValue('0', index)
              }
            />
            <Text style={styles.percentText}> %</Text>
          </View>
          {/* <Text style={[styles.percentText, {backgroundColor: 'red'}]}>{`${
            item.weight ? parseFloat(item.weight + '').toFixed(1) : 0
          }%`}</Text> */}
        </View>
        <View style={styles.footerSeparator} />
      </View>
    );
  };

  return (
    <View style={styles.mainWrapper}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.flex1}>
        <View style={styles.flexRow}>
          <Text style={styles.headingText}>Active Engine:</Text>
          <Text style={styles.activeEngineNameText}>{activeEngine?.name}</Text>
        </View>
        <View style={styles.cardWrapper}>
          {subcribedMarketPlace?.map(
            (item: SubscribedMarketPlace, index: number) =>
              renderSubscribedMarkerplaceCard(item, index),
          )}
          {/* footer btns */}
          <View style={[styles.flexRow, styles.justifyBetween]}>
            <SecondaryButton
              style={[styles.btnStyle]}
              textStyle={styles.btnTextStyle}
              handleClick={onScaleTo100}
              text={'Scale to 100%'}
            />
            <Text style={styles.totalText}>
              Total: {total ? parseFloat(total + '').toFixed(2) : 0} %
            </Text>
          </View>
        </View>
        <View style={styles.modalFooterBtnWrapper}>
          <SecondaryButton
            style={[styles.btnStyleReset]}
            textStyle={styles.btnTextStyleReset}
            handleClick={onReset}
            isLoading={false}
            text={'Reset'}
          />
          <PrimaryButton
            style={[styles.w45]}
            text="Save"
            isLoading={loading}
            gradientStyle={styles.modalGradientBtn}
            textStyle={[styles.btnTextStyleSave, styles.ph15]}
            handleClick={onSave}
            gradientColors={theme.colors.secondaryGradient}
          />
        </View>
        <Text style={styles.infoText}>
          Scale to 100% - you do not have to force your weights to total 100%
          because ultimately your decision engine scales everthing during
          calculations, but it just looks cleaner totaling 100% Look good, play
          good.
        </Text>
      </ScrollView>
      <TouchableOpacity
        onPress={navigateToCreatePost}
        style={styles.floatingBtn}>
        <LinearGradient
          colors={theme.colors.secondaryGradient}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          style={styles.floatingBtnGradient}>
          <Image source={PLUS_ICON_IMG} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

EditWidgets.prototype = {};

export default EditWidgets;
