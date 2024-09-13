import {DefaultTheme} from '@react-navigation/native';

export const MyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    // fonts or texts
    primaryText: '#FFFFFF',
    drawerText: '#0C0712',
    barColor: '#F5F5F5',
    secondaryText: '#808080',
    blackText: '#000000',
    lightBlueText: '#009BDB',
    googleRedText: '#FE4A65',
    // backgrounds
    primaryBg: '#FFFFFF',
    primaryGradient: ['#00316B', '#0C5AB6'],
    secondaryGradient: ['#4BC9FD', '#009BDB'],
    disableGradient: ['#E3E3E3', '#E3E3E3'],
    grayGradient: ['#808080', '#808080'],
    lightBlueBg: '#009BDB',
    lightGrayBg: '#F9F9F9',
    grayBg: '#E3E3E3',
    googleRed: '#FE4A65',
    onlineGreen: '#77C221',
    tomato: '#FE4A65',
    yellow: '#FED008',

    // borders
    primaryBorder: '#E3E3E3',

    // shadows
    primaryShadow: 'rgba(0,0,0,0.5)',
  },
  fonts: {
    poppingsNormal: 'Poppins-Regular',
    poppingsSemiBold: 'Poppins-SemiBold',
  },
};
