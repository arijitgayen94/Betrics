import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {
  LOGIN_LAYOUT_BG_IMG,
  BETRICS_LOGO_MID_IMG,
  ARROW_LEFT_IMG,
} from '../../assets';

interface LayoutProps {
  showBack?: boolean;
  back?: boolean;
  onBack?: () => void;
  children: any;
}

const LoginLayout = (props: LayoutProps) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const MyStatusBar = () => {
    return (
      <View style={styles.statusBarStyle}>
        <SafeAreaView>
          <StatusBar
            backgroundColor={theme.colors.lightGrayBg}
            barStyle="dark-content"
            translucent
            {...props}
          />
        </SafeAreaView>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {MyStatusBar()}
      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.alignCenter} bounces={false}>
          <ImageBackground
            source={LOGIN_LAYOUT_BG_IMG}
            resizeMode={'stretch'}
            style={styles.headContainer}>
            {props?.back && (
              <TouchableOpacity style={styles.back} onPress={props?.onBack}>
                <Image source={ARROW_LEFT_IMG} />
              </TouchableOpacity>
            )}
            <Image source={BETRICS_LOGO_MID_IMG} />
          </ImageBackground>
          {props?.children}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

LoginLayout.propTypes = {
  showBack: PropTypes.bool,
  back: PropTypes.bool,
  onBack: PropTypes.func,
  children: PropTypes.node,
};

export {LoginLayout};
