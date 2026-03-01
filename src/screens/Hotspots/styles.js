
import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
import { RED_BG_THEME,WHITE,FOOTER_BG, BLACK,BLUE_BAR } from '@GlobalStyles/colors';
import {fontStyle} from '@Assets/commonFont/commonFont'
import {GREY_INPUT_BORDER,GREY_TEXT} from './color'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window');

export default styles = {
 
MapView:{
    
        // marginVertical: hp(20),
        
         width:wp(100),
         height:hp(69),
        //  height:Platform.OS ==="ios" ?hp(60) : hp(63),
        //  backgroundColor:"red"
  
  },
  alertStatusContainer:{
    flexDirection: 'row',
    borderWidth: wp(0.8),
    borderColor: GREY_INPUT_BORDER,
    justifyContent: 'center',
    
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
}