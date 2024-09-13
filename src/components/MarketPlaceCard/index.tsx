import React from 'react';
import {Image, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {CHECK_CIRCLE} from '../../assets';
import useStyles from './styles';
import {SecondaryButton} from '../SecondaryButton';
import LinearGradient from 'react-native-linear-gradient';
interface MarketplaceCardProps {
  isChecked: boolean;
  heading: string;
  description: string | undefined;
  buttonText?: string;
  buttonStyle?: object;
  betricsType: string;
  info: string;
  serviceType: string;
  sport_support: Array<string>;
  uuid: string;
  logo: string;
  onSubscribe: (uuid: string) => void;
  onUnSubscribe: (uuid: string) => void;
}

const MarketPlaceCard = (props: MarketplaceCardProps) => {
  const {
    isChecked,
    heading,
    description,
    buttonText = '',
    buttonStyle,
    betricsType,
    info,
    serviceType,
    sport_support,
    uuid,
    onSubscribe,
    onUnSubscribe,
    logo,
  } = props;

  const theme: any = useTheme();
  const styles = useStyles(theme);

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardHeaderWrapper}>
        <View>
          <Image
            style={styles.cardImg}
            source={{
              uri: logo,
            }}
          />
        </View>
        <View style={styles.descriptionWrapper}>
          <View style={styles.headingWrapper}>
            <Text numberOfLines={2} style={styles.headingText}>
              {heading}
            </Text>
            {isChecked && <Image source={CHECK_CIRCLE} />}
          </View>
          <Text numberOfLines={1} style={styles.descriptionText}>
            {description}
          </Text>
          <Text numberOfLines={1} style={styles.typeText}>
            {betricsType}
          </Text>
        </View>
      </View>
      <Text style={styles.infoText}>{info}</Text>
      <View style={styles.actionsWrapper}>
        <Text style={styles.teamNames}>{sport_support.join(' ')}</Text>
        <View style={styles.actionsInnerWrapper}>
          {serviceType && (
            <SecondaryButton
              style={[styles.btnStyle, styles.grayBg]}
              textStyle={[styles.btnTextStyle, styles.drawerColorText]}
              handleClick={() => {}}
              text={serviceType}
            />
          )}
          {buttonText ? (
            <SecondaryButton
              style={[styles.btnStyle, buttonStyle]}
              textStyle={styles.btnTextStyle}
              handleClick={() => {
                if (buttonText === 'Subscribe') {
                  onSubscribe(uuid);
                } else {
                  onUnSubscribe(uuid);
                }
              }}
              text={buttonText}
            />
          ) : null}
        </View>
      </View>
      {/* <LinearGradient
        colors={theme.colors.primaryGradient}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={styles.footerGradient}>
        <TouchableOpacity style={styles.footerTextWrapper}>
          <Image source={PLUS_CIRCLE} />
          <Text style={[styles.btnTextStyle, styles.ml5]}>Betrics Info</Text>
        </TouchableOpacity>
      </LinearGradient> */}
    </View>
  );
};

MarketPlaceCard.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node,
  headerTitle: PropTypes.string,
  buttonText: PropTypes.string,
  handleClose: PropTypes.func,
  buttonStyle: PropTypes.any,
  betricsType: PropTypes.string,
  sport_support: PropTypes.array,
  uuid: PropTypes.string,
  logo: PropTypes.string,
  onSubscribe: PropTypes.func,
  onUnSubscribe: PropTypes.func,
};

export {MarketPlaceCard};
