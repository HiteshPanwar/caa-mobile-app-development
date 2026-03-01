
import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
import { RED_BG_THEME,WHITE,FOOTER_BG, BLACK,BLUE_BAR } from '@GlobalStyles/colors';
import {fontStyle} from '@Assets/commonFont/commonFont'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window');

export default styles = {
  InputContainer:{
       justifyContent: 'center',
       marginVertical: hp(1),
      
   },
   InputWrapper:{
    height:hp(7),
    width:wp(60),
    justifyContent: 'center',
    alignSelf: 'center',
   },
   buttonText:{
    fontFamily:fontStyle.light,
    alignSelf: 'center',
    fontSize: normalizeFont(25),
    color: WHITE,
    paddingVertical: hp(0.4),
},
InputStyle:{
    fontFamily:fontStyle.light,
    alignSelf: 'center',
    fontSize: normalizeFont(20),
    color: WHITE,
    paddingVertical: hp(0.5),
   
    
},
   NameInputContainer:{
    justifyContent: 'center',
    marginVertical: hp(1),
    flexDirection: 'row',
    
},
establishmentContainer:{
  justifyContent: 'center',
  marginVertical: hp(1),
  flexDirection: 'row',
},

linkContainer:{
  justifyContent: 'space-between',
    marginVertical: hp(0.5),
    flexDirection: 'row',
    marginHorizontal: wp(12),

},

   
establishmentText:{
  fontFamily:fontStyle.light,
    alignSelf: 'center',
    fontSize: normalizeFont(15),
    color: WHITE,
    paddingVertical: hp(0.4),
},
linkText:{
    fontFamily:fontStyle.medium,
    alignSelf: 'center',
    fontSize: normalizeFont(15),
    color: FOOTER_BG,
    paddingVertical: hp(0.4),
},



 NameInputWrapper:{
  height:hp(6),
  width:wp(40),
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: BLUE_BAR,
  marginHorizontal: wp(2),
  
 },
 NameInputChildWrapper:{
  height:hp(5.5),
  width:wp(38.7),
  justifyContent: 'center',
  alignSelf: 'center',
  borderWidth: wp(0.3),
  borderColor: WHITE,
 },
 establishmentWrapper:{
  height:hp(6),
  width:wp(48),
  justifyContent: 'center',
  alignSelf: 'center',
 },

 EmailInputWrapper:{
  height:hp(8),
  width:wp(70),
  justifyContent: 'center',
  alignSelf: 'center',
  
  
 },
 LocationInputWrapper:{
  height:hp(7),
  width:wp(60),
  justifyContent: 'center',
  alignSelf: 'center',
 },

 LocationButtonText:{
  fontFamily:fontStyle.light,
  alignSelf: 'center',
  fontSize: normalizeFont(20),
  color: WHITE,
  paddingVertical: hp(0.4),
 },
  CommanText:{
    fontFamily:fontStyle.medium,
    alignSelf: 'center',
    fontSize: normalizeFont(20),
    color: BLUE_BAR,
    // paddingVertical: hp(0.2),
    
    
},
CommanTextWrapper:{
  alignSelf: 'center',
  justifyContent: 'center',
  marginVertical: hp(1),
},
ErrorText:{
  color:RED_BG_THEME,
  fontSize: normalizeFont(15),
  alignSelf:"center",
  marginLeft:wp(10)
},
lastnameErrorText:{
  color:RED_BG_THEME,
  fontSize: normalizeFont(15),
  alignSelf:"center",

},

NameInputWrapperEmail:{
  height:hp(6),
  width:wp(80),
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: BLUE_BAR,
  marginHorizontal: wp(2),
},
EmailInputChildWrapper:{
  height:hp(5.5),
  width:wp(79),
  justifyContent: 'center',
  alignSelf: 'center',
  borderWidth: wp(0.3),
  borderColor: WHITE,
 },
 InputContainerEmail:{
   alignItems: 'center',
 }

}