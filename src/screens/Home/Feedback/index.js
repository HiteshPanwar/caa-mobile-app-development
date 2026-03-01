import React, { Component } from 'react';
import { Alert } from "react-native";
import { AppView, AppText, AppbackgraoundImage, AppInput } from "@Component/Atoms/index"
import { Header, Footer, SubmitButton, CustomModal } from '@Component/molecules/index';
import { GREY_TEXT } from './color'
import styles from './styles'
import { DefaultState } from "./constant"
import { handleValidations } from "./function";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { blueBarIconWhiteBorder } from '@Assets/Icon'
import { connect, } from 'react-redux';
import { Container } from '@Component/containers/index'
import ApiRequest from '../../../RestAPI/rest'
import { Loader } from '../../../Components/loader'; 

import firebase from '../../../firebase/firebase';
var database = firebase.database() 

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DefaultState,
      nameStatus: "",
      emailStatus: "",
      messageStatus: "",
      name: "",
      message: "",
      email: "",
      successModalVisible: false,
      isLoading: false,
      footerVisibleToggle: true
    };
  }

  handlevalidate = (text, type) => {
    let status = `${type}Status`;
    let errorText = `${type}Error`;
    let resp = handleValidations(text, type)

    this.setState({
      [type]: resp.value,
      [errorText]: resp.errorText,
      [status]: resp.status,
    })

  }

  Submit() {
    if (this.state.nameStatus) {
      if (this.state.emailStatus) {
        if (this.state.messageStatus) {
          this.FeedbackApi()
        }
        else {
          this.setState({ messageError: "please enter message", messageStatus: false })
        }
      }
      else {
        this.setState({ emailError: "please enter email", emailStatus: false })
      }
    }

    else {
      this.setState({ nameError: "please enter name", nameStatus: false })
    }
  }

  FeedbackApi() {
    this.setState({ isLoading: true })

    let feedbackDetails =
    {
      "email": this.state.email,
      "message": this.state.message,
      "name": this.state.name

    } 
    var newPostKey = database.ref().child('feedback').push().key;
    var databaseRef = database.ref("feedback/"+ newPostKey);
    databaseRef.set({
        data:feedbackDetails,
        time:Date.now()
    }) 
    setTimeout(() => {
      this.setState({ isLoading: false })
                this.setState({ successModalVisible: true })
              }, 200); 
  }

  render() {
    const { FEEDBACK, NAME, EMAIL, MESSAGE } = this.props.Feedback
    const { Submit } = this.props.CommonText
    return (
      <AppView style={{ flex: 1 }}>
        <Header />
        <Loader
          visible={this.state.isLoading}
        />
        <Container style={{ marginBottom: this.state.footerVisibleToggle ? hp(20.75) : null }}>
          <AppView style={styles.InputContainer}>

            <AppbackgraoundImage source={blueBarIconWhiteBorder} resizeMode="contain" style={styles.InputWrapper}>
              <AppText style={styles.buttonText}>
                {FEEDBACK}
              </AppText>
            </AppbackgraoundImage>
          </AppView>
          <AppView style={styles.searchContainer}>
            <AppInput
              onFocus={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
              onBlur={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
              placeholder={NAME} style={styles.InputStyle} placeholderTextColor={GREY_TEXT}
              value={this.state.name}
              onChangeText={(text) => this.handlevalidate(text, "name")}
            />
          </AppView>
          <AppText style={styles.ErrorText}>
            {this.state.nameError}
          </AppText>
          <AppView style={styles.searchContainer}>

            <AppInput
              onFocus={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
              onBlur={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
              placeholder={EMAIL} style={styles.InputStyle} placeholderTextColor={GREY_TEXT}
              value={this.state.email}
              onChangeText={(text) => this.handlevalidate(text, "email")}
            />

          </AppView>
          <AppText style={styles.ErrorText}>
            {this.state.emailError}
          </AppText>
          <AppText style={styles.feedbackText}> {MESSAGE} </AppText>
          <AppView style={styles.textAreaContainer}>

            <AppInput
              multiline={true}
              numberOfLines={8}
              value={this.state.message}
              onFocus={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
              onBlur={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
              placeholder={MESSAGE} style={styles.textAreaInputStyle} placeholderTextColor={GREY_TEXT}
              onChangeText={(text) => this.handlevalidate(text, "message")}
            />

          </AppView>
          <AppText style={styles.ErrorText}>
            {this.state.messageError}
          </AppText>

          <AppView style={{ marginTop: hp(2) }} >
            <SubmitButton
              onPress={() => this.Submit()}
              textstyle={{ alignSelf: "center" }}
              buttonText={Submit}
            >
            </SubmitButton>
          </AppView>
          {this.state.footerVisibleToggle ? null :
            <AppView style={{ width: wp(50), height: hp(40) }} />}
          <CustomModal
            isModalVisible={this.state.successModalVisible}
            onPress={() => this.props.navigation.navigate("Home", this.setState({ successModalVisible: !this.state.successModalVisible }))}
            text={"Feedback sent sucessfully"}
          />
        </Container>

        {this.state.footerVisibleToggle ? <Footer style={{ position: 'absolute', bottom: 0 }} /> : null}
      </AppView>

    );
  }
}
const mapStateToProps = state => {
  console.log("state==>>", state.reducer.language)
  return {
    Feedback: state.reducer.language.Feedback,
    CommonText: state.reducer.language.COMMON_TEXT,
    token: state.AuthReducer.Token

  }
}

export default connect(mapStateToProps)(Feedback);