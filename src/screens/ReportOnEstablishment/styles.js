
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
        width:wp(75),
         height:hp(7),
         marginTop:hp(1),
       alignSelf:"center"
       },

    buttonContainer:{
        width:wp(74),
        height:hp(6.2),
        borderWidth:1,
        borderColor:WHITE,
       justifyContent: 'center',
       marginVertical: hp(0.4),
       alignSelf:"center", 
   },
 
   buttonText:{
    fontSize: normalizeFont(20),
    alignSelf: 'center',
    paddingVertical: hp(0.4),
    
},
buttonWrapper:{
    height:hp(7),
    width:wp(80),
    justifyContent: 'center',
    alignSelf: 'center',
    
   },
 CircleView:{
    backgroundColor:RED_BG_THEME,
    width:wp(12),
    height:hp(6.5),
    borderRadius:100,
    marginTop:hp(3)
 },

 
 searchStyle:{
    fontFamily:fontStyle.medium,
    width:wp(8),
    height:hp(7),
    marginHorizontal:wp(1),
    marginLeft: wp(1),
},

MiddleView:{
   backgroundColor:PLACE_BLUE,
   width:wp(34),
   height:hp(10),
   marginLeft:wp(30),
   alignSelf:"center",
   marginVertical: hp(1),
},
middleViewText:{
    fontFamily:fontStyle.light,
    fontSize: normalizeFont(17),
    textAlign:"center",
    marginTop:hp(1.5),
    marginHorizontal: wp(2),
},

searchText:{
    width:wp(17),
   
     fontSize:normalizeFont(17),
     paddingVertical: hp(3),
     color:DARKBLUE,
     fontFamily:fontStyle.medium,
},
headingText:{
    width:wp(90),
    height:wp(50),
    textAlign:"center",
    justifyContent:"center", 
    alignSelf:"center",
     fontSize:normalizeFont(17),
     paddingVertical: hp(3),
     color:DARKBLUE,
     fontFamily:fontStyle.medium,
},
redbgView:{
      backgroundColor:RED_BG_THEME,
      width:wp(80),
      height:hp(34),
      alignSelf:"center"
},

bluebgView:{
    backgroundColor:PLACE_BLUE,
    width:wp(80),
    height:hp(30),
    alignSelf:"center",
    marginTop:hp(2)
},

patronstextStyle:{
    textAlign:"center",
    marginTop:hp(1),
    fontSize: normalizeFont(15),
},

yesStyle:{
     marginLeft:wp(35),
     textAlign:"center",
     fontSize: normalizeFont(16),
},
noStyle:{
    fontSize: normalizeFont(16),
},

provideStyle:{
    fontSize: normalizeFont(16),
},
textStyle:{
    
    alignSelf: 'center',
    fontSize: normalizeFont(25),
    color: WHITE,
    paddingVertical: hp(1),

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
textWrapper:{
    marginHorizontal: wp(4),
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