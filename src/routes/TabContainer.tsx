import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BetTracker, Engine, Matchup, NewsFeed} from '../screens';
import {Image} from 'react-native';
import {
  BET_TRACKER_ICON,
  BET_TRACKER_ICON_BLACK_IMG,
  MATCHUP_MENU_BLACK_IMG,
  MATCHUP_MENU_IMG,
  ENGINE_IMG,
  ENGINE__BLACK_IMG,
  NEWS_FEED_MENU_IMG,
  NEWS_FEED_MENU_BLACK_IMG,
} from '../assets';
import {NEWS_FEED, MATCHUP, ENGINE, BET_TRACKER} from './const';

export type TabContainerParamList = {
  [NEWS_FEED]: undefined;
  [MATCHUP]: undefined;
  [ENGINE]: undefined;
  [BET_TRACKER]: undefined;
};

export const TabContainer = () => {
  const Tab = createBottomTabNavigator<TabContainerParamList>();
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={focused ? NEWS_FEED_MENU_IMG : NEWS_FEED_MENU_BLACK_IMG}
              />
            );
          },
          tabBarLabel: ({}) => {
            return null;
          },
        }}
        name={NEWS_FEED}
        component={NewsFeed}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={focused ? MATCHUP_MENU_IMG : MATCHUP_MENU_BLACK_IMG}
              />
            );
          },
          tabBarLabel: ({}) => {
            return null;
          },
        }}
        name={MATCHUP}
        component={Matchup}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return <Image source={focused ? ENGINE_IMG : ENGINE__BLACK_IMG} />;
          },
          tabBarLabel: ({}) => {
            return null;
          },
        }}
        name={ENGINE}
        component={Engine}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={focused ? BET_TRACKER_ICON : BET_TRACKER_ICON_BLACK_IMG}
              />
            );
          },
          tabBarLabel: ({}) => {
            return null;
          },
        }}
        name={BET_TRACKER}
        component={BetTracker}
      />
    </Tab.Navigator>
  );
};
