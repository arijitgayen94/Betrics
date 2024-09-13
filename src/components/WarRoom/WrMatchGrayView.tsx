import React from 'react';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {Platform, Text, View} from 'react-native';
import {PrimaryButton, SecondaryButton} from '..';
import WrTeamAvatar from './WrTeamAvatar';

const WrMatchGrayView = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);

  const activeButton = props.activeButton;

  const setActiveButton = (value: string) => {
    props.setActiveButton && props.setActiveButton(value);
  };

  const matchup = props.matchup;

  const getSpreadValue = (value: any, prefix = '+') => {
    if (value > -1) {
      return prefix + value;
    } else {
      return value;
    }
  };

  return (
    <View style={styles.WrMatchGrayView}>
      <View style={styles.WrMGVCards}>
        <View style={styles.teamCard}>
          {Platform.OS === 'android' && (
            <WrTeamAvatar
              src={{
                uri: matchup?.away?.icon,
              }}
            />
          )}
          <Text style={styles.teamHeadingStyle1}>
            {matchup?.away?.abbreviation}
          </Text>
          <Text style={styles.subHeadingStyle13}>{matchup?.away?.record}</Text>
        </View>
        <View style={styles.teamCard}>
          {Platform.OS === 'android' && (
            <WrTeamAvatar
              src={{
                uri: matchup?.home?.icon,
              }}
            />
          )}
          <Text style={styles.teamHeadingStyle1}>
            {matchup?.home?.abbreviation}
          </Text>
          <Text style={styles.subHeadingStyle13}>{matchup?.home?.record}</Text>
        </View>
      </View>

      <View style={styles.WrMGVButtons}>
        {activeButton === 'spread' ? (
          <PrimaryButton
            style={styles.primaryButton}
            text="Spread"
            gradientStyle={styles.primaryButtonGradient}
            textStyle={styles.btnTextStyle}
            handleClick={() => setActiveButton('spread')}
            gradientColors={theme.colors.secondaryGradient}
          />
        ) : (
          <SecondaryButton
            style={styles.secondaryButtonStyle}
            handleClick={() => setActiveButton('spread')}
            textStyle={styles.secondaryButtonTextStyle}
            text="Spread"
          />
        )}

        {activeButton === 'moneyline' ? (
          <PrimaryButton
            style={styles.primaryButton}
            text="Moneyline"
            gradientStyle={styles.primaryButtonGradient}
            textStyle={styles.btnTextStyle}
            handleClick={() => setActiveButton('moneyline')}
            gradientColors={theme.colors.secondaryGradient}
          />
        ) : (
          <SecondaryButton
            style={styles.secondaryButtonStyle}
            handleClick={() => setActiveButton('moneyline')}
            textStyle={styles.secondaryButtonTextStyle}
            text="Moneyline"
          />
        )}

        {activeButton === 'total' ? (
          <PrimaryButton
            style={styles.primaryButton}
            text="Total"
            gradientStyle={styles.primaryButtonGradient}
            textStyle={styles.btnTextStyle}
            handleClick={() => setActiveButton('total')}
            gradientColors={theme.colors.secondaryGradient}
          />
        ) : (
          <SecondaryButton
            style={styles.secondaryButtonStyle}
            handleClick={() => setActiveButton('total')}
            textStyle={styles.secondaryButtonTextStyle}
            text="Total"
          />
        )}
      </View>

      {activeButton === 'spread' && (
        <View style={styles.WrMGVScore}>
          <Text style={styles.teamHeadingStyle1Blue}>
            {`${matchup?.away?.abbreviation} ${getSpreadValue(
              matchup?.spread?.current?.away_spread,
            )}`}
          </Text>
          <Text style={styles.teamHeadingStyle1Blue}>
            {`${matchup?.home?.abbreviation} ${getSpreadValue(
              matchup?.spread?.current?.home_spread,
            )}`}
          </Text>
        </View>
      )}

      {activeButton === 'moneyline' && (
        <View style={styles.WrMGVScore}>
          <Text style={styles.teamHeadingStyle1Blue}>
            {`${matchup?.away?.abbreviation} ${getSpreadValue(
              matchup?.moneyline?.current?.away,
            )}`}
          </Text>
          <Text style={styles.teamHeadingStyle1Blue}>
            {`${matchup?.home?.abbreviation} ${getSpreadValue(
              matchup?.moneyline?.current?.home,
            )}`}
          </Text>
        </View>
      )}

      {activeButton === 'total' && (
        <View style={styles.WrMGVScore}>
          <Text style={styles.teamHeadingStyle1Blue}>
            {`${getSpreadValue(matchup?.total?.current?.total, 'o')}`}
          </Text>
          <Text style={styles.teamHeadingStyle1Blue}>
            {`${getSpreadValue(matchup?.total?.current?.total, 'u')}`}
          </Text>
        </View>
      )}
    </View>
  );
};

export default WrMatchGrayView;
