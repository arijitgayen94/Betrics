import React from 'react';
import useStyles from '../styles';
import {useTheme} from '@react-navigation/native';
import {View} from 'react-native';
import {PrimaryButton} from '../../PrimaryButton';
import {SecondaryButton} from '../../SecondaryButton';

const WrSnapshotStatsSwitches = (props: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);

  // eslint-disable-next-line react/no-unstable-nested-components
  const SwitchButton = (
    switchStatus: boolean,
    text: string,
    onPressed: any,
  ) => {
    return (
      <>
        {switchStatus ? (
          <PrimaryButton
            style={styles.offButton}
            text={text}
            gradientStyle={styles.offButtonGradient}
            textStyle={styles.btnTextStyle}
            handleClick={onPressed}
            gradientColors={theme.colors.secondaryGradient}
          />
        ) : (
          <SecondaryButton
            style={styles.diffButtonStyle}
            handleClick={onPressed}
            textStyle={styles.secondaryButtonTextStyle}
            text={text}
          />
        )}
      </>
    );
  };
  const switch1OffPressed = () => {
    props.switch1(false);
  };
  const switch1DefPressed = () => {
    props.switch1(true);
  };
  const switch2OffPressed = () => {
    props.switch2(false);
  };
  const switch2DefPressed = () => {
    props.switch2(true);
  };

  return (
    <View style={styles.WrGlCCard}>
      <View style={styles.WrMGVTeamButtons}>
        <View style={styles.statsDiffView}>
          {SwitchButton(!props.switch1Status, 'Off', switch1OffPressed)}
          {SwitchButton(props.switch1Status, 'Def', switch1DefPressed)}
        </View>

        <View style={styles.statsDiffView}>
          {SwitchButton(!props.switch2Status, 'Off', switch2OffPressed)}
          {SwitchButton(props.switch2Status, 'Def', switch2DefPressed)}
        </View>
      </View>
    </View>
  );
};

export default WrSnapshotStatsSwitches;
