
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

   buttonWrapper:{
    height:hp(7),
    width:wp(80),
    justifyContent: 'center',
    alignSelf: 'center',
    
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

textContainer:{
    borderWidth: wp(0.5),
    marginHorizontal: wp(4),
    marginVertical: hp(1),
    height : Platform.OS === 'ios' ? hp('54%') :hp('59%') 
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