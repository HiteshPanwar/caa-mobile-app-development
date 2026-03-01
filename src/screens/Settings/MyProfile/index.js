import React, { Component } from 'react';
import { AppImage, AppView, AppText ,Touchable,AppbackgraoundImage,AppInput } from "@Component/Atoms/index"
import {  Alert } from 'react-native'
import { Header, Footer ,SubmitButton,CustomModal} from '@Component/molecules/index';
import styles from './styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {blueBarIconWhiteBorder,lighBlueBarNoBorder,darkBlueBarNoBorder} from '@Assets/Icon'
import { WHITE } from '@GlobalStyles/colors';
import ApiRequest from '../../../RestAPI/rest'
import DefaultState   from "./constant"
import { handleValidations } from "./function";
import { connect, } from 'react-redux';
import { Container } from '@Component/containers/index'
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
import { Loader } from '../../../Components/loader';
class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          DefaultState,
            footerVisibleToggle:true,
            ModalVisible:false
          
        };
    }

   componentDidMount(){
      
      //  this.getProfileApi()
   }

    getProfileApi(){
      this.setState({ isLoading: true })
       ApiRequest( "", "user-app/edit-profile", "GET",this.props.token)
         .then(async resp => {
          console.log("getprofileresp==>",resp)
           switch (resp.status) {
             case (900): {
               this.setState({ isLoading: false })
               setTimeout(() => {
                 Alert.alert(
                   '',
                   "Please check your internet connection",
                   [
                     { text: 'OK', onPress: () => console.log('OK Pressed') },
                   ],
                   { cancelable: false },
                 );
               }, 200);
               break;
             }
             case (200): {
              this.setState({ isLoading: false })
               this.setState({firstname:resp.data.data.first_name})
               this.setState({lastname:resp.data.data.last_name})
               this.setState({email:resp.data.data.email})
               this.setState({zipcode:resp.data.data.zip_code})
               if(this.state.firstname === undefined &&
                this.state.lastname === undefined &&
                this.state.email  === undefined &&
                this.state.mobileno === undefined &&
                this.state.zipcode === undefined ){
                               this.setState({firstnameStatus:false,lastnameStatus:false,
                               emailStatus:false,mobilenoStatus:false,zipcodeStatus:false})
                }
                else{
                 this.setState({firstnameStatus:true,lastnameStatus:true,
                   emailStatus:true,mobilenoStatus:true,zipcodeStatus:true})
                }
               
               break;
             }
   
   
             default: {
              this.setState({ isLoading: false })
               setTimeout(() => {
                 Alert.alert(
                   "",
                   'Something went wrong',
                   [
                     { text: 'OK', onPress: () => console.log('OK Pressed') },
                   ],
                   { cancelable: false },
                 );
               }, 200);
   
             }
               break;
           }
   
         })
      }
 
      postProfileApi(){
        this.setState({ isLoading: true })
        let profileDetails =
        { "first_name": this.state.firstname,
        "last_name": this.state.lastname,
        "zip_code": this.state.zipcode,
        "email": this.state.email
       }
        ApiRequest( profileDetails, "user-app/edit-profile", "POST",this.props.token)
          .then(async resp => {
           console.log("postprofiledata==>",resp)
            switch (resp.status) {
              case (900): {
                this.setState({ isLoading: false })
                setTimeout(() => {
                  Alert.alert(
                    '',
                    "Please check your internet connection",
                    [
                      { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                  );
                }, 200);
                break;
              }
              case (200): {
                this.setState({isLoading:false})
                setTimeout(() => {
                  this.setState({ModalVisible:true})
                }, 200);
                
    
                break;
              }
    
    
              default: {
                this.setState({isLoading:false})
                setTimeout(() => {
                  Alert.alert(
                    "",
                    'Something went wrong',
                    [
                      { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                  );
                }, 200);
    
              }
                break;
            }
    
          })


      }

      handlevalidate = (text, type) => {
        let status = `${type}Status`;
        let errorText = `${type}Error`;
        let activeBorderColor = `active${type}BorderColor`;
        let resp = handleValidations(text, type)

        this.setState({
            [type]: resp.value,
            [errorText]: resp.errorText,
            [status]: resp.status,
            [activeBorderColor]: !resp.status
        })

    }
    Submit(){
      const{ZIPCODE_ERROR,FIRSTNAME_ERROR,LASTNAME_ERROR,EMAIL_ERROR,MOBILENO_ERROR}=this.props.ErrorText
  
    
              if(this.state.firstnameStatus){
                  if(this.state.lastnameStatus){
                      if(this.state.emailStatus){
                          // if(this.state.mobilenoStatus){
                            if(this.state.zipcodeStatus){
                            
                              this.postProfileApi()
                            }
                            else{this.setState({zipcodeError:ZIPCODE_ERROR,zipcodeStatus:false})}  
                          // }
                          // else{this.setState({mobilenoError:MOBILENO_ERROR,mobilenoStatus:false})}
                      }
                      else{this.setState({emailError:EMAIL_ERROR,emailStatus:false})}
                  }
                  else{this.setState({lastnameError:LASTNAME_ERROR,lastnameStatus:false})}
              }
              else{this.setState({firstnameError:FIRSTNAME_ERROR,firstnameStatus:false})}
          }
        
      
   
    render() {
        const {PRIVACY_POLICY,WE_DO_NOT,TERMS_CONDITIONS,CHECK_ESTABLISHMENT,REPORT_ESTABLISHMENT,Submit } = this.props.COMMON_TEXT
        const {MY_PROFILE,FIRST_NAME,LAST_NAME,EMAIL,MOBILE,MY_ZIP_CODE} = this.props.MyProfile
        return (

            <AppView style={{ flex: 1 }}>
                <Header />
                <Loader
                  visible={this.state.isLoading}
                />
                <Container style={{marginBottom:this.state.footerVisibleToggle?hp(20.75):null}}>
                        <AppView style={styles.InputContainer}>
                            
                            <AppbackgraoundImage source={blueBarIconWhiteBorder}  resizeMode="contain" style={styles.InputWrapper}>
                                
                                <AppText style={styles.buttonText}>
                                {MY_PROFILE}
                                </AppText>
                                </AppbackgraoundImage>
                       </AppView>

                       <AppView style={styles.NameInputContainer}>
                            
                            <AppView style={styles.NameInputWrapper}>
                            <AppView style={styles.NameInputChildWrapper}>
                                <AppInput 
                                 onFocus={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                                 onBlur={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                                placeholderTextColor={WHITE}
                                placeholder={FIRST_NAME}
                                value={this.state.firstname}
                                onChangeText={(text) => this.handlevalidate(text, "firstname")}
                                style={[styles.InputStyle]} />
                                  
                                 </AppView>
                            </AppView>

                                <AppView style={styles.NameInputWrapper}>
                                <AppView style={styles.NameInputChildWrapper}>
                        
                                <AppInput 
                                 onFocus={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                                 onBlur={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                                placeholderTextColor={WHITE}
                                placeholder={LAST_NAME}
                                value={this.state.lastname}
                                onChangeText={(text) => this.handlevalidate(text, "lastname")}
                                style={styles.InputStyle} />
                                
                                </AppView>
                                </AppView>
                       </AppView>
                            <AppView style={{flexDirection:"row"}}>
                            <AppText style={[styles.ErrorText,{width:wp(45),marginLeft:wp(7)}]}>
                       {this.state.firstnameError}
                       </AppText>

                       <AppText style={[styles.lastnameErrorText,{width:wp(45)}]}>
                       {this.state.lastnameError}
                   </AppText>
                            </AppView>
                       <AppView style={styles.InputContainerEmail}>
                       <AppView style={styles.NameInputWrapperEmail}>
                            <AppView style={styles.EmailInputChildWrapper}>
                            {/* <AppbackgraoundImage source={blueBarIconWhiteBorder}  resizeMode="contain" style={styles.EmailInputWrapper}> */}
                            <AppInput 
                             onFocus={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                             onBlur={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                                placeholderTextColor={WHITE}
                                placeholder={EMAIL}
                                value={this.state.email}
                                onChangeText={(text) => this.handlevalidate(text, "email")}
                                style={[styles.InputStyle,{fontSize: normalizeFont(24),paddingHorizontal: wp(1)}]} />
                                
                                {/* </AppbackgraoundImage> */}
                                </AppView>
                                </AppView>
                                <AppText style={[styles.ErrorText,{width:wp(60)}]} >
                       {this.state.emailError}
                   </AppText>
                             </AppView>
                             <AppView style={styles.InputContainer}>
                            
                            <AppbackgraoundImage source={blueBarIconWhiteBorder}  resizeMode="contain" style={styles.EmailInputWrapper}>
                            <AppInput 
                             onFocus={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                             onBlur={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                                placeholderTextColor={WHITE}
                                placeholder={this.props.MobileNumber}
                                value={this.state.mobileno}
                                onChangeText={(text) => this.handlevalidate(text, "mobileno")}
                                style={styles.InputStyle}
                                editable={false}
                                keyboardType={"numeric"} />
                                
                                </AppbackgraoundImage>
                             </AppView>
                             <AppText style={[styles.ErrorText,{width:wp(60)}]} >
                       {this.state.mobilenoError}
                   </AppText>
                             <AppView style={styles.InputContainer}>
                            
                            <AppbackgraoundImage source={blueBarIconWhiteBorder}  resizeMode="contain" style={styles.LocationInputWrapper}>
                            <AppInput 
                             onFocus={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                             onBlur={()=>  this.setState({footerVisibleToggle: !this.state.footerVisibleToggle})}
                                placeholderTextColor={WHITE}
                                placeholder={MY_ZIP_CODE}
                                value={this.state.zipcode}
                                onChangeText={(text) => this.handlevalidate(text, "zipcode")}
                                style={styles.InputStyle}
                                keyboardType={"numeric"} />
                             
                                </AppbackgraoundImage>
                       </AppView>
                       <AppText style={[styles.ErrorText,{width:wp(50)}]} >
                       {this.state.zipcodeError}
                   </AppText>
                       <AppView style={{marginTop:hp(2)}} >
                    <SubmitButton
                        onPress={() => this.Submit()}
                        textstyle={{alignSelf:"center"}}
                        buttonText={Submit}
                    >
                    </SubmitButton>
                    </AppView>
                        <AppView style={styles.CommanTextWrapper}>
                             <AppText style={styles.CommanText}>
                                 {WE_DO_NOT}
                                </AppText>                        
                       </AppView>


                       <AppView style={styles.linkContainer}>
                            
                       <Touchable onPress={()=>this.props.navigation.navigate("TermsCondition")}>
                                <AppText style={styles.linkText}>
                                  {TERMS_CONDITIONS}
                                </AppText>
                                </Touchable>
                           

                                <Touchable onPress={()=>this.props.navigation.navigate("PrivacyPolicy")}>
                                <AppText style={styles.linkText}>
                                  {PRIVACY_POLICY}
                                </AppText>
                                </Touchable>
                       </AppView>
                       <AppView style={styles.establishmentContainer}>
                            <Touchable onPress={()=>this.props.navigation.navigate("EstablishmentMap")}>
                            <AppbackgraoundImage source={darkBlueBarNoBorder}  resizeMode="contain" style={styles.establishmentWrapper}>
                                <AppText style={styles.establishmentText}>
                                  {CHECK_ESTABLISHMENT}
                                </AppText>
                            </AppbackgraoundImage>
                            </Touchable>
                            {/* <Touchable onPress={()=>this.props.navigation.navigate("ReportEstablishment")}>
                                <AppbackgraoundImage source={lighBlueBarNoBorder}  resizeMode="contain" style={styles.establishmentWrapper}>
                                <AppText style={styles.establishmentText}>
                                  {REPORT_ESTABLISHMENT}
                                </AppText>
                                </AppbackgraoundImage>
                                </Touchable> */}
                       </AppView>
                       { this.state.footerVisibleToggle ? null : 
            <AppView style={{ width:wp(50) ,height:hp(40)}}  /> }
            <CustomModal
          isModalVisible={this.state.ModalVisible}
          onPress={() => this.props.navigation.navigate("Settings" ,this.setState({ModalVisible:!this.state.ModalVisible}))}
          text={"Profile updated successfully"}
        /> 
                       </Container>

                {this.state.footerVisibleToggle?<Footer style={{ position: 'absolute', bottom: 0 }}  />:null}  
            </AppView>

        );
    }
}
const mapStateToProps = state => {
    console.log("state==>>myprofile",state)
    return {
        MyProfile: state.reducer.language.MyProfile,
        COMMON_TEXT: state.reducer.language.COMMON_TEXT,
        token:state.AuthReducer.Token,
        ErrorText:state.reducer.language.ErrorText,
      MobileNumber:state.AuthReducer.Userdetails.mobile
    }
}

export default connect(mapStateToProps)(MyProfile);