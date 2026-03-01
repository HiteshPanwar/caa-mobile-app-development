import React,{Component} from "react"
import {TextInput , Alert}  from "react-native"
import { CustomButton,CustomModal } from '@Component/molecules/index';
import { AppView, AppText,Touchable, AppInput } from "../../Components/Atoms/index"
import {Loader}  from "../../Components/loader"
import style from "./styles"
import {DefaultState}  from "./constant"
import {handleOTPValidations} from "./function"
import ApiRequest from '../../RestAPI/rest'
import { Container } from '@Component/containers/index'
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import {SaveTokenAction,SaveUserDetails} from "../../Redux/Action/AuthAction";
import AsyncStorage from "@react-native-community/async-storage"
import Canvas from 'react-native-canvas';
import { normalizeFont, scale, scaleHeight } from '../../styles/responsive';
import {fontStyle} from '@Assets/commonFont/commonFont'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
 class OTP extends Component{

constructor(){
    super()
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.state={ 
         DefaultState,
         message:'',
         isLoading:false,
         modalVisible:false,
         resendModalVisible:false,
         resendMessage:"",
         phoneNumber:"",
         phoneError:"",
         modalVisible:false,
     
         phoneOTP1:'',
         phoneOTP1Status:'',
         phoneOTP1Error:'',
         activephoneOTP1BorderError:'',
     
         phoneOTP2:'',
         phoneOTP2Status:'',
         phoneOTP2Error:'',
         activephoneOTP2BorderError:'',
     
         phoneOTP3:'',
         phoneOTP3Status:'',
         phoneOTP3Error:'',
         activephoneOTP3BorderError:'',
     
         phoneOTP4:'',
         phoneOTP4Status:'',
         phoneOTP4Error:'',
         activephoneOTP4BorderError:'',

         captcha:"",
         new_captcha:"",
         intervalId:'',
         captchaInput:'',
         captchaError:''

        },
    this.phoneOTP1 = null;
    this.phoneOTP2 = null;
    this.phoneOTP3 = null;
    this.phoneOTP4 = null;
}


forceUpdateHandler(){
  this.forceUpdate();
};
 componentDidMount(){
  // console.warn("status:==>>",this.props.route.params.status)
 

//   this.props.navigation.addListener('focus', () => {
    
// });

  
}
handleCanvas = async (canvas) => {
  var charsArray =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
  var lengthOtp = 7;
  var ctx = await canvas.getContext("2d");
  this.generateCaptch(canvas,ctx,charsArray,lengthOtp)
const intervalId = setInterval(async () => {
  this.generateCaptch(canvas,ctx,charsArray,lengthOtp)
  
}, 60000);
this.setState({intervalId:intervalId})
}

generateCaptch(canvas,ctx,charsArray,lengthOtp){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  var captcha = [];
  for (var i = 0; i < lengthOtp; i++) {
    //below code will not allow Repetition of Characters
    var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
    if (captcha.indexOf(charsArray[index]) == -1)
      captcha.push(charsArray[index]);
    else i--;
  }
  
  if(canvas!==null)
  {
    ctx.font = "30px Georgia";
    ctx.strokeText(captcha.join(""), 0, 30);
    captcha=captcha.join(""), 0, 30
    this.setState({
      captcha:captcha
    })
  }
}



Verify = () => {
    const {Otp_Error} = this.props.language.OTP

    if (this.state.phoneOTP1Status && this.state.phoneOTP2Status && this.state.phoneOTP3Status && this.state.phoneOTP4Status  
        ) {
            this.setState({
                
                phoneError:"",
            }) 

            if(this.state.captcha===this.state.captchaInput)
            {
              this.submitOTPApi() 
            }
            else{
              this.setState({captchaError:"Please enter correct CAPTCHA code"})
            }
             
      }
          else {
            this.setState({         
                  phoneError:Otp_Error,
              })
            }
    }  
    
  async submitOTPApi() {
    
        this.setState({ isLoading: true })
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log("SUBMIT OTP fcmTOKEN",fcmToken)
      
       let OtpDetails =
   
       {
         "mobile":this.props.route.params.phoneNo, 
         "otp": this.state.phoneOTP1 + this.state.phoneOTP2 + this.state.phoneOTP3 + this.state.phoneOTP4,
         "device_token":fcmToken
       }
   
       ApiRequest(OtpDetails, `user-app/otp-verify`, "POST")
         .then(resp => {
          // console.warn("Otp==>",resp ,OtpDetails)
           switch (resp.status) {
             case (900): {
                this.setState({ isLoading: false })
               setTimeout(() => {
                 Alert.alert(
                   '',
                   "Please check your internet connection",
                   [
                     { text: 'OK', onPress: () => console.log('OK Pressed') },
                   ],
                   { cancelable: false },
                 );
               }, 200);
               break;
             }
             case (200): {
                this.setState({ isLoading:false })
                AsyncStorage.setItem("Token",JSON.stringify(resp.data.token))
                AsyncStorage.setItem("status",JSON.stringify(this.props.route.params.status))
                 this.props.tokenAction.SaveTokenAction(resp.data.token)
                 this.props.userDetailsAction.SaveUserDetails({"mobile":this.props.route.params.phoneNo})
               setTimeout(() => { 
                clearInterval(this.state.intervalId)
                this.props.navigation.navigate("Drawer")   
               }, 500);
               break;
             }
   
             default: {
                this.setState({ isLoading: false })
               setTimeout(() => {
                 Alert.alert(
                   '',
                   resp.data.response_message,
                   [
                     { text: 'OK', onPress: () => console.log('OK Pressed') },
                   ],
                   { cancelable: false },
                 );
               }, 200);
   
             }
               break;
           }
   
         })
     }
 handleOTPInput = async (text, type, index, prevInput, nextInput) => {
    this.setState({
        phoneError: ''
      
    })
    console.log("the type of otp", text, type, index, prevInput, nextInput)
    let status = `${type}${index}Status`;
    let Otpvalue = `${type}${index}`
    let errorText = `${type}${index}Error`;
    let resp = handleOTPValidations(text,type,index, prevInput, nextInput)
  console.log("the resppp===>>>",resp)
    await this.setState({
        [Otpvalue]: resp.value,
        [status]: resp.status,
        [errorText]: resp.errorText,
    })
   
}
ResendApi() {
    this.setState({isLoading:true})
    let ResendDetails =
   
    {
      "mobile":this.props.route.params.phoneNo, 
     
    } 
    //console.warn("resend==>",ResendDetails)
  ApiRequest( ResendDetails,`user-app/resend-otp`, "POST")
    .then(resp => {
      console.log("resend==>",ResendDetails ,resp)
      switch (resp.status) {
        case (900): {
           this.setState({ isLoading: false })
          setTimeout(() => {
            Alert.alert(
              '',
              "Please check your internet connection",
              [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ],
              { cancelable: false },
            );
          }, 200);
          break;
        }
        case (200): {
           this.setState({ isLoading:false })
       this.setState({resendModalVisible:true})
          break;
        }

        default: {
           this.setState({ isLoading: false })
          setTimeout(() => {
            Alert.alert(
              '',
              resp.data.response_message,
              [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ],
              { cancelable: false },
            );
          }, 200);

        }
          break;
      }

    })
}


    render(){
        const {
            Verify_Mobile_Number,
            SENT_TEXT,
            VERIFY,
            DIDNT_RECEIVE,
            RESEND,
            
        } =this.props.language.OTP
        return(
            <AppView style={{flex: 1,}}>
              <Container > 
            <Loader
              visible={this.state.isLoading}
            />
                <AppView style={style.Otp_statusLayout}>
                <AppText style={style.Otp_statusstyle}>
                    {Verify_Mobile_Number}
                </AppText>
                <AppText style={style.Otp_sentstatusstyle}>
                    {SENT_TEXT}
                </AppText>
            </AppView>
            <AppView style={style.InputView}>
                <TextInput style={style.otpBoxlayout}
                    maxLength={1}
                    ref={(input) => { this.phoneOTP1 = input; }}
                    autofocus
                   value={this.state.phoneOTP1}
                    keyboardType="number-pad"
                    returnKeyType="next"
                    onSubmitEditing={() => { this.phoneOTP2.focus(); }}

                    onChangeText={(text) =>{this.handleOTPInput(text, 'phoneOTP', '1',this.phoneOTP1,this.phoneOTP2)}}
                    // onSubmitEditing={(text) => phoneOTP2.current.focus() }
                >

                </TextInput>
                <TextInput style={style.otpBoxlayout}
                    maxLength={1}
                    ref={(input) => { this.phoneOTP2 = input; }}
                    value={this.state.phoneOTP2}
                    keyboardType="number-pad"
                    returnKeyType="next"
                    onSubmitEditing={() => { this.phoneOTP3.focus(); }}

                    onChangeText={(text) => { this.handleOTPInput(text, 'phoneOTP', '2',this.phoneOTP1,this.phoneOTP3 )}}

                >

                </TextInput>
                <TextInput style={style.otpBoxlayout}
                    maxLength={1}
                    ref={(input) => { this.phoneOTP3 = input; }}
                    keyboardType="number-pad"
                    value={this.state.phoneOTP3}
                    returnKeyType="next"
                    onSubmitEditing={() => { this.phoneOTP4.focus(); }}

                    onChangeText={(text) => {this.handleOTPInput(text, 'phoneOTP', '3',this.phoneOTP2,this.phoneOTP4 )}}

                >

                </TextInput>
                <TextInput style={style.otpBoxlayout}
                    maxLength={1}
                    ref={(input) => { this.phoneOTP4 = input; }}
                    keyboardType="number-pad"
                    value={this.state.phoneOTP4}
                    returnKeyType="done"
                    onChangeText={(text) => this.handleOTPInput(text, 'phoneOTP', '4', this.phoneOTP3, this.phoneOTP4)}
                   
                >

                </TextInput>
            </AppView>
            <AppView style={{alignSelf:"center"}}>
                    <AppText style={style.errorText}>
                        {this.state.phoneError}
                    </AppText>
                </AppView>
            <AppView style={style.resendContainer}>
              <AppText style={style.receiveText}>
                  {DIDNT_RECEIVE}
              </AppText> 
              <Touchable   onPress={() => 
                                  this.ResendApi()   }  >
              <AppText style={style.resendOTP} >
                  {RESEND}
              </AppText> 
              </Touchable>
            </AppView>
            

             <AppView style={{height:hp(8),borderWidth:2,width:wp(50),
              borderRadius: 10,              backgroundColor: '#606060',
              marginVertical: hp(2),
              alignSelf: 'center'}}>
             <Canvas style={{alignSelf:'center',height:hp(10),marginLeft:wp(8),marginTop:hp(1),
           width:wp(40)}} ref={this.handleCanvas}/>
             </AppView>

             <AppText style={[style.receiveText,{alignSelf: 'center',}]}>
                  {"Enter the CAPTCHA Code"}
              </AppText> 


              <AppInput style={{borderBottomWidth:1.5,width:wp(48),
                alignSelf: 'center',marginVertical:hp(2),justifyContent: 'center',
                borderRadius:10,paddingLeft: wp(4),fontSize: normalizeFont(14),
                fontFamily:fontStyle.medium,}}
                value={this.state.captchaInput}
                onChangeText={(text)=>this.setState({captchaInput:text})}
                maxLength={7} 
                placeholder={"Enter the CAPTCHA Code"}
                />
              <AppView style={{alignSelf:"center"}}>
                    <AppText style={[style.errorText,{fontSize:normalizeFont(13)}]}>
                        {this.state.captchaError}
                    </AppText>
                </AppView>
          
                <AppView style={style.buttonView}>
                    <CustomButton
                        onPress={() => this.Verify()}
                        textstyle={style.SubmitTextstyle}
                        buttonText={VERIFY}
                    >
                    </CustomButton>
                </AppView>
                </Container>
                <CustomModal
          isModalVisible={this.state.resendModalVisible}
          onPress={() => this.setState({resendModalVisible:!this.state.resendModalVisible})}
          text={"OTP resend successfully"}
        />  
                </AppView>
        )
    }
}

const mapStateToProps = state => {
    console.log("stateOTP==>>", state)
    return {
        language: state.reducer.language,
        mobile:state.AuthReducer.Userdetails.mobile
    }
}
const mapDispatchToProps = dispatch => {
  return {
    tokenAction: bindActionCreators({ SaveTokenAction }, dispatch),
    userDetailsAction: bindActionCreators({ SaveUserDetails }, dispatch),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OTP);
