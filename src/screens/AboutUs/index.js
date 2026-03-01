import React, { Component } from 'react';
import { AppImage, AppView, AppText ,Touchable,AppbackgraoundImage } from "@Component/Atoms/index"
import {  KeyboardAvoidingView, ScrollView,Platform } from 'react-native'
import { Header, Footer } from '@Component/molecules/index';
import styles from './styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {blueBarIconWhiteBorder} from '@Assets/Icon'
import { connect, } from 'react-redux';
import { Container } from '@Component/containers/index'
import ApiRequest from '../../RestAPI/rest' 
import CurrentLocation  from "../../utils/CurrentLocation"
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native'; 
import firebase from '../../firebase/firebase';
var database = firebase.database(); 

class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            about:""
        };
    } 
  
     
    componentDidMount(){
        this.AboutAPi()
        
        
}
AboutAPi(){
    var databaseRef = database.ref("aboutus");
    databaseRef.on('value',(snapshot)=> {
        //  console.log("terms and conditon==>",snapshot.val()) 
         this.setState({
            about:snapshot.val()
         })
    })
  

}
    render() {
        const {PRIVACY_POLICY,WE_DO_NOT } = this.props.language.COMMON_TEXT
        const {ABOUT_US_TITLE,ABOUT_US_DETAILS} = this.props.language.AboutUs
        return (

            <AppView style={{ flex: 1 }}>
                <Header />
                
                {/* <Container style={{marginBottom:hp(32)}}> */}
                        <AppView style={styles.buttonContainer}>
                            
                            <AppbackgraoundImage source={blueBarIconWhiteBorder}  resizeMode="contain" style={styles.buttonWrapper}>
                                <AppText style={styles.buttonText}>
                                  {ABOUT_US_TITLE} 
                                </AppText>
                                </AppbackgraoundImage>
                       </AppView>

                        <AppView style={styles.textContainer}>
                            <AppView style={styles.textWrapper}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                  <AppText style={styles.AboutUsText}>
                                  {/* {ABOUT_US_DETAILS}  */}
                                  {this.state.about}
                                 </AppText>
                                 </ScrollView>
                            </AppView>
                        </AppView> 
                        <AppView style={styles.CommanText}>
                             <AppText style={styles.CommanText}>
                                 {WE_DO_NOT}
                                </AppText>                        
                       </AppView>
                       {/* </Container> */}
                       

                <Footer style={{ position: 'absolute', bottom: 0 }} />
            </AppView>

        );
    }
}
const mapStateToProps = state => {
    console.log("state==>>",state)
    return {
        language: state.reducer.language
    }
}

export default connect(mapStateToProps)(AboutUs);