import React, { Component } from 'react';
import { AppImage, AppView, AppText, Touchable, AppbackgraoundImage } from "@Component/Atoms/index"
import { KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import { Header, Footer, CustomButton } from '@Component/molecules/index';
import { Container } from '@Component/containers/index'
import { fontStyle } from '@Assets/commonFont/commonFont'
import styles from './styles'
import { RED_BG_THEME, PLACE_BLUE, DARKBLUE } from "@GlobalStyles/colors"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StarIcon, SearchIcon ,backArrow} from '@Assets/Icon'
import { connect, } from 'react-redux';
import { normalizeFont } from '@GlobalStyles/responsive';
import ApiRequest from '../../../RestAPI/rest'
import { Loader } from "@Component/loader";
class FurtherInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertStatus: "",
            favouriteStatus: false,
            isLoading: true,
            quesList: [],

        };
    }


    

  


    render() {
        const { ALERT, A, SEARCH_ANOTHER, PROVIDE_REPORT } = this.props.PlaceView
        const { IS_SOCIAL_DISTANCING_REQUIRED, YES, NO, ARE_FACE_MASK_REQUIRED, PATRONS, PROVIDE_FACE_MASKS, EMPLOYEES, COVID_TESTS, ANTIBODY_TESTS, OWNER, WE_PROVIDE } = this.props.FurtherInfo
        return (
            <AppView style={{ flex: 1 }}>
                <Header />
                <Container style={{ marginBottom: hp(20.75) }}>
                    {/* <Loader
                        visible={this.state.isLoading}
                    /> */}
                    <AppView style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                        <AppView style={{alignSelf: 'center',justifyContent: 'center',height:hp(8),marginTop: hp(3),}}>
                            <Touchable style={{alignSelf: 'center',}} onPress={() => { this.props.navigation.goBack() }} >
                                <AppImage source={backArrow} style={{ width: wp(8), height: hp(5),alignSelf: 'center', }} />
                            </Touchable>
                        </AppView>
                        <AppView style={[styles.buttonView, { backgroundColor: this.props.route.params.alertStatusText == "A" ? RED_BG_THEME : PLACE_BLUE, width: this.props.route.params.alertStatusText == "A" ? wp(65) : wp(75) }]}>
                            <AppView style={[styles.buttonContainer, { width: this.props.route.params.alertStatusText == "A" ? wp(64) : wp(74) }]}>
                                <AppText style={styles.buttonText}>
                                    {this.props.route.params.alertStatusText == "A" ? "ALERT" : this.props.route.params.alertStatusText == "S" ? "COVID Safeguards" : this.props.route.params.alertStatusText == "P" ? "Partial Safeguards" : "No Reports"}
                                </AppText>
                            </AppView>
                        </AppView>
                        <AppView style={[styles.CircleView, { backgroundColor: this.props.route.params.alertStatusText == "A" ? RED_BG_THEME : this.props.route.params.alertStatusText == "" ? WHITE : PLACE_BLUE }]}>
                            <AppText style={[styles.buttonText, { paddingVertical: hp(-5.2), }]}>
                                {/* {A} */}
                                {this.props.route.params.alertStatusText}
                            </AppText>
                        </AppView>
                    </AppView>


                    <AppView style={{ flexDirection: "row", alignItems: "center" }}>
                        <ScrollView style={styles.MiddleViewChild}>
                            <AppView style={styles.MiddleView}>
                                <AppText style={styles.middleViewTextStyle}> {this.props.route.params.title}</AppText>

                            </AppView>
                        </ScrollView>
                        <Touchable onPress={() => this.props.navigation.navigate("EstablishmentMap")}>
                            <AppView style={{ flexDirection: "row", }}>
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

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled
                        style={styles.bluebgView}>
                        <AppText style={styles.patronstextStyle}>
                            {"Additional Responses"}
                        </AppText>
                        <AppView style={{ flexDirection: "row", justifyContent: "space-evenly" }} >
                            <AppText style={styles.yesStyle}>
                                {YES}
                            </AppText>
                            <AppText style={styles.noStyle}>
                                {NO}
                            </AppText>
                        </AppView>
                        {
                            this.state.quesList.map((item, index) => <AppView style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <AppText style={styles.provideStyle}>
                                    {item.question}
                                </AppText>
                                <AppText style={{ fontSize: normalizeFont(16), alignSelf: 'center', }} >
                                    {item.yes}
                                </AppText>
                                <AppText style={{ fontSize: normalizeFont(16), marginRight: wp(12), alignSelf: 'center' }}>
                                    {item.no}
                                </AppText>
                            </AppView>
                            )
                        }
                        {/* <AppText style={styles.CommanText}>
                            {WE_PROVIDE}
                        </AppText> */}
                    </ScrollView>
                    <AppView style={{ marginTop: hp(1) }}>
                        <CustomButton
                            onPress={() => this.props.navigation.navigate("ReportEstablishment", { ...this.props.route.params })}
                            style={{ width: wp(50), height: hp(6), backgroundColor: RED_BG_THEME }}
                            textstyle={{ fontSize: normalizeFont(25) }}
                            buttonText={PROVIDE_REPORT}
                        />
                    </AppView>
                </Container>
                <Footer style={{ position: 'absolute', bottom: 0 }} />
            </AppView>
        );
    }
}
const mapStateToProps = state => {
    console.log("state==>>", state.reducer.language)
    return {
        PlaceView: state.reducer.language.PlaceView,
        FurtherInfo: state.reducer.language.FurtherInfo,
        token: state.AuthReducer.Token
    }
}

export default connect(mapStateToProps)(FurtherInfo);