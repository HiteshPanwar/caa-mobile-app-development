
import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
import { RED_BG_THEME,WHITE,FOOTER_BG, BLACK,BLUE_BAR,Error_Red } from '@GlobalStyles/colors';
import {fontStyle} from '@Assets/commonFont/commonFont'
import {GREY_INPUT_BORDER,GREY_TEXT} from './color'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window');

export default styles = {
  InputContainer:{
       justifyContent: 'center',
       marginVertical: hp(1),
      
   },
   InputWrapper:{
    height:hp(7),
    width:wp(70),
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
feedbackText:{
    fontFamily:fontStyle.medium,
    alignSelf: 'flex-start',
    marginHorizontal: wp(10),
    fontSize: normalizeFont(22),
    color: FOOTER_BG,
    paddingVertical: hp(0.4),

},
searchContainer:{
  flexDirection: 'row',
  borderWidth: wp(0.8),
  borderColor: GREY_INPUT_BORDER,
  justifyContent: 'center',
  width:wp(80),
  height:hp(7),
  alignSelf: 'center',
  marginVertical: hp(1),
 
},
textAreaContainer:{
    flexDirection: 'row',
    borderWidth: wp(0.8),
    borderColor: GREY_INPUT_BORDER,
    justifyContent: 'center',
    width:wp(80),
    height:hp(30),
    alignSelf: 'center',
    marginVertical: hp(1),
},

InputStyle:{
 width:wp(46),
 fontSize: normalizeFont(20),
 fontFamily:fontStyle.medium,
 height:hp(7),
 alignSelf: 'center',
 justifyContent: 'center',
 alignItems: 'center',
 alignContent: 'center',
 color:GREY_TEXT,
 
 textAlign:'center'
},
textAreaInputStyle:{
    width:wp(70),
    fontSize: normalizeFont(20),
    fontFamily:fontStyle.medium,
    height:hp(25),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    color:GREY_TEXT,
    textAlign:'center'
   },

   ErrorText:{
       color:Error_Red,
       fontSize: normalizeFont(15),
       textAlign:"center"

   }

}