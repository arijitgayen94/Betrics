import React, {useEffect, useState} from 'react';
import useStyles from './styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  PrimaryButton,
  PrimaryInput,
  PrimaryModal,
  SecondaryButton,
} from '../../../components';
import {EDIT_ICON, PLUS_ICON_IMG, TRASH_ICON_IMG} from '../../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllEnginesAction,
  setActiveEngineAction,
  updateEngineAction,
  AppDispatch,
  createEngineAction,
  deleteEngineAction,
  Engine,
  SubscribedMarketPlace,
} from '../../../redux';
import {capitalizeFirstLetter} from '../../../service/helperFunction';
import LinearGradient from 'react-native-linear-gradient';
import {CREATE_POST} from '../../../routes/const';
interface SelectEngineProps {
  sportName: string;
}
const SelectEngine = (props: SelectEngineProps) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [isModalVisible, setisModalVisible] = useState<boolean>(false);
  const [selectedEngine, setSelectedEngine] = useState<Engine>();
  const sportName = props.sportName;

  const engines: Array<Engine> = useSelector(
    (state: any) => state.engineReducer.engines,
  );
  const activeEngine: Engine = useSelector(
    (state: any) => state.engineReducer.activeEngine,
  );
  const loading = useSelector((state: any) => state.loadingReducer.isLoading);
  const sportEngines = engines.filter(
    item => item?.sport === capitalizeFirstLetter(sportName),
  );
  useEffect(() => {
    let ae: any = sportEngines.find(engine => engine.is_active);
    dispatch(setActiveEngineAction(ae));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sportEngines]);

  const onActivateEngine = (engine: Engine) => {
    let updateEngine: any = {
      ...engine,
      is_active: true,
    };
    delete updateEngine.subscribed_market_place;
    dispatch(
      updateEngineAction(updateEngine, (res: any) => {
        if (res) {
          dispatch(getAllEnginesAction());
        }
      }),
    );
  };

  const onInactiveEngine = (engine: Engine) => {
    let updateEngine: any = {
      ...engine,
      is_active: false,
    };
    delete updateEngine.subscribed_market_place;
    dispatch(
      updateEngineAction(updateEngine, (res: any) => {
        if (res) {
          dispatch(getAllEnginesAction());
        }
      }),
    );
  };

  const onDeleteEngine = (uuid: any) => {
    dispatch(
      deleteEngineAction(
        uuid,
        () => {
          dispatch(getAllEnginesAction());
        },
        () => {
          dispatch(getAllEnginesAction());
        },
      ),
    );
  };

  const onAddEngine = () => {
    dispatch(
      createEngineAction(
        {sport: capitalizeFirstLetter(sportName), notes: 'ready to fight'},
        (res: any) => {
          if (res) {
            dispatch(getAllEnginesAction());
          }
        },
      ),
    );
  };

  const navigateToCreatePost = () => {
    navigation.navigate(CREATE_POST, {mode: 'add'});
  };

  const renderEngineCard = (engine: Engine, index: number) => {
    return (
      <View style={styles.cardWrapper} key={'engine-' + index}>
        <View
          style={[styles.flexRow, styles.justifyBetween, styles.alignCenter]}>
          <View style={[styles.flexRow, styles.w90]}>
            <Text style={styles.cardHeadingText} numberOfLines={1}>
              {engine.name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setisModalVisible(true);
                setSelectedEngine(engine);
              }}
              style={styles.editIconWrapper}>
              <Image source={EDIT_ICON} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => onDeleteEngine(engine.uuid)}>
            <Image source={TRASH_ICON_IMG} />
          </TouchableOpacity>
        </View>
        <View style={[styles.flexRow, styles.justifyBetween, styles.mt13]}>
          <View style={styles.listContainer}>
            {engine?.subscribed_market_place?.map(
              (item: SubscribedMarketPlace) => {
                return (
                  <View key={item.uuid} style={styles.listItemWrapper}>
                    <View style={styles.bullet} />
                    <Text style={styles.listItemText}>{item.betrics_name}</Text>
                  </View>
                );
              },
            )}
          </View>
          <View style={styles.notesContainer}>
            <SecondaryButton
              style={[
                styles.btnStyle,
                {
                  backgroundColor: engine.is_active
                    ? theme.colors.googleRedText
                    : theme.colors.onlineGreen,
                },
              ]}
              textStyle={styles.btnTextStyle}
              handleClick={() => {
                engine.is_active
                  ? onInactiveEngine(engine)
                  : onActivateEngine(engine);
              }}
              text={engine.is_active ? 'Deactivate' : 'Activate'}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainWrapper}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.flex1}>
        <View style={styles.flexRow}>
          <Text style={styles.headingText}>Active Engine:</Text>
          <Text style={styles.activeEngineNameText}>
            {activeEngine?.name || 'N/A'}
          </Text>
        </View>
        {sportEngines &&
          sportEngines.map((engine, index) => renderEngineCard(engine, index))}
        <PrimaryButton
          style={[styles.w100, styles.mb20]}
          text="Add Engine"
          gradientStyle={[styles.modalGradientBtn, styles.mt20]}
          textStyle={[styles.btnTextStyleSave, styles.ph15]}
          handleClick={() => onAddEngine()}
          gradientColors={theme.colors.secondaryGradient}
          isLoading={loading}
        />
      </ScrollView>
      <PrimaryModal
        handleClose={() => setisModalVisible(!isModalVisible)}
        visible={isModalVisible}
        headerTitle="Edit Name">
        <View style={styles.modalInnerContainer}>
          <PrimaryInput
            value={selectedEngine?.name}
            onChangeText={text => {
              let temp = {...selectedEngine, name: text};
              setSelectedEngine(temp);
            }}
            placeholder="Engine Name"
            keyboardType="default"
          />
          <View style={styles.modalFooterBtnWrapper}>
            <SecondaryButton
              style={[styles.btnStyleReset]}
              textStyle={styles.btnTextStyleReset}
              handleClick={() => setisModalVisible(!isModalVisible)}
              isLoading={false}
              text={'Close'}
            />
            <PrimaryButton
              style={[styles.w45]}
              text="Save"
              gradientStyle={styles.modalGradientBtn}
              textStyle={[styles.btnTextStyleSave, styles.ph15]}
              handleClick={() => {
                dispatch(
                  updateEngineAction(
                    {uuid: selectedEngine?.uuid, name: selectedEngine?.name},
                    (res: any) => {
                      if (res) {
                        dispatch(getAllEnginesAction());
                        setisModalVisible(!isModalVisible);
                      }
                    },
                  ),
                );
              }}
              gradientColors={theme.colors.secondaryGradient}
            />
          </View>
        </View>
      </PrimaryModal>
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

SelectEngine.prototype = {};

export default SelectEngine;
