import React from 'react';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {ScrollView, Text, View} from 'react-native';

const WrGrayTabView = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);

  return (
    <ScrollView horizontal={true}>
      <View style={styles.grayTabWr}>
        {props.tabs &&
          props.tabs.length > 0 &&
          props.tabs.map((tab: any) => (
            <Text
              key={tab.name}
              onPress={() => props.onPress && props.onPress(tab.name)}
              style={
                props.selected === tab.name
                  ? styles.grayTabViewTextActive
                  : styles.grayTabViewText
              }>
              {tab.label}
            </Text>
          ))}
      </View>
    </ScrollView>
  );
};

export default WrGrayTabView;
