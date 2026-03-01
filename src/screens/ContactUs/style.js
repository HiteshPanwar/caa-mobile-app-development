
import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
import { RED_BG_THEME,WHITE,FOOTER_BG, BLACK,BLUE_BAR,DARKBLUE } from '@GlobalStyles/colors';
import {fontStyle} from '@Assets/commonFont/commonFont'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window');

export default styles = {
    buttonContainer:{
       justifyContent: 'center',
       marginVertical: hp(2),
   },

   buttonWrapper:{
    height:hp(7),
    width:wp(80),
    justifyContent: 'center',
    alignSelf: 'center',
    //backgroundColor:"red"
    
   },
   buttonText:{
    fontFamily:fontStyle.light,
    alignSelf: 'center',
    fontSize: normalizeFont(28),
    color: WHITE,
    paddingVertical: hp(0.4),
},
  CommanText:{
    fontFamily:fontStyle.medium,
    alignSelf: 'center',
    fontSize: normalizeFont(20),
    color: BLUE_BAR,
    paddingVertical: hp(0.4),
},

defaultText:{
    fontSize: normalizeFont(17),
    textAlign:"center",
    color:DARKBLUE  
},
textStyle:{
    fontSize: normalizeFont(17),
    fontFamily:fontStyle.light,
    color:"black",
    alignSelf:"center"
},

textContainer:{
    borderWidth: wp(0.5),
    marginHorizontal: wp(4),
    marginVertical: hp(1),
    height : Platform.OS === 'ios' ? hp(18) :hp(18) 
},
textWrapper:{
    //marginHorizontal: wp(4),
   
   
},
IndicateText:{
    marginVertical: hp(1),
    fontFamily:fontStyle.medium,
    //alignSelf: 'center',
    fontSize: normalizeFont(18),
    color: BLACK,
    paddingVertical: hp(0.4),
    textAlign:'center'
},

InputView:{
    width: wp(35),
    height: hp(6),
    borderWidth: 0.5,
    marginHorizontal:wp(4),
    borderColor: DARKBLUE,
    // backgroundColor:'blue',
    paddingHorizontal:wp(1),
    
},
inputStyle:{
    fontFamily:fontStyle.medium,
    fontSize: normalizeFont(20),
    // paddingVertical: hp(0.1),
    // backgroundColor:'red',
    alignSelf: 'center',
    width: wp(32),
    height: hp(6),
   
},
SubmitTextstyle: {
    fontSize: normalizeFont(20),
    fontFamily:fontStyle.medium,
    color: WHITE,
    alignSelf:'center'

},
ErrorText:{
    color:RED_BG_THEME,
    fontSize: normalizeFont(13),
    //marginVertical: hp(1.5),
}
}