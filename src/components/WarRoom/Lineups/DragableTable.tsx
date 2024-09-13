import {useTheme} from '@react-navigation/native';
import React from 'react';
import useStyles from '../styles';
import {View, Text} from 'react-native';

export const DragableTable = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  return (
    <View style={styles.dragableTable}>
      {props.data.map((row: any, ridx: any) => {
        return (
          <View key={ridx} style={styles.dragableRow}>
            {row.map((cell: any, cidx: any) => {
              return (
                <View key={cidx} style={styles.dragableCell}>
                  <Text>{cell}</Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};
