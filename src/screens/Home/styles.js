
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
   TextWrapper:{
    marginVertical:hp(4),
    justifyContent: 'center',
        alignSelf: 'center',
 },
 TextWrapper1:{
    marginTop: hp(-1.5),
     justifyContent: 'center',
        alignSelf: 'center',
 },
   headerTextFooter2:{
    fontFamily:fontStyle.medium,
    alignSelf: 'center',
    fontSize: normalizeFont(20),
    color: BLUE_BAR,
    paddingVertical: hp(0.4),
    textAlign:'center'
},
donationText:{
    width:wp(65),
    fontSize: normalizeFont(15)
},
donationText2:{
    width:wp(65),
    fontSize: normalizeFont(11)
},
linkText:{
    fontFamily:fontStyle.medium,
    alignSelf: 'center',
    fontSize: normalizeFont(13),
    color: BLUE_BAR,
    
    paddingVertical: hp(0.4)
},
linkContainer:{
    justifyContent: 'space-between',
      marginVertical: hp(0.2),
      flexDirection: 'row',
      marginHorizontal: wp(20)

  },
headerTextFooter4:{
    // fontFamily:fontStyle.light,
    alignSelf: 'center',
    fontSize: normalizeFont(15),
    color: BLUE_BAR,
   // paddingVertical: hp(0.4),
    textAlign:'center',
    marginHorizontal: wp(2),
    marginVertical: wp(5),
    
    justifyContent:'center',
},
headerTextFooter3:{
    fontFamily:fontStyle.light,
    alignSelf: 'center',
    fontSize: normalizeFont(28),
    color: BLUE_BAR,
   // paddingVertical: hp(0.4),
    textAlign:'center'
},
   
CommanText:{
    fontFamily:fontStyle.medium,
    alignSelf: 'center',
    textAlign:'center',
    fontSize: normalizeFont(17),
    //  color:"#000080",
     color: "#091a3a",
    paddingVertical: hp(0.2),
    
},
CommanTextWrapper:{
    marginTop: hp(2.5),
    marginBottom: hp(0.2),
},

establishmentContainer:{
    justifyContent: 'center',
    marginVertical: hp(1.5),
    flexDirection: 'row',
   
  },
  establishmentWrapper:{
    height:hp(9),
    width:wp(35),
    marginHorizontal:wp(5),
    backgroundColor:BLUE_BAR,
    justifyContent: 'center',
    alignSelf: 'center',
   },
   establishmentText:{
    fontFamily:fontStyle.medium,
      alignSelf: 'center',
      fontSize: normalizeFont(20),
      color: WHITE,
      textAlign:"center",
      paddingVertical: hp(0.4),
      width:wp(35)
  },  


textWrapper:{
    marginHorizontal: wp(4),
   
   
},

}