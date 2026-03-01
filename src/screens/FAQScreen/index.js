
import React, { Component } from 'react';
import { AppImage, AppView, AppText ,Touchable,AppbackgraoundImage } from "@Component/Atoms/index"
import {  KeyboardAvoidingView, ScrollView } from 'react-native'
import { Header, Footer } from '@Component/molecules';
import styles from './styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {blueBarIconWhiteBorder} from '@Assets/Icon'
import { connect, } from 'react-redux';
import { Container } from '@Component/containers'
import ApiRequest from '../../RestAPI/rest'
class Faq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            faq:""
        };
    }
    componentDidMount(){
        this.FaqAPi()
  
}

FaqAPi(){

   ApiRequest('', "content/faq", "GET")
   .then(async resp => {
    console.log("faq==>",resp)
     this.setState({faq: resp.data.data[0].description})

   })


}
    render() {
        const {PRIVACY_POLICY,WE_DO_NOT } = this.props.language.COMMON_TEXT
        const {AboutUsTitle,ABOUT_US_DETAILS} = this.props.language.AboutUs
        const {FAQ} = this.props.language.FAQPage
        return (

            <AppView style={{ flex: 1 }}>
                <Header />
                
                {/* <Container style={{marginBottom:hp(32)}}> */}
                        <AppView style={styles.buttonContainer}>
                            
                            <AppbackgraoundImage source={blueBarIconWhiteBorder}  resizeMode="contain" style={styles.buttonWrapper}>
                                <AppText style={styles.buttonText}>
                                  {FAQ} 
                                </AppText>
                                </AppbackgraoundImage>
                        </AppView>

                        <AppView style={styles.textContainer}>
                            <AppView style={styles.textWrapper}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                  <AppText style={styles.AboutUsText}>
                                  {/* {ABOUT_US_DETAILS}  */}
                                  {this.state.faq}
                                 </AppText>
                                 </ScrollView>
                            </AppView>
                        </AppView> 
                       
                             <AppText style={styles.CommanText}>
                                 {WE_DO_NOT}
                                </AppText>                        
                     
                       {/* </Container> */}

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

export default connect(mapStateToProps)(Faq);