import React, { Component } from 'react';
import { AppImage, AppView, AppText, Touchable, AppbackgraoundImage, AppInput } from "@Component/Atoms/index"
import { Alert } from 'react-native'
import { Header, Footer, SubmitButton, BoxIcon,CustomModal } from '@Component/molecules/index';
import { Container } from '@Component/containers/index'
import { fontStyle } from '@Assets/commonFont/commonFont'
import styles from './styles'
import DefaultState from "./constant"
import { DARKBLUE } from "@GlobalStyles/colors"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SearchIcon, UnTick, Tick ,backArrow} from '@Assets/Icon'
import { connect, } from 'react-redux';
import { normalizeFont } from '@GlobalStyles/responsive';
import ApiRequest from '../../../RestAPI/rest';
import {Loader} from "@Component/loader";
import firebase from '../../../firebase/firebase';
import AsyncStorage from '@react-native-community/async-storage';
var database = firebase.database(); 

class VisitorReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DefaultState,
            footerVisibleToggle: true,
            modalErrorMessage:"",
            successModalVisible:false,
            ModalVisible:false,
            profile: {},
            getQuestionsArray: [],
            additionalComments:'',
            isLoading:false,
        };
    }


    componentDidMount() { 
        console.log("params==>",this.props.route.params)
        // this.getReportProfile()
        var databaseRef = database.ref("questionArray/data");
        databaseRef.on('value',(snapshot)=> {
             console.log("questionArrayvistor",snapshot.val()) 
             this.setState({ getQuestionsArray: snapshot.val() },  
                () => this.addCheckBoxStatusInArray(snapshot.val()) 
                
                )
        })
    }

  
   
    addCheckBoxStatusInArray(questionsArray) { 
        console.log("data==>",questionsArray)
        let questionArrayWithStatus = questionsArray
        questionsArray.forEach((questionItem, questionIndex) => {
            questionItem.question.forEach((optionItem, optionIndex) => {
                let obj = {
                    ...optionItem,
                    checkBoxStatus: false
                }
                questionArrayWithStatus[questionIndex].question[optionIndex] = obj

            })
        })
        console.log("addCheckBoxStatusInArray===>", questionArrayWithStatus)
        this.setState({ getQuestionsArray: questionArrayWithStatus })
    }

    handleCheckBox(questionIndex, optionIndex) {
        let questionArrayWithStatusTemp = this.state.getQuestionsArray
        questionArrayWithStatusTemp[questionIndex].question[optionIndex].checkBoxStatus = !questionArrayWithStatusTemp[questionIndex].question[optionIndex].checkBoxStatus

        //Validation

        if (questionArrayWithStatusTemp[questionIndex].question[optionIndex].option === "No") {
            questionArrayWithStatusTemp[questionIndex].question.forEach((otionElem, optionIndx) => {
                if (otionElem.option !== "No") {
                    questionArrayWithStatusTemp[questionIndex].question[optionIndx].checkBoxStatus = false
                }
            })
        }
        else {
            questionArrayWithStatusTemp[questionIndex].question.forEach((otionElem, optionIndx) => {
                if (otionElem.option === "No") {
                    questionArrayWithStatusTemp[questionIndex].question[optionIndx].checkBoxStatus = false
                }
            })
        }
        this.setState({ getQuestionsArray: questionArrayWithStatusTemp })
    }



    submitButtonHandler() {
        
    let errorMessage=""
    let errorStatus=true

        let submitFinalArray = []
        this.state.getQuestionsArray.forEach((qTtem, qIndex) => {
            let optionLengthNotZero = false
            if (qTtem.question_choice === "MULTIPLE") {
                let obj =
                {
                    "questions": qTtem.id,
                    "answer": [],
                    "question_choice": qTtem.question_choice
                }
                
                qTtem.question.forEach((optItem, optIndex) => {
                    if (optItem.checkBoxStatus === true) {
                        obj.answer.push(optItem.id)
                        optionLengthNotZero = true
                    }
                })
                submitFinalArray.push(obj)   
            }
            // else if (qTtem.question_choice === "TEXT") {
            //     optionLengthNotZero = true
            //     submitFinalArray.push({
            //         "questions": qTtem.id,
            //         "text_answer": this.state.additionalComments,
            //         "question_choice": "TEXT"
            //     })
            // }
            if(optionLengthNotZero===false){
                errorMessage=`Please provide answer to this question : ${qTtem.questions}`
                errorStatus=false
                this.setState({modalErrorMessage:errorMessage})
            }
        })
        if(errorStatus){
            if(this.state.additionalComments.length!==0){
                let req = {
                    "location": {
                        "place_id": this.props.route.params.place_id,
                        "category": this.props.route.params.category,
                        "name": this.props.route.params.title,
                        "address": this.props.route.params.address,
                        "latitude": this.props.route.params.latitude,
                        "longitude": this.props.route.params.longitude
                      },
                      "visitor_type": "final",
                    "answers": submitFinalArray
                }
          console.log("Hitting API with===>", req)
        //   alert("Thank You !")
        setTimeout(() => {
            this.postReview(req)
       }, 100);
            }
            else{
                this.setState({modalErrorMessage:"Please provide additional message"})
                this.setState({ModalVisible:true})
            }
        }
        else{
            this.setState({ModalVisible:true})
        }
    }

    postReview(req){ 
        this.getProfileDetails().then(async(rootUserDetails)=>{
                let tempReviews =rootUserDetails?.reviews ? rootUserDetails.reviews:[]
                tempReviews.push({
                    data:req,
                    time:Date.now()
                })
                // database.ref("users/"+)
                //    .set({
                //        da
                //    })
                  database.ref('users/' + rootUserDetails.id).update({
                    reviews:tempReviews
                  });
                if(req.answers[0].answer[0]==11)
                  database.ref('place_reports/' + req.location.place_id).set({
                    place_id:req.location.place_id,
                  });
            });
        // var databaseRef = database.ref("reviews");
        //   databaseRef.set({
        //       data:req,
        //       time:Date.now()
        //   }) 
          this.setState({successModalVisible:true}) 
    }

     getProfileDetails = async () => {
        return new Promise(resolve => {
     
        AsyncStorage.getItem("LOGIN_CREDENTIALS").then(async (resp) => {
            if (JSON.parse(resp) !== null) {
                
        database.ref().child('users').orderByChild('mobile').equalTo(JSON.parse(resp).mobile).on("value", function(snapshot) {
         
            snapshot.forEach( function(data) {
               
                
                resolve(data.val())
            });
        });
    }
    });  })
    }


    // getPlaceDetails = async (req) => {
    //     return new Promise(resolve => {
    //     database.ref().child('place_reports').orderByChild('req.location.place_id').equalTo(JSON.parse(resp).mobile).on("value", function(snapshot) {
    //         snapshot.forEach( function(data) {
    //             resolve(data.val())
    //         });
    //     });
    //   })
    // }
    render() {
        const { CHECK_ALL_APPLY, THE_PUBLIC, WORKERS, NO, YES, COMMENTS_HERE, YOUR_REPORT } = this.props.CommonReport
        const { Submit, WE_DO_NOT } = this.props.CommonText
        return (
            <AppView style={{ flex: 1 }} >
                <Header />
                <Container style={{ marginBottom: this.state.footerVisibleToggle ? hp(20.75) : null }}>
                {/* <Loader
                 visible={this.state.isLoading}
                 /> */}
                   <AppView style={{flexDirection: 'row'}}>
                   <Touchable style={{marginHorizontal: wp(3),marginTop: hp(1),height:hp(7),justifyContent: 'center',}} onPress={() => { this.props.navigation.goBack() }} >
                    <AppImage source={backArrow} style={{ width: wp(8), height: hp(5) }} />
                   </Touchable>
                     <AppView style={styles.buttonView}>
                            <AppView style={styles.buttonContainer}>
                                <AppText style={styles.buttonText}>
                                    {/* {"Imperial Gardens"} */}
                                    {this.props.route.params.title}
                                </AppText>
                            </AppView>
                        </AppView>
                   </AppView>
                   
                    <AppView style={{ marginTop: hp(1) }}>
                        <AppText style={[styles.textStyle]}>
                            {CHECK_ALL_APPLY}
                        </AppText>
                    </AppView>
                    {this.state.getQuestionsArray.map((questionItem, questionIndex) => {
                        if (questionItem.question_choice === "MULTIPLE") {
                            return (<AppView style={{ width: wp(95),marginVertical: hp(1), justifyContent: 'center', alignSelf: 'center', }}>
                                <AppText style={[styles.defaulttextStyle]}>{questionItem.questions}</AppText>
                                <AppView style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    {questionItem.question.map((optionItem, optionIndex) => {
                                        return (
                                            <AppView style={{ flexDirection: 'column' }}>
                                                <Touchable style={{ height: hp(5), width: wp(10), alignSelf: 'center', }} onPress={() => this.handleCheckBox(questionIndex, optionIndex)} >
                                                    <AppImage
                                                        source={optionItem.checkBoxStatus ? Tick : UnTick} style={{ height: hp(5), width: wp(10) }}
                                                    />
                                                </Touchable>
                                                <AppText style={styles.textWrapper}>{optionItem.option}</AppText>
                                            </AppView>
                                        )
                                    })}
                                </AppView>
                            </AppView>
                            )
                        }
                    })
                    }
                    <AppView style={styles.commentStyle}>
                        <AppInput
                            onFocus={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
                            onBlur={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
                            style={{ textAlign: "center", fontSize: normalizeFont(16) ,height:hp(14) ,width:wp(80) ,alignSelf: 'center',justifyContent: 'center', }}
                            placeholderTextColor="black"
                             multiline
                            value = {this.state.additionalComments}
                            onChangeText={(text)=>this.setState({additionalComments :text})}
                            placeholder={COMMENTS_HERE}>
                        </AppInput>
                    </AppView>
                    <AppView style={{ marginTop: hp(2) }} >
                        <SubmitButton
                            onPress={() => this.submitButtonHandler()}
                            textstyle={styles.SubmitTextstyle}
                            buttonText={Submit}
                        >
                        </SubmitButton>
                    </AppView>
                    <AppView style={{ marginTop: hp(2),alignItems: 'center',justifyContent: 'center',alignSelf: 'center'}} >
                        <AppText style={{ color: DARKBLUE, fontSize: normalizeFont(17),textAlign:'center',justifyContent: 'center' ,alignSelf: 'center', }}>
                            {YOUR_REPORT}
                        </AppText>
                    </AppView>
                    <AppText style={{ color: DARKBLUE, textAlign: "center",
                   alignSelf: 'center', }}>
                        {WE_DO_NOT}
                    </AppText>
                   
                    <CustomModal
          isModalVisible={this.state.ModalVisible}
          onPress={() => this.setState({ModalVisible:!this.state.ModalVisible})}
          text={this.state.modalErrorMessage}
        />   
           { this.state.footerVisibleToggle ? null : 
            <AppView style={{ width:wp(50) ,height:hp(40)}}  /> }
            <CustomModal
          isModalVisible={this.state.successModalVisible}
          onPress={() => this.props.navigation.navigate("EstablishmentMap",this.setState({successModalVisible:!this.state.successModalVisible}))}
          text={"Review Posted Successfully"}
        /> 
                </Container>
                {this.state.footerVisibleToggle ? <Footer style={{ position: 'absolute', bottom: 0 }} /> : null}
            </AppView>

        )

    }

}
const mapStateToProps = state => {
    console.log("state==>>", state)
    return {
        Visitor: state.reducer.language.Visitor,
        CommonReport: state.reducer.language.COMMON_REPORT,
        CommonText: state.reducer.language.COMMON_TEXT,
        token: state.AuthReducer.Token

    }
}
export default connect(mapStateToProps)(VisitorReport);