import React ,{ useState, useEffect }from "react"
import {
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import { StyleSheet,Alert} from "react-native";
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppImage, AppView, AppText, Touchable, AppbackgraoundImage } from "@Component/Atoms/index"
import { useSelector } from 'react-redux';
import { logo, phoneIcon, downIcon ,AppLogo } from "@Assets/Icon"
import { CustomLogOutModal } from '@Component/molecules/index';
import AsyncStorage from "@react-native-community/async-storage"


export function DrawerContent(props) {

    const state = useSelector(state => state).reducer
    const { TERMS_CONDITIONS, PRIVACY_POLICY,CONTACT_US,CHECK_ESTABLISHMENT,REPORT_ESTABLISHMENT ,HotSpots ,FEEDBACK} = state.language.COMMON_TEXT
    const { GUEST_REPORT, EMPLOYER_REPORT,EMPLOYEE_REPORT,MY_LOCATIONS,MY_COVID,CORRECT_AN_ERROR,ABOUT_US,FAQS,COVID_SERVICES,SETTINGS } = state.language.Drawer

    let [toggleEstab, setToggleEstab] = useState(false);
    let [isModalVisible,setModalVisible] = useState(false)

   const alertModal =(body,title)=>{
    Alert.alert(
        title,
        body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
   }

    return(
        <AppView style={{flex:1}}>
        <DrawerContentScrollView {...props}>
       
          <AppView style={{ justifyContent: 'center', width:wp(66) ,height: hp(18),marginHorizontal: wp(4) ,borderBottomWidth: 1}}>
              <AppImage source={AppLogo}
              resizeMode ="contain"
            //    style={{width:wp(20) ,height: hp(30), }} 
            style={{alignSelf: 'center' ,height: hp(15),}} 
                 ></AppImage>
          </AppView>
          
        <Touchable  onPress={()=>props.navigation.navigate("Home")}>
          <AppView style={{marginHorizontal: wp(4),borderBottomWidth: 1,paddingVertical:hp(2),}}>
              <AppText style={{ color:'black',fontSize: normalizeFont(15)}}>{"Welcome"}</AppText>
          </AppView>
          </Touchable>
          <Touchable onPress={()=>props.navigation.navigate("EstablishmentMap")}>
          <AppView style={{marginHorizontal: wp(4),borderBottomWidth: 1,paddingVertical:hp(2),}}>
              <AppText style={{ color:'black',fontSize: normalizeFont(15)}}>{CHECK_ESTABLISHMENT}</AppText>
          </AppView>
          </Touchable>
          {/* <Touchable onPress={()=>props.navigation.navigate("EstablishmentMap")}>
          <AppView style={{marginHorizontal: wp(4),borderBottomWidth: 1,paddingVertical:hp(2),}}>
              <AppText style={{ color:'black',fontSize: normalizeFont(15)}}>Report COVID Safe(r) / Unsafe </AppText>
          </AppView>
          </Touchable> */}
          

          <Touchable onPress={()=>props.navigation.navigate("Hotspots")}>
          <AppView style={styles.textWrapper}>
         <AppText style={styles.textStyle}>{HotSpots}</AppText>
          </AppView>
          </Touchable>

          <Touchable onPress={()=>props.navigation.navigate("MyCAAActivity")}>
          <AppView style={styles.textWrapper}>
         <AppText style={styles.textStyle}>{"MyCAAActivity"}</AppText>
          </AppView>
          </Touchable>
          
          <Touchable onPress={()=>setToggleEstab(!toggleEstab)}>
          <AppView style={{marginHorizontal: wp(4),borderBottomWidth: 1,flexDirection: 'row',justifyContent: 'space-between',paddingVertical:hp(1.5),}}>
              
              <AppText style={{ color:'black',fontSize: normalizeFont(15),alignSelf: 'center',}}>Settings</AppText>
              <AppText style={{ color:'black',fontWeight:'bold',fontSize: normalizeFont(24),alignSelf: 'center',}}>{">"}</AppText>
          </AppView>
          </Touchable>

         { toggleEstab? <AppView>
          {/* <Touchable onPress={() =>props.navigation.navigate("Browser",{Link:"https://www.covidactionalert.com/terms-and-conditions.html"})}> */}
          <Touchable onPress={()=>props.navigation.navigate("TermsCondition")}>
          <AppView style={{marginHorizontal: wp(4),borderBottomWidth: 1,paddingVertical:hp(2),}}>
         <AppText style={{ color:'black',fontSize: normalizeFont(15), marginLeft:wp(3) ,alignSelf: 'flex-start'}}>{TERMS_CONDITIONS}</AppText>
          </AppView>
          </Touchable>
          {/* <Touchable onPress={()=>props.navigation.navigate("Browser",{Link:"https://www.covidactionalert.com/privacy-policy.html"})}> */}
          <Touchable onPress={()=>props.navigation.navigate("PrivacyPolicy")}>
          <AppView style={styles.textWrapper}>
         <AppText style={{ color:'black',fontSize: normalizeFont(15) ,marginLeft:wp(3) , alignSelf: 'flex-start'}}>{PRIVACY_POLICY}</AppText>
          </AppView>
          </Touchable>
          {/* <Touchable onPress={()=>props.navigation.navigate("Browser",{Link:"https://www.covidactionalert.com/about.html"})}> */}
          <Touchable onPress={()=>props.navigation.navigate("AboutUs")}>
          <AppView style={styles.textWrapper}>
         <AppText style={{ color:'black',fontSize: normalizeFont(15),marginLeft:wp(3) ,alignSelf: 'flex-start'}}>{ABOUT_US}</AppText>
          </AppView>
          </Touchable>
         
          <Touchable onPress={()=>props.navigation.navigate("ContactUs")}>
          <AppView style={styles.textWrapper}>
         <AppText style={{ color:'black',fontSize: normalizeFont(15),marginLeft:wp(3) ,alignSelf: 'flex-start'}}>{CONTACT_US}</AppText>
          </AppView>
          </Touchable>
          <Touchable onPress={()=>props.navigation.navigate("Feedback")}>
          <AppView style={styles.textWrapper}>
         <AppText style={{ color:'black',fontSize: normalizeFont(15),marginLeft:wp(3) ,alignSelf: 'flex-start'}}>{FEEDBACK}</AppText>
          </AppView>
          </Touchable>
          </AppView>:null}
          
          <Touchable onPress={()=>setModalVisible(true)}>
          <AppView style={styles.textWrapper}>
         <AppText style={styles.textStyle}>{"Log Out"}</AppText>
          </AppView>
          </Touchable>
          <CustomLogOutModal
                       isModalVisible={isModalVisible}
                       onPressYes={()=>{
                        setModalVisible(false)  
                        AsyncStorage.removeItem("Token")
                        props.navigation.navigate("Login")
                    }}
                       onPressNo={()=>setModalVisible(false)}
                       />
      
        </DrawerContentScrollView>
        </AppView>
    );
}




  const styles = StyleSheet.create({
    textWrapper:{
        marginHorizontal: wp(4),
        borderBottomWidth: 1,
        paddingVertical:hp(2),
    },
    textStyle:{
        color:'black',
        fontSize: normalizeFont(15)
    }
})
