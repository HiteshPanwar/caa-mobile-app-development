import React, { Component } from 'react';
import { TextInput, Alert } from "react-native"
import { AppImage, AppView, AppText, Touchable, AppbackgraoundImage } from "@Component/Atoms/index"
import { KeyboardAvoidingView, ScrollView } from 'react-native'
import { Header, Footer, BoxIcon, SubmitButton, CustomModal } from '@Component/molecules/index';
import styles from './styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { backArrow, redBar, StarIcon, SearchIcon, starFilledIcon } from '@Assets/Icon'
import { connect, } from 'react-redux';
import { Container } from '@Component/containers/index'
import { DefaultState } from "./constant"
import { handleValidations } from "./function";
import { DARKBLUE, PLACE_BLUE } from '@GlobalStyles/colors';
import ApiRequest from '../../RestAPI/rest'
import { Loader } from '../../Components/loader';
class ReportError extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DefaultState,
            message: "",
            footerVisibleToggle: true,
            favouriteStatus: false,
            successModalVisible: false,
            favouriteModalVisible: false,
            unfavouriteModalVisible: false,
            isLoading: false
        };
    }
    handlevalidate = (text, type) => {
        let status = `${type}Status`;
        let errorText = `${type}Error`;
        let activeBorderColor = `active${type}BorderColor`;
        let resp = handleValidations(text, type)

        this.setState({
            [type]: resp.value,
            [errorText]: resp.errorText,
            [status]: resp.status,
            [activeBorderColor]: !resp.status
        })

    }
    handlefavourite() {
        if (this.state.favouriteStatus === false) {
            this.setState({ favouriteStatus: !this.state.favouriteStatus })
            this.setState({ favouriteModalVisible: !this.state.favouriteModalVisible })
        }
        else {
            this.setState({ favouriteStatus: !this.state.favouriteStatus })
            this.setState({ unfavouriteModalVisible: !this.state.unfavouriteModalVisible })

        }
    }
    ReportErrorApi() {
        this.setState({ isLoading: true })
        let req =
        {
            "name": this.props.route.params.title,
            "place_id": this.props.route.params.place_id,
            "address": this.props.route.params.address,
            "latitude": this.props.route.params.latitude,
            "longitude": this.props.route.params.longitude,
            "category": this.props.route.params.category,
            "description": this.state.content,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "email": this.state.email,
            "mobile_no": this.state.mobileNo
        }
        ApiRequest(req, "user-app/report-error", "POST", this.props.token)
            .then(async resp => {
                console.log("req==>", resp)
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
                        setTimeout(() => {
                            this.setState({ message: resp.data.response_message, })
                            this.setState({ successModalVisible: true })
                        }, 500);
                        break;
                    }


                    default: {
                        this.setState({ isLoading: false })
                        setTimeout(() => {
                            Alert.alert(
                                "",
                                'Something went wrong',
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


    Submit() {
        const { CONTENT_ERROR, FIRSTNAME_ERROR, LASTNAME_ERROR, EMAIL_ERROR, MOBILENO_ERROR } = this.props.ErrorText
        if (this.state.contentStatus) {
            if (this.state.firstnameStatus) {
                if (this.state.lastnameStatus) {
                    if (this.state.emailStatus) {
                        if (this.state.mobileNoStatus) {
                            // this.ReportErrorApi()

                        }
                        else { this.setState({ mobileNoError: MOBILENO_ERROR, mobileNoStatus: false }) }
                    }
                    else { this.setState({ emailError: EMAIL_ERROR, emailStatus: false }) }
                }
                else { this.setState({ lastnameError: LASTNAME_ERROR, lastnameStatus: false }) }
            }
            else { this.setState({ firstnameError: FIRSTNAME_ERROR, firstnameStatus: false }) }
        }
        else { this.setState({ contentError: CONTENT_ERROR, contentStatus: false }) }
    }

    render() {
        const { WE_DO_NOT, Submit } = this.props.CommanText
        const { REPORT_ON } = this.props.ReportError
        const { FIRST_NAME, LAST_NAME, EMAIL, MOBILE } = this.props.MyProfile
        const { INDICATE_HERE, PLEASE_PROVIDE_YOUR_CONTACT_INFORMATION } = this.props.ContactUs
        const { SEARCH_ANOTHER, } = this.props.PlaceView
        return (

            <AppView style={{ flex: 1 }}>
                <Header />
                {/* <Loader
                    visible={this.state.isLoading}
                /> */}
                <Container style={{ marginBottom: this.state.footerVisibleToggle ? hp(20) : null }}>
                    <AppView style={{ flexDirection: 'row', }}>
                        <Touchable style={{ marginHorizontal: wp(2), marginTop: hp(1), height: hp(7), justifyContent: 'center', }} onPress={() => { this.props.navigation.goBack() }} >
                            <AppImage source={backArrow} style={{ width: wp(8), height: hp(5) }} />
                        </Touchable>
                        <AppView style={styles.buttonContainer}>

                            <AppbackgraoundImage source={redBar} resizeMode="contain" style={styles.buttonWrapper}>
                                <AppText style={styles.buttonText}>
                                    {REPORT_ON}
                                </AppText>
                            </AppbackgraoundImage>
                        </AppView>
                    </AppView>

                    <AppView style={{ flexDirection: "row", alignItems: "center", marginVertical: hp(3), justifyContent: "space-around" }}>
                        {/* <Touchable   onPress={() => this.handlefavourite() }>
                    <AppImage
                        style={styles.starStyle}
                        // source={StarIcon}
                        source={this.state.favouriteStatus ? starFilledIcon :StarIcon}
                    />
                    </Touchable> */}
                        {/* <AppView style={styles.MiddleView}> */}
                        <AppView style={{ width: wp(45), height: hp(15), marginLeft: wp(5) }}>
                            <ScrollView
                                nestedScrollEnabled
                                style={[styles.MiddleView, { backgroundColor: this.props.route.params.alertStatusText == "A" ? PLACE_BLUE : DARKBLUE }]}>

                                <AppText style={styles.middleViewTextStyle}>
                                    {this.props.route.params.title}
                                </AppText>
                                <AppText style={styles.middleViewTextStyle}>
                                    {this.props.route.params.address}
                                </AppText>
                            </ScrollView>
                        </AppView>
                        {/* <Touchable   onPress={() => this.props.navigation.navigate("EstablishmentMap")}>
                        <AppView style={{ flexDirection: "row" }}>
                            <AppImage
                                style={styles.starStyle}
                                // source={StarIcon}
                                source={this.state.favouriteStatus ? starFilledIcon : StarIcon}
                            />
                        </Touchable> */}
                        {/* <AppView style={styles.MiddleView}> */}
                        {/* <ScrollView
                            nestedScrollEnabled
                            style={[styles.MiddleView, { backgroundColor: this.props.route.params.alertStatusText == "A" ? PLACE_BLUE : DARKBLUE }]}>
                             
                            <AppText style={styles.middleViewTextStyle}>
                                {this.props.route.params.title}
                            </AppText>
                            <AppText style={styles.middleViewTextStyle}>
                                {this.props.route.params.address}
                            </AppText>
                        </ScrollView> */}
                        <Touchable onPress={() => this.props.navigation.navigate("EstablishmentMap")}>
                            <AppView style={{ flexDirection: "row" }}>
                                <AppImage
                                    style={styles.searchStyle}
                                    source={SearchIcon}
                                />
                                <AppText style={styles.searchText}>
                                    {SEARCH_ANOTHER}
                                </AppText>
                            </AppView>
                        </Touchable>
                    </AppView>

                    <AppView style={styles.textContainer}>
                        <AppView style={styles.textWrapper}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <TextInput style={styles.IndicateText}
                                    onFocus={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
                                    onBlur={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
                                    placeholder={INDICATE_HERE}
                                    onChangeText={(text) => this.handlevalidate(text, "content")}
                                    value={this.state.content}
                                    multiline >
                                </TextInput>
                            </ScrollView>
                        </AppView>
                    </AppView>
                    <AppText style={styles.ErrorText}>
                        {this.state.contentError}
                    </AppText>
                    <AppText style={styles.textStyle}>
                        {PLEASE_PROVIDE_YOUR_CONTACT_INFORMATION}
                    </AppText>

                    <AppView style={{ flexDirection: "row", marginTop: hp(1) }}>
                        <AppView style={styles.InputView} >
                            <TextInput
                                onFocus={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
                                onBlur={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
                                style={styles.inputStyle}
                                placeholderTextColor={DARKBLUE}
                                placeholder={FIRST_NAME}
                                value={this.state.firstname}
                                onChangeText={(text) => this.handlevalidate(text, "firstname")} />
                            <AppText style={[styles.ErrorText, { width: wp(40), marginLeft: wp(5), marginTop: hp(0.5) }]}>
                                {this.state.firstnameError}
                            </AppText>

                        </AppView>
                        <AppView style={styles.InputView} >
                            <TextInput
                                onFocus={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
                                onBlur={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
                                style={styles.inputStyle}
                                placeholderTextColor={DARKBLUE}
                                placeholder={LAST_NAME}
                                value={this.state.lastname}
                                onChangeText={(text) => this.handlevalidate(text, "lastname")}
                            />
                            <AppText style={[styles.ErrorText, { width: wp(50), marginLeft: wp(15), marginTop: hp(0.5) }]}>
                                {this.state.lastnameError}
                            </AppText>
                        </AppView>
                    </AppView>
                    {/* <AppView style={{flexDirection:"row"}}>
                    <AppText style={[styles.ErrorText,{width:wp(50),marginLeft:wp(4)}]}>
                       {this.state.firstnameError}
                   </AppText>
                   <AppText style={[styles.ErrorText,{width:wp(50)}]}>
                       {this.state.lastnameError}
                   </AppText>
                    </AppView> */}
                    <AppView style={{ flexDirection: "row", marginTop: hp(4) }}>
                        <AppView style={styles.InputView} >
                            <TextInput
                                onFocus={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
                                onBlur={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
                                style={styles.inputStyle}
                                placeholderTextColor={DARKBLUE}
                                placeholder={EMAIL}
                                value={this.state.email}
                                onChangeText={(text) => this.handlevalidate(text, "email")} />
                            <AppText style={[styles.ErrorText, { width: wp(40), marginLeft: wp(5), marginTop: hp(0.5) }]} >
                                {this.state.emailError}
                            </AppText>
                        </AppView>
                        <AppView style={[styles.InputView, { width: wp(50) }]} >
                            <TextInput
                                onFocus={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
                                onBlur={() => this.setState({ footerVisibleToggle: !this.state.footerVisibleToggle })}
                                style={styles.inputStyle}
                                placeholderTextColor={DARKBLUE}
                                placeholder={MOBILE}
                                value={this.state.mobileNo}
                                onChangeText={(text) => this.handlevalidate(text, "mobileNo")} />
                            <AppText style={[styles.ErrorText, { width: wp(50), marginTop: hp(0.5) }]} >
                                {this.state.mobileNoError}
                            </AppText>
                        </AppView>
                    </AppView>
                    <AppView style={{ marginVertical: hp(4), flexDirection: "row", justifyContent: "center", alignItems: 'center', }}>
                        {/* <AppView style={{  marginHorizontal: wp(4), }}>
                     <Touchable onPress={()=> console.log("hello") }>
                      <AppImage source={backArrow} style={{height:hp(4)}} >

                      </AppImage>
                     </Touchable>
                    </AppView> */}
                        <AppView style={{ marginTop: hp(2) }} >
                            <SubmitButton
                                onPress={() => this.Submit()}
                                textstyle={{ alignSelf: "center" }}
                                buttonText={Submit}
                            >
                            </SubmitButton>
                        </AppView>
                    </AppView>
                    <AppView style={styles.CommanText}>
                        <AppText style={styles.CommanText}>
                            {WE_DO_NOT}
                        </AppText>
                    </AppView>
                    <CustomModal
                        isModalVisible={this.state.favouriteModalVisible}
                        onPress={() => this.setState({ favouriteModalVisible: !this.state.favouriteModalVisible })}
                        text={"Successfully added"}
                    />

                    <CustomModal
                        isModalVisible={this.state.unfavouriteModalVisible}
                        onPress={() => this.setState({ unfavouriteModalVisible: !this.state.unfavouriteModalVisible })}
                        text={"Successfully removed"}
                    />

                    <CustomModal
                        isModalVisible={this.state.successModalVisible}
                        onPress={() => this.props.navigation.navigate("EstablishmentMap", this.setState({ successModalVisible: !this.state.successModalVisible }))}
                        text={this.state.message}
                    />

                    {this.state.footerVisibleToggle ? null :
                        <AppView style={{ width: wp(50), height: hp(20) }} />}
                </Container>

                {this.state.footerVisibleToggle ? <Footer style={{ position: 'absolute', bottom: 0 }} /> : null}
            </AppView>

        );
    }
}
const mapStateToProps = state => {
    console.log("state==>>", state.reducer.language)
    return {
        ContactUs: state.reducer.language.ContactUs,
        CommanText: state.reducer.language.COMMON_TEXT,
        MyProfile: state.reducer.language.MyProfile,
        Submit: state.reducer.language.Submit,
        ReportError: state.reducer.language.ReportError,
        PlaceView: state.reducer.language.PlaceView,
        ErrorText: state.reducer.language.ErrorText,
        token: state.AuthReducer.Token,
    }
}

export default connect(mapStateToProps)(ReportError);