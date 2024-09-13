import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MyTheme} from '../theme/CustomTheme';
import NavigationInnerContainer from './NavigationInnerContainer';

const Routes = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <NavigationInnerContainer />
    </NavigationContainer>
  );
};

export default Routes;
