
import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
import { RED_BG_THEME,WHITE,FOOTER_BG, BLACK,BLUE_BAR,PLACE_BLUE,DARKBLUE } from '@GlobalStyles/colors';
import {fontStyle} from '@Assets/commonFont/commonFont'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window');

export default styles = {

    buttonView:{
        backgroundColor:RED_BG_THEME, 
        width:wp(65),
         height:hp(8),
         marginTop:hp(3),
         marginLeft:wp(10)
       },

    buttonContainer:{
        width:wp(64),
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
    fontSize: normalizeFont(35),
    color: WHITE,
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

 starStyle:{
     width:wp(10),
     marginLeft:wp(5)
 },
 searchStyle:{
    fontFamily:fontStyle.medium,
    width:wp(7),
    height:hp(7),
    marginHorizontal:wp(1),
    marginLeft: wp(2),
},

MiddleView:{
   backgroundColor:PLACE_BLUE,
   width:wp(45),
   height:hp(20),
   marginLeft:wp(12),

},
searchText:{
     width:wp(17),
    //height:wp(20),
     fontSize:normalizeFont(17),
     paddingVertical: hp(3),
     color:DARKBLUE,
     fontFamily:fontStyle.medium,
   
},
redbgView:{
      backgroundColor:RED_BG_THEME,
      width:wp(80),
      height:hp(34),
      alignSelf:"center",
      marginVertical:hp(2),
    //   justifyContent:"space-around",
    //   flexDirection: 'column',
},

textStyle:{
    fontFamily:fontStyle.light,
    width:wp(70),
    alignSelf: 'center',
    fontSize: normalizeFont(17),
    color: WHITE,

}, 
textStyleResult:{
    
    alignSelf: 'center',
    fontSize: normalizeFont(25),
    color: WHITE,
    paddingVertical: hp(1),

}, 
requiredtextStyle:{
    alignSelf: 'center',
    fontSize: normalizeFont(17),
    color: WHITE,
    justifyContent: 'center',
    textAlign:'center'
   

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
    fontSize: normalizeFont(20),
    color: DARKBLUE,
    
},

basedstyle:{
    fontFamily:fontStyle.light,
    fontSize: normalizeFont(16),
    marginTop:hp(1),
    textAlign:"center",
    marginLeft:wp(5),
    color: DARKBLUE,

    
    
},
completestyle:{
    fontFamily:fontStyle.light,
    fontSize: normalizeFont(16),
    textAlign:"center",
    color: DARKBLUE,
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
middleViewTextStyle:{
    fontFamily:fontStyle.light,
    width:wp(35),
    alignSelf: 'center',
    fontSize: normalizeFont(17),
    color: WHITE,
    textAlign:'center',
    marginVertical:hp(1)
}
}