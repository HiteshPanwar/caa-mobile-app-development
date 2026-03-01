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
       marginTop: hp(15),
   },

iconStyle:{
  alignSelf:"center",
  marginVertical:hp(5)
},

   settingsContainer:{
    borderBottomWidth:2,
    width:wp(80),
    //alignItems:"center",
    marginLeft:wp(12)
   },


   settingsText:{
    alignSelf: 'center',
    fontSize: normalizeFont(28),
    color: DARKBLUE,
   },

   buttonText:{
    fontFamily:fontStyle.light,
    alignSelf: 'center',
    fontSize: normalizeFont(15),
    color: WHITE,
    paddingVertical: hp(0.4),
},

buttonWrapper:{
  height:hp(8),
  width:wp(50),
  justifyContent: 'center',
  alignSelf: 'center',
  
 },
  CommanText:{
    fontFamily:fontStyle.medium,
    alignSelf: 'center',
    fontSize: normalizeFont(20),
    color: BLUE_BAR,
    paddingVertical: hp(0.9),
    justifyContent:"center",
    
    
},




}
