import React, { Component } from 'react';
import { AppImage, AppView, AppText, Touchable, AppInput } from "@Component/Atoms/index"
import {  Alert } from 'react-native'
import { Header, Footer, SubmitButton, CustomModal } from '@Component/molecules/index';
import { Container } from '@Component/containers/index'
import styles from './styles'
import DefaultState from "./constant"
import { DARKBLUE } from "@GlobalStyles/colors"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {  UnTick, Tick,backArrow } from '@Assets/Icon'
import { connect, } from 'react-redux';
import { normalizeFont } from '@GlobalStyles/responsive';
import ApiRequest from '../../../RestAPI/rest'
import { Loader } from "@Component/loader";
class EmployeReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DefaultState,
            footerVisibleToggle: true,
            continueState: false,
            successModalVisible: false,
            modalErrorMessage: "",
            ModalVisible: false,
            profile: "",
            getQuestionsArray: [],
            additionalComments: '',
            isLoading: true,
        };
    }
    componentDidMount() {
        this.getReportProfile()
    }
    getReportProfile() {
        ApiRequest({}, `user-app/get-report-user`, "GET", this.props.token)
            .then(resp => {
                console.log("getReport=====>>", resp)
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

                        resp.data.data.forEach((item, index) => {
                            if (item.name === "Employed here") {
                                this.setState({ profile: item }, () => this.getQuestionsApi(item))
                            }
                        })

                        console.log("profile==>", this.state.profile)
                        break;
                    }

                    default: {
                        this.setState({ isLoading: false })
                        setTimeout(() => {
                            Alert.alert(
                                '',
                                "Server Not Responding",
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

    getQuestionsApi(profile) {

        ApiRequest({ "id": profile.id }, `user-app/get-questions`, "POST", this.props.token)
            .then(resp => {
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
                        this.setState({ isLoading: false, getQuestionsArray: resp.data.data }, () => this.addCheckBoxStatusInArray(resp.data.data))


                        console.log("Employeequestions==>", resp.data.data)

                        break;
                    }

                    default: {
                        this.setState({ isLoading: false })
                        setTimeout(() => {
                            Alert.alert(
                                '',
                                "Server Not Responding",
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
    addCheckBoxStatusInArray(questionsArray) {
        let checkAllThatApply = true
        let employerTests = true
        let questionArrayWithStatus = questionsArray
        questionsArray.forEach((questionItem, questionIndex) => {
            let parentObj = {}
            if (questionItem.title === "Check all that apply") {
                parentObj = {
                    ...questionItem,
                    titleStatus: checkAllThatApply
                }
                checkAllThatApply = false
            }
            else if (questionItem.title === "Employer tests") {
                parentObj = {
                    ...questionItem,
                    titleStatus: employerTests
                }
                employerTests = false
            }
            else {
                parentObj = {
                    ...questionItem,
                    titleStatus: false
                }
            }
            questionArrayWithStatus[questionIndex] = parentObj
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
        let errorMessage = ""
        let errorStatus = true
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
            else if (qTtem.question_choice === "TEXT") {
                optionLengthNotZero = true
                submitFinalArray.push({
                    "questions": qTtem.id,
                    "text_answer": this.state.additionalComments,
                    "question_choice": "TEXT"
                })
            }
            if (optionLengthNotZero === false) {
                errorMessage = `Please provide answer to this :  ${qTtem.title} - ${qTtem.questions}`
                errorStatus = false
                this.setState({ modalErrorMessage: errorMessage })
            }
        })
        if (errorStatus) {
            if (this.state.additionalComments.length !== 0) {
                let req = {
                    "location": {
                        "place_id": this.props.route.params.place_id,
                        "category": this.props.route.params.category,
                        "name": this.props.route.params.title,
                        "address": this.props.route.params.address,
                        "latitude": this.props.route.params.latitude,
                        "longitude": this.props.route.params.longitude
                    },
                    "visitor_type": this.state.profile.id,
                    "data": submitFinalArray
                }
                console.log("Hitting API with===>", req)
                //   alert("Thank You !") 
                setTimeout(() => {
                    this.postReview(req)
                }, 100);
            }
            else {
                this.setState({ modalErrorMessage: "Please provide additional message" })
                this.setState({ ModalVisible: true })
            }
        }
        else {
            this.setState({ ModalVisible: true })
        }

    }

    postReview(req) {
        this.setState({ isLoading: true })
        ApiRequest(req, "user-app/post-review", "POST", this.props.token)
            .then(async resp => {
                console.log("post review data==>", resp, "request==>", req)
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
                        this.setState({ successModalVisible: true })
                        break;
                    }
                    default: {
                        this.setState({ isLoading: false })
                        setTimeout(() => {
                            Alert.alert(
                                "",
                                'Please try again later',
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
        const { COMMENTS_HERE, YOUR_REPORT } = this.props.CommonReport
        const { WE_DO_NOT, Submit } = this.props.CommonText

        return (
            <AppView style={{ flex: 1 }} >
                <Header />
                <Container style={{ marginBottom: this.state.footerVisibleToggle ? hp(20.75) : null }}>
                    <Loader
                        visible={this.state.isLoading}
                    />
               <AppView style={{flexDirection: 'row',}}>
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
                   

                    {this.state.getQuestionsArray.map((questionItem, questionIndex) => {
                        if (questionItem.question_choice === "MULTIPLE") {

                            return (<AppView style={{ width: wp(95), marginVertical: hp(1), justifyContent: 'center', alignSelf: 'center', }}>

                                {questionItem.titleStatus ? <AppView style={{ marginVertical: hp(1) }}>
                                    <AppText style={[styles.textStyle]}>
                                        {questionItem.title}
                                    </AppText>
                                </AppView> : null}
                                <AppView style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <AppText style={[styles.defaulttextStyle, { alignSelf: 'center' }]}>{questionItem.questions}</AppText>
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
                            style={{ textAlign: "center", fontSize: normalizeFont(16), marginTop: wp(6) }}
                            placeholderTextColor="black"
                            value={this.state.additionalComments}
                            onChangeText={(text) => this.setState({ additionalComments: text })}
                            placeholder={COMMENTS_HERE}>
                        </AppInput>
                    </AppView>

                    <AppView>
                        <AppView style={{ marginVertical: hp(4), flexDirection: "row", justifyContent: "center", alignItems: 'center', }}>
                            <AppView style={{ alignSelf: "center" }} >
                                <SubmitButton
                                    onPress={() => this.submitButtonHandler()}
                                    textstyle={styles.SubmitTextstyle}
                                    buttonText={Submit}
                                >
                                </SubmitButton>
                            </AppView>
                        </AppView>
                    </AppView>
                    <AppView style={{ marginTop: hp(2) }} >
                        <AppText style={{ color: DARKBLUE, fontSize: normalizeFont(17), textAlign: "center" }}>
                            {YOUR_REPORT}
                        </AppText>
                    </AppView>
                    <AppText style={{ color: DARKBLUE, textAlign: "center" }}>
                        {WE_DO_NOT}
                    </AppText>
                    <CustomModal
                        isModalVisible={this.state.ModalVisible}
                        onPress={() => this.setState({ ModalVisible: !this.state.ModalVisible })}
                        text={this.state.modalErrorMessage}
                    />
                    {this.state.footerVisibleToggle ? null :
                        <AppView style={{ width: wp(50), height: hp(40) }} />}
                    <CustomModal
                        isModalVisible={this.state.successModalVisible}
                        onPress={() => this.props.navigation.navigate("EstablishmentMap", this.setState({ successModalVisible: !this.state.successModalVisible }))}
                        text={"Review Posted Successfully"}
                    />
                </Container>
                {this.state.footerVisibleToggle ? <Footer style={{ position: 'absolute', bottom: 0 }} /> : null}
            </AppView>

        )

    }

}
const mapStateToProps = state => {
    console.log("state==>>", state.reducer.language)
    return {
        CommonReport: state.reducer.language.COMMON_REPORT,
        CommonText: state.reducer.language.COMMON_TEXT,
        Employee: state.reducer.language.Employee,
        token: state.AuthReducer.Token
    }
}
export default connect(mapStateToProps)(EmployeReport);