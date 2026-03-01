import React, {Component} from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import {
  AppImage,
  AppView,
  AppText,
  AppInput,
  Touchable,
} from '../../Components/Atoms/index';
import {CountryModal} from '../../Components/countryModal';
import {Country} from '../../Components/countrycode';
import {Container} from '@Component/containers/index';
import {logo, phoneIcon, downIcon, AppLogo} from '@Assets/Icon';
import {
  Input,
  CustomButton,
  BoxIcon,
  CustomModal,
  SimpleLargeInput,
} from '@Component/molecules/index';
import style from './styles';
import DefaultState from './constant';
import WebView from 'react-native-webview';
import ApiRequest from '../../RestAPI/rest';
import AsyncStorage from '@react-native-community/async-storage';
import {Error_Red, Placeholder_Color} from './colors';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import styles from '../Settings/MyProfile/styles';
import {Loader} from '../../Components/loader';
import firebase from '../../firebase/firebase';
import {handleValidations} from './validate';
var database = firebase.database();
class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      TermsLink: 'https://www.covidactionalert.com/terms-and-conditions.html',
      PrivacyLink: 'https://www.covidactionalert.com/privacy-policy.html',
      status: true,
      checkStatus: false,
      isLoading: false,
      checkModalVisible: false,
      successModal: false,
      isLoading: false,
      phoneNo: '',
      language: 'english',
      countrycode: '+1',
      modalVisible: false,
      modalVisiblecountry: false,
      DefaultState,
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.setState({phoneNo: ''});
    });
  }

  setCountryCode = (item, index) => {
    this.setState({
      countrycode: item.dialCode,
      colorchange: true,
      modalVisiblecountry: !this.state.modalVisiblecountry,
    });
  };

  SignUpApi() {
    this.setState({isLoading: true});
    let SignUpDetails = {
      country_code: this.state.countrycode,
      password:this.state.password,
      language: 1,
      mobile: this.state.phoneNo,
    };
    this.submitHandler(SignUpDetails);
  }

  submitHandler = (SignUpDetails) => {
    this.getProfileDetails(SignUpDetails).then(() => {
      this.setState({isLoading: false});
      this.props.navigation.navigate('Login');
    });
  };


  getProfileDetails = async (SignUpDetails) => {
    return new Promise((resolve) => {
      database
        .ref()
        .child('users')
        .orderByChild('mobile')
        .equalTo(this.state.phoneNo)
        .get().then( function (snapshot) {
          console.log('snapshot.val()',snapshot.val(),snapshot.exists())
          if (snapshot.exists()) {
            alert('User already exist. Please login !')
          } else { 
            var newPostKey = database.ref().child('users').push().key;
            database
              .ref('users/' + newPostKey)
              .set({...SignUpDetails, id: newPostKey});
          }            
            resolve();
        }).catch((error) => {
          console.error(error);
        });
        ;
    });
  };


  

  handleValidate = async (text, type) => {
    let status = `${type}Status`;
    let errorText = `${type}Error`;
    let resp = handleValidations(text, type);
    this.setState({
      ...this.state,
      [type]: resp.value,
      [errorText]: resp.errorText,
      [status]: resp.status,
    });
  };

  signUpHandler = () => {
    if (this.state.phoneNoStatus) {
      if (this.state.passwordStatus) {
        if (this.state.confirmpasswordStatus) {
           this.SignUpApi();
        } else {
          this.setState({
            confirmpasswordError: 'please enter confirm password',
            confirmpasswordStatus: false,
          });
        }
      } else {
        this.setState({
          passwordError: 'please enter password',
          passwordStatus: false,
        });
      }
    } else {
      this.setState({
        phoneNoError: 'please enter phone number',
        phoneNoStatus: false,
      });
    }
  };

  render() {
    const {SignIn} = this.props.language.SignIn;
    const {LogIn} = this.props.language.LogIn;
    const {
      PRIVACY_POLICY,
      WE_DO_NOT,
      TERMS_CONDITIONS,
      CHECK_ESTABLISHMENT,
      REPORT_ESTABLISHMENT,
    } = this.props.COMMON_TEXT;
    return (
      <AppView style={style.container}>
        <Container style={{height: heightPercentageToDP(100)}}>
          <Loader visible={this.state.isLoading} />
          <AppImage source={AppLogo} style={style.logostyle}></AppImage>
          <AppText style={style.textStyle}>{"Sign Up"}</AppText>
          <AppView style={style.InputView}>
            <AppView style={style.textField}>
              <AppInput
                value={this.state.countrycode}
                style={style.countryInputStyle}
                placeholderTextColor={Placeholder_Color}
                placeholder={this.state.countrycode}
                editable={false}></AppInput>
              <Touchable
                style={{
                  justifyContent: 'center',
                  width: widthPercentageToDP(4),
                  height: heightPercentageToDP(3),
                }}
                onPress={() => this.setState({modalVisiblecountry: true})}>
                <AppImage source={downIcon} />
              </Touchable>
            </AppView>
            <AppView style={{marginTop: heightPercentageToDP(3)}}>
              <Input
                image={phoneIcon}
                maxLength={10}
                style={style.inputImagestyle}
                placeholder={'Phone Number'}
                value={this.state.phoneNo}
                placeholderStyle={style.PlaceHolderTextstyle}
                placeholderTextColor={Placeholder_Color}
                onChangeText={(text) => this.handleValidate(text, 'phoneNo')}
                errortext={this.state.phoneNoError}
                keyboardType={'numeric'}
                Errorstyle={{marginLeft: widthPercentageToDP(-22)}}
              />
            </AppView>
          </AppView>

          <AppView
            style={{
              marginTop: heightPercentageToDP(0),
              marginLeft: widthPercentageToDP(8),
            }}>
            <SimpleLargeInput
              maxLength={15}
              style={style.inputImagestyle}
              placeholder={'Enter Password Here'}
              value={this.state.password}
              secureTextEntry={true}
              placeholderStyle={style.PlaceHolderTextstyle}
              placeholderTextColor={Placeholder_Color}
              onChangeText={(text) => this.handleValidate(text, 'password')}
              errortext={this.state.passwordError}
              Errorstyle={{marginLeft: widthPercentageToDP(4)}}
            />
          </AppView>
          <AppView
            style={{
              marginTop: heightPercentageToDP(0),
              marginLeft: widthPercentageToDP(8),
            }}>
            <SimpleLargeInput
              maxLength={15}
              style={style.inputImagestyle}
              placeholder={'Confirm Password'}
              value={this.state.confirmpassword}
              secureTextEntry={true}
              placeholderStyle={style.PlaceHolderTextstyle}
              placeholderTextColor={Placeholder_Color}
              onChangeText={(text) =>
                this.handleValidate(text, 'confirmpassword')
              }
              errortext={this.state.confirmpasswordError}
              Errorstyle={{marginLeft: widthPercentageToDP(4)}}
            />
          </AppView>

          <AppView style={{marginTop: heightPercentageToDP(5)}}>
            <CustomButton
              onPress={() => this.signUpHandler()}
              textstyle={style.SubmitTextstyle}
              buttonText={'Sign Up'}></CustomButton>
          </AppView>
          <CountryModal
            data={Country}
            visible={this.state.modalVisiblecountry}
            onPress={(x) => this.setCountryCode(x)}
            cancelPress={() =>
              this.setState({
                modalVisiblecountry: !this.state.modalVisiblecountry,
              })
            }
            cancelModal={() => this.setState({yearView: false})}
          />
          <AppView style={style.agreeContainer}>
            {/* <BoxIcon
            style={{width:widthPercentageToDP(10),height:heightPercentageToDP(3)}}
            onPress={() => this.setState({status:!this.state.status})}
              state={this.state.status}
            /> */}
            <AppText style={style.andStyle}>
              {'Already have an account? '}
            </AppText>
            <Touchable onPress={() => this.props.navigation.navigate('Login')}>
              <AppText style={style.agreeText}>{'Sign in'}</AppText>
            </Touchable>
          </AppView>
        </Container>
        <CustomModal
          isModalVisible={this.state.checkModalVisible}
          onPress={() =>
            this.setState({checkModalVisible: !this.state.checkModalVisible})
          }
          text={'Please Read Privacy Policy And Terms & Conditions'}
        />
        <CustomModal
          isModalVisible={this.state.successModal}
          onPress={() =>
            this.props.navigation.navigate(
              'Otp',
              {phoneNo: this.state.phoneNo, status: this.state.status},
              this.setState({successModal: false}),
            )
          }
          text={this.state.message}
        />
      </AppView>
    );
  }
}
const mapStateToProps = (state) => {
  console.log('state==>>', state.reducer.language);
  return {
    language: state.reducer.language,
    COMMON_TEXT: state.reducer.language.COMMON_TEXT,
  };
};
// const mapDispatchToProps = dispatch => {
//     return { actions: bindActionCreators({ SaveTokenAction }, dispatch) }
//   }

export default connect(mapStateToProps)(SignUp);
