import React from 'react';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {Text, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const WrTabView = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);

  return (
    <LinearGradient
      colors={theme.colors.primaryGradient}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 1}}
      style={styles.tableHeaderGradientStyle}>
      <ScrollView horizontal={true}>
        {props.tabs &&
          props.tabs.length > 0 &&
          props.tabs.map((tab: any) => (
            <Text
              key={tab.name}
              onPress={() => props.onPress && props.onPress(tab.name)}
              style={
                props.selected === tab.name
                  ? styles.tabViewTextActive
                  : styles.tabViewText
              }>
              {tab.label}
            </Text>
          ))}
      </ScrollView>
    </LinearGradient>
  );
};

export default WrTabView;
