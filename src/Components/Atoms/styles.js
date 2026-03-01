import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
 import {  DARKBLUE,WHITE } from '@GlobalStyles/colors'
 import {fontStyle} from '@Assets/commonFont/commonFont'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window');

export default styles = {
    defaultText: {
        fontSize: normalizeFont(22),
        color: WHITE,
        fontFamily:fontStyle.medium,
    
    },
   
}
