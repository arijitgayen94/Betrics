import React, {useEffect, useState} from 'react';
import useStyles from '../styles';
import {useTheme} from '@react-navigation/native';
import {Pressable, View, Text, Dimensions, ScrollView} from 'react-native';
import {CustomSelect} from '../..';
import {useSelector} from 'react-redux';
import {Rect, Text as TextSVG, Line, Svg} from 'react-native-svg';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';

const screenWidth = Dimensions.get('window').width;
const WrLineMoveView = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);

  const liveMoveData = useSelector(
    (state: any) => state.WrMatchupReducer.liveMove,
  );
  const sportName = useSelector((state: any) => state.authReducer.sport);
  const [data, setData] = useState<any>([]);
  const [label, setLabel] = useState<any>([]);
  const [showLabel, setShowLabel] = useState<any>([]);
  const [tooltipPos, setTooltipPos] = useState<any>({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });

  const dataSet = {
    labels: showLabel,
    datasets: [
      {
        data: data,
        color: (opacity = 1) => `rgba(0, 155, 219, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#F9F9F9',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#F9F9F9',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 155, 219, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    decimalPlaces: 2,
    useShadowColorFromDataset: false, // optional
    propsForDots: {
      r: '2',
      strokeWidth: '2',
      stroke: '#00316B',
    },
    propsForLabels: {
      fontSize: 10,
    },
  };

  useEffect(() => {
    if (liveMoveData) {
      if (props.selected1.display && props.selected2.display) {
        let key = `${props?.selected1.display.toLowerCase()}_${props?.selected2.display.toLowerCase()}`;
        const graphdata = liveMoveData[key];
        if (graphdata) {
          setData(graphdata.data);
          let labelData = [];
          for (let x in graphdata.labels) {
            labelData.push(moment(graphdata.labels[x]).format('MM/DD'));
          }
          setShowLabel(labelData);
          setLabel(graphdata.labels);
        }
      }
      setTooltipPos((previousState: any) => {
        return {
          ...previousState,
          value: data.value,
          visible: false,
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveMoveData, props.selected1, props.selected2]);

  return (
    <>
      <View style={styles.lineDropdownWr}>
        <View style={styles.lineViewSelect50}>
          <CustomSelect
            options={props.options1}
            selectedValue={props.selected1}
            onChange={e => props.onChange1 && props.onChange1(e)}
          />
        </View>
        <View style={styles.lineViewSelect50}>
          <CustomSelect
            options={props.options2}
            selectedValue={props.selected2}
            onChange={e => props.onChange2 && props.onChange2(e)}
          />
        </View>
      </View>
      <ScrollView
        style={styles.graphView}
        horizontal
        bounces={sportName === 'nfl' ? true : false}>
        <LineChart
          data={dataSet}
          width={
            60 * data.length < screenWidth ? screenWidth - 30 : 60 * data.length
          }
          height={220}
          chartConfig={chartConfig}
          style={styles.marginLeft12}
          withShadow={false}
          withInnerLines={data.length > 0 ? false : true}
          withOuterLines={data.length > 0 ? false : true}
          // eslint-disable-next-line react/no-unstable-nested-components
          decorator={() => {
            const graphWidth =
              60 * data.length < screenWidth ? screenWidth : 60 * data.length;
            const width = graphWidth - 75;

            if (tooltipPos.value) {
              var dataindex = data.indexOf(tooltipPos.value);
            }
            return tooltipPos.visible ? (
              <View>
                <Svg>
                  <Line
                    x1={tooltipPos.x}
                    y1="0"
                    x2={tooltipPos.x}
                    y2={220}
                    stroke={theme.colors.primaryBorder}
                    strokeWidth="1"
                  />
                  <Rect
                    x={
                      tooltipPos.x > width
                        ? tooltipPos.x - (tooltipPos.x - width) - 15
                        : tooltipPos.x - 35
                    }
                    y={tooltipPos.y > 50 ? 0 : 190}
                    width="70"
                    height="30"
                    fill={theme.colors.lightBlueBg}
                  />
                  <TextSVG
                    x={
                      tooltipPos.x > width
                        ? tooltipPos.x - (tooltipPos.x - width) + 18
                        : tooltipPos.x
                    }
                    y={tooltipPos.y > 50 ? 20 : 210}
                    fill="white"
                    fontSize="12"
                    fontFamily={theme.fonts.poppingsNormal}
                    textAnchor="middle">
                    {tooltipPos.value +
                      ', ' +
                      moment(label[dataindex]).format('MM/DD')}
                  </TextSVG>
                </Svg>
              </View>
            ) : null;
          }}
          onDataPointClick={(value: any) => {
            let isSamePoint =
              tooltipPos.x === value.x && tooltipPos.y === value.y;

            isSamePoint
              ? setTooltipPos((previousState: any) => {
                  return {
                    ...previousState,
                    value: value.value,
                    visible: !previousState.visible,
                  };
                })
              : setTooltipPos({
                  x: value.x,
                  value: value.value,
                  y: value.y,
                  visible: true,
                });
          }}
        />
      </ScrollView>
      {sportName === 'nfl' ? (
        <View style={styles.graphOptionView}>
          <Pressable
            style={
              props.isActive === 0 ? styles.activeButton : styles.deactiveButton
            }
            onPress={() => props.onChangeDays(0)}>
            <Text
              style={
                props.isActive === 0
                  ? styles.activeButtonText
                  : styles.deactiveButtonText
              }>
              1D
            </Text>
          </Pressable>
          <Pressable
            style={
              props.isActive === 1 ? styles.activeButton : styles.deactiveButton
            }
            onPress={() => props.onChangeDays(1)}>
            <Text
              style={
                props.isActive === 1
                  ? styles.activeButtonText
                  : styles.deactiveButtonText
              }>
              3D
            </Text>
          </Pressable>
          <Pressable
            style={
              props.isActive === 2 ? styles.activeButton : styles.deactiveButton
            }
            onPress={() => props.onChangeDays(2)}>
            <Text
              style={
                props.isActive === 2
                  ? styles.activeButtonText
                  : styles.deactiveButtonText
              }>
              7D
            </Text>
          </Pressable>
          <Pressable
            style={
              props.isActive === 3 ? styles.activeButton : styles.deactiveButton
            }
            onPress={() => props.onChangeDays(3)}>
            <Text
              style={
                props.isActive === 3
                  ? styles.activeButtonText
                  : styles.deactiveButtonText
              }>
              11D
            </Text>
          </Pressable>
          <Pressable
            style={
              props.isActive === 4 ? styles.activeButton : styles.deactiveButton
            }
            onPress={() => props.onChangeDays(4)}>
            <Text
              style={
                props.isActive === 4
                  ? styles.activeButtonText
                  : styles.deactiveButtonText
              }>
              15D
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={[styles.graphOptionView, styles.justifyEverly]}>
          <Pressable
            style={
              props.isActive === 0 ? styles.activeButton : styles.deactiveButton
            }
            onPress={() => props.onChangeDays(0)}>
            <Text
              style={
                props.isActive === 0
                  ? styles.activeButtonText
                  : styles.deactiveButtonText
              }>
              1D
            </Text>
          </Pressable>
          <Pressable
            style={
              props.isActive === 1 ? styles.activeButton : styles.deactiveButton
            }
            onPress={() => props.onChangeDays(1)}>
            <Text
              style={
                props.isActive === 1
                  ? styles.activeButtonText
                  : styles.deactiveButtonText
              }>
              2D
            </Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default WrLineMoveView;
