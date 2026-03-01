
import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
import { RED_BG_THEME,WHITE,FOOTER_BG, BLACK,BLUE_BAR } from '@GlobalStyles/colors';
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
    flexDirection: 'row',
   },
   buttonText:{
    fontFamily:fontStyle.light,
    alignSelf: 'center',
    fontSize: normalizeFont(20),
    color: WHITE,
    paddingVertical: hp(0.4),
    width:wp(60),
    textAlign:'center'
},
searchContainer:{
  flexDirection: 'row',
  borderWidth: wp(0.8),
  borderColor: GREY_INPUT_BORDER,
 
  width:wp(50),
  height:hp(7),
},
searchIcon:{
  alignSelf: 'center',
  height:hp(3),
  width:wp(6),
  marginLeft: wp(1),
 
},
InputStyle:{
 width:wp(47),
 fontSize: normalizeFont(13),
 fontFamily:fontStyle.medium,
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
       marginVertical: hp(1),
       flexDirection: 'row',
},
MapView:{
  justifyContent: 'center',
      // marginVertical: hp(20),
      alignSelf: 'center',
       width:wp(100),
       height:Platform.OS ==="ios" ?hp(60) : hp(63),
      //  backgroundColor:"red"
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
    fontSize: normalizeFont(18),
    color: WHITE,
    paddingVertical: hp(0.4),
},
cardViewContainer:{
  flexDirection:'row',
  borderBottomWidth: hp(0.2),
  borderBottomColor: GREY_INPUT_BORDER,
  width:wp(75),
  alignSelf: 'center',
  justifyContent: 'space-around',
  
},
iconStyle:{
  width:wp(13),
  height:hp(7),
  justifyContent: 'center',
  
  },
iconWrapper:{
marginHorizontal: wp(1),
justifyContent: 'center',
},
iconText:{
  color:WHITE,
  alignSelf: 'center',
  fontFamily:fontStyle.medium,
  fontSize: normalizeFont(20),
  

  },
  establishmentName:{
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: wp(2),
   
    width:wp(55),
  },
  establishmentText:{
    color:BLUE_BAR,
  fontFamily:fontStyle.medium,
  fontSize: normalizeFont(18),
  },
  estDistanceText:{
    color:GREY_TEXT,
  fontFamily:fontStyle.medium,
  fontSize: normalizeFont(15),
  },
  alertStatusContainer:{
  flexDirection: 'row',
  borderWidth: wp(0.8),
  borderColor: GREY_INPUT_BORDER,
  justifyContent: 'center',
  marginHorizontal: wp(1),  
  },
  /*************Suggestions Autocomplete */
  suggestionsContainer:{
  borderWidth: wp(0.8),
  borderColor: GREY_INPUT_BORDER,
  justifyContent: 'center',
  height:hp(20),
  width:wp(90),
  alignSelf: 'center',
  marginVertical: hp(1),
  borderRadius: 4,
  },

  suggestionsText:{
    fontFamily:fontStyle.medium,
    alignSelf: 'center',
    fontSize: normalizeFont(18),
    color: GREY_TEXT,
    textAlign:"center"
  },
  suggestionsTextWrapper:{
    marginVertical: hp(0.4),
  },




  alertStatusText:{
    fontFamily:fontStyle.medium,
    alignSelf: 'center',
    fontSize: normalizeFont(14),
    color: GREY_TEXT,
    width:wp(24),
    justifyContent: 'center',
    textAlign:'center'
  },
  alertIcon:{
  alignSelf: 'center',
  height:hp(5),
  width:wp(12),
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