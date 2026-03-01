
import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
import { RED_BG_THEME,WHITE,FOOTER_BG, BLACK,BLUE_BAR} from '@GlobalStyles/colors';
import {fontStyle} from '@Assets/commonFont/commonFont'
import {GREY_INPUT_BORDER,GREY_TEXT ,DARKBLUE } from './color'
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
    flexDirection: 'row',
   },
   buttonText:{
    fontFamily:fontStyle.light,
    alignSelf: 'center',
    fontSize: normalizeFont(25),
    color: WHITE,
    paddingVertical: hp(0.4),
},
searchContainer:{
  flexDirection: 'row',
  borderWidth: wp(0.8),
  borderColor: GREY_INPUT_BORDER,
  justifyContent: 'center',
  width:wp(70),
  height:hp(7),
  alignSelf: 'center',
},
searchIcon:{
  alignSelf: 'center',
  marginHorizontal: wp(2),
  height:hp(3),
  width:wp(6),
 
},
InputStyle:{
 width:wp(46),
 fontSize: normalizeFont(15),
 fontFamily:fontStyle.medium,
 borderRightWidth: wp(0.5),
 borderRightColor: GREY_INPUT_BORDER,
 height:hp(5),
 alignSelf: 'center',
 justifyContent: 'center',
 alignItems: 'center',
 alignContent: 'center',
},
caaIcon:{
  alignSelf: 'center',
  marginHorizontal: wp(2),
  height:hp(5),
  width:wp(9),
  
},
mapListToggleContainer:{
  justifyContent: 'center',
       marginVertical: hp(2),
       flexDirection: 'row',
}
,
mapListToggleWrapper:{
  height:hp(7),
  width:wp(40),
  justifyContent: 'center',
  alignSelf: 'center',
},
mapListToggleText:{

  fontFamily:fontStyle.light,
    alignSelf: 'center',
    fontSize: normalizeFont(15),
    color: WHITE,
    paddingVertical: hp(0.4),
},
iconStyle:{
width:wp(10),
height:hp(7),
justifyContent: 'center',
},
iconText:{
color:WHITE,
alignSelf: 'center',
fontFamily:fontStyle.medium,
fontSize: normalizeFont(20),
},
iconWrapper:{
marginHorizontal: wp(1),
justifyContent: 'center',
},
cardViewContainer:{
  flexDirection:'row',
  borderBottomWidth: hp(0.2),
  borderBottomColor: GREY_INPUT_BORDER,
  width:wp(90),
  alignSelf: 'center',
  
},
establishmentName:{
  flexDirection: 'column',
  justifyContent: 'center',
  marginHorizontal: wp(2),
},
establishmentText:{
  color:BLUE_BAR,
fontFamily:fontStyle.medium,
fontSize: normalizeFont(18),
width:wp(55),
},
estDistanceText:{
  color:GREY_TEXT,
fontFamily:fontStyle.medium,
fontSize: normalizeFont(15),
width:wp(55),
},
dateTimeContainer:{
  flexDirection: 'column',
  width:wp(40),
},
dateTimeText:{
  color:BLUE_BAR,
fontFamily:fontStyle.medium,
fontSize: normalizeFont(18),

},
scrollViewContainer:{
  height:hp(58),
  marginTop: hp(2),
},
alertNotification:{
  width:wp(90),
  height:hp(15),
  marginVertical: hp(2),
  alignSelf: 'center',
  flexDirection: 'column',
},
alertText:{
  color:BLUE_BAR,
fontFamily:fontStyle.medium,
fontSize: normalizeFont(18),
},
MapView:{
  justifyContent: 'center',
      // marginVertical: hp(20),
      alignSelf: 'center',
       width:wp(95),
       height:hp(40),
      //  backgroundColor:"red"

},

/*********************Map MArker ****************/
mapMarkerStyle:{
  width:wp(10),
  height:hp(7),
  justifyContent: 'center',
  alignSelf: 'center',
  marginBottom: hp(-3),
  zIndex: 1,
  },
  mapMarkerTextWrapper:
  { borderWidth: 1,
    paddingHorizontal: wp(2), 
    paddingVertical: hp(2),
    backgroundColor: 'white',},

    mapMarkerTitle:{
    fontFamily:fontStyle.medium,
    alignSelf: 'center',
    fontSize: normalizeFont(16),
    color:BLACK
    },
    markerIcon:{
      height:hp(5),
      width:wp(7),
      alignSelf: 'center',
    }


}