import React, { Component } from 'react';
import { AppImage, AppView, AppText ,Touchable,AppbackgraoundImage } from "../../Components/Atoms/index"
import {  KeyboardAvoidingView, ScrollView } from 'react-native'
import { Header, Footer } from '@Component/molecules/index';
import styles from './styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {blueBarIconWhiteBorder} from '@Assets/Icon'
import { connect, } from 'react-redux'; 
import ApiRequest from '../../RestAPI/rest'
import firebase from '../../firebase/firebase';
var database = firebase.database(); 

class Priavacypolicy extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
            privacy:""
        };
    }
   
    componentDidMount(){
        this.PrivacyAPi()
  
}
 PrivacyAPi(){

    var databaseRef = database.ref('privacypolicy');
    databaseRef.on('value',(snapshot)=> {
        //  console.log("terms and conditon==>",snapshot.val()) 
          this.setState({
            privacy:snapshot.val()
          })
    })

}

    render() {

        const {PRIVACY_POLICY,WE_DO_NOT } = this.props.language.COMMON_TEXT
        const {AboutUsTitle,ABOUT_US_DETAILS} = this.props.language.AboutUs
        return (
     
            <AppView style={{ flex: 1 }}>
                <Header />
                
               
               
                        <AppView style={styles.buttonContainer}>
                            
                            <AppbackgraoundImage source={blueBarIconWhiteBorder}  resizeMode="contain" style={styles.buttonWrapper}>
                                <AppText style={styles.buttonText}>
                                {PRIVACY_POLICY }
                                </AppText>
                                </AppbackgraoundImage>
                       </AppView>

                        <AppView style={styles.textContainer}>
                            <AppView style={styles.textWrapper}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                  <AppText style={styles.AboutUsText}>
                                  {/* {ABOUT_US_DETAILS}  */}
                                  {this.state.privacy}
                                 </AppText>
                                 </ScrollView>
                            </AppView>
                        </AppView>  
                        <AppView style={styles.CommanText}>
                             <AppText style={styles.CommanText}>
                                 {WE_DO_NOT}
                                </AppText>                        
                       </AppView>

                 

                <Footer style={{ position: 'absolute', bottom: 0 }} />
            </AppView>

           

        );
    }
}
const mapStateToProps = state => {
    console.log("state==>>",state.reducer.language)
    return {
        language: state.reducer.language
    }
}

export default connect(mapStateToProps)(Priavacypolicy);