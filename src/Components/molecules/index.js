import React, { useState, useEffect } from 'react';
import { FlatList, Modal } from "react-native"
import { AppView, Touchable, AppText, AppImage, AppModal, TouchableIn } from "../Atoms/index";
import style from './styles'
import { HeaderIcon, SettingIcon, footerMailIcon, footerMobileIcon, UnTick, Tick, Home } from "@Assets/Icon";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput, TouchableOpacity, Image } from "react-native";
import { useSelector } from 'react-redux';
import ApiRequest from '../../RestAPI/rest'
import { useNavigation } from '@react-navigation/native';
import { RED_BG_THEME,WHITE,FOOTER_BG,Error_Red,Border_GREY,BUTTON_THEME } from '@GlobalStyles/colors';
import firebase from '../../firebase/firebase';
var database = firebase.database(); 

const Header = (props) => {
    const state = useSelector(state => state).reducer
    const navigation = useNavigation();
    const { HEADER_TEXT, HEADER_SUBSCRIPT_TEXT } = state.language.Header

    return (
        <AppView style={[style.headerContainer, props.style]}>
            <AppView style={[style.headerIconWrapper,]}>
                <Touchable onPress={() => navigation.openDrawer()} >
                    <AppImage source={HeaderIcon} style={{ width: wp(10), height: hp(5) }} />
                </Touchable>
                <Touchable onPress={() => { navigation.navigate('EstablishmentMap') }} >
                    <AppImage source={Home} style={{ width: wp(8), height: hp(5) }} />
                </Touchable>
                
            </AppView>
            <AppView style={[style.titleWrapper]}>
                <AppText style={[style.headerText]}>
                    {HEADER_TEXT}
                </AppText>
                <AppText style={[style.headerTextSubScript]}>
                    {HEADER_SUBSCRIPT_TEXT}
                </AppText>
            </AppView>
        </AppView>
    )
}



const BoxIcon = (props) => (
    <TouchableOpacity onPress={props.onPress} style={[style.defaultStyle, props.style]} >
        <Image
            resizeMode="contain" source={props.state ? Tick : UnTick} style={[style.defaultStyle, props.imagestyle]} {...props}
        ></Image>
    </TouchableOpacity>
)


const Input = (props) => {
    return (
        <AppView style={style.Inputcontainer}>
            <AppView
                style={[style.inputLayout, props.style]}>
                <AppImage style={props.style} source={props.image} />
                <TextInput
                    {...props}
                    style={[style.textInput, props.textInputStyle]}
                    placeholder={props.placeholder}
                    secureTextEntry={props.secure || false}
                    editable={props.editable}
                    placeholderTextColor={props.placeholderTextColor}
                    placeholderStyle={props.placeholderStyle}
                    keyboardType={props.keyboardType}
                />
                <Touchable onPress={props.onPress} >
                    <AppImage style={props.eyestyle} source={props.eyeimage} />
                </Touchable>
            </AppView>
            <AppView style={[style.ErrorLayout, props.Errorstyle]}>
                <AppText style={style.Errortextstyle}>
                    {props.errortext}
                </AppText>
            </AppView>
        </AppView>
    )
}

const SimpleLargeInput = (props) => {
    return (
        <AppView style={style.Inputcontainer}>
            <AppView
                style={[style.inputLayout2, props.style]}>
                <TextInput
                    {...props}

                    style={[style.textInput, props.textInputStyle]}
                    placeholder={props.placeholder}
              
                    editable={props.editable}
                    placeholderTextColor={props.placeholderTextColor}
                    placeholderStyle={props.placeholderStyle}
                    keyboardType={props.keyboardType}
                />
                <Touchable onPress={props.onPress} >
                    <AppImage style={props.eyestyle} source={props.eyeimage} />
                </Touchable>
            </AppView>
            <AppView style={[style.ErrorLayout, props.Errorstyle]}>
                <AppText style={style.Errortextstyle}>
                    {props.errortext}
                </AppText>
            </AppView>
        </AppView>
    )
}


const CustomButton = (props) => {
    return (

        <Touchable
            onPress={props.onPress}
            style={[style.ButtonLayout, props.style]}>
            <AppText style={[style.defaulttext, props.textstyle]}>{props.buttonText}</AppText>
        </Touchable>
    )
}
const SubmitButton = (props) => {
    return (
        <AppView style={[style.viewStyle, props.viewStyle]}>
            <Touchable
                onPress={props.onPress}
                style={[style.SubmitLayout, props.style]}>
                <AppText style={[style.defaulttext, props.textstyle]}>{props.buttonText}</AppText>
            </Touchable>
        </AppView>
    )
}
const CustomLogOutModal = (props) => {
    const state = useSelector(state => state).reducer
    const { LOGOUT, LOGOUT_MESSAGE, YES, NO } = state.language.LogOut
    return (

        <Modal
            transparent={true}
            visible={props.isModalVisible}
            // onRequestClose={props.onRequestClose}
            {...props}
        >
            <AppView style={{ flex: 1, justifyContent: 'center' }}>
                <AppView style={style.logOutContainer}>
                    <AppView style={style.logOutWrapper}>
                        <AppText style={{ color: 'black', alignSelf: 'center', }}>
                            {LOGOUT}
                        </AppText>
                        <AppText style={style.logoutMessage}>
                            {LOGOUT_MESSAGE}
                        </AppText>
                        <AppView style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                            <Touchable onPress={props.onPressNo} style={style.buttonYesNoStyle}>
                                <AppText style={{ color: 'black', alignSelf: 'center', }}>
                                    {NO}
                                </AppText>
                            </Touchable>
                            <Touchable onPress={props.onPressYes} style={style.buttonYesNoStyle}>
                                <AppText style={{ color: 'black', alignSelf: 'center', }}>
                                    {YES}
                                </AppText>
                            </Touchable>
                        </AppView>
                    </AppView>
                </AppView>
            </AppView>
        </Modal>
    )
}
const CustomModal = (props) => {
    const state = useSelector(state => state).reducer
    const { LOGOUT, LOGOUT_MESSAGE, YES, NO } = state.language.LogOut
    return (

        <Modal
            transparent={true}
            visible={props.isModalVisible}
            // onRequestClose={props.onRequestClose}
            {...props}
        >
            <AppView style={{ flex: 1, justifyContent: 'center' }}>
                <AppView style={style.logOutContainer}>
                    <AppView style={style.logOutWrapper}>
                        {/* <AppText style={{ color: 'black', alignSelf: 'center', }}>
                           {"Alert"}
                       </AppText> */}
                        <AppText style={[style.logoutMessage, { textAlign: 'center' }]}>
                            {props.text}
                        </AppText>
                        <AppView style={{ alignSelf: "center" }}>
                            <Touchable onPress={props.onPress} style={style.buttonYesNoStyle}>
                                <AppText style={{ color: 'black', alignSelf: 'center', }}>
                                    {"OK"}
                                </AppText>
                            </Touchable>
                        </AppView>
                    </AppView>
                </AppView>
            </AppView>
        </Modal>
    )
}

const Footer = (props) => {

    useEffect(() => {
        staticContactUsApi()
    }, [])

    const [email, setemail] = useState("")
    const [phoneNo, setphoneNo] = useState("")
    const [content, setcontent] = useState("")

    const staticContactUsApi = () => { 
        var databaseRef = database.ref("contactus");
        databaseRef.on('value',(snapshot)=> {
             console.log("contactus",snapshot.val()) 
            setemail(snapshot.val().email)
            setcontent(snapshot.val().address)
            setphoneNo(snapshot.val().phoneno)
        })
      
    }
    const state = useSelector(state => state).reducer
    const { CONTACT_US, IF_YOU_NEED_TEXT, MOBILE_NUMBER, EMAIL_ID } = state.language.Footer
    if(props.footer_type=="1"){
        return (
            <AppView  
            // onPress={props.onPressEmail} 
             style={[{ width: wp(100), height: hp(15), justifyContent: 'center', }, props.style]}>
                <AppView style={[style.footerParentContainer,]}>
                    <AppView style={[style.footerChildContainer]}>
                        <AppView style={[style.TextWrapper]}>
                            <AppText style={[style.headerTextFooter1]}>
                                {CONTACT_US}
                            </AppText>
                            <AppText style={[style.headerTextFooter2]}>
                                {content}
                            </AppText>
                        </AppView>
                        <AppView style={[style.ContactDetailsWrapper,]}>
                            <AppView style={[{ flexDirection: 'row', },]}>
                                <AppImage source={footerMailIcon} style={{ width: wp(7), height: hp(4) }} />
                                <AppText style={[style.contactUsText,]}>
                                    {email}
                                </AppText>
                            </AppView>
                            <AppView style={[{ flexDirection: 'row', },]}>
                                <AppImage source={footerMobileIcon} style={{ width: wp(7), height: hp(4) }} />
                                <AppText style={[style.contactUsText,]}>
                                    {phoneNo}
                                </AppText>
                            </AppView>
                        </AppView>
                    </AppView>
                </AppView>
                </AppView>
        )
    }
    else if(content.length !== 0){
        return (
            <AppView style={[{ width: wp(100), height: hp(7), justifyContent: 'center', }, props.style]}>
                <AppView style={[style.footerParentContainer,{backgroundColor: RED_BG_THEME,height:hp(7)}]}>
                    <AppView style={[style.footerChildContainer,{height:hp(6.5)}]}>
                        <AppView style={[style.TextWrapper]}>
                            <AppText style={[style.headerTextFooter2]}>
                                {content}
                            </AppText>
                        </AppView>
                    </AppView>
                </AppView>
            </AppView>
        )
    }
    else{
        return(
            <AppView />
        )
    }
     
   
    
    
}


export {SimpleLargeInput,
    Header,
    Footer,
    Input,
    CustomButton,
    BoxIcon,
    CustomLogOutModal,
    CustomModal,
    SubmitButton,
}