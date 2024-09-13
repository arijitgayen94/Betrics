import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTheme, useNavigation, DrawerActions} from '@react-navigation/native';
import React from 'react';
import {TabContainer} from './TabContainer';
import useStyles from './drawerStyles';
import CustomDrawer from './CustomDrawer';
import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {BELL_ICON_IMG, BETRICS_LOGO_SMALL_IMG, MENU_ICON_IMG} from '../assets';
import {MAIN, NOTIFICATIONS} from './const';
import {useSelector} from 'react-redux';

export type drawerNavigationList = {
  [MAIN]: undefined;
};

export const DrawerContainer = () => {
  const Drawer = createDrawerNavigator<drawerNavigationList>();
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation();
  const notificationCount = useSelector(
    (state: any) => state.notificationReducer.notificationCount,
  );

  const renderHeader = () => {
    return (
      <SafeAreaView style={styles.drawerHeader}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={theme.colors.lightGrayBg}
        />
        <Pressable
          style={styles.drawerHeaderLeftIcon}
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}>
          <Image style={styles.drawerIcon} source={MENU_ICON_IMG} />
        </Pressable>
        <Image style={styles.logoImg} source={BETRICS_LOGO_SMALL_IMG} />
        <Pressable
          style={styles.drawerHeaderRightIcon}
          onPress={() => {
            navigation.navigate(NOTIFICATIONS);
          }}>
          <Image source={BELL_ICON_IMG} style={styles.drawerIcon} />
          {notificationCount > 0 && (
            <View style={styles.redCircle}>
              <Text style={styles.countText}>{notificationCount}</Text>
            </View>
          )}
        </Pressable>
      </SafeAreaView>
    );
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        swipeEnabled: false,
        drawerType: 'front',
        drawerStyle: styles.drawerContainerStyles,
        drawerActiveBackgroundColor: theme.colors.primaryText,
        drawerLabelStyle: styles.drawerLabelStyle,
        headerShown: true,
        header: renderHeader,
      }}
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName={MAIN}>
      <Drawer.Screen name={MAIN} component={TabContainer} />
    </Drawer.Navigator>
  );
};
