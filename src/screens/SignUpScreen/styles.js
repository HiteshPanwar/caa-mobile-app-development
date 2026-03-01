import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { DARKBLUE,WHITE,Border_GREY} from '@GlobalStyles/colors';

import { normalizeFont, scale, scaleHeight } from '../../styles/responsive';
import {fontStyle} from '@Assets/commonFont/commonFont'
export default styles = {

container:{
    flex:1,
    backgroundColor:WHITE,
},
logostyle:{
    alignSelf:"center",
    marginVertical:hp("8%")
},

textStyle:{
    color:DARKBLUE,
    fontFamily:fontStyle.medium,
    marginLeft:wp(6),
},
inputImagestyle: {
    paddingLeft: scaleHeight(10),
},

InputView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent:"space-evenly"
},
textField:{
    width: wp(20),
  marginLeft:wp(8),
    height: hp(7),
    borderWidth: 0.5,
    borderColor: Border_GREY,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent:"space-around",
    alignItems: "center",
    backgroundColor: WHITE
},

countryInputStyle:{
    color: DARKBLUE,
},
PlaceHolderTextstyle: {
    fontSize: normalizeFont(16),
     fontFamily:fontStyle.light,
    color: DARKBLUE,
    fontWeight: "bold",
},
agreeContainer:{
flexDirection:"row",
marginLeft:wp(4),
justifyContent:'center',
marginTop:hp(2),
paddingBottom:hp(20)


},
agreeText:{
color:DARKBLUE,
fontSize: normalizeFont(17),
alignSelf:"center",
textDecorationLine:"underline"
},

andStyle:{
    color:DARKBLUE,
    fontSize: normalizeFont(15),
    alignSelf:"center",
    marginLeft:wp(2)
},
SubmitTextstyle: {
    fontSize: normalizeFont(20),
    fontFamily:fontStyle.medium,
    color: WHITE,

},

}