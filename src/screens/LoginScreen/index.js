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
class Login extends Component {
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

  LoginApi() {
    this.setState({isLoading: true});

    let LoginDetails = {
      country_code: this.state.countrycode,
      language: 1,
      mobile: this.state.phoneNo,
      password:this.state.password
    };
    this.setState({isLoading: false});
    this.props.navigation.navigate('Drawer');

  //  this.submitHandler(LoginDetails);      ALERT!!!!!
  }


  submitHandler = (LoginDetails) => {
    console.log('submitHandler');
    try {
      database
      .ref()
      .child('users')
      .orderByChild('mobile')
      .equalTo(this.state.phoneNo)
      .get().then(  (snapshot)=> {
        console.log('snapshot.val()',snapshot.val(),snapshot.exists());
        if (snapshot.exists()){
          let isUserMatched=false
          for (let key in snapshot.val()) {
          if (snapshot.val()[key].password == this.state.password) {
              isUserMatched=true
            } 
          }
          if(isUserMatched){
            AsyncStorage.setItem(
              'LOGIN_CREDENTIALS',
              JSON.stringify({...LoginDetails}),
            );
            AsyncStorage.setItem('@isLoggedIn', 'true');
            this.setState({isLoading: false});
            this.props.navigation.navigate('Drawer');
          }else{
            alert('Incorrect password or email.');
            this.setState({isLoading: false});
          }
        }  else {
          alert('Incorrect password or email.');
          this.setState({isLoading: false});
        }
        });
    } catch (error) {
      console.log('error=>', error);
      alert('Incorrect password or email.');
      this.setState({isLoading: false});
    }
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

  login = () => {
    if (this.state.phoneNoStatus) {
      if (this.state.passwordStatus) {
        this.LoginApi();
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
          <AppText style={style.textStyle}>{SignIn}</AppText>
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

          <AppView style={{marginTop: heightPercentageToDP(5)}}>
            <CustomButton
              onPress={() => this.login()}
              textstyle={style.SubmitTextstyle}
              buttonText={LogIn}></CustomButton>
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
              {'Don’t have an account? '}
            </AppText>
            <Touchable onPress={() => this.props.navigation.navigate('SignUp')}>
              <AppText style={style.agreeText}>{'Sign up'}</AppText>
            </Touchable>
          </AppView>
          <AppView
            style={{
              marginHorizontal:
                Platform.OS === 'ios' ? null : widthPercentageToDP(5),
              marginVertical: heightPercentageToDP(5),
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom:heightPercentageToDP(20)
            }}>
            <AppText style={styles.CommanText}>{WE_DO_NOT}</AppText>
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

export default connect(mapStateToProps)(Login);
