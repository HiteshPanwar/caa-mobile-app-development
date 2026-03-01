

import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
import { RED_BG_THEME,WHITE,FOOTER_BG, BLACK,BLUE_BAR,DARKBLUE,PLACE_BLUE } from '@GlobalStyles/colors';
import {fontStyle} from '@Assets/commonFont/commonFont'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window');

export default styles = {
    buttonContainer:{
       justifyContent: 'center',
       marginBottom: hp(2),
       marginTop:hp(1)
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
    fontFamily:fontStyle.light,
    textAlign:"center"
    
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
starStyle:{
    width:wp(10),
    marginLeft:wp(5)
},
searchStyle:{
    fontFamily:fontStyle.medium,
    width:wp(8),
    height:hp(8),
    marginHorizontal:wp(1),
    marginLeft: wp(2),
},
MiddleView:{
    backgroundColor:PLACE_BLUE,
    
 },
 searchText:{
    width:wp(20),
    //height:wp(20),
     fontSize:normalizeFont(17),
     paddingVertical: hp(3),
     color:DARKBLUE,
     fontFamily:fontStyle.medium,
   
 },
 middleViewTextStyle:{
    fontFamily:fontStyle.light,
    width:wp(35),
    alignSelf: 'center',
    fontSize: normalizeFont(17),
    color: WHITE,
    textAlign:'center',
    marginVertical:hp(1),
   
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
    borderWidth: .8,
    marginHorizontal:wp(4),
    borderColor: DARKBLUE,
},
inputStyle:{
    fontFamily:fontStyle.light,
    fontSize: normalizeFont(20),
    paddingVertical: hp(0.4),
    alignSelf: 'center',
    justifyContent: 'center',
},
SubmitTextstyle: {
    fontSize: normalizeFont(20),
    fontFamily:fontStyle.medium,
    color: WHITE,

},
ErrorText:{
    color:RED_BG_THEME,
    fontSize: normalizeFont(15),
    alignSelf:"center"
}
}