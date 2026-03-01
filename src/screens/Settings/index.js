import React, { Component } from 'react';
import { AppImage, AppView, AppText ,Touchable,AppbackgraoundImage } from "@Component/Atoms/index"
import {  KeyboardAvoidingView, ScrollView } from 'react-native'
import { Header, Footer ,CustomLogOutModal } from '@Component/molecules/index';
import { Setting_BlueIcon,BluearrowIcon } from "@Assets/Icon";
import style from './styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {blueBarIcon,lighBlueBarNoBorder,
    darkBlueBarNoBorder,blueBarIconWhiteBorder} from '@Assets/Icon'
import { connect, } from 'react-redux';
import { Container } from '@Component/containers/index'
import AsyncStorage from "@react-native-community/async-storage"
class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible:false
        };
    }

    render() {
        const {CHECK_ON_ESTAB,WE_DO_NOT,REPORT_ON_ESTAB } = this.props.language.COMMON_TEXT
        const {AboutUsTitle,AboutUsDetails} = this.props.language.AboutUs
        const {My_Profile,Privacy,Email,Clear_History,Log_Out} = this.props.language.Settings
        return (

            <AppView style={{ flex: 1 }}>
                <Header />
                <Container style={{height:hp(85) }}>
                <AppImage
                  style={style.iconStyle}
                 source={Setting_BlueIcon}>
                </AppImage>
                
                
                <AppView style={style.settingsContainer}>
                <Touchable onPress={()=>this.props.navigation.navigate('MyProfile')}
                 style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                
                   <AppText style={style.settingsText}>
                       {My_Profile}
                   </AppText>
                   <AppImage
                  source={BluearrowIcon}>
                </AppImage>
                   </Touchable>
                     
                </AppView>
                <AppView style={style.settingsContainer}>
                <Touchable onPress={() => this.props.navigation.navigate("PrivacyPushSettings")}
                 style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                   <AppText style={style.settingsText}>
                       {Privacy}
                   </AppText>
                   <AppImage
                  source={BluearrowIcon}>
                </AppImage>
                   </Touchable>                     
                </AppView>
                <AppView style={style.settingsContainer}>
                <Touchable onPress={() => this.props.navigation.navigate("EmailNImSetting")}
                 style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                   <AppText style={style.settingsText}>
                       {Email}
                   </AppText>
                   <AppImage
                  source={BluearrowIcon}>
                </AppImage>
                   </Touchable>
                </AppView>
                {/* <AppView style={style.settingsContainer}>
                <Touchable   style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                   <AppText style={style.settingsText}>
                       {Clear_History}
                   </AppText>
                   <AppImage
                  source={BluearrowIcon}>
                </AppImage>
                   </Touchable>
                </AppView> */}

                <AppView style={style.settingsContainer}>
                <Touchable onPress={()=>this.setState({isModalVisible: true})}
                style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                   <AppText style={style.settingsText}>
                       {Log_Out}
                   </AppText>
                   <AppImage
                  source={BluearrowIcon}>
                </AppImage>
                   </Touchable>
                </AppView>
                

                {/* <Container style={{marginBottom:hp(32)}}> */}
                <AppView style={{alignSelf:"center"}}> 
                 <Touchable onPress={()=> this.props.navigation.navigate("EstablishmentMap")}> 
                <AppView style={style.buttonContainer}>
                            
                            <AppbackgraoundImage source={darkBlueBarNoBorder}  resizeMode="contain" style={style.buttonWrapper}>
                                <AppText style={style.buttonText}>
                                  {CHECK_ON_ESTAB} 
                                </AppText>
                                </AppbackgraoundImage>
                       </AppView>
                       </Touchable>
                        {/* <AppView style={style.buttonContainer}>
                            <Touchable onPress={() =>this.props.navigation.navigate("ReportEstablishment")}>
                            <AppbackgraoundImage source={lighBlueBarNoBorder}  resizeMode="contain" style={style.buttonWrapper}>
                                <AppText style={style.buttonText}>
                                  {REPORT_ON_ESTAB} 
                                </AppText>
                                </AppbackgraoundImage>
                                </Touchable>
                       </AppView> */}
                       
                       </AppView>
                    
                        <AppView style={[style.CommanText,{ marginHorizontal:Platform.OS === 'ios' ? null :wp(5),}]}>
                             <AppText style={style.CommanText}>
                                 {WE_DO_NOT}
                                </AppText>                        
                       </AppView>
                       {/* </Container> */}
                      
                       </Container>
                <Footer style={{ position: 'absolute', bottom: 0 }} />
                <CustomLogOutModal
                       isModalVisible={this.state.isModalVisible}
                       onPressYes={()=>{
                        this.setState({isModalVisible: false})   
                        AsyncStorage.removeItem("Token")
                        this.props.navigation.navigate("Login")
                    }}
                       onPressNo={()=>this.setState({isModalVisible: false})}
                       />
            </AppView>

        );
    }
}
const mapStateToProps = state => {
    console.log("state==>>",state.reducer.language)
    return {
        language: state.reducer.language,
        CommanText:state.reducer.language.COMMON_TEXT,
        AboutUs:state.reducer.language.AboutUs,
        Settings:state.reducer.language.Settings
    }
}

export default connect(mapStateToProps)(Settings);
