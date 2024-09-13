import React, {useEffect, useState} from 'react';
import useStyles from './styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BaseLayout} from '../../layout';
import {PostLoginParamList} from '../../routes/PostLoginContainer';
import {
  Image,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  Text,
  Pressable,
} from 'react-native';
import {EDIT_ICON} from '../../assets';
import {
  CustomSelect,
  PhoneNumberInput,
  PrimaryButton,
  PrimaryInput,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  getUserDetailsAction,
  updateUserAccountAction,
  uploadProfileImageAction,
} from '../../redux';
import toast from 'react-native-simple-toast';
import CountryDialNo from '../../service/CountryCode.json';
import {
  captureImage,
  chooseFile,
  requestCameraPermission,
  requestExternalWritePermission,
} from '../../service/imagePickerService';
import {ViewProfilePicture} from '../../components/ViewProfilePicture';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

type EditProfileParamList = StackNavigationProp<
  PostLoginParamList,
  'EditProfile'
>;

const removeCountryCode = (count: string, number: string) => {
  const country = CountryDialNo.filter(item => item.code === count);
  if (country.length > 0) {
    const removeStr = number.replace(country[0].dial_code, '');
    return removeStr;
  } else {
    return count;
  }
};
const EditProfile = () => {
  const theme: any = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<EditProfileParamList>();
  const {user} = useSelector((state: any) => state.authReducer);
  const [firstName, setFirstName] = useState<string>(user.first_name);
  const [lastName, setLastName] = useState<string>(user.last_name);
  const [email, setEmail] = useState<string>(user.email);
  const [nickname, setNickname] = useState<string>(user.nickname);

  const [phone, setPhone] = useState<string>(
    removeCountryCode(user.country, user.phone_number),
  );
  const [countryCode, setCountryCode] = useState<string>(user.country);
  const [profileImgPath, setProfileImgPath] = useState<string>(user.profile);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [bettingExperience, setBettingExperience] = useState<number>(
    user?.betting_experience,
  );
  const [gender, setGender] = useState<any>();
  const [bettingKnowledge, setBettingKnowledge] = useState<any>();
  const [workType, setWorkType] = useState<any>();
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [pincode, setPincode] = useState<number>();
  const [birthdate, setBirthday] = useState<any>('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const loading = useSelector((state: any) => state.loadingReducer.isLoading);

  const genderOption = [
    {id: '1', display: 'Male', isSelected: false, key: 'M'},
    {id: '2', display: 'Female', isSelected: false, key: 'F'},
    {id: '3', display: 'Others', isSelected: false, key: 'O'},
  ];

  const bettingExperienceOption = [
    {id: '1', display: 'Beginner', isSelected: false, key: 'BEGINNER'},
    {
      id: '2',
      display: 'Intermidiate',
      isSelected: false,
      key: 'INTERMEDIATE',
    },
    {id: '3', display: 'Expert', isSelected: false, key: 'EXPERT'},
  ];

  const workTypeOption = [
    {id: '1', display: 'Student', isSelected: true, key: 'STUDENT'},
    {
      id: '2',
      display: 'Professional',
      isSelected: false,
      key: 'PROFESSIONAL',
    },
    {
      id: '3',
      display: 'Business Men',
      isSelected: false,
      key: 'BUSINESS_MEN',
    },
    {
      id: '4',
      display: 'Self Employed',
      isSelected: true,
      key: 'SELF_EMPLOYED',
    },
    {id: '5', display: 'GOVT Job', isSelected: false, key: 'GOVT_JOB'},
    {
      id: '6',
      display: 'Private Job',
      isSelected: false,
      key: 'PRIVATE_JOB',
    },
    {
      id: '7',
      display: 'Other',
      isSelected: false,
      key: 'OTHER',
    },
  ];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      setFirstName(user?.first_name);
      setLastName(user?.last_name);
      setCountryCode(user?.country);
      setProfileImgPath(user?.profile);
      setEmail(user?.email);
      setNickname(user?.nickname);
      if (user?.gender) {
        let g = genderOption?.find(x => x.key === user?.gender);
        setGender(g);
      }
      if (user?.work_type) {
        let wt = workTypeOption?.find(x => x.key === user?.work_type);
        setWorkType(wt);
      }
      if (user?.betting_knowledge) {
        let bk = bettingExperienceOption?.find(
          x => x.key === user?.betting_knowledge,
        );
        setBettingKnowledge(bk);
      }
      if (user?.city !== null) {
        setCity(user.city);
      }
      if (user?.pin_code !== null) {
        setPincode(user.pin_code);
      }
      if (user?.birth_date !== null) {
        setBirthday(user?.birth_date);
      }
      if (user?.address !== null) {
        setAddress(user?.address);
      }
      setBettingExperience(user?.betting_experience);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onPressSave = () => {
    let body: any = phone.startsWith('+')
      ? {
          first_name: firstName,
          last_name: lastName,
          phone_number: phone,
          country: countryCode,
        }
      : {
          first_name: firstName,
          last_name: lastName,
          phone_number: user.phone_number,
          country: countryCode,
        };
    if (birthdate !== '') {
      body.birth_date = birthdate;
    }
    if (pincode !== undefined && pincode > 0) {
      body.pin_code = pincode;
    }
    if (city !== '') {
      body.city = city;
    }
    if (address !== '') {
      body.address = address;
    }
    if (workType?.id) {
      body.work_type = workType.key;
    }
    if (bettingExperience > 0 && bettingExperience < 32767) {
      body.betting_experience = bettingExperience;
    }
    if (bettingKnowledge?.id) {
      body.betting_knowledge = bettingKnowledge.key;
    }
    if (gender?.id) {
      body.gender = gender.key;
    }
    if (nickname.length > 1 && nickname.length < 50) {
      if (nickname.startsWith('@')) {
        let removedStr = nickname.slice(1);
        body.nickname = removedStr;
      } else {
        body.nickname = nickname;
      }
    }

    dispatch(
      updateUserAccountAction(
        user.uuid,
        body,
        () => {
          dispatch(
            getUserDetailsAction(
              () => {},
              () => {},
            ),
          );
          navigation.pop();
        },
        error => {
          if (Array.isArray(error) && error?.length > 0) {
            toast.show(error?.[0]?.message, 2);
          }
        },
      ),
    );
  };

  const takePhoto = async () => {
    if (Platform.OS === 'android') {
      const premission = await requestCameraPermission();
      if (premission) {
        const response: any = await captureImage('photo');
        if (response?.error) {
          Alert.alert('Something went wrong');
        } else if (response.fileSize > 20000000) {
          Alert.alert('Img size should be below 20 mb');
        } else {
          const res: any = {
            uri: response.uri,
            name: response.name,
            type: response.type,
          };
          uploadprofileImage(res);
        }
      }
    } else {
      const response: any = await captureImage('photo');
      if (response?.error) {
        Alert.alert('Something went wrong');
      } else if (response.fileSize > 20000000) {
        Alert.alert('Img size should be below 20 mb');
      } else {
        const res: any = {
          uri: response.uri,
          name: response.name,
          type: response.type,
        };
        uploadprofileImage(res);
      }
    }
  };

  const choosePhoto = async () => {
    if (Platform.OS === 'android') {
      const premission = await requestExternalWritePermission();
      if (premission) {
        const response: any = await chooseFile('photo');
        if (response?.error) {
          Alert.alert('Something went wrong');
        } else if (response.fileSize > 20000000) {
          Alert.alert('Img size should be below 20 mb');
        } else {
          const res: any = {
            uri: response.uri,
            name: response.name,
            type: response.type,
          };
          uploadprofileImage(res);
        }
      }
    } else {
      const response: any = await chooseFile('photo');
      if (response?.error) {
        Alert.alert('Something went wrong');
      } else if (response.fileSize > 20000000) {
        Alert.alert('Img size should be below 20 mb');
      } else {
        const res: any = {
          uri: response.uri,
          name: response.name,
          type: response.type,
        };
        uploadprofileImage(res);
      }
    }
  };

  const showImagePickerOption = () => {
    if (Platform.OS === 'ios') {
      Alert.alert('Select Image', '', [
        {
          text: 'Take Photo...',
          onPress: () => takePhoto(),
        },
        {
          text: 'Choose from library',
          onPress: () => choosePhoto(),
          style: 'cancel',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
      ]);
    } else {
      Alert.alert('Select Image', '', [
        {
          text: 'Cancel',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
        {
          text: 'Choose from library',
          onPress: () => choosePhoto(),
          style: 'cancel',
        },
        {
          text: 'Take Photo...',
          onPress: () => takePhoto(),
        },
      ]);
    }
  };

  const uploadprofileImage = (image: object) => {
    const formData = new FormData();
    formData.append('profile', image);
    dispatch(
      uploadProfileImageAction(
        user.uuid,
        formData,
        (data: any) => {
          dispatch(
            getUserDetailsAction(
              () => {},
              () => {},
            ),
          );
          setProfileImgPath(data?.profile);
        },
        response => toast.show(response[0].message, 2),
      ),
    );
  };

  const handleCountryCodeChange = (country: any) => {
    console.log(country);

    setCountryCode(country?.cca2);
  };

  const handlePhoneChange = (text: string) => {
    setPhone(text);
  };

  return (
    <BaseLayout
      back={true}
      titleType="text"
      titleText="Edit Profile"
      navigation={navigation}
      renderScrollview={true}>
      {!isLoading && (
        <View style={styles.mainContainer}>
          <View style={styles.imageWrapper}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: profileImgPath,
                }}
                resizeMode="cover"
              />
            </Pressable>
            <TouchableOpacity
              onPress={() => showImagePickerOption()}
              style={styles.editIconWrapper}>
              <Image source={EDIT_ICON} />
            </TouchableOpacity>
          </View>
          <PrimaryInput
            value={firstName}
            onChangeText={text => setFirstName(text)}
            placeholder="First Name"
            keyboardType="default"
            labelStyle={styles.labelStyle}
            containerStyle={[styles.containerStyle, styles.mt40]}
            inputStyle={styles.inputStyle}
            labelText={'First Name'}
          />
          <PrimaryInput
            value={lastName}
            onChangeText={text => setLastName(text)}
            placeholder="Last Name"
            keyboardType="default"
            labelStyle={styles.labelStyle}
            containerStyle={styles.containerStyle}
            inputStyle={styles.inputStyle}
            labelText={'Last Name'}
          />
          <PrimaryInput
            value={nickname}
            onChangeText={text => setNickname(text)}
            placeholder="Nickname"
            keyboardType="default"
            labelStyle={styles.labelStyle}
            containerStyle={styles.containerStyle}
            inputStyle={styles.inputStyle}
            labelText={'Nickname'}
            maxLength={50}
          />
          <PrimaryInput
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="betrics@gmail.com"
            keyboardType="email-address"
            editable={false}
            labelStyle={styles.labelStyle}
            containerStyle={styles.containerStyle}
            inputStyle={styles.inputStyle}
            labelText={'Email Id'}
          />
          <Text style={styles.phoneNumberLable}>Phone Number</Text>
          <PhoneNumberInput
            value={phone}
            onChangeFormattedText={handlePhoneChange}
            containerStyle={styles.inputContainer}
            country={countryCode}
            onChangeCountry={handleCountryCodeChange}
          />

          <Text style={styles.genderLabel}>Gender</Text>
          <CustomSelect
            options={genderOption}
            selectedValue={gender}
            onChange={value => setGender(value)}
            buttonStyle={styles.width100}
          />

          <Text style={styles.genderLabel}>Betting Knowledge</Text>
          <CustomSelect
            options={bettingExperienceOption}
            selectedValue={bettingKnowledge}
            onChange={value => setBettingKnowledge(value)}
            buttonStyle={styles.width100}
          />
          <PrimaryInput
            value={bettingExperience ? `${bettingExperience}` : ''}
            onChangeText={text => {
              const val = parseInt(text, 0);
              setBettingExperience(val);
            }}
            placeholder="0"
            keyboardType="number-pad"
            labelStyle={styles.labelStyle}
            containerStyle={styles.containerStyle}
            inputStyle={styles.inputStyle}
            labelText={'Betting Experience'}
            maxLength={5}
          />
          <Text style={styles.genderLabel}>Work Type</Text>
          <CustomSelect
            options={workTypeOption}
            selectedValue={workType}
            onChange={value => setWorkType(value)}
            buttonStyle={styles.width100}
          />
          <PrimaryInput
            value={address}
            onChangeText={text => setAddress(text)}
            placeholder="Address"
            keyboardType="default"
            labelStyle={styles.labelStyle}
            containerStyle={styles.containerStyle}
            inputStyle={styles.inputStyle}
            labelText={'Address'}
          />
          <PrimaryInput
            value={city}
            onChangeText={text => setCity(text)}
            placeholder="City"
            keyboardType="default"
            labelStyle={styles.labelStyle}
            containerStyle={styles.containerStyle}
            inputStyle={styles.inputStyle}
            labelText={'City'}
            maxLength={20}
          />

          <PrimaryInput
            value={pincode ? `${pincode}` : ''}
            onChangeText={text => {
              const val = parseInt(text);
              setPincode(val);
            }}
            placeholder="Pin Code"
            keyboardType="number-pad"
            labelStyle={styles.labelStyle}
            containerStyle={styles.containerStyle}
            inputStyle={styles.inputStyle}
            labelText={'Pin Code'}
            maxLength={10}
          />
          <Text style={styles.genderLabel}>Birth Date</Text>
          <Pressable style={styles.birthdateView} onPress={() => setOpen(true)}>
            <Text>{birthdate}</Text>
          </Pressable>
          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            maximumDate={new Date()}
            onConfirm={(selectDate: any) => {
              setOpen(false);
              setDate(selectDate);
              setBirthday(`${moment(selectDate).format('YYYY-MM-DD')}`);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />

          <PrimaryButton
            style={styles.btnStyle}
            text="Save"
            isLoading={loading}
            gradientStyle={styles.gradientStyle}
            textStyle={styles.btnTextStyle}
            handleClick={onPressSave}
            gradientColors={theme.colors.secondaryGradient}
          />
          <View style={[styles.width100, styles.height50]} />
          <ViewProfilePicture
            imageUrl={profileImgPath}
            onClose={() => setModalVisible(!modalVisible)}
            show={modalVisible}
          />
        </View>
      )}
    </BaseLayout>
  );
};

export default EditProfile;
