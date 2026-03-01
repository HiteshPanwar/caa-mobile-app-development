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
class EmailImSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
          toggleStatus1:true,
          toggleStatus2:true,
          toggleStatus3:true,
          toggleStatus4:true,
           isLoading:true
        };
    }   
     componentDidMount(){
     this.getStatusFromAsync()
     }

    async getStatusFromAsync(){
      AsyncStorage.getItem("EmailNImSetting").then(resp => {
        console.log("EmailNImSetting",JSON.parse(resp))
       let EmailNImSettingObj =  JSON.parse(resp)
        this.setState({
          toggleStatus1:EmailNImSettingObj.toggleStatus1,
          toggleStatus2:EmailNImSettingObj.toggleStatus2,
          toggleStatus3:EmailNImSettingObj.toggleStatus3,
          toggleStatus4:EmailNImSettingObj.toggleStatus4
        })
      })
     }

    pushSetting = ( type , alertType ) =>{

      this.setState({ isLoading: true })
     

     let alertDetails= {
      "email_alert_type":alertType
     }
         console.log("AlertEmail==>",alertDetails ,this.props.token )
        ApiRequest( alertDetails, "user-app/email-im-setting", "POST",this.props.token)
        .then(async resp => {
         console.log("email-im-setting==>",resp ,alertDetails)
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
           let  EmailNImSettingObj = {
            toggleStatus1:this.state.toggleStatus1,
            toggleStatus2:this.state.toggleStatus2,
            toggleStatus3:this.state.toggleStatus3,
            toggleStatus4:this.state.toggleStatus4
           }

                if(type == 1){
                  this.setState({
                    toggleStatus1:!this.state.toggleStatus1
                  })
                  EmailNImSettingObj.toggleStatus1 = !EmailNImSettingObj.toggleStatus1
                  AsyncStorage.setItem('EmailNImSetting',  JSON.stringify(EmailNImSettingObj));
               }
                else if(type ==2) {
                  this.setState({
                    toggleStatus2:!this.state.toggleStatus2
                  })
                  EmailNImSettingObj.toggleStatus2 = !EmailNImSettingObj.toggleStatus2
                  AsyncStorage.setItem('EmailNImSetting',  JSON.stringify(EmailNImSettingObj));
                }
                else if(type ==3) {
                  this.setState({
                    toggleStatus3:!this.state.toggleStatus3
                  })
                  EmailNImSettingObj.toggleStatus3 = !EmailNImSettingObj.toggleStatus3
                  AsyncStorage.setItem('EmailNImSetting',  JSON.stringify(EmailNImSettingObj));
                }
                else if(type ==4) {
                  this.setState({
                    toggleStatus4:!this.state.toggleStatus4
                  })
                  EmailNImSettingObj.toggleStatus4 = !EmailNImSettingObj.toggleStatus4
                  AsyncStorage.setItem('EmailNImSetting',  JSON.stringify(EmailNImSettingObj));
                }
                else {
                  alert(" Type not found")
                }
               }, 100);
              break;
            }
            default: {
              this.setState({isLoading:false})
              setTimeout(() => {
                Alert.alert(
                  "",
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
        const {  EMAIL_IM,PERMIT_COVID1,PERMIT_COVID2 ,PERMIT_COVID3,PERMIT_COVID4} = this.props.language.EmailImSetting
        return (

            <AppView style={{ flex: 1   }}>
                <Header />
                
                <Container style={{marginBottom: hp(20.75)}}>
                  
                   <AppView style={styles.buttonContainer}>
                            
                            <AppbackgraoundImage source={blueBarIconWhiteBorder}  resizeMode="contain" style={styles.buttonWrapper}>
                                <AppText style={styles.buttonText}>
                                  {EMAIL_IM} 
                                </AppText>
                                </AppbackgraoundImage>
                       </AppView>
 
                     
                       <AppView style={styles.AlertContainer}>
                            
                              <AppView style={styles.AlertTextView}>
                                <AppText style={styles.AlertText}>
                                 {PERMIT_COVID1}
                                </AppText>
                                
                                </AppView>
                                <AppView style={styles.Toggle} >
                              <Touchable onPress={()=>this.pushSetting(1 , "public_health_alert")    }>   
                              <AppImage source={  this.state.toggleStatus1 ? SwitchOn  : SwitchOff } resizeMode="contain" style={styles.AlertWrapper}/>
                              </Touchable>
                             </AppView>
                       </AppView>
                       
                     <AppView style={styles.AlertContainer}>
                            
                            <AppView style={styles.AlertTextView}>
                             
                              <AppText style={styles.AlertText}>
                               {PERMIT_COVID2}
                              </AppText>
                              
                              </AppView>
                              <AppView style={styles.Toggle} >
                              <Touchable onPress={()=>this.pushSetting( 2 , "followup_report_alert")      }>   
                              <AppImage source={  this.state.toggleStatus2 ? SwitchOn  : SwitchOff } resizeMode="contain" style={styles.AlertWrapper}/>
                              </Touchable>
                             </AppView>
                     </AppView>
                     <AppView style={styles.AlertContainer}>
                            
                            <AppView style={styles.AlertTextView}>
                              <AppText style={styles.AlertText}>
                               {PERMIT_COVID3}
                              </AppText>
                             
                              </AppView>
                              <AppView style={styles.Toggle} >
                              <Touchable onPress={()=>this.pushSetting( 3, "nearlocation_visited_alert")}>   
                              <AppImage source={  this.state.toggleStatus3 ? SwitchOn  : SwitchOff } resizeMode="contain" style={styles.AlertWrapper}/>
                              </Touchable>
                             </AppView>
                              
                              
                     </AppView>
                    
                     <AppView style={styles.AlertContainer}>
                            
                            <AppView style={styles.AlertTextView}> 
                              <AppText style={styles.AlertText}>
                              {PERMIT_COVID4}
                              </AppText>
                              
                              </AppView>
                              <AppView>
                              <Touchable onPress={()=>this.pushSetting( 4, "covidmatter_myplace_alert") }>
                              <AppImage source={  this.state.toggleStatus4 ? SwitchOn  : SwitchOff } resizeMode="contain" style={styles.AlertWrapper}>
                              </AppImage>
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
    console.log("state==>>ATemail==>",state)
    return {
        language: state.reducer.language,
        token:state.AuthReducer.Token
    }
}

export default connect(mapStateToProps)(EmailImSetting);