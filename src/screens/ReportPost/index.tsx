import React, {useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BaseLayout} from '../../layout';
import {Pressable, Text, TextInput, View} from 'react-native';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import {AppDispatch, commentReportAction, postReportAction} from '../../redux';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {PrimaryButton} from '../../components';
import toast from 'react-native-simple-toast';

type ReportPostParamList = StackNavigationProp<
  PostLoginParamList,
  'ReportPost'
>;

const ReportPost = ({route}: any) => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const {postId, commentId} = route.params;
  const navigation = useNavigation<ReportPostParamList>();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedType, setSelectedType] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const types = [
    {title: 'SPAM', text: 'SPAM'},
    {title: 'ABUSIVE', text: 'ABUSIVE'},
    {title: 'MISLEADING', text: 'MISLEADING'},
    {title: 'NUDITY', text: 'NUDITY'},
    {title: 'VIOLENCE', text: 'VIOLENCE'},
    {title: 'SUICIDE', text: 'SUICIDE'},
    {title: 'HATE SPEECH', text: 'HATE_SPEECH'},
    {title: 'TERRORISM', text: 'TERRORISM'},
    {title: 'OTHER', text: 'OTHER'},
  ];

  const report = () => {
    if (postId && commentId && selectedType && comment) {
      const body = {report_type: selectedType, reason: comment};
      return dispatch(
        commentReportAction(postId, commentId, body, () => {
          toast.show('Report added successfully');
          navigation.goBack();
        }),
      );
    }
    if (postId && selectedType && comment) {
      const body = {report_type: selectedType, reason: comment};
      return dispatch(
        postReportAction(postId, body, () => {
          toast.show('Report added successfully');
          navigation.goBack();
        }),
      );
    }
  };

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Report"
      navigation={navigation}
      renderScrollview={true}>
      <View style={styles.mainContainer}>
        <View style={styles.pageWidth}>
          <Text style={styles.contentPageHeading}>Type</Text>
          {types.map(item => {
            return (
              <Pressable
                style={[styles.checkbox, styles.flexRow]}
                onPress={() => setSelectedType(item.text)}>
                <View style={styles.radioButton}>
                  {item.text === selectedType && (
                    <View style={styles.checkRadioButton} />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>{item.title}</Text>
              </Pressable>
            );
          })}
          <Text style={[styles.contentPageHeading, styles.marginTop]}>
            Reason
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              selectionColor={theme.colors.secondaryText}
              placeholder="Please add reason for your report"
              returnKeyLabel="Done"
              returnKeyType="done"
              placeholderTextColor={theme.colors.secondaryText}
              style={styles.inputField}
              multiline={true}
              numberOfLines={5}
              value={comment}
              onChangeText={setComment}
            />
          </View>

          <PrimaryButton
            text="Report"
            style={styles.btnSignup}
            gradientStyle={styles.btnGradient}
            textStyle={styles.btnText}
            handleClick={() => {
              report();
            }}
            gradientColors={theme.colors.secondaryGradient}
          />
        </View>
      </View>
    </BaseLayout>
  );
};

export default ReportPost;
