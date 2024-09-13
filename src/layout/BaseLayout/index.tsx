import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
  StatusBar,
  Pressable,
} from 'react-native';
import {ARROW_LEFT_IMG, NBA, NFL_IMG} from '../../assets';
import useStyles from './styles';
import PropTypes from 'prop-types';
import WrHeader from '../../components/WarRoom/WrHeader';
import {useSelector} from 'react-redux';

interface BaseLayoutProps {
  children: any;
  navigation?: any;
  back: boolean;
  titleType?: 'image' | 'text';
  titleImage?: any;
  titleText?: string;
  actionImage?: any;
  footer?: any;
  renderScrollview?: boolean;
  hasCustomAction?: boolean;
  renderCustomAction?: any;
  showNFLHeader?: boolean;
  showExtraMenu?: () => void;
}

const BaseLayout = (props: BaseLayoutProps) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const sportName = useSelector((state: any) => state.authReducer.sport);

  const {
    renderScrollview = true,
    hasCustomAction = false,
    renderCustomAction,
  } = props;

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
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.headContainer}>
          {props?.back && (
            <TouchableOpacity
              style={styles.back}
              onPress={() => {
                props?.navigation?.pop();
              }}>
              <Image source={ARROW_LEFT_IMG} />
            </TouchableOpacity>
          )}
          {props?.titleType === 'image' && (
            <Image source={props.titleImage} style={styles.titleImage} />
          )}

          {props?.titleType === 'text' && (
            <Text style={styles.titleText}>{props.titleText}</Text>
          )}

          {props?.actionImage && !hasCustomAction && (
            <Pressable style={styles.actionImage} onPress={props.showExtraMenu}>
              <Image source={props.actionImage} />
            </Pressable>
          )}
          {hasCustomAction && renderCustomAction && <>{renderCustomAction}</>}
        </View>
        {renderScrollview ? (
          <View style={styles.flex1}>
            {props.showNFLHeader && (
              <WrHeader
                teamName={
                  Platform.OS === 'ios'
                    ? sportName === 'nfl'
                      ? 'PRO FB'
                      : 'PRO BB'
                    : sportName.toUpperCase()
                }
                teamLogo={sportName === 'nfl' ? NFL_IMG : NBA}
              />
            )}
            <ScrollView
              contentContainerStyle={styles.alignCenter}
              nestedScrollEnabled>
              {props?.children}
            </ScrollView>
          </View>
        ) : (
          <View style={[styles.alignCenter, styles.flex1]}>
            {props.showNFLHeader && (
              <WrHeader
                teamName={sportName.toUpperCase()}
                teamLogo={sportName === 'nfl' ? NFL_IMG : NBA}
              />
            )}
            {props?.children}
          </View>
        )}
        {props?.footer ? props?.footer : null}
      </KeyboardAvoidingView>
    </View>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
  navigation: PropTypes.any,
};

export {BaseLayout};
