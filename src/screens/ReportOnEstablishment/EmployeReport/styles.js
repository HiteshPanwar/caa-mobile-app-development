
import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
import { RED_BG_THEME,WHITE,FOOTER_BG, BLACK,BLUE_BAR,PLACE_BLUE,DARKBLUE } from '@GlobalStyles/colors';
import {fontStyle} from '@Assets/commonFont/commonFont'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window');

export default styles = {

    buttonView:{
        backgroundColor:PLACE_BLUE, 
        width:wp(45),
         height:hp(8),
         marginTop:hp(1),
       alignSelf:"center",
       marginHorizontal:wp(14)
       },

    buttonContainer:{
        width:wp(44),
        height:hp(7.2),
        borderWidth:1,
        borderColor:WHITE,
       justifyContent: 'center',
       marginVertical: hp(0.4),
       alignSelf:"center", 
   },
 
   buttonText:{
       fontFamily:fontStyle.light,
    alignSelf: 'center',
    paddingVertical: hp(0.4),
    fontSize: normalizeFont(16),
    textAlign:'center',
    width:wp(42)
    
},
buttonWrapper:{
    height:hp(7),
    width:wp(80),
    justifyContent: 'center',
    alignSelf: 'center',
    
   },
 
 searchStyle:{
    width:wp(10)
},

MiddleView:{
   backgroundColor:PLACE_BLUE,
   width:wp(34),
   height:hp(6),
   marginLeft:wp(30),
   alignSelf:"center"
},
middleViewText:{
    fontFamily:fontStyle.light,
    fontSize: normalizeFont(15),
    textAlign:"center",
    marginTop:hp(1.5)
},

searchText:{
     width:wp(20),
     marginTop: hp(3),
     color:DARKBLUE
},


defaulttextStyle:{
    fontFamily:fontStyle.light,
    color:DARKBLUE,
    fontSize: normalizeFont(20),
    width:wp(25),
    
},
textStyle:{
    textAlign:"center",
    color:DARKBLUE,
},

textWrapper:{
  color:DARKBLUE,
  fontFamily:fontStyle.medium,
  textAlign:"center",
  fontSize: normalizeFont(13),
},
TeststextStyle:{
    fontFamily:fontStyle.light,
    color:DARKBLUE,
    fontSize: normalizeFont(20),
    
},
commentStyle:{
     width:wp(85),
     height:hp(15),
     borderWidth:2,
     borderColor:BLACK,
     alignSelf:"center",
     marginTop:hp(2)
},
viewContainer:{
    width: wp("42%"),
    height: hp("7%"),
    backgroundColor:RED_BG_THEME,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: 'center'
},
SubmitTextstyle:{
   textAlign:"center",
   fontFamily:fontStyle.light,
   
},
requiredtextStyle:{
    alignSelf: 'center',
    fontSize: normalizeFont(17),
    color: WHITE,
   

},

boxView:{
    marginTop:hp(1),
 width:wp(10),
 height:hp(5.5),
 borderWidth:5,
 borderColor:WHITE,
 alignSelf:"center",
 borderRadius:5
},
  CommanText:{
    alignSelf: 'center',
    fontSize: normalizeFont(12),
    marginTop:hp(1)
    
    
},

basedstyle:{
    fontFamily:fontStyle.light,
    fontSize: normalizeFont(16),
    marginTop:hp(1),
    textAlign:"center",
    marginLeft:wp(5),
    color:DARKBLUE
},
completestyle:{
    fontFamily:fontStyle.light,
    fontSize: normalizeFont(16),
    textAlign:"center",
    color:DARKBLUE
},
textContainer:{
    borderWidth: wp(0.5),
    marginHorizontal: wp(4),
    marginVertical: hp(1),
    height : Platform.OS === 'ios' ? hp('45%') :hp('50%') 
},

AboutUsText:{
    marginVertical: hp(1),
    fontFamily:fontStyle.medium,
    alignSelf: 'center',
    fontSize: normalizeFont(18),
    color: BLACK,
    paddingVertical: hp(0.4),
    textAlign:'center'
},
}