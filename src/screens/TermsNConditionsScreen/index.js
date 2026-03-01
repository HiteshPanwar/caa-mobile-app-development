
import React, { Component } from 'react';
import { AppImage, AppView, AppText ,Touchable,AppbackgraoundImage } from "../../Components/Atoms/index"
import {  KeyboardAvoidingView, ScrollView } from 'react-native'
import { Header, Footer } from '@Component/molecules';
import styles from './styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {blueBarIconWhiteBorder} from '@Assets/Icon'
import { connect, } from 'react-redux'; 
import ApiRequest from '../../RestAPI/rest'
import firebase from '../../firebase/firebase';
var database = firebase.database();


class TermAndCondition extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
            Term:""
        };
    }

    componentDidMount(){
        this.TermAPi()
  
}
TermAPi(){
    var databaseRef = database.ref('termandcondition');
    databaseRef.on('value',(snapshot)=> {
         console.log("terms and conditon==>",snapshot.val()) 
         this.setState({
            Term:snapshot.val()
         })
    })
}
    render() {
        const {WE_DO_NOT,TERMS_CONDITIONS } = this.props.language.COMMON_TEXT
        const {AboutUsTitle,ABOUT_US_DETAILS} = this.props.language.AboutUs
        return (

            <AppView style={{ flex: 1 }}>
                <Header />
                
                
                        <AppView style={styles.buttonContainer}>
                            
                            <AppbackgraoundImage source={blueBarIconWhiteBorder}  resizeMode="contain" style={styles.buttonWrapper}>
                                <AppText style={styles.buttonText}>
                                  {TERMS_CONDITIONS} 
                                </AppText>
                                </AppbackgraoundImage>
                       </AppView>

                        <AppView style={styles.textContainer}>
                            <AppView style={styles.textWrapper}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                  <AppText style={styles.AboutUsText}>
                                  {/* {ABOUT_US_DETAILS}  */}
                                  {this.state.Term}
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

export default connect(mapStateToProps)(TermAndCondition);