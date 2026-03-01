
import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
import { RED_BG_THEME,WHITE,FOOTER_BG, BLACK,BLUE_BAR } from '@GlobalStyles/colors';
import {fontStyle} from '@Assets/commonFont/commonFont'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window');

export default styles = {
    buttonContainer:{
       justifyContent: 'center',
       marginVertical: hp(2),
   },
   AlertContainer:{
    justifyContent: 'space-around',
    marginVertical: hp(2),
    flexDirection:'row'
},establishmentText:{
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
  },establishmentContainer:{
    justifyContent: 'center',
    marginVertical: hp(1),
    flexDirection: 'row',
  },establishmentWrapper:{
    height:hp(6),
    width:wp(48),
    justifyContent: 'center',
    alignSelf: 'center',
   },
   Toggle:{
    justifyContent: 'center',
    width:wp(18),
    
   },

   buttonWrapper:{
    height:hp(7),
    width:wp(80),
    justifyContent: 'center',
    alignSelf: 'center',
    
   },
   AlertWrapper:{
    height:hp(5),
    width:wp(18),
    justifyContent: 'center',
    alignSelf: 'center',
    
   },
   buttonText:{
    fontFamily:fontStyle.light,
    alignSelf: 'center',
    fontSize: normalizeFont(23),
    color: WHITE,
    paddingVertical: hp(0.4),
},
   AlertText:{
    fontFamily:fontStyle.light,
    alignSelf: 'center',
    justifyContent:'center',
    fontSize: normalizeFont(20),
    color: BLUE_BAR,
    paddingVertical: hp(0.4),
    width:wp(67),
}, 
AlertTextView:{
    width:wp(67),
    justifyContent:'center',
  
},
  CommanText:{
    fontFamily:fontStyle.medium,
    alignSelf: 'center',
    fontSize: normalizeFont(20),
    color: BLUE_BAR,
    paddingVertical: hp(0.4),
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