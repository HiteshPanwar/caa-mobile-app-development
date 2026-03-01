import React, { Component } from 'react';
import { Alert } from "react-native";
import { AppImage, AppView, AppText ,Touchable,AppbackgraoundImage } from "@Component/Atoms/index"
import {  KeyboardAvoidingView, ScrollView, View } from 'react-native'
import { Header, Footer } from '@Component/molecules/index';
import styles from './styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {blueBarIcon,SwitchOn,SwitchOff,darkBlueBarNoBorder,lighBlueBarNoBorder,blueBarIconWhiteBorder} from '@Assets/Icon'
import { connect, } from 'react-redux';
import { Container } from '@Component/containers/index'
import ApiRequest from '../../RestAPI/rest'
import AsyncStorage from "@react-native-community/async-storage"

class PrivacyPushSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
          toggleStatus1:true,
          toggleStatus2:true,
          toggleStatus3:true,
          toggleStatus4:true,
          toggleStatus5:true,
          toggleStatus6:true,
          isLoading:true
        };
    } 


    componentDidMount(){
      this.getStatusFromAsync()
      }
 
     async getStatusFromAsync(){
       AsyncStorage.getItem("PrivacyPushSettings").then(resp => {
         console.log("PrivacyPushSettings",JSON.parse(resp))
        let PrivacyPushSettingsObj =  JSON.parse(resp)
         this.setState({
           toggleStatus1:PrivacyPushSettingsObj.toggleStatus1,
           toggleStatus2:PrivacyPushSettingsObj.toggleStatus2,
           toggleStatus3:PrivacyPushSettingsObj.toggleStatus3,
           toggleStatus4:PrivacyPushSettingsObj.toggleStatus4,
           toggleStatus5:PrivacyPushSettingsObj.toggleStatus5,
           toggleStatus6:PrivacyPushSettingsObj.toggleStatus6,
         })
       })
      }


    pushSetting ( type , alertType ){
      this.setState({ isLoading: true })
     let alertDetails= {
      "alert_type":alertType
     }
         console.log("Alert==>",alertDetails ,this.props.token)
        ApiRequest( alertDetails, "user-app/privacy-push-setting", "POST",this.props.token)
        .then(async resp => {
         console.log("privacy-push-setting==>",resp ,alertDetails)
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
                // alert("yoyoyo")

                let  PrivacyPushSettingsObj = {
                  toggleStatus1:this.state.toggleStatus1,
                  toggleStatus2:this.state.toggleStatus2,
                  toggleStatus3:this.state.toggleStatus3,
                  toggleStatus4:this.state.toggleStatus4,
                  toggleStatus5:this.state.toggleStatus5,
                  toggleStatus6:this.state.toggleStatus6
                 }


                if(type == 1){
                  this.setState({
                    toggleStatus1:!this.state.toggleStatus1
                  })
                  PrivacyPushSettingsObj.toggleStatus1 = !PrivacyPushSettingsObj.toggleStatus1
                  AsyncStorage.setItem('PrivacyPushSettings',  JSON.stringify(PrivacyPushSettingsObj));
               }
                else if(type ==2) {
                  this.setState({
                    toggleStatus2:!this.state.toggleStatus2
                  })
                  PrivacyPushSettingsObj.toggleStatus2 = !PrivacyPushSettingsObj.toggleStatus2
                  AsyncStorage.setItem('PrivacyPushSettings',  JSON.stringify(PrivacyPushSettingsObj));
                }
                else if(type ==3) {
                  this.setState({
                    toggleStatus3:!this.state.toggleStatus3
                  })
                  PrivacyPushSettingsObj.toggleStatus3 = !PrivacyPushSettingsObj.toggleStatus3
                  AsyncStorage.setItem('PrivacyPushSettings',  JSON.stringify(PrivacyPushSettingsObj));
                }
                else if(type ==4) {
                  this.setState({
                    toggleStatus4:!this.state.toggleStatus4
                  })
                  PrivacyPushSettingsObj.toggleStatus4 = !PrivacyPushSettingsObj.toggleStatus4
                  AsyncStorage.setItem('PrivacyPushSettings',  JSON.stringify(PrivacyPushSettingsObj));
                }
                else if(type == 5) {
                  this.setState({
                    toggleStatus5:!this.state.toggleStatus5
                  })
                  PrivacyPushSettingsObj.toggleStatus5 = !PrivacyPushSettingsObj.toggleStatus5
                  AsyncStorage.setItem('PrivacyPushSettings',  JSON.stringify(PrivacyPushSettingsObj));
                }
                else if(type == 6) {
                  this.setState({
                    toggleStatus6:!this.state.toggleStatus6
                  })
                  PrivacyPushSettingsObj.toggleStatus6 = !PrivacyPushSettingsObj.toggleStatus6
                  AsyncStorage.setItem('PrivacyPushSettings',  JSON.stringify(PrivacyPushSettingsObj));
                }
                else (
                  alert(" Type not found")
                )
               }, 500);
              break;
            }
  
  
            default: {
              this.setState({isLoading:false})
              setTimeout(() => {
                Alert.alert(
                  'Please try again later',
               //    resp.data.response_message,
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

    render() {
        const {PRIVACY_POLICY,WE_DO_NOT ,CHECK_ESTABLISHMENT,REPORT_ESTABLISHMENT } = this.props.language.COMMON_TEXT
        const {PRI_AND_PUSH,PERMIT_SLIDER1A,ALERT_SLIDER2A,
            ALERT_SLIDER3A, ALERT_SLIDER4B,ALERT_SLIDER5A,
            ALERT_SLIDER6A} = this.props.language.AlertSetting
        return (

            <AppView style={{ flex: 1 }}>
                <Header />
                
                <Container style={{  marginBottom:hp(20.75)}}>
                  
                   <AppView style={styles.buttonContainer}>
                            
                            <AppbackgraoundImage source={blueBarIconWhiteBorder}  resizeMode="contain" style={styles.buttonWrapper}>
                                <AppText style={styles.buttonText}>
                                  {PRI_AND_PUSH} 
                                </AppText>
                                </AppbackgraoundImage>
                       </AppView>
 

                       <AppView style={styles.AlertContainer}>
                            
                              <AppView style={styles.AlertTextView}>
                                <AppText style={styles.AlertText}>
                                 {PERMIT_SLIDER1A}
                                </AppText>
                                </AppView>
                                <AppView style={styles.Toggle} >
                              <Touchable onPress={()=>this.pushSetting(1 , "gps_alert")}>   
                              <AppImage  source={  this.state.toggleStatus1 ? SwitchOn  : SwitchOff } resizeMode="contain" style={styles.AlertWrapper}/>
                              </Touchable>
                             </AppView>
                       </AppView>
                       <AppView style={styles.AlertContainer}>
                            
                       <AppView tyle={styles.AlertTextView}>
                              <AppText style={styles.AlertText}>
                               {ALERT_SLIDER2A}
                              </AppText>
                              </AppView>
                              <AppView style={styles.Toggle} >
                              <Touchable onPress={()=>this.pushSetting(2 ,"socialdistancing_everybody_alert")}>    
                              <AppImage   source={  this.state.toggleStatus2 ? SwitchOn  : SwitchOff }  resizeMode="contain" style={styles.AlertWrapper}/>
                              </Touchable>
                             </AppView>
                     </AppView>
                     <AppView style={styles.AlertContainer}>
                            
                     <AppView tyle={styles.AlertTextView}>
                              <AppText style={styles.AlertText}>
                               {ALERT_SLIDER3A}
                              </AppText>
                             
                              </AppView>
                              <AppView style={styles.Toggle} >
                              <Touchable onPress={()=>this.pushSetting(3 ,"wearmask_everybody_alert")}>   
                              <AppImage  source={  this.state.toggleStatus3 ? SwitchOn  : SwitchOff } resizeMode="contain" style={styles.AlertWrapper}/>
                              </Touchable>
                             </AppView>
                     </AppView>
                     <AppView style={styles.AlertContainer}>
                            
                     <AppView tyle={styles.AlertTextView}>
                              
                              <AppText style={styles.AlertText}>
                               {ALERT_SLIDER4B}
                              </AppText>
                              
                              </AppView>
                              <AppView style={styles.Toggle} >
                              <Touchable onPress={()=>this.pushSetting(4 ,"wearmask_alert")}>  
                              <AppImage  source={  this.state.toggleStatus4 ? SwitchOn  : SwitchOff } resizeMode="contain" style={styles.AlertWrapper}/>
                              </Touchable>
                             </AppView>
                              
                              
                     </AppView>
                     <AppView style={styles.AlertContainer}>
                            
                     <AppView tyle={styles.AlertTextView}>
                              <AppText style={styles.AlertText}>
                               {ALERT_SLIDER5A}
                              </AppText>
                              {/* <AppText style={styles.AlertText}>
                               {ALERT_SLIDER5B}
                              </AppText> */}
                              </AppView>
                              <AppView style={styles.Toggle} >
                              <Touchable onPress={()=>this.pushSetting(5,"hotspot_alert")}>  
                              <AppImage  source={  this.state.toggleStatus5 ? SwitchOn  : SwitchOff } resizeMode="contain" style={styles.AlertWrapper}/>
                              </Touchable>
                             </AppView>
                     </AppView>
                     <AppView style={styles.AlertContainer}>
                            
                     <AppView tyle={styles.AlertTextView}>
                              <AppText style={styles.AlertText}>
                               {ALERT_SLIDER6A}
                              </AppText>
                              {/* <AppText style={styles.AlertText}>
                               {ALERT_SLIDER6B}
                              </AppText>
                              <AppText style={styles.AlertText}>
                               {ALERT_SLIDER6C}
                              </AppText>
                              <AppText style={styles.AlertText}>
                               {ALERT_SLIDER6D}
                              </AppText> */}
                              </AppView>
                              <AppView style={styles.Toggle} >
                              <Touchable onPress={()=>this.pushSetting(6 , "everybody_entering_alert")}> 
                              <AppImage  source={  this.state.toggleStatus6 ? SwitchOn  : SwitchOff } resizeMode="contain" style={styles.AlertWrapper} />
                              </Touchable>
                              </AppView>
                     </AppView>
       
                
                        <AppView style={styles.CommanText}>
                             <AppText style={styles.CommanText}>
                                 {WE_DO_NOT}
                                </AppText>                        
                       </AppView> 
                       <AppView style={styles.establishmentContainer}>
                            <Touchable onPress={()=>this.props.navigation.navigate("EstablishmentMap")}>
                            <AppbackgraoundImage source={darkBlueBarNoBorder}  resizeMode="contain" style={styles.establishmentWrapper}>
                                <AppText style={styles.establishmentText}>
                                  {CHECK_ESTABLISHMENT}
                                </AppText>
                            </AppbackgraoundImage>
                            </Touchable>
                            {/* <Touchable onPress={()=>{}}>
                                <AppbackgraoundImage source={lighBlueBarNoBorder}  resizeMode="contain" style={styles.establishmentWrapper}>
                                <AppText style={styles.establishmentText}>
                                  {REPORT_ESTABLISHMENT}
                                </AppText>
                                </AppbackgraoundImage>
                                </Touchable> */}
                       </AppView>
                       </Container>

                <Footer style={{ position: 'absolute', bottom: 0 }} />
            </AppView>

        );
    }
}
const mapStateToProps = state => {
    console.log("state==>>",state.reducer.language)
    return {
        language: state.reducer.language,
        token:state.AuthReducer.Token
    }
}

export default connect(mapStateToProps)(PrivacyPushSettings);