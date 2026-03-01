import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { DARKBLUE,WHITE,SKY_COLOR } from '@GlobalStyles/colors';
import { normalizeFont, scale, scaleHeight } from '../../styles/responsive';
import {fontStyle} from '@Assets/commonFont/commonFont'
import { Error_Red } from '../LoginScreen/colors';
export default styles = {

container:{
    backgroundColor:WHITE,
    height:hp(100)
  
},

Otp_statusLayout:{
    alignSelf: "center",
    width: wp("75%"),
    height: hp("15%"),
    alignItems: "center",
    marginVertical:hp(5),
    justifyContent:"space-around"
},
Otp_statusstyle:{
    fontSize: normalizeFont(25),
    textAlign:"center",
    fontFamily: fontStyle.medium,
    color: "black",
    
   
},

Otp_sentstatusstyle:{
    fontSize: normalizeFont(16),
    textAlign:"center",
    fontFamily: fontStyle.light,
    color: "black",
   
},
InputView: {
    alignSelf: "center",
    width: wp(50),
    alignItems: "flex-start",
    flexDirection: 'row',
    justifyContent:"space-between",
    
   
},
otpBoxlayout:{
    
    
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(7),
    borderBottomWidth: 2,
   
},

resendContainer:{
    flexDirection:"row",
    alignItems:"center",
    marginLeft:wp(2),
    marginVertical:hp(2),
    justifyContent:'space-around'
},

receiveText:{
    fontSize: normalizeFont(20),
    fontFamily:fontStyle.medium,
    color: "black",

},

resendOTP:{
    fontSize: normalizeFont(20),
    fontFamily:fontStyle.medium,
    color: SKY_COLOR ,
    textDecorationLine:"underline",


},

 errorText:{
  color:Error_Red,
  fontFamily:fontStyle.light

 },
SubmitTextstyle: {
    fontSize: normalizeFont(20),
    fontFamily:fontStyle.medium,
    color: WHITE,

},

buttonView:{
    marginVertical:hp(5)
}

}