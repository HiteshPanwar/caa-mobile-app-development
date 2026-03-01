import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
import { RED_BG_THEME,WHITE,FOOTER_BG,Error_Red,Border_GREY,BUTTON_THEME } from '@GlobalStyles/colors';
import {fontStyle} from '@Assets/commonFont/commonFont'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window');

export default styles = {
    //************* Header *****************************
    headerContainer: {
        height: hp(14),
        width:  wp(100),
        backgroundColor: RED_BG_THEME,
        // borderWidth:2,
        
    },
    headerIconWrapper:{
      flexDirection: 'row',
      paddingHorizontal: wp(5),
      marginTop:hp(.6),
      justifyContent:"space-between",
      paddingVertical: hp(0.6),
    //   borderWidth:1,
    },
    titleWrapper:{
        paddingVertical: hp(0.4),
        backgroundColor: RED_BG_THEME,
        justifyContent: 'center',
        // borderWidth:1,
        flexDirection: 'row',
        
    },
    headerText:{
        fontFamily:fontStyle.light,
        alignSelf: 'center',
        fontSize: normalizeFont(30),
        color: WHITE,
        paddingVertical: hp(0.4),
    },
    headerTextSubScript:{
        fontFamily:fontStyle.light,
        alignSelf: 'flex-end',
        fontSize: normalizeFont(16),
        color: WHITE
    },
        //********************Box Style **************************/

    defaultStyle:{
        height:hp(5),
        width:wp(10),
        // backgroundColor:"red"
    },

    //********************TextInput Style **************************/

    Inputcontainer: {
        marginVertical:hp(0.5)
    },

    inputLayout: {
            width: wp(65),
            alignSelf: "center",
            height: hp(7),
            borderWidth: 0.5,
            borderColor: Border_GREY,
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: WHITE
        },
        inputLayout2: {
            width: wp(86),
            alignSelf: "center",
            height: hp(7),
            borderWidth: 0.5,
            borderColor: Border_GREY,
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: WHITE
        },

       
        textInput: {
            height: hp(7),
            width: wp(80),
            padding: scaleHeight(10),
        },
        ErrorLayout: {
            width: wp(77),
            height: hp(3),
            
        },
        Errortextstyle: {
            fontSize: normalizeFont(13),
            fontFamily: fontStyle.medium,
            color: Error_Red
    
        },

    
//********************Button Style *****************************/


        ButtonLayout: {
            width: wp("42%"),
            height: hp("7%"),
            backgroundColor: BUTTON_THEME,
            borderRadius: 2,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: 'center'
        },

        defaulttext:{
        color:WHITE,
        fontSize: normalizeFont(18),
        fontFamily:fontStyle.medium,
        },


//**********************************LOG OUT MODAL ***************************** */
logOutContainer:{
     alignSelf: 'center', 
     height: hp(25), 
     width: wp(80), 
     backgroundColor: 'white', 
     borderWidth: 1 
},
logOutWrapper:{ 
    flexDirection: 'column', 
    flex: 1, 
    justifyContent: 'space-around', 
},
logoutMessage:{ 
    color: 'black', 
    alignSelf: 'center',
    marginHorizontal: wp(2)
},
buttonYesNoStyle:
{   borderWidth: 1,
    paddingHorizontal: wp(8),
    paddingVertical: hp(0.5),
    borderRadius: 8,
},
//********************Submit Style *****************************/
        viewStyle:{
            width: wp("35%"),
            height: hp(4.5),
            backgroundColor: BUTTON_THEME,
            borderRadius: 1,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: 'center'
        },
        SubmitLayout:{
            width: wp("34%"),
            height: hp(4),
            borderWidth:1,
            borderColor:WHITE
        },

//********************Footer Style */

footerParentContainer:{
    backgroundColor: FOOTER_BG,
    width:wp(100),
    height:hp(14.5),
    alignSelf: 'center',
    justifyContent: 'center',

},

footerChildContainer:{
    // backgroundColor: FOOTER_BG,
    width:wp(99),
    height:hp(14),
    borderWidth: wp(0.4),
    borderColor: WHITE,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(1.5),

},
headerTextFooter1:{
    fontFamily:fontStyle.medium,
    alignSelf: 'center',
    fontSize: normalizeFont(17),
    color: WHITE,
    paddingVertical: hp(0.4),
},
headerTextFooter2:{
    fontFamily:fontStyle.medium,
    alignSelf: 'center',
    fontSize: normalizeFont(15),
    color: WHITE,
   // paddingVertical: hp(0.4),
    textAlign:'center'
},
TextWrapper:{
    
    justifyContent: 'center',
        alignSelf: 'center',
        

},
ContactDetailsWrapper:{
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems:'center',
    marginHorizontal: wp(1),
    
},
contactUsText:{
    color: WHITE,
    fontFamily:fontStyle.medium,
        alignSelf: 'center',
        fontSize: normalizeFont(17),
        paddingHorizontal: wp(1.8),
    
        
}





    
}
