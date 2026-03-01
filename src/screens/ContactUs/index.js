import React, { Component } from 'react';
import { TextInput,Alert} from "react-native"
import {  AppView, AppText,  AppbackgraoundImage } from "@Component/Atoms/index"
import {  ScrollView } from 'react-native';
import { normalizeFont, } from '@GlobalStyles/responsive';
import { Header, Footer, BoxIcon, SubmitButton,CustomModal } from '@Component/molecules/index';
import styles from './style'
import { DefaultState } from "./constant"
import { handleValidations } from "./function";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { blueBarIconWhiteBorder, } from '@Assets/Icon'
import { connect, } from 'react-redux';
import ApiRequest from '../../RestAPI/rest'
import { Container } from '@Component/containers/index'
import { DARKBLUE } from '@GlobalStyles/colors';
import {Loader}  from "../../Components/loader" 

import firebase from '../../firebase/firebase';
var database = firebase.database()


class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            footerVisibleToggle:true,
            status:false,
            successModalVisible: false,
            isLoading:false,
            DefaultState,
            boxStatus1: false,
            boxStatus2: false,
            boxStatus3: false,
            boxStatus4: false,
        };
    }
    handlevalidate = (text, type) => {
        let status = `${type}Status`;
        let errorText = `${type}Error`;
        let resp = handleValidations(text, type)

        this.setState({
            [type]: resp.value,
            [errorText]: resp.errorText,
            [status]: resp.status,
        })

    }
    ContactUsApi(){
          
           let ContactUsDetails =
           { 
            "choice_type": this.state.choicetype,
            "content": this.state.content,
            "first_name": this.state.firstname ,
            "last_name":  this.state.lastname,
            "email":  this.state.email,
            "mobile_no":  this.state.mobileNo
          } 
          var newPostKey = database.ref().child('Contactuspost').push().key;
          var databaseRef = database.ref("Contactuspost/"+newPostKey);
          databaseRef.set({
              data:ContactUsDetails,
              time:Date.now()
          }) 
          setTimeout(() => {
                           this.setState({successModalVisible:true})
                      }, 200);
        
          }
 Submit(){
    const{CHECKBOX_ERROR,CONTENT_ERROR,FIRSTNAME_ERROR,LASTNAME_ERROR,EMAIL_ERROR,MOBILENO_ERROR}=this.props.ErrorText

    if(this.state.choicetypeStatus){
        if(this.state.contentStatus){
            if(this.state.firstnameStatus){
                if(this.state.lastnameStatus){
                    if(this.state.emailStatus){
                        if(this.state.mobileNoStatus){
                            this.ContactUsApi()   
                        }
                        else{this.setState({mobilNoError:MOBILENO_ERROR,mobileNoStatus:false})}
                    }
                    else{this.setState({emailError:EMAIL_ERROR,emailStatus:false})}
                }
                else{this.setState({lastnameError:LASTNAME_ERROR,lastnameStatus:false})}
            }
            else{this.setState({firstnameError:FIRSTNAME_ERROR,firstnameStatus:false})}
        }
        else{this.setState({contentError:CONTENT_ERROR,contentStatus:false})}
    }
    else{this.setState({choicetypeError:CHECKBOX_ERROR,choicetypeStatus:false})}

 }

   toggle1(text,status){
    // console.warn("toggle==>>",text,status)
    this.setState({boxStatus1:!status,boxStatus2:false,boxStatus3:false,boxStatus4:false})
     this.setState({choicetype:text})
     if(this.state.boxStatus1 === false){
        this.setState({choicetypeStatus:true})
        this.setState({choicetypeError:""})

     }else
     {     
        this.setState({choicetypeStatus:false})
       
     }

}
toggle2(text,status){
    // console.warn("toggle==>>",text,status)
    this.setState({boxStatus2:!status,boxStatus1:false,boxStatus3:false,boxStatus4:false})
    this.setState({choicetype:text})
     if(this.state.boxStatus2 === false){
        this.setState({choicetypeStatus:true})
        this.setState({choicetypeError:""})

     }else
     {     
        this.setState({choicetypeStatus:false})
     
     }

}
toggle3(text,status){
    // console.warn("toggle==>>",text,status)
    this.setState({boxStatus3:!status,boxStatus1:false,boxStatus2:false,boxStatus4:false})
    this.setState({choicetype:text})
     if(this.state.boxStatus3 === false){
        this.setState({choicetypeStatus:true})
        this.setState({choicetypeError:""})

     }else
     {     
        this.setState({choicetypeStatus:false})
      
     }

}
toggle4(text,status){
    // console.warn("toggle==>>",text,status)
    this.setState({boxStatus4:!status,boxStatus1:false,boxStatus2:false,boxStatus3:false})
    this.setState({choicetype:text})
     if(this.state.boxStatus4 === false){
        this.setState({choicetypeStatus:true})
        this.setState({choicetypeError:""})

     }else
     {     
        this.setState({choicetypeStatus:false})
       
     }

}
    render() {
        const { CONTACT_US, WE_DO_NOT,Submit } = this.props.CommanText
        const {  FIRST_NAME, LAST_NAME, EMAIL, MOBILE } = this.props.MyProfile
        const { INDICATE_HERE,
            ADVERTISE,
            PROVIDE_COVID_SERVICES,
            QUESTIONS,
            PROVIDE_FEEDBACK,
            PLEASE_PROVIDE_YOUR_CONTACT_INFORMATION } = this.props.ContactUs
        return (

            <AppView style={{ flex: 1 }}>
                <Header />
                <Loader
                    visible={this.state.isLoading}
                />
                <Container style={{marginBottom:this.state.footerVisibleToggle?hp(28.75):null , height: hp(76), }}>
                    <AppView style={styles.buttonContainer}>
                        <AppbackgraoundImage source={blueBarIconWhiteBorder} resizeMode="contain" style={styles.buttonWrapper}>
                            <AppText style={styles.buttonText}>
                                {CONTACT_US}
                            </AppText>
                        </AppbackgraoundImage>
                    </AppView>
                        <AppView style={{ flexDirection: "row", justifyContent: "space-around" }}  >
                            <AppText style={[styles.defaultText, { marginTop: hp(6), }]}>
                                {ADVERTISE}
                            </AppText>
                            <AppText style={[styles.defaultText,{width:wp(17)}]}>
                                {PROVIDE_COVID_SERVICES}
                            </AppText>
                            <AppText style={[styles.defaultText, { marginTop: hp(6) }]}>
                                {QUESTIONS}
                            </AppText>
                            <AppText style={[styles.defaultText, { marginTop: hp(3),width:wp(18) }]}>
                                {PROVIDE_FEEDBACK}
                            </AppText>
                        </AppView>
                        <AppView style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <BoxIcon
                                onPress={() => this.toggle1("Advertise",this.state.boxStatus1)}
                                state={this.state.boxStatus1}
                            />
                            <AppView>
                                <BoxIcon
                                    onPress={() => this.toggle2("Provide covid service",this.state.boxStatus2)}
                                    state={this.state.boxStatus2}
                                />
                            </AppView>
                            <AppView >
                                <BoxIcon
                                       onPress={() => this.toggle3("Questions",this.state.boxStatus3)}
                                    state={this.state.boxStatus3}
                                />
                            </AppView>
                            <AppView >
                                <BoxIcon
                                    onPress={() => this.toggle4("Provide feedback",this.state.boxStatus4)}
                                    state={this.state.boxStatus4}
                                />
                            </AppView>
                        </AppView>
                   <AppText style={[styles.ErrorText,{marginLeft:wp(5)}]}>
                       {this.state.choicetypeError}
                   </AppText>
                    <AppView style={styles.textContainer}>
                        <AppView style={styles.textWrapper}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <TextInput style={styles.IndicateText}
                                  onFocus={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                                  onBlur={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                                    placeholder={INDICATE_HERE}
                                    onChangeText={(text) => this.handlevalidate(text, "content")}
                                    value={this.state.content}
                                    multiline >
                                </TextInput>
                            </ScrollView>
                        </AppView>
                    </AppView>
                    <AppText style={[styles.ErrorText,{alignSelf: 'center',fontSize: normalizeFont(15)}]}>
                       {this.state.contentError}
                   </AppText>
                    <AppText style={styles.textStyle}>
                        {PLEASE_PROVIDE_YOUR_CONTACT_INFORMATION}
                    </AppText>
                    <AppView style={{ flexDirection: "row",marginVertical:hp(1) }}>
                        <AppView style={styles.InputView} >
                            <TextInput
                              onFocus={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                                 onBlur={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                                style={styles.inputStyle}
                                placeholderTextColor={DARKBLUE}
                                placeholder={FIRST_NAME}
                                value={this.state.firstname}
                                onChangeText={(text) => this.handlevalidate(text, "firstname")} />
                                   <AppText style={[styles.ErrorText,{width:wp(50)}]}>
                       {this.state.firstnameError}
                   </AppText>
                        </AppView>
                     
                        <AppView style={styles.InputView} >
                            <TextInput
                                style={styles.inputStyle}
                                onFocus={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                                 onBlur={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                                placeholderTextColor={DARKBLUE}
                                placeholder={LAST_NAME}
                                value={this.state.lastname}
                                onChangeText={(text) => this.handlevalidate(text, "lastname")} />
                                  <AppText style={[styles.ErrorText,{width:wp(50)}]}>
                       {this.state.lastnameError}
                   </AppText>
                        </AppView>
                      
                    </AppView>
                    <AppView style={{ flexDirection: "row",marginTop:hp(2.5) }}>
                        <AppView style={styles.InputView} >
                            <TextInput
                              onFocus={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                                 onBlur={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                                style={styles.inputStyle}
                                placeholderTextColor={DARKBLUE}
                                placeholder={EMAIL}
                                value={this.state.email}
                                onChangeText={(text) => this.handlevalidate(text, "email")} />
                                   <AppText style={[styles.ErrorText,{width:wp(50)}]} >
                       {this.state.emailError}
                   </AppText>
                        </AppView>
                     
                        <AppView style={[styles.InputView,{width:wp(50), justifyContent: 'flex-start', }]} >
                            <TextInput
                              onFocus={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                                 onBlur={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                                style={[ styles.inputStyle ,{ alignSelf:"flex-start",width:wp(50) } ]}
                                placeholderTextColor={DARKBLUE}
                                placeholder={MOBILE}
                                keyboardType={"numeric"}
                                value={this.state.mobileNo}
                                onChangeText={(text) => this.handlevalidate(text, "mobileNo")} />
                                 <AppText style={[styles.ErrorText,{width:wp(50)}]} >
                       {this.state.mobileNoError}
                   </AppText>
                        </AppView>
                       
                    </AppView>
                    <AppView style={{marginVertical:hp(3)}}>
                    <AppView style={{}}>
                    <SubmitButton
                        onPress={() => this.Submit()}
                        textstyle={styles.SubmitTextstyle}
                        buttonText={Submit}
                    />
                    </AppView> 
                </AppView> 
               
                    <AppView style={styles.CommanText}>
                        <AppText style={styles.CommanText}>
                            {WE_DO_NOT}
                        </AppText>
                    </AppView> 
                    { this.state.footerVisibleToggle ? null : 
                <AppView style={{ width:wp(30) ,height:hp(20)}}  /> }

                <CustomModal
            isModalVisible={this.state.successModalVisible}
            onPress={() => this.props.navigation.navigate("Home", this.setState({ successModalVisible: !this.state.successModalVisible }))}
            text={"Feedback sent sucessfully"}
          />
                </Container>

                {this.state.footerVisibleToggle?<Footer style={{ position: 'absolute', bottom: 0 }}  />:null}
            </AppView>

        );
    }
}
const mapStateToProps = state => {
    return {
        ContactUs: state.reducer.language.ContactUs,
        CommanText: state.reducer.language.COMMON_TEXT,
        MyProfile: state.reducer.language.MyProfile,
        Submit: state.reducer.language.Submit,
        token:state.AuthReducer.Token,
        ErrorText:state.reducer.language.ErrorText

    }
}

export default connect(mapStateToProps)(ContactUs);